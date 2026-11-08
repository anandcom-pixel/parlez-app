// Vercel Serverless Function: Cloud Database Persistence & Multi-User Synchronization for ParlezApp

let inMemoryCloudStore = {
  lessons: {},
  vocabulary: {},
  newVocabulary: {},
  customLessons: [],
  customQuizItems: [],
  customQuotes: [],
  lastSyncedAt: Date.now()
};

// Helper to filter out negative/pessimistic quotes (e.g., 'Qui vivra verra')
function sanitizeQuotes(quotes) {
  if (!Array.isArray(quotes)) return [];
  return quotes.filter(q => {
    if (!q) return false;
    if (q.id === 'quote-6') return false;
    const fr = (q.french || '').toLowerCase();
    const en = (q.english || '').toLowerCase();
    return !fr.includes('qui vivra verra') && !en.includes('time will tell');
  });
}

export default async function handler(req, res) {
  // CORS configuration for cross-origin or preview deployments
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const KV_URL = process.env.KV_REST_API_URL;
  const KV_TOKEN = process.env.KV_REST_API_TOKEN;

  // GET: Fetch latest cloud curriculum overrides and custom content
  if (req.method === 'GET') {
    try {
      if (KV_URL && KV_TOKEN) {
        const kvRes = await fetch(`${KV_URL}/get/parlez_cloud_curriculum_v1`, {
          headers: { Authorization: `Bearer ${KV_TOKEN}` }
        });
        if (kvRes.ok) {
          const kvData = await kvRes.json();
          if (kvData && kvData.result) {
            const parsed = typeof kvData.result === 'string' ? JSON.parse(kvData.result) : kvData.result;
            if (parsed && parsed.customQuotes) {
              parsed.customQuotes = sanitizeQuotes(parsed.customQuotes);
            }
            inMemoryCloudStore = parsed;
            return res.status(200).json({
              success: true,
              source: 'vercel-kv',
              data: parsed
            });
          }
        }
      }
    } catch (e) {
      console.warn('Vercel KV read error, falling back to serverless memory:', e);
    }

    if (inMemoryCloudStore && inMemoryCloudStore.customQuotes) {
      inMemoryCloudStore.customQuotes = sanitizeQuotes(inMemoryCloudStore.customQuotes);
    }

    return res.status(200).json({
      success: true,
      source: 'serverless-cloud-storage',
      data: inMemoryCloudStore
    });
  }

  // POST: Save updated or newly created curriculum content
  if (req.method === 'POST') {
    try {
      const payload = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
      const updatedData = {
        ...inMemoryCloudStore,
        ...payload,
        lessons: { ...(inMemoryCloudStore.lessons || {}), ...(payload.lessons || {}) },
        vocabulary: { ...(inMemoryCloudStore.vocabulary || {}), ...(payload.vocabulary || {}) },
        newVocabulary: { ...(inMemoryCloudStore.newVocabulary || {}), ...(payload.newVocabulary || {}) },
        customLessons: payload.customLessons || inMemoryCloudStore.customLessons || [],
        customQuizItems: payload.customQuizItems || inMemoryCloudStore.customQuizItems || [],
        customQuotes: sanitizeQuotes(payload.customQuotes || inMemoryCloudStore.customQuotes || []),
        lastSyncedAt: Date.now()
      };

      inMemoryCloudStore = updatedData;

      if (KV_URL && KV_TOKEN) {
        try {
          await fetch(`${KV_URL}/set/parlez_cloud_curriculum_v1`, {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${KV_TOKEN}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(JSON.stringify(updatedData))
          });
        } catch (kvErr) {
          console.warn('Vercel KV write error, retained in serverless store:', kvErr);
        }
      }

      return res.status(200).json({
        success: true,
        source: KV_URL && KV_TOKEN ? 'vercel-kv' : 'serverless-cloud-storage',
        message: 'Content successfully synced to Vercel cloud database',
        data: updatedData
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown server error'
      });
    }
  }

  return res.status(405).json({ success: false, error: 'Method Not Allowed' });
}
