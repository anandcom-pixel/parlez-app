import type { SentenceBuilderItem } from '../types';

export const SENTENCE_BUILDER_DATA: SentenceBuilderItem[] = [
  // ==================== LEVEL A1 ====================
  {
    id: 'sb-a1-1',
    level: 'A1',
    englishPrompt: 'I would like a coffee please.',
    frenchCorrect: 'Je voudrais un café s’il vous plaît',
    scrambledWords: ['café', 's’il', 'voudrais', 'plaît', 'Je', 'vous', 'un'],
    grammarHint: 'Polite conditional "Je voudrais" followed by noun phrase, ending with politeness formula.'
  },
  {
    id: 'sb-a1-2',
    level: 'A1',
    englishPrompt: 'Where is the central train station located?',
    frenchCorrect: 'Où se trouve la gare centrale',
    scrambledWords: ['la', 'se', 'Où', 'centrale', 'gare', 'trouve'],
    grammarHint: 'Interrogative adverb "Où" followed by reflexive verb "se trouve" and feminine subject.'
  },
  {
    id: 'sb-a1-3',
    level: 'A1',
    englishPrompt: 'We are very happy to meet you.',
    frenchCorrect: 'Nous sommes très heureux de vous rencontrer',
    scrambledWords: ['heureux', 'de', 'sommes', 'Nous', 'rencontrer', 'très', 'vous'],
    grammarHint: 'Subject pronoun + être conjugated + adjective + preposition "de" + object pronoun + infinitive.'
  },

  // ==================== LEVEL A2 ====================
  {
    id: 'sb-a2-1',
    level: 'A2',
    englishPrompt: 'I wake up at seven o’clock in the morning.',
    frenchCorrect: 'Je me réveille à sept heures du matin',
    scrambledWords: ['réveille', 'sept', 'du', 'Je', 'à', 'me', 'matin', 'heures'],
    grammarHint: 'Reflexive pronoun "me" must precede the conjugated verb "réveille".'
  },
  {
    id: 'sb-a2-2',
    level: 'A2',
    englishPrompt: 'She went to Nice for a week.',
    frenchCorrect: 'Elle est allée à Nice pendant une semaine',
    scrambledWords: ['une', 'allée', 'Nice', 'Elle', 'semaine', 'à', 'est', 'pendant'],
    grammarHint: 'Passé composé with "être": past participle "allée" agrees in feminine gender with "Elle".'
  },
  {
    id: 'sb-a2-3',
    level: 'A2',
    englishPrompt: 'We bought a kilo of fresh apples at the market.',
    frenchCorrect: 'Nous avons acheté un kilo de pommes fraîches',
    scrambledWords: ['fraîches', 'kilo', 'acheté', 'pommes', 'Nous', 'un', 'de', 'avons'],
    grammarHint: 'Exact quantity expressions use "de" without an article (un kilo de pommes).'
  },

  // ==================== LEVEL B1 ====================
  {
    id: 'sb-b1-1',
    level: 'B1',
    englishPrompt: 'It is necessary that we arrive on time for the meeting.',
    frenchCorrect: 'Il faut que nous arrivions à l’heure',
    scrambledWords: ['que', 'à', 'nous', 'Il', 'l’heure', 'arrivions', 'faut'],
    grammarHint: '"Il faut que" strictly triggers the subjunctive mood ("arrivions").'
  },
  {
    id: 'sb-b1-2',
    level: 'B1',
    englishPrompt: 'In my opinion, this proposal deserves in-depth consideration.',
    frenchCorrect: 'À mon avis cette proposition mérite une réflexion approfondie',
    scrambledWords: ['cette', 'avis', 'proposition', 'À', 'mérite', 'réflexion', 'mon', 'approfondie', 'une'],
    grammarHint: 'Opinion connector "À mon avis" followed by subject noun, verb, and feminine adjective.'
  },
  {
    id: 'sb-b1-3',
    level: 'B1',
    englishPrompt: 'If we had more time, we would travel more often.',
    frenchCorrect: 'Si nous avions plus de temps nous voyagerions plus souvent',
    scrambledWords: ['voyagerions', 'nous', 'de', 'temps', 'Si', 'avions', 'plus', 'souvent', 'plus', 'nous'],
    grammarHint: 'Hypothetical "Si" + Imparfait ("avions") followed by Conditionnel présent ("voyagerions").'
  },

  // ==================== LEVEL B2 ====================
  {
    id: 'sb-b2-1',
    level: 'B2',
    englishPrompt: 'Antoine gives it to him this morning.',
    frenchCorrect: 'Antoine le lui donne ce matin',
    scrambledWords: ['lui', 'ce', 'donne', 'matin', 'le', 'Antoine'],
    grammarHint: 'Double object pronoun order: direct pronoun "le" precedes indirect pronoun "lui".'
  },
  {
    id: 'sb-b2-2',
    level: 'B2',
    englishPrompt: 'I am going there tomorrow with great pleasure.',
    frenchCorrect: 'J’ y vais demain avec grand plaisir',
    scrambledWords: ['vais', 'y', 'demain', 'plaisir', 'J’', 'grand', 'avec'],
    grammarHint: 'Adverbial pronoun "y" replaces location and directly precedes conjugated verb "vais".'
  },
  {
    id: 'sb-b2-3',
    level: 'B2',
    englishPrompt: 'Although efforts are made, the crisis remains serious.',
    frenchCorrect: 'Bien que des efforts soient faits la crise reste grave',
    scrambledWords: ['la', 'soient', 'faits', 'crise', 'Bien', 'grave', 'que', 'des', 'reste', 'efforts'],
    grammarHint: '"Bien que" triggers the subjunctive ("soient faits").'
  },

  // ==================== LEVEL C1 ====================
  {
    id: 'sb-c1-1',
    level: 'C1',
    englishPrompt: 'Notwithstanding theoretical reservations, the experiment proves conclusive.',
    frenchCorrect: 'Nonobstant ces réserves l’expérience s’avère concluante',
    scrambledWords: ['l’expérience', 'ces', 'concluante', 'réserves', 'Nonobstant', 's’avère'],
    grammarHint: 'Elevated literary connector "Nonobstant" precedes noun phrase without preposition.'
  },
  {
    id: 'sb-c1-2',
    level: 'C1',
    englishPrompt: 'Scarcely had they arrived when the negotiations began.',
    frenchCorrect: 'À peine furent-ils arrivés que les négociations débutèrent',
    scrambledWords: ['furent-ils', 'les', 'débutèrent', 'que', 'arrivés', 'À', 'négociations', 'peine'],
    grammarHint: 'Inversion of subject after "À peine", combined with Passé Simple narrative tenses.'
  }
];
