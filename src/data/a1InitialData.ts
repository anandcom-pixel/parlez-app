import type { Lesson, CEFRLevel } from '../types';

export const A1_CURRICULUM_DATA: Lesson[] = [
  {
    id: 'a1-lesson-1',
    level: 'A1',
    title: 'Salutations & Premiers Pas',
    subtitle: 'Greetings, Politeness & Essential Introductions',
    theme: 'Social Foundations',
    description: 'Master daily greetings, formal vs informal address, and polite introductions in contemporary French.',
    grammarFocus: {
      ruleName: 'Tu vs. Vous & Gender Agreement',
      explanation: 'Use "vous" for formal situations or strangers; use "tu" for peers and family. Adjectives match the gender of the person speaking or addressed.',
      examples: [
        { fr: 'Bonjour madame, comment allez-vous ?', en: 'Good morning madam, how are you? (Formal)' },
        { fr: 'Salut Thomas, ça va ?', en: 'Hi Thomas, how are you? (Informal)' },
        { fr: 'Je suis enchanté / enchantée.', en: 'Pleased to meet you (m / f).' }
      ]
    },
    culturalNote: 'In France, saying "Bonjour" before asking any question in a shop or bakery is an essential social code. Skipping it is perceived as quite rude!',
    idiomSpotlight: {
      french: 'Ça roule ?',
      literal: 'Does it roll?',
      meaning: 'How are things going? / Everything cool?',
      example: 'Salut ! Ça roule depuis hier ?'
    },
    vocabulary: [
      {
        id: 'a1-1',
        french: 'bonjour',
        english: 'good morning / hello',
        ipa: '/bɔ̃.ʒuʁ/',
        partOfSpeech: 'phrase',
        exampleFrench: 'Bonjour, comment allez-vous aujourd’hui ?',
        exampleEnglish: 'Hello, how are you doing today?',
        pronunciationTip: 'The "on" is nasal (/ɔ̃/). Don’t pronounce a hard "n" at the end.',
        level: 'A1',
        category: 'Greetings'
      },
      {
        id: 'a1-2',
        french: 'enchanté',
        english: 'pleased to meet you',
        ipa: '/ɑ̃.ʃɑ̃.te/',
        partOfSpeech: 'adjective',
        exampleFrench: 'Enchanté de faire votre connaissance.',
        exampleEnglish: 'Delighted to make your acquaintance.',
        pronunciationTip: 'Two nasal vowels (/ɑ̃/ and /ɑ̃/) followed by a crisp acute "é".',
        level: 'A1',
        category: 'Greetings'
      },
      {
        id: 'a1-3',
        french: 's’il vous plaît',
        english: 'please (formal)',
        ipa: '/sil vu plɛ/',
        gender: 'none',
        partOfSpeech: 'phrase',
        exampleFrench: 'Un café, s’il vous plaît.',
        exampleEnglish: 'A coffee, please.',
        pronunciationTip: 'Keep the "t" in "plaît" silent.',
        level: 'A1',
        category: 'Politeness'
      },
      {
        id: 'a1-4',
        french: 'merci beaucoup',
        english: 'thank you very much',
        ipa: '/mɛʁ.si bo.ku/',
        partOfSpeech: 'phrase',
        exampleFrench: 'Merci beaucoup pour votre aide précieuse.',
        exampleEnglish: 'Thank you very much for your precious help.',
        pronunciationTip: 'Pronounce the "r" gently in the back of your throat (/ʁ/).',
        level: 'A1',
        category: 'Politeness'
      },
      {
        id: 'a1-5',
        french: 'au revoir',
        english: 'goodbye',
        ipa: '/o ʁə.vwaʁ/',
        partOfSpeech: 'phrase',
        exampleFrench: 'Au revoir et bonne journée !',
        exampleEnglish: 'Goodbye and have a nice day!',
        pronunciationTip: 'In fast spoken French, sounds almost like "or-vwar".',
        level: 'A1',
        category: 'Greetings'
      },
      {
        id: 'a1-6',
        french: 'bonne journée',
        english: 'have a good day',
        ipa: '/bɔn ʒuʁ.ne/',
        gender: 'f',
        partOfSpeech: 'phrase',
        exampleFrench: 'Merci, bonne journée à vous aussi !',
        exampleEnglish: 'Thank you, have a good day too!',
        pronunciationTip: 'Short crisp "o" in bonne, long melodic "journée".',
        level: 'A1',
        category: 'Greetings'
      }
    ],
    dialogue: {
      id: 'd-a1-1',
      title: 'Première Rencontre au Parc',
      scenario: 'Meeting a neighbor in the Luxembourg Garden',
      lines: [
        { speaker: 'Camille', french: 'Bonjour ! Vous êtes le nouveau voisin ?', english: 'Hello! Are you the new neighbor?' },
        { speaker: 'Alexandre', french: 'Oui, tout à fait ! Je m’appelle Alexandre.', english: 'Yes, absolutely! My name is Alexandre.' },
        { speaker: 'Camille', french: 'Enchantée Alexandre, je suis Camille.', english: 'Delighted Alexandre, I am Camille.' },
        { speaker: 'Alexandre', french: 'Enchanté ! Bonne journée à vous.', english: 'Delighted! Have a great day.' }
      ]
    }
  },
  {
    id: 'a1-lesson-2',
    level: 'A1',
    title: 'Au Café & À La Boulangerie',
    subtitle: 'Ordering Food, Drinks & Using "Je Voudrais"',
    theme: 'Culinary Daily Life',
    description: 'Learn the quintessential French art of ordering at a café terrace and bakery with confidence.',
    grammarFocus: {
      ruleName: 'Polite Conditional: "Je voudrais..."',
      explanation: 'Instead of "Je veux" (which sounds blunt and demanding), French speakers politely use "Je voudrais" followed by a noun or infinitive.',
      examples: [
        { fr: 'Je voudrais un croissant chaud.', en: 'I would like a warm croissant.' },
        { fr: 'Je voudrais payer par carte.', en: 'I would like to pay by card.' }
      ]
    },
    culturalNote: 'At traditional Parisian bistros, coffee is served as an espresso by default ("un café"). If you want milk, ask for "un café au lait" or "un café crème".',
    idiomSpotlight: {
      french: 'L’addition, s’il vous plaît !',
      literal: 'The addition, please!',
      meaning: 'The bill, please!',
      example: 'Garçon, l’addition s’il vous plaît !'
    },
    vocabulary: [
      {
        id: 'a1-7',
        french: 'un café',
        english: 'a coffee / espresso',
        ipa: '/œ̃ ka.fe/',
        gender: 'm',
        partOfSpeech: 'noun',
        exampleFrench: 'Je prends un café en terrasse.',
        exampleEnglish: 'I will have a coffee on the terrace.',
        pronunciationTip: 'Nasal masculine article "un" (/œ̃/).',
        level: 'A1',
        category: 'Food & Drink'
      },
      {
        id: 'a1-8',
        french: 'un croissant',
        english: 'a croissant',
        ipa: '/œ̃ kʁwa.sɑ̃/',
        gender: 'm',
        partOfSpeech: 'noun',
        exampleFrench: 'Un croissant au beurre, s’il vous plaît.',
        exampleEnglish: 'A butter croissant, please.',
        pronunciationTip: 'Silent final "t". Don’t say the "t" sound.',
        level: 'A1',
        category: 'Food & Drink'
      },
      {
        id: 'a1-9',
        french: 'une baguette',
        english: 'a baguette',
        ipa: '/yn ba.ɡɛt/',
        gender: 'f',
        partOfSpeech: 'noun',
        exampleFrench: 'Une baguette tradition bien cuite.',
        exampleEnglish: 'A traditional baguette, well-baked.',
        pronunciationTip: 'Feminine article "une" (/yn/) with rounded lips.',
        level: 'A1',
        category: 'Food & Drink'
      },
      {
        id: 'a1-10',
        french: 'je voudrais',
        english: 'I would like',
        ipa: '/ʒə vu.dʁɛ/',
        partOfSpeech: 'phrase',
        exampleFrench: 'Je voudrais commander une carafe d’eau.',
        exampleEnglish: 'I would like to order a jug of tap water.',
        pronunciationTip: 'End with open "è" sound (/ɛ/), silent "s".',
        level: 'A1',
        category: 'Ordering'
      },
      {
        id: 'a1-11',
        french: 'l’addition',
        english: 'the bill / check',
        ipa: '/la.di.sjɔ̃/',
        gender: 'f',
        partOfSpeech: 'noun',
        exampleFrench: 'Pouvez-vous apporter l’addition ?',
        exampleEnglish: 'Could you bring the bill?',
        pronunciationTip: 'Ends with the nasal "on" sound (/sjɔ̃/).',
        level: 'A1',
        category: 'Ordering'
      },
      {
        id: 'a1-12',
        french: 'délicieux',
        english: 'delicious',
        ipa: '/de.li.sjø/',
        gender: 'm',
        partOfSpeech: 'adjective',
        exampleFrench: 'Ce gâteau au chocolat est absolument délicieux.',
        exampleEnglish: 'This chocolate cake is absolutely delicious.',
        pronunciationTip: 'Silent final "x". Round lips for the "eux" (/ø/) vowel.',
        level: 'A1',
        category: 'Descriptions'
      }
    ],
    dialogue: {
      id: 'd-a1-2',
      title: 'Commande en Terrasse',
      scenario: 'Ordering morning breakfast in a Saint-Germain café',
      lines: [
        { speaker: 'Serveur', french: 'Bonjour monsieur, vous désirez ?', english: 'Good morning sir, what would you like?' },
        { speaker: 'Client', french: 'Bonjour ! Je voudrais un café et un croissant, s’il vous plaît.', english: 'Hello! I would like a coffee and a croissant, please.' },
        { speaker: 'Serveur', french: 'Très bien. Avec du sucre ?', english: 'Very well. With sugar?' },
        { speaker: 'Client', french: 'Non merci, sans sucre. Et l’addition tout de suite.', english: 'No thank you, without sugar. And the bill right away.' }
      ]
    }
  },
  {
    id: 'a1-lesson-3',
    level: 'A1',
    title: 'Se Déplacer & Demander Son Chemin',
    subtitle: 'Directions, City Navigation & Prepositions of Place',
    theme: 'Urban Navigation',
    description: 'Learn how to ask where landmarks, subway stations, and pharmacies are, and understand street directions.',
    grammarFocus: {
      ruleName: 'Prepositions: À gauche, À droite & Tout droit',
      explanation: 'Use "où est... ?" (singular) or "où sont... ?" (plural) to ask location. Directions use prepositions contracted with articles (au, à la, aux).',
      examples: [
        { fr: 'Où se trouve la station de métro ?', en: 'Where is the subway station located?' },
        { fr: 'Tournez à gauche, puis allez tout droit.', en: 'Turn left, then go straight ahead.' }
      ]
    },
    culturalNote: 'Parisian streets often have blue enamel signs on building corners indicating both the street name and the arrondissement number (1er to 20e).',
    idiomSpotlight: {
      french: 'C’est au bout de la rue',
      literal: 'It is at the end of the street',
      meaning: 'Just down the street / within easy walking distance',
      example: 'Le musée du Louvre ? C’est juste au bout de la rue !'
    },
    vocabulary: [
      {
        id: 'a1-13',
        french: 'la gare',
        english: 'the train station',
        ipa: '/la ɡaʁ/',
        gender: 'f',
        partOfSpeech: 'noun',
        exampleFrench: 'Où se trouve la gare centrale, s’il vous plaît ?',
        exampleEnglish: 'Where is the central train station located, please?',
        pronunciationTip: 'Deep guttural "r" at the end.',
        level: 'A1',
        category: 'City'
      },
      {
        id: 'a1-14',
        french: 'tout droit',
        english: 'straight ahead',
        ipa: '/tu dʁwa/',
        gender: 'none',
        partOfSpeech: 'phrase',
        exampleFrench: 'Continuez tout droit pendant deux cents mètres.',
        exampleEnglish: 'Continue straight ahead for two hundred meters.',
        pronunciationTip: 'Both "t" sounds in "tout" and "droit" are silent!',
        level: 'A1',
        category: 'Directions'
      },
      {
        id: 'a1-15',
        french: 'à gauche',
        english: 'to the left',
        ipa: '/a ɡoʃ/',
        gender: 'none',
        partOfSpeech: 'phrase',
        exampleFrench: 'Tournez à gauche au prochain carrefour.',
        exampleEnglish: 'Turn left at the next intersection.',
        pronunciationTip: 'The "au" vowel is an open /o/, "ch" sounds like /ʃ/.',
        level: 'A1',
        category: 'Directions'
      },
      {
        id: 'a1-16',
        french: 'à droite',
        english: 'to the right',
        ipa: '/a dʁwat/',
        gender: 'none',
        partOfSpeech: 'phrase',
        exampleFrench: 'La pharmacie se trouve juste à droite.',
        exampleEnglish: 'The pharmacy is right on the right.',
        pronunciationTip: 'Crisp ending "t" sound is pronounced because of the final "e".',
        level: 'A1',
        category: 'Directions'
      },
      {
        id: 'a1-17',
        french: 'près d’ici',
        english: 'near here / close by',
        ipa: '/pʁɛ di.si/',
        gender: 'none',
        partOfSpeech: 'phrase',
        exampleFrench: 'Y a-t-il un distributeur de billets près d’ici ?',
        exampleEnglish: 'Is there an ATM near here?',
        pronunciationTip: 'Open "è" in "près", sharp "i" vowels in "d’ici".',
        level: 'A1',
        category: 'Distance'
      },
      {
        id: 'a1-18',
        french: 'le plan',
        english: 'the map / city layout',
        ipa: '/lə plɑ̃/',
        gender: 'm',
        partOfSpeech: 'noun',
        exampleFrench: 'Avez-vous un plan du réseau de métro ?',
        exampleEnglish: 'Do you have a map of the subway network?',
        pronunciationTip: 'Nasal vowel /ɑ̃/ with lips unrounded.',
        level: 'A1',
        category: 'Travel'
      }
    ],
    dialogue: {
      id: 'd-a1-3',
      title: 'Chercher la Station Saint-Michel',
      scenario: 'Asking a passerby for directions near Notre-Dame',
      lines: [
        { speaker: 'Touriste', french: 'Pardon madame, où se trouve le métro ?', english: 'Excuse me madam, where is the subway?' },
        { speaker: 'Passante', french: 'Allez tout droit, puis tournez à droite après le pont.', english: 'Go straight ahead, then turn right after the bridge.' },
        { speaker: 'Touriste', french: 'C’est loin d’ici ?', english: 'Is it far from here?' },
        { speaker: 'Passante', french: 'Non, c’est très près, juste à deux minutes à pied !', english: 'No, it is very close, just a two minute walk!' }
      ]
    }
  },
  {
    id: 'a1-lesson-4',
    level: 'A1',
    title: 'Nombres, Heure & Rendez-vous',
    subtitle: 'Telling Time, Calendar Days & Essential Numbers',
    theme: 'Daily Scheduling',
    description: 'Learn how to arrange appointments, read 24-hour schedules, and pronounce numbers from 1 to 100.',
    grammarFocus: {
      ruleName: 'Quelle heure est-il ?',
      explanation: 'Time is expressed with "Il est... heure(s)". In France, formal schedules (trains, movies, meetings) frequently use the 24-hour military format (14h30).',
      examples: [
        { fr: 'Il est huit heures et quart.', en: 'It is a quarter past eight.' },
        { fr: 'Le train part à seize heures quarante.', en: 'The train departs at 4:40 PM (16:40).' }
      ]
    },
    culturalNote: 'In France, if invited to dinner at someone’s home at 20h00, arrive 10 to 15 minutes late ("le quart d’heure de politesse") to allow the host to finish final preparations!',
    idiomSpotlight: {
      french: 'Être à l’heure',
      literal: 'To be at the hour',
      meaning: 'To be on time / punctual',
      example: 'Pour un entretien d’embauche, il faut impérativement être à l’heure.'
    },
    vocabulary: [
      {
        id: 'a1-19',
        french: 'aujourd’hui',
        english: 'today',
        ipa: '/o.ʒuʁ.dɥi/',
        partOfSpeech: 'adverb',
        exampleFrench: 'Quel jour sommes-nous aujourd’hui ?',
        exampleEnglish: 'What day is it today?',
        pronunciationTip: 'Semi-vowel /ɥ/ followed by /i/.',
        level: 'A1',
        category: 'Time'
      },
      {
        id: 'a1-20',
        french: 'maintenant',
        english: 'now / right now',
        ipa: '/mɛ̃t.nɑ̃/',
        partOfSpeech: 'adverb',
        exampleFrench: 'Nous devons partir maintenant.',
        exampleEnglish: 'We need to leave now.',
        pronunciationTip: 'Two different nasals: /ɛ̃/ (main-) and /ɑ̃/ (-nant).',
        level: 'A1',
        category: 'Time'
      },
      {
        id: 'a1-21',
        french: 'le matin',
        english: 'the morning',
        ipa: '/lə ma.tɛ̃/',
        gender: 'm',
        partOfSpeech: 'noun',
        exampleFrench: 'J’étudie le français chaque matin.',
        exampleEnglish: 'I study French every morning.',
        pronunciationTip: 'Nasal /ɛ̃/ on the second syllable.',
        level: 'A1',
        category: 'Time'
      },
      {
        id: 'a1-22',
        french: 'le soir',
        english: 'the evening',
        ipa: '/lə swaʁ/',
        gender: 'm',
        partOfSpeech: 'noun',
        exampleFrench: 'On se retrouve ce soir à vingt heures ?',
        exampleEnglish: 'Shall we meet tonight at 8 PM?',
        pronunciationTip: 'Diphthong /wa/ followed by uvular /ʁ/.',
        level: 'A1',
        category: 'Time'
      },
      {
        id: 'a1-23',
        french: 'à bientôt',
        english: 'see you soon',
        ipa: '/a bjɛ̃.to/',
        partOfSpeech: 'phrase',
        exampleFrench: 'Merci pour cette belle soirée, à bientôt !',
        exampleEnglish: 'Thank you for this lovely evening, see you soon!',
        pronunciationTip: 'Closed /o/ on "tôt", silent final "t".',
        level: 'A1',
        category: 'Greetings'
      },
      {
        id: 'a1-24',
        french: 'combien',
        english: 'how much / how many',
        ipa: '/kɔ̃.bjɛ̃/',
        partOfSpeech: 'phrase',
        exampleFrench: 'Combien coûte cette boîte de macarons ?',
        exampleEnglish: 'How much does this box of macarons cost?',
        pronunciationTip: 'Contrast nasal /ɔ̃/ and nasal /jɛ̃/.',
        level: 'A1',
        category: 'Numbers'
      }
    ],
    dialogue: {
      id: 'd-a1-4',
      title: 'Fixer un Rendez-vous',
      scenario: 'Arranging coffee time with a classmate',
      lines: [
        { speaker: 'Léo', french: 'Tu es libre aujourd’hui à seize heures ?', english: 'Are you free today at 4 PM?' },
        { speaker: 'Chloé', french: 'Non, mais je suis disponible ce soir vers dix-neuf heures.', english: 'No, but I am available tonight around 7 PM.' },
        { speaker: 'Léo', french: 'Parfait ! Devant le café des Arts ?', english: 'Perfect! In front of Café des Arts?' },
        { speaker: 'Chloé', french: 'Très bien, à ce soir !', english: 'Very well, see you tonight!' }
      ]
    }
  }
];

export const CEFR_METADATA: Record<CEFRLevel, { name: string; subtitle: string; color: string; badge: string }> = {
  A1: {
    name: 'Débutant (A1)',
    subtitle: 'Greetings, cafés, city navigation, numbers & time',
    color: 'from-emerald-500 to-teal-600',
    badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
  },
  A2: {
    name: 'Élémentaire (A2)',
    subtitle: 'Daily routine, travel, markets & describing people',
    color: 'from-blue-500 to-indigo-600',
    badge: 'bg-blue-500/20 text-blue-300 border-blue-500/30'
  },
  B1: {
    name: 'Intermédiaire (B1)',
    subtitle: 'Debates, business careers, gastronomy & mishaps',
    color: 'from-violet-500 to-purple-600',
    badge: 'bg-violet-500/20 text-violet-300 border-violet-500/30'
  },
  B2: {
    name: 'Intermédiaire Supérieur (B2)',
    subtitle: 'Pronouns Y/En, argot/verlan, ecology & media',
    color: 'from-amber-500 to-orange-600',
    badge: 'bg-amber-500/20 text-amber-300 border-amber-500/30'
  },
  C1: {
    name: 'Avancé / Maîtrise (C1)',
    subtitle: 'Philosophy, literary passé simple, diplomacy & nuance',
    color: 'from-rose-500 to-pink-600',
    badge: 'bg-rose-500/20 text-rose-300 border-rose-500/30'
  }
};

let cachedFullCurriculum: Lesson[] | null = null;
let pendingCurriculumPromise: Promise<Lesson[]> | null = null;

/**
 * Loads the complete A1-C1 curriculum dataset on-demand without blocking initial render.
 */
export async function loadFullCurriculumData(): Promise<Lesson[]> {
  if (cachedFullCurriculum) {
    return cachedFullCurriculum;
  }
  if (!pendingCurriculumPromise) {
    pendingCurriculumPromise = import('./curriculumData').then((mod) => {
      cachedFullCurriculum = mod.CURRICULUM_DATA;
      return mod.CURRICULUM_DATA;
    });
  }
  return pendingCurriculumPromise;
}
