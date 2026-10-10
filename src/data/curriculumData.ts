import type { Lesson, CEFRLevel } from '../types';

export const CURRICULUM_DATA: Lesson[] = [
  // ==========================================
  // LEVEL A1: BEGINNER (4 FULL MODULES)
  // ==========================================
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
  },

  // ==========================================
  // LEVEL A2: ELEMENTARY (4 FULL MODULES)
  // ==========================================
  {
    id: 'a2-lesson-1',
    level: 'A2',
    title: 'Routine Quotidienne & Verbes Pronominaux',
    subtitle: 'Daily Routines, Time & Reflexive Verbs',
    theme: 'Personal Habits',
    description: 'Learn how to describe your typical schedule, wake up times, and reflexive grooming actions in French.',
    grammarFocus: {
      ruleName: 'Reflexive Verbs (Verbes Pronominaux)',
      explanation: 'Reflexive verbs use pronouns (me, te, se, nous, vous, se) to show the subject performs an action on themselves.',
      examples: [
        { fr: 'Je me réveille à sept heures.', en: 'I wake up at seven o’clock.' },
        { fr: 'Elle se prépare pour partir.', en: 'She is getting ready to leave.' },
        { fr: 'Nous nous dépêchons.', en: 'We are hurrying.' }
      ]
    },
    culturalNote: 'The typical French workday lunch break ("la pause déjeuner") is traditionally respected, often lasting 45 minutes to an hour.',
    idiomSpotlight: {
      french: 'Avoir du pain sur la planche',
      literal: 'To have bread on the board',
      meaning: 'To have a lot on one’s plate / a lot of work to do',
      example: 'Aujourd’hui, j’ai beaucoup de pain sur la planche !'
    },
    vocabulary: [
      {
        id: 'a2-1',
        french: 'se réveiller',
        english: 'to wake up',
        ipa: '/sə ʁe.vɛ.je/',
        partOfSpeech: 'verb',
        exampleFrench: 'Je me réveille tôt pendant la semaine.',
        exampleEnglish: 'I wake up early during the week.',
        pronunciationTip: 'The "ill" sounds like the English "y" sound (/j/).',
        level: 'A2',
        category: 'Daily Routine'
      },
      {
        id: 'a2-2',
        french: 'se lever',
        english: 'to get out of bed / to rise',
        ipa: '/sə lə.ve/',
        partOfSpeech: 'verb',
        exampleFrench: 'Il se lève dès que le réveil sonne.',
        exampleEnglish: 'He gets up as soon as the alarm rings.',
        pronunciationTip: 'In the present tense: "je me lève" has a grave "è".',
        level: 'A2',
        category: 'Daily Routine'
      },
      {
        id: 'a2-3',
        french: 'prendre une douche',
        english: 'to take a shower',
        ipa: '/pʁɑ̃dʁ yn duʃ/',
        partOfSpeech: 'phrase',
        exampleFrench: 'Je prends une douche chaude avant le petit-déjeuner.',
        exampleEnglish: 'I take a hot shower before breakfast.',
        pronunciationTip: 'Soft "ch" pronounced like English "sh" (/ʃ/).',
        level: 'A2',
        category: 'Daily Routine'
      },
      {
        id: 'a2-4',
        french: 's’habiller',
        english: 'to get dressed',
        ipa: '/sa.bi.je/',
        partOfSpeech: 'verb',
        exampleFrench: 'Elle s’habille élégamment pour la soirée.',
        exampleEnglish: 'She dresses elegantly for the evening.',
        pronunciationTip: 'Liaison between "s’" and "habiller"; "h" is completely silent.',
        level: 'A2',
        category: 'Daily Routine'
      },
      {
        id: 'a2-5',
        french: 'd’habitude',
        english: 'usually / normally',
        ipa: '/da.bi.tyd/',
        partOfSpeech: 'adverb',
        exampleFrench: 'D’habitude, je prends le métro de 8h15.',
        exampleEnglish: 'Usually, I take the 8:15 subway.',
        pronunciationTip: 'U sound (/y/) pronounced with lips rounded like whistling.',
        level: 'A2',
        category: 'Frequency'
      },
      {
        id: 'a2-6',
        french: 'se coucher',
        english: 'to go to bed',
        ipa: '/sə ku.ʃe/',
        partOfSpeech: 'verb',
        exampleFrench: 'Nous nous couchons vers minuit.',
        exampleEnglish: 'We go to bed around midnight.',
        pronunciationTip: '"ou" is pronounced like "oo" in moon (/u/).',
        level: 'A2',
        category: 'Daily Routine'
      }
    ],
    dialogue: {
      id: 'd-a2-1',
      title: 'Une Journée Typique',
      scenario: 'Comparing morning schedules before work',
      lines: [
        { speaker: 'Léa', french: 'À quelle heure tu te réveilles d’habitude ?', english: 'What time do you usually wake up?' },
        { speaker: 'Julien', french: 'Vers six heures et demie. Je prends une douche et je m’habille vite.', english: 'Around six thirty. I take a shower and get dressed quickly.' },
        { speaker: 'Léa', french: 'Moi je préfère dormir plus tard, mais j’ai du pain sur la planche aujourd’hui !', english: 'I prefer to sleep later, but I have a lot on my plate today!' },
        { speaker: 'Julien', french: 'Alors dépêche-toi, le métro va arriver !', english: 'Then hurry up, the metro is coming!' }
      ]
    }
  },
  {
    id: 'a2-lesson-2',
    level: 'A2',
    title: 'Souvenirs & Passé Composé',
    subtitle: 'Narrating Past Events & Travel Adventures',
    theme: 'Narrative Past',
    description: 'Master the difference between auxiliary verbs "avoir" and "être" in the past tense.',
    grammarFocus: {
      ruleName: 'Passé Composé: Avoir vs Être',
      explanation: 'Most verbs use "avoir", but verbs of motion/change of state (DR MRS VANDERTRAMP) and reflexive verbs take "être" with past participle agreement.',
      examples: [
        { fr: 'J’ai visité le musée du Louvre.', en: 'I visited the Louvre museum.' },
        { fr: 'Elle est allée à Bordeaux.', en: 'She went to Bordeaux.' }
      ]
    },
    culturalNote: 'The TGV high-speed train revolutionized French regional travel, linking Paris to Lyon in under 2 hours and Marseille in 3 hours.',
    idiomSpotlight: {
      french: 'Poser un lapin',
      literal: 'To put down a rabbit',
      meaning: 'To stand someone up',
      example: 'Il n’est jamais venu au restaurant, il m’a posé un lapin !'
    },
    vocabulary: [
      {
        id: 'a2-7',
        french: 'hier',
        english: 'yesterday',
        ipa: '/jɛʁ/',
        partOfSpeech: 'adverb',
        exampleFrench: 'Hier soir, nous avons dîné au bord de la Seine.',
        exampleEnglish: 'Yesterday evening, we dined along the Seine.',
        pronunciationTip: 'Short single syllable starting with a glide /j/.',
        level: 'A2',
        category: 'Time'
      },
      {
        id: 'a2-8',
        french: 'un voyage',
        english: 'a trip / journey',
        ipa: '/œ̃ vwa.jaʒ/',
        gender: 'm',
        partOfSpeech: 'noun',
        exampleFrench: 'Notre voyage dans le sud de la France était inoubliable.',
        exampleEnglish: 'Our trip to the south of France was unforgettable.',
        pronunciationTip: 'Soft "ge" sound at the end (/ʒ/).',
        level: 'A2',
        category: 'Travel'
      },
      {
        id: 'a2-9',
        french: 'partir',
        english: 'to leave / to depart',
        ipa: '/paʁ.tiʁ/',
        partOfSpeech: 'verb',
        exampleFrench: 'Le train est parti à l’heure précise.',
        exampleEnglish: 'The train departed right on time.',
        pronunciationTip: 'Pronounce both crisp "r" sounds.',
        level: 'A2',
        category: 'Travel'
      },
      {
        id: 'a2-10',
        french: 'magnifique',
        english: 'magnificent / gorgeous',
        ipa: '/ma.ɲi.fik/',
        gender: 'none',
        partOfSpeech: 'adjective',
        exampleFrench: 'Le coucher de soleil était tout simplement magnifique.',
        exampleEnglish: 'The sunset was quite simply gorgeous.',
        pronunciationTip: '"gn" is pronounced like Spanish "ñ" or Italian "gn" (/ɲ/).',
        level: 'A2',
        category: 'Descriptions'
      },
      {
        id: 'a2-11',
        french: 'rencontrer',
        english: 'to meet / encounter',
        ipa: '/ʁɑ̃.kɔ̃.tʁe/',
        partOfSpeech: 'verb',
        exampleFrench: 'J’ai rencontré des gens formidables à Lyon.',
        exampleEnglish: 'I met wonderful people in Lyon.',
        pronunciationTip: 'Double nasal: /ɑ̃/ in "ren-" and /ɔ̃/ in "-con-".',
        level: 'A2',
        category: 'Social'
      },
      {
        id: 'a2-12',
        french: 'inoubliable',
        english: 'unforgettable',
        ipa: '/i.nu.bli.jabl/',
        partOfSpeech: 'adjective',
        exampleFrench: 'Ce concert était un souvenir inoubliable.',
        exampleEnglish: 'This concert was an unforgettable memory.',
        pronunciationTip: 'Clean transition from "in-" (/i/) to "-ou-".',
        level: 'A2',
        category: 'Descriptions'
      }
    ],
    dialogue: {
      id: 'd-a2-2',
      title: 'Retour de Vacances',
      scenario: 'Friends catching up after summer break',
      lines: [
        { speaker: 'Sophie', french: 'Alors Marc, comment s’est passé ton voyage ?', english: 'So Marc, how was your trip?' },
        { speaker: 'Marc', french: 'C’était magnifique ! Nous sommes partis à Nice pendant une semaine.', english: 'It was magnificent! We left for Nice for a week.' },
        { speaker: 'Sophie', french: 'Tu as rencontré des amis là-bas ?', english: 'Did you meet friends there?' },
        { speaker: 'Marc', french: 'Oui, et nous avons passé des moments inoubliables.', english: 'Yes, and we spent unforgettable moments.' }
      ]
    }
  },
  {
    id: 'a2-lesson-3',
    level: 'A2',
    title: 'Au Marché & Les Courses',
    subtitle: 'Quantities, Partitive Articles & Market Shopping',
    theme: 'Food & Quantities',
    description: 'Learn how to shop at traditional French open-air markets and express exact food quantities.',
    grammarFocus: {
      ruleName: 'Articles Partitifs: Du, De la, Des & Un kilo de',
      explanation: 'Use partitives ("du pain", "de la viande") for unspecified quantities. When an exact unit or quantity is stated (kilo, litre, beaucoup), use simply "de" / "d’".',
      examples: [
        { fr: 'Je voudrais un kilo de pommes.', en: 'I would like a kilo of apples.' },
        { fr: 'Il mange du fromage avec du pain.', en: 'He eats cheese with bread.' }
      ]
    },
    culturalNote: 'Open-air food markets ("les marchés de quartier") happen weekly throughout French cities and towns, emphasizing local fresh produce and seasonal ingredients.',
    idiomSpotlight: {
      french: 'C’est la fin des haricots',
      literal: 'It is the end of the beans',
      meaning: 'There is no hope left / It’s all over',
      example: 'Si le marché est fermé, c’est la fin des haricots pour le dîner !'
    },
    vocabulary: [
      {
        id: 'a2-13',
        french: 'le marché',
        english: 'the open-air market',
        ipa: '/lə maʁ.ʃe/',
        gender: 'm',
        partOfSpeech: 'noun',
        exampleFrench: 'Nous allons au marché tous les samedis matin.',
        exampleEnglish: 'We go to the market every Saturday morning.',
        pronunciationTip: 'Soft /ʃ/ sound, open /e/.',
        level: 'A2',
        category: 'Shopping'
      },
      {
        id: 'a2-14',
        french: 'un morceau',
        english: 'a piece / chunk',
        ipa: '/œ̃ mɔʁ.so/',
        gender: 'm',
        partOfSpeech: 'noun',
        exampleFrench: 'Je prendrai un bon morceau de Comté bien affiné.',
        exampleEnglish: 'I will take a good chunk of well-aged Comté cheese.',
        pronunciationTip: 'Ends with round /o/ sound.',
        level: 'A2',
        category: 'Food'
      },
      {
        id: 'a2-15',
        french: 'frais',
        english: 'fresh / cool',
        ipa: '/fʁɛ/',
        gender: 'm',
        partOfSpeech: 'adjective',
        exampleFrench: 'Ces légumes sont très frais et cultivés localement.',
        exampleEnglish: 'These vegetables are very fresh and grown locally.',
        pronunciationTip: 'Silent final "s". Feminine form is "fraîche" (/fʁɛʃ/).',
        level: 'A2',
        category: 'Food'
      },
      {
        id: 'a2-16',
        french: 'coûter',
        english: 'to cost',
        ipa: '/ku.te/',
        partOfSpeech: 'verb',
        exampleFrench: 'Combien coûte cette barquette de fraises ?',
        exampleEnglish: 'How much does this punnet of strawberries cost?',
        pronunciationTip: 'Circumflex "û" preserves long /u/.',
        level: 'A2',
        category: 'Shopping'
      },
      {
        id: 'a2-17',
        french: 'choisir',
        english: 'to choose / select',
        ipa: '/ʃwa.ziʁ/',
        partOfSpeech: 'verb',
        exampleFrench: 'Laissez-moi choisir les pêches les plus mûres.',
        exampleEnglish: 'Let me choose the ripest peaches.',
        pronunciationTip: 'Notice the voiced /z/ between two vowels.',
        level: 'A2',
        category: 'Shopping'
      },
      {
        id: 'a2-18',
        french: 'ce sera tout',
        english: 'that will be all',
        ipa: '/sə sə.ʁa tu/',
        partOfSpeech: 'phrase',
        exampleFrench: 'Merci monsieur, ce sera tout pour aujourd’hui.',
        exampleEnglish: 'Thank you sir, that will be all for today.',
        pronunciationTip: 'Silent "t" on "tout".',
        level: 'A2',
        category: 'Shopping'
      }
    ],
    dialogue: {
      id: 'd-a2-3',
      title: 'Au Stand du Fromager',
      scenario: 'Buying cheese at the Bastille open market',
      lines: [
        { speaker: 'Marchand', french: 'Bonjour madame ! Que puis-je vous servir ?', english: 'Hello madam! What can I get for you?' },
        { speaker: 'Cliente', french: 'Je voudrais un morceau de chèvre frais et deux cents grammes d’emmental.', english: 'I would like a piece of fresh goat cheese and 200g of emmental.' },
        { speaker: 'Marchand', french: 'Et avec ceci, ce sera tout ?', english: 'And with this, will that be all?' },
        { speaker: 'Cliente', french: 'Oui, ce sera tout. Combien je vous dois ?', english: 'Yes, that will be all. How much do I owe you?' }
      ]
    }
  },
  {
    id: 'a2-lesson-4',
    level: 'A2',
    title: 'Décrire Quelqu’un & Personnalité',
    subtitle: 'Physical Description, Character & Adjective Placement',
    theme: 'People & Traits',
    description: 'Learn how to describe people’s physical appearances, clothing styles, and personality traits.',
    grammarFocus: {
      ruleName: 'BANGS Rule: Placement of Adjectives',
      explanation: 'Most French adjectives go AFTER the noun, except for BANGS: Beauty, Age, Number, Goodness, and Size (e.g. "une belle maison", "un grand homme").',
      examples: [
        { fr: 'C’est un jeune homme très intelligent.', en: 'He is a very intelligent young man.' },
        { fr: 'Elle a les yeux bleus et les cheveux bruns.', en: 'She has blue eyes and brown hair.' }
      ]
    },
    culturalNote: 'In France, complimenting someone on being "cultivé" (well-read) or "drôle" (witty) is often prized above generic superficial flattery.',
    idiomSpotlight: {
      french: 'Avoir le cœur sur la main',
      literal: 'To have the heart on the hand',
      meaning: 'To be extremely generous and kind-hearted',
      example: 'Antoine aide toujours tout le monde, il a le cœur sur la main.'
    },
    vocabulary: [
      {
        id: 'a2-19',
        french: 'sympathique',
        english: 'friendly / likable (sympa)',
        ipa: '/sɛ̃.pa.tik/',
        partOfSpeech: 'adjective',
        exampleFrench: 'Notre nouvelle collègue est particulièrement sympathique.',
        exampleEnglish: 'Our new colleague is particularly friendly.',
        pronunciationTip: 'Shortened conversationally to "sympa" (/sɛ̃.pa/).',
        level: 'A2',
        category: 'Personality'
      },
      {
        id: 'a2-20',
        french: 'drôle',
        english: 'funny / amusing',
        ipa: '/dʁol/',
        partOfSpeech: 'adjective',
        exampleFrench: 'Il raconte toujours des histoires très drôles.',
        exampleEnglish: 'He always tells very funny stories.',
        pronunciationTip: 'Long round /o/ vowel due to circumflex.',
        level: 'A2',
        category: 'Personality'
      },
      {
        id: 'a2-21',
        french: 'travailleur',
        english: 'hardworking',
        ipa: '/tʁa.va.jœʁ/',
        gender: 'm',
        partOfSpeech: 'adjective',
        exampleFrench: 'C’est un étudiant travailleur et consciencieux.',
        exampleEnglish: 'He is a hardworking and conscientious student.',
        pronunciationTip: 'Feminine is "travailleuse" (/tʁa.va.jøz/).',
        level: 'A2',
        category: 'Personality'
      },
      {
        id: 'a2-22',
        french: 'souriant',
        english: 'smiling / cheerful',
        ipa: '/su.ʁjɑ̃/',
        gender: 'm',
        partOfSpeech: 'adjective',
        exampleFrench: 'Elle est toujours souriante et chaleureuse.',
        exampleEnglish: 'She is always smiling and warm.',
        pronunciationTip: 'Silent final "t" in masculine; pronounced in feminine (souriante).',
        level: 'A2',
        category: 'Personality'
      },
      {
        id: 'a2-23',
        french: 'la taille',
        english: 'height / size',
        ipa: '/la taj/',
        gender: 'f',
        partOfSpeech: 'noun',
        exampleFrench: 'Il est de taille moyenne mais très athlétique.',
        exampleEnglish: 'He is of average height but very athletic.',
        pronunciationTip: 'Ends in the palatal approximant /j/.',
        level: 'A2',
        category: 'Appearance'
      },
      {
        id: 'a2-24',
        french: 'chaleureux',
        english: 'warm / welcoming',
        ipa: '/ʃa.lœ.ʁø/',
        gender: 'm',
        partOfSpeech: 'adjective',
        exampleFrench: 'Ils nous ont réservé un accueil très chaleureux.',
        exampleEnglish: 'They gave us a very warm welcome.',
        pronunciationTip: 'Feminine is "chaleureuse" (/ʃa.lœ.ʁøz/).',
        level: 'A2',
        category: 'Personality'
      }
    ],
    dialogue: {
      id: 'd-a2-4',
      title: 'Présentation d’un Nouvel Ami',
      scenario: 'Describing a new roommate to family',
      lines: [
        { speaker: 'Hugo', french: 'Comment est ton nouveau colocataire ?', english: 'What is your new roommate like?' },
        { speaker: 'Manon', french: 'Il est très sympa et drôle, et il a le cœur sur la main !', english: 'He is very friendly and funny, and he is so generous!' },
        { speaker: 'Hugo', french: 'Et il est travailleur ?', english: 'And is he hardworking?' },
        { speaker: 'Manon', french: 'Oui, et surtout très respectueux.', english: 'Yes, and above all very respectful.' }
      ]
    }
  },

  // ==========================================
  // LEVEL B1: INTERMEDIATE (4 FULL MODULES)
  // ==========================================
  {
    id: 'b1-lesson-1',
    level: 'B1',
    title: 'Débats & Expression de l’Opinion',
    subtitle: 'Nuanced Arguments & Introduction to the Subjunctive',
    theme: 'Debate & Opinion',
    description: 'Learn how to agree, disagree diplomatically, and trigger the subjunctive mood when expressing necessity or emotion.',
    grammarFocus: {
      ruleName: 'Indicatif vs. Subjonctif',
      explanation: 'Verbs of certainty (croire que, penser que) take the indicative in positive sentences. Verbs of necessity, doubt, or subjective will (il faut que, douter que) trigger the subjunctive.',
      examples: [
        { fr: 'Je pense qu’il a raison. (Indicatif)', en: 'I think he is right. (Certainty)' },
        { fr: 'Il faut que nous fassions un effort. (Subjonctif)', en: 'It is necessary that we make an effort. (Obligation)' }
      ]
    },
    culturalNote: 'Debating ideas passionately over dinner ("refaire le monde") is practically a national pastime in France, valued as an intellectual sport rather than personal conflict.',
    idiomSpotlight: {
      french: 'Mettre les pieds dans le plat',
      literal: 'To put one’s feet in the dish',
      meaning: 'To put one’s foot in one’s mouth / bring up an awkward topic clumsily',
      example: 'En parlant d’héritage, il a vraiment mis les pieds dans le plat !'
    },
    vocabulary: [
      {
        id: 'b1-1',
        french: 'à mon avis',
        english: 'in my opinion',
        ipa: '/a mɔ̃.n‿a.vi/',
        partOfSpeech: 'phrase',
        exampleFrench: 'À mon avis, cette proposition mérite une réflexion approfondie.',
        exampleEnglish: 'In my opinion, this proposal deserves in-depth consideration.',
        pronunciationTip: 'Obligatory liaison: "mon(n)-avis".',
        level: 'B1',
        category: 'Opinion'
      },
      {
        id: 'b1-2',
        french: 'il faut que',
        english: 'it is necessary that / one must',
        ipa: '/il fo kə/',
        partOfSpeech: 'phrase',
        exampleFrench: 'Il faut que vous soyez ponctuels à la réunion.',
        exampleEnglish: 'It is necessary that you be punctual for the meeting.',
        pronunciationTip: 'Always triggers the subjunctive mood in the next clause.',
        level: 'B1',
        category: 'Grammar Triggers'
      },
      {
        id: 'b1-3',
        french: 'néanmoins',
        english: 'nevertheless / nonetheless',
        ipa: '/ne.ɑ̃.mwɛ̃/',
        partOfSpeech: 'adverb',
        exampleFrench: 'Le projet est ambitieux ; néanmoins, il comporte des risques.',
        exampleEnglish: 'The project is ambitious; nevertheless, it carries risks.',
        pronunciationTip: 'Ends with the nasal "in" sound (/mwɛ̃/).',
        level: 'B1',
        category: 'Transitions'
      },
      {
        id: 'b1-4',
        french: 'partager un avis',
        english: 'to share an opinion / to agree',
        ipa: '/paʁ.ta.ʒe œ̃.n‿a.vi/',
        partOfSpeech: 'phrase',
        exampleFrench: 'Je ne partage pas tout à fait votre point de vue.',
        exampleEnglish: 'I do not entirely share your point of view.',
        pronunciationTip: 'Liaison "un(n)-avis".',
        level: 'B1',
        category: 'Opinion'
      },
      {
        id: 'b1-5',
        french: 'convaincre',
        english: 'to convince / persuade',
        ipa: '/kɔ̃.vɛ̃kʁ/',
        partOfSpeech: 'verb',
        exampleFrench: 'Ses arguments solides ont fini par convaincre l’auditoire.',
        exampleEnglish: 'His solid arguments ended up convincing the audience.',
        pronunciationTip: 'Double nasal: /ɔ̃/ and /ɛ̃/. End with crisp "cre".',
        level: 'B1',
        category: 'Rhetoric'
      },
      {
        id: 'b1-6',
        french: 'un compromis',
        english: 'a compromise',
        ipa: '/œ̃ kɔ̃.pʁɔ.mi/',
        gender: 'm',
        partOfSpeech: 'noun',
        exampleFrench: 'Nous devons trouver un compromis acceptable pour chacun.',
        exampleEnglish: 'We need to find an acceptable compromise for everyone.',
        pronunciationTip: 'Silent final "s".',
        level: 'B1',
        category: 'Debate'
      }
    ],
    dialogue: {
      id: 'd-b1-1',
      title: 'Débat Stratégique',
      scenario: 'Colleagues discussing a project direction',
      lines: [
        { speaker: 'Élise', french: 'À mon avis, cette solution est trop coûteuse.', english: 'In my opinion, this solution is too costly.' },
        { speaker: 'Laurent', french: 'Je comprends, néanmoins il faut que nous respections les délais fixés.', english: 'I understand, nevertheless we must respect the fixed deadlines.' },
        { speaker: 'Élise', french: 'Je partage votre souci d’efficacité, mais trouvons un juste compromis.', english: 'I share your concern for efficiency, but let’s find a fair compromise.' },
        { speaker: 'Laurent', french: 'D’accord, voyons comment ajuster les priorités.', english: 'Agreed, let’s see how to adjust priorities.' }
      ]
    }
  },
  {
    id: 'b1-lesson-2',
    level: 'B1',
    title: 'Monde Professionnel & Entretien d’Embauche',
    subtitle: 'Professional French, Resumes & Job Interviews',
    theme: 'Business & Career',
    description: 'Learn how to present your skills, career goals, and professional background in formal French.',
    grammarFocus: {
      ruleName: 'Le Conditionnel Présent de Politesse',
      explanation: 'Use the conditional form (j’aimerais, je souhaiterais, pourriez-vous) to sound courteous and deferential in professional inquiries.',
      examples: [
        { fr: 'J’aimerais vous présenter mes compétences en gestion.', en: 'I would like to present my management skills.' },
        { fr: 'Pourriez-vous me préciser les missions principales ?', en: 'Could you specify the main responsibilities?' }
      ]
    },
    culturalNote: 'In French CVs, precision and modesty are valued; overly boastful claims ("over-selling") are viewed skeptically compared to concrete facts and diplomas.',
    idiomSpotlight: {
      french: 'Avoir plusieurs cordes à son arc',
      literal: 'To have several strings to one’s bow',
      meaning: 'To have multiple versatile skills',
      example: 'Grâce à sa double formation, elle a plusieurs cordes à son arc.'
    },
    vocabulary: [
      {
        id: 'b1-7',
        french: 'un entretien d’embauche',
        english: 'a job interview',
        ipa: '/œ̃.n‿ɑ̃.tʁə.tjɛ̃ dɑ̃.boʃ/',
        gender: 'm',
        partOfSpeech: 'noun',
        exampleFrench: 'J’ai préparé mon entretien d’embauche avec soin.',
        exampleEnglish: 'I prepared my job interview carefully.',
        pronunciationTip: 'Liaison "un(n)-entretien".',
        level: 'B1',
        category: 'Career'
      },
      {
        id: 'b1-8',
        french: 'une compétence',
        english: 'a skill / competence',
        ipa: '/yn kɔ̃.pe.tɑ̃s/',
        gender: 'f',
        partOfSpeech: 'noun',
        exampleFrench: 'La maîtrise de trois langues est une compétence clé.',
        exampleEnglish: 'Fluency in three languages is a key skill.',
        pronunciationTip: 'Ends in crisp consonant /s/.',
        level: 'B1',
        category: 'Career'
      },
      {
        id: 'b1-9',
        french: 'postuler',
        english: 'to apply for a job',
        ipa: '/pɔs.ty.le/',
        partOfSpeech: 'verb',
        exampleFrench: 'Je souhaite postuler pour le poste de chef de projet.',
        exampleEnglish: 'I wish to apply for the project manager position.',
        pronunciationTip: 'Clean rounded /y/ vowel in "-tu-".',
        level: 'B1',
        category: 'Career'
      },
      {
        id: 'b1-10',
        french: 'polyvalent',
        english: 'versatile / multi-skilled',
        ipa: '/pɔ.li.va.lɑ̃/',
        gender: 'm',
        partOfSpeech: 'adjective',
        exampleFrench: 'Notre équipe a besoin d’un collaborateur polyvalent.',
        exampleEnglish: 'Our team needs a versatile team member.',
        pronunciationTip: 'Nasal ending /lɑ̃/.',
        level: 'B1',
        category: 'Career'
      },
      {
        id: 'b1-11',
        french: 'une rémunération',
        english: 'salary / compensation',
        ipa: '/yn ʁe.my.ne.ʁa.sjɔ̃/',
        gender: 'f',
        partOfSpeech: 'noun',
        exampleFrench: 'Le contrat prévoit une rémunération attractive avec primes.',
        exampleEnglish: 'The contract provides attractive compensation with bonuses.',
        pronunciationTip: 'Watch out: in French it is "ré-mu-né-ra-tion" (not "rémuné").',
        level: 'B1',
        category: 'Career'
      },
      {
        id: 'b1-12',
        french: 'relever un défi',
        english: 'to take up a challenge',
        ipa: '/ʁəl.ve œ̃ de.fi/',
        partOfSpeech: 'phrase',
        exampleFrench: 'Je suis très motivé à l’idée de relever ce nouveau défi.',
        exampleEnglish: 'I am very motivated to take up this new challenge.',
        pronunciationTip: 'Smooth elision on "relever".',
        level: 'B1',
        category: 'Career'
      }
    ],
    dialogue: {
      id: 'd-b1-2',
      title: 'Entretien avec la Directrice RH',
      scenario: 'Candidate explaining their experience',
      lines: [
        { speaker: 'Recruteuse', french: 'Pourquoi avez-vous choisi de postuler chez nous ?', english: 'Why did you choose to apply to our company?' },
        { speaker: 'Candidat', french: 'Parce que votre entreprise valorise l’innovation, et je souhaite relever de nouveaux défis.', english: 'Because your company values innovation, and I want to take up new challenges.' },
        { speaker: 'Recruteuse', french: 'Quelles sont vos compétences principales ?', english: 'What are your main skills?' },
        { speaker: 'Candidat', french: 'Je suis très polyvalent et j’ai une grande expérience en gestion de projet.', english: 'I am very versatile and have extensive experience in project management.' }
      ]
    }
  },
  {
    id: 'b1-lesson-3',
    level: 'B1',
    title: 'Gastronomie, Terroirs & Débats Culinaires',
    subtitle: 'Culinary Heritage, Appellations & Food Culture',
    theme: 'Culture & Gastronomy',
    description: 'Explore the vocabulary of French culinary critique, regional PDO products, and defending food traditions.',
    grammarFocus: {
      ruleName: 'Comparatives & Superlatives (Plus que, Autant que)',
      explanation: 'Use "plus... que" (more than), "moins... que" (less than), and "aussi... que" (as... as) for adjectives; "autant de... que" for nouns.',
      examples: [
        { fr: 'Ce vin est meilleur que le précédent.', en: 'This wine is better than the previous one.' },
        { fr: 'Cette recette a autant de saveurs que l’originale.', en: 'This recipe has as much flavor as the original.' }
      ]
    },
    culturalNote: 'The "Gastronomic Meal of the French" was inscribed by UNESCO on the Representative List of the Intangible Cultural Heritage of Humanity in 2010.',
    idiomSpotlight: {
      french: 'En faire tout un fromage',
      literal: 'To make a whole cheese out of it',
      meaning: 'To make a huge fuss out of something minor',
      example: 'Ce n’est qu’un petit retard, pas la peine d’en faire tout un fromage !'
    },
    vocabulary: [
      {
        id: 'b1-13',
        french: 'le terroir',
        english: 'local soil / regional culinary heritage',
        ipa: '/lə tɛ.ʁwaʁ/',
        gender: 'm',
        partOfSpeech: 'noun',
        exampleFrench: 'Ce fromage reflète l’authenticité de son terroir d’origine.',
        exampleEnglish: 'This cheese reflects the authenticity of its regional terroir.',
        pronunciationTip: 'Strong guttural "r" in both syllables.',
        level: 'B1',
        category: 'Gastronomy'
      },
      {
        id: 'b1-14',
        french: 'savoureux',
        english: 'flavorful / tasty',
        ipa: '/sa.vu.ʁø/',
        gender: 'm',
        partOfSpeech: 'adjective',
        exampleFrench: 'Ce plat mijoté est particulièrement savoureux.',
        exampleEnglish: 'This slow-cooked dish is particularly flavorful.',
        pronunciationTip: 'Feminine is "savoureuse" (/sa.vu.ʁøz/).',
        level: 'B1',
        category: 'Gastronomy'
      },
      {
        id: 'b1-15',
        french: 'une appellation',
        english: 'a protected designation / label (AOC/AOP)',
        ipa: '/yn a.pɛ.la.sjɔ̃/',
        gender: 'f',
        partOfSpeech: 'noun',
        exampleFrench: 'Le champagne bénéficie d’une appellation d’origine contrôlée.',
        exampleEnglish: 'Champagne benefits from a controlled designation of origin.',
        pronunciationTip: 'Clean double "l" sound followed by /a/.',
        level: 'B1',
        category: 'Gastronomy'
      },
      {
        id: 'b1-16',
        french: 'déguster',
        english: 'to taste / savor / sample',
        ipa: '/de.ɡys.te/',
        partOfSpeech: 'verb',
        exampleFrench: 'Prenons le temps de déguster ce millésime exceptionnel.',
        exampleEnglish: 'Let us take the time to savor this exceptional vintage.',
        pronunciationTip: 'Rounded /y/ in the second syllable.',
        level: 'B1',
        category: 'Gastronomy'
      },
      {
        id: 'b1-17',
        french: 'un assaisonnement',
        english: 'seasoning / dressing',
        ipa: '/œ̃.n‿a.sɛ.zɔn.mɑ̃/',
        gender: 'm',
        partOfSpeech: 'noun',
        exampleFrench: 'L’assaisonnement de cette salade est parfaitement équilibré.',
        exampleEnglish: 'The seasoning of this salad is perfectly balanced.',
        pronunciationTip: 'Smooth pronunciation of four syllables ending in /mɑ̃/.',
        level: 'B1',
        category: 'Gastronomy'
      },
      {
        id: 'b1-18',
        french: 'faisandé',
        english: 'gamey / hung / aged (meat)',
        ipa: '/fɛ.zɑ̃.de/',
        gender: 'm',
        partOfSpeech: 'adjective',
        exampleFrench: 'Le gibier a un goût faisandé très prononcé.',
        exampleEnglish: 'The game meat has a very pronounced aged flavor.',
        pronunciationTip: 'Voiced /z/ followed by nasal /ɑ̃/.',
        level: 'B1',
        category: 'Gastronomy'
      }
    ],
    dialogue: {
      id: 'd-b1-3',
      title: 'Dégustation chez le Sommelier',
      scenario: 'Discussing wine and cheese pairings',
      lines: [
        { speaker: 'Sommelier', french: 'Voici un rouge de la vallée du Rhône, parfait pour ce fromage.', english: 'Here is a Rhône Valley red, perfect for this cheese.' },
        { speaker: 'Client', french: 'Il est très savoureux ! Il a plus de corps que le vin précédent.', english: 'It is very flavorful! It has more body than the previous wine.' },
        { speaker: 'Sommelier', french: 'Exactement, le terroir donne des tanins soyeux et profonds.', english: 'Exactly, the terroir yields silky, deep tannins.' },
        { speaker: 'Client', french: 'C’est une découverte magnifique, bravo !', english: 'It is a wonderful discovery, bravo!' }
      ]
    }
  },
  {
    id: 'b1-lesson-4',
    level: 'B1',
    title: 'Mésaventures & Résolution de Problèmes',
    subtitle: 'Complaints, Problem Solving & Polite Negotiation',
    theme: 'Conflict Resolution',
    description: 'Learn how to handle unexpected travel mishaps, hotel complaints, and renegotiate arrangements politely.',
    grammarFocus: {
      ruleName: 'Si Clauses: Si + Imparfait -> Conditionnel',
      explanation: 'Use "Si" + Imparfait to describe hypothetical situations, followed by the Conditional present in the main clause.',
      examples: [
        { fr: 'Si vous changiez de chambre, seriez-vous satisfait ?', en: 'If you changed rooms, would you be satisfied?' },
        { fr: 'Si nous avions le choix, nous partirions plus tôt.', en: 'If we had the choice, we would leave earlier.' }
      ]
    },
    culturalNote: 'In French customer service culture, staying calm, acknowledging the staff with polite titles ("Monsieur", "Madame"), and quoting booking confirmations yields much better results than anger.',
    idiomSpotlight: {
      french: 'Tomber de Charybde en Scylla',
      literal: 'To fall from Charybdis into Scylla',
      meaning: 'To go from bad to worse / out of the frying pan into the fire',
      example: 'Après la panne de train, la crevaison du taxi : on est tombé de Charybde en Scylla !'
    },
    vocabulary: [
      {
        id: 'b1-19',
        french: 'un imprévu',
        english: 'an unexpected event / snag',
        ipa: '/œ̃.n‿ɛ̃.pʁe.vy/',
        gender: 'm',
        partOfSpeech: 'noun',
        exampleFrench: 'En raison d’un imprévu, notre vol a été décalé de trois heures.',
        exampleEnglish: 'Due to an unexpected snag, our flight was delayed by three hours.',
        pronunciationTip: 'Ends with rounded /y/.',
        level: 'B1',
        category: 'Travel'
      },
      {
        id: 'b1-20',
        french: 'réclamer',
        english: 'to claim / demand / complain',
        ipa: '/ʁe.kla.me/',
        partOfSpeech: 'verb',
        exampleFrench: 'Je souhaite réclamer un remboursement intégral pour ce désagrément.',
        exampleEnglish: 'I wish to claim a full refund for this inconvenience.',
        pronunciationTip: 'Crisp acute /e/ at the start.',
        level: 'B1',
        category: 'Negotiation'
      },
      {
        id: 'b1-21',
        french: 'un dédommagement',
        english: 'compensation / indemnification',
        ipa: '/œ̃ de.dɔ.maʒ.mɑ̃/',
        gender: 'm',
        partOfSpeech: 'noun',
        exampleFrench: 'La compagnie aérienne a proposé un dédommagement financier.',
        exampleEnglish: 'The airline offered financial compensation.',
        pronunciationTip: 'Four smooth syllables ending in /mɑ̃/.',
        level: 'B1',
        category: 'Negotiation'
      },
      {
        id: 'b1-22',
        french: 'défectueux',
        english: 'faulty / defective',
        ipa: '/de.fɛk.tɥø/',
        gender: 'm',
        partOfSpeech: 'adjective',
        exampleFrench: 'La climatisation de la chambre est totalement défectueuse.',
        exampleEnglish: 'The room’s air conditioning is completely defective.',
        pronunciationTip: 'Silent final "x". Round lips for /ø/.',
        level: 'B1',
        category: 'Complaints'
      },
      {
        id: 'b1-23',
        french: 's’arranger',
        english: 'to work out / be resolved',
        ipa: '/sa.ʁɑ̃.ʒe/',
        partOfSpeech: 'verb',
        exampleFrench: 'Ne vous inquiétez pas, la situation va vite s’arranger.',
        exampleEnglish: 'Do not worry, the situation will quickly work out.',
        pronunciationTip: 'Reflexive verb with soft /ʒ/.',
        level: 'B1',
        category: 'Resolution'
      },
      {
        id: 'b1-24',
        french: 'inadmissible',
        english: 'unacceptable / intolerable',
        ipa: '/i.nad.mi.sibl/',
        gender: 'none',
        partOfSpeech: 'adjective',
        exampleFrench: 'Un tel manque de professionnalisme est tout simplement inadmissible.',
        exampleEnglish: 'Such a lack of professionalism is simply unacceptable.',
        pronunciationTip: 'Crisp dental /t/ and voiced /d/.',
        level: 'B1',
        category: 'Complaints'
      }
    ],
    dialogue: {
      id: 'd-b1-4',
      title: 'À la Réception de l’Hôtel',
      scenario: 'Dealing with a room issue politely but firmly',
      lines: [
        { speaker: 'Client', french: 'Bonsoir monsieur, la climatisation de ma chambre est défectueuse.', english: 'Good evening sir, the air conditioning in my room is faulty.' },
        { speaker: 'Réceptionniste', french: 'Toutes nos excuses pour cet imprévu. Je vais voir comment nous pouvons nous arranger.', english: 'All our apologies for this snag. I will see how we can work this out.' },
        { speaker: 'Client', french: 'Si vous aviez une autre chambre disponible, j’aimerais changer ce soir.', english: 'If you had another room available, I would like to change tonight.' },
        { speaker: 'Réceptionniste', french: 'Certainement, je vous surclasse immédiatement dans une suite au calme.', english: 'Certainly, I am upgrading you immediately to a quiet suite.' }
      ]
    }
  },

  // ==========================================
  // LEVEL B2: UPPER INTERMEDIATE (4 FULL MODULES)
  // ==========================================
  {
    id: 'b2-lesson-1',
    level: 'B2',
    title: 'Nuance & Pronoms Complexes (Y et En)',
    subtitle: 'Mastering Pronouns Y & En with Fluidity',
    theme: 'Linguistic Mastery',
    description: 'Conquer the most feared pronouns in French: "y" (places and "à + thing") and "en" (quantities and "de + thing").',
    grammarFocus: {
      ruleName: 'Pronoms Compléments: Y et En',
      explanation: '"Y" replaces [à / dans / chez + place] or [penser à + object]. "En" replaces [de / du / des + noun] or indicates quantity ("j’en ai trois").',
      examples: [
        { fr: 'Tu vas à Paris ? — Oui, j’y vais demain.', en: 'Are you going to Paris? — Yes, I am going there tomorrow.' },
        { fr: 'Tu veux du fromage ? — Oui, j’en veux un peu.', en: 'Do you want cheese? — Yes, I want some.' },
        { fr: 'Il s’en va.', en: 'He is leaving (going away).' }
      ]
    },
    culturalNote: 'Mastering "y" and "en" is considered the turning point where French ceases to sound like translated English and sounds naturally idiomatic.',
    idiomSpotlight: {
      french: 'En avoir ras-le-bol',
      literal: 'To have the bowl full to the brim',
      meaning: 'To be completely fed up',
      example: 'J’en ai ras-le-bol des retards de train !'
    },
    vocabulary: [
      {
        id: 'b2-1',
        french: 's’y prendre',
        english: 'to go about something / to tackle a task',
        ipa: '/si pʁɑ̃dʁ/',
        partOfSpeech: 'expression',
        exampleFrench: 'Comment vas-tu t’y prendre pour résoudre ce casse-tête ?',
        exampleEnglish: 'How are you going to go about solving this brain teaser?',
        pronunciationTip: 'Contracted reflexive "s’y" pronounced smoothly as /si/.',
        level: 'B2',
        category: 'Idiomatic Verbs'
      },
      {
        id: 'b2-2',
        french: 's’en sortir',
        english: 'to pull through / manage / succeed',
        ipa: '/sɑ̃ sɔʁ.tiʁ/',
        partOfSpeech: 'expression',
        exampleFrench: 'Malgré les difficultés techniques, elle s’en est très bien sortie.',
        exampleEnglish: 'Despite technical difficulties, she pulled through very well.',
        pronunciationTip: 'Nasal "en" (/sɑ̃/) followed by crisp "s".',
        level: 'B2',
        category: 'Idiomatic Verbs'
      },
      {
        id: 'b2-3',
        french: 'd’ailleurs',
        english: 'moreover / besides / by the way',
        ipa: '/da.jœʁ/',
        partOfSpeech: 'adverb',
        exampleFrench: 'C’est une excellente initiative ; d’ailleurs, le directeur l’approuve.',
        exampleEnglish: 'It is an excellent initiative; moreover, the director approves.',
        pronunciationTip: 'Pronounce the "eu" vowel with an open sound (/œʁ/).',
        level: 'B2',
        category: 'Discourse Markers'
      },
      {
        id: 'b2-4',
        french: 'incontournable',
        english: 'unmissable / unavoidable / essential',
        ipa: '/ɛ̃.kɔ̃.tuʁ.nabl/',
        partOfSpeech: 'adjective',
        exampleFrench: 'Ce musée est une étape incontournable lors d’une visite à Paris.',
        exampleEnglish: 'This museum is an essential stop during a visit to Paris.',
        pronunciationTip: 'Triple syllables with nasals: /ɛ̃/ then /ɔ̃/.',
        level: 'B2',
        category: 'Descriptions'
      },
      {
        id: 'b2-5',
        french: 'prendre du recul',
        english: 'to gain perspective / take a step back',
        ipa: '/pʁɑ̃dʁ dy ʁə.kyl/',
        partOfSpeech: 'phrase',
        exampleFrench: 'Il est fondamental de prendre du recul face à cette situation de crise.',
        exampleEnglish: 'It is fundamental to take a step back regarding this crisis.',
        pronunciationTip: 'Distinguish between "du" (/dy/) and "recul" (/ʁəkyl/).',
        level: 'B2',
        category: 'Professional & Mental'
      },
      {
        id: 'b2-6',
        french: 'faire d’une pierre deux coups',
        english: 'to kill two birds with one stone',
        ipa: '/fɛʁ dyn pjɛʁ dø ku/',
        partOfSpeech: 'expression',
        exampleFrench: 'En déjeunant avec notre client, nous faisons d’une pierre deux coups.',
        exampleEnglish: 'By having lunch with our client, we kill two birds with one stone.',
        pronunciationTip: 'Crisp rhythm: silent "s" on "deux" and "coups".',
        level: 'B2',
        category: 'Proverbs'
      }
    ],
    dialogue: {
      id: 'd-b2-1',
      title: 'Analyse et Décision',
      scenario: 'Consultants formulating strategic advice',
      lines: [
        { speaker: 'Claire', french: 'Comment comptes-tu t’y prendre avec cette nouvelle contrainte ?', english: 'How do you plan to tackle this new constraint?' },
        { speaker: 'Antoine', french: 'Je pense qu’il faut prendre du recul avant de trancher. D’ailleurs, nos experts y travaillent déjà.', english: 'I think we must gain perspective before deciding. Besides, our experts are already on it.' },
        { speaker: 'Claire', french: 'Tu as raison, si nous optimisons ce processus, nous ferons d’une pierre deux coups.', english: 'You are right, if we optimize this process, we will kill two birds with one stone.' },
        { speaker: 'Antoine', french: 'Exactement. Ne t’en fais pas, on va s’en sortir haut la main !', english: 'Exactly. Don’t worry, we will pull through with flying colors!' }
      ]
    }
  },
  {
    id: 'b2-lesson-2',
    level: 'B2',
    title: 'L’Argot & Le Langage Familier',
    subtitle: 'Verlan, Colloquial French & Youth Slang',
    theme: 'Sociolinguistics & Argot',
    description: 'Understand everyday spoken French on the street, in movies, podcasts, and casual banter.',
    grammarFocus: {
      ruleName: 'Verlan & Word Inversion Mechanics',
      explanation: 'Verlan reverses syllables of words (l’envers -> ver-lan). For example, "fou" -> "ouf", "femme" -> "meuf", "arabe" -> "rebeu", "louche" -> "chelou".',
      examples: [
        { fr: 'C’est un truc de ouf !', en: 'That’s crazy! (fou -> ouf)' },
        { fr: 'Cette histoire est vraiment chelou.', en: 'This story is really sketchy/weird. (louche -> chelou)' }
      ]
    },
    culturalNote: 'Verlan originated among French working-class urban youth in the 1950s but has become deeply embedded in mainstream French vocabulary across all generations.',
    idiomSpotlight: {
      french: 'Avoir le seum',
      literal: 'To have the venom/bile (from Arabic samm)',
      meaning: 'To be salty / bitterly disappointed / annoyed',
      example: 'J’ai trop le seum d’avoir raté mon train à une minute près !'
    },
    vocabulary: [
      {
        id: 'b2-7',
        french: 'un truc de ouf',
        english: 'a crazy / mind-blowing thing',
        ipa: '/œ̃ tʁyk də uf/',
        gender: 'm',
        partOfSpeech: 'expression',
        exampleFrench: 'Ce festival était un truc de ouf, il y avait tellement d’ambiance !',
        exampleEnglish: 'This festival was crazy, the vibe was incredible!',
        pronunciationTip: '"ouf" is verlan for "fou". Pronounced /uf/.',
        level: 'B2',
        category: 'Argot'
      },
      {
        id: 'b2-8',
        french: 'chelou',
        english: 'sketchy / weird / suspicious',
        ipa: '/ʃə.lu/',
        gender: 'none',
        partOfSpeech: 'adjective',
        exampleFrench: 'Son comportement hier soir m’a paru très chelou.',
        exampleEnglish: 'His behavior last night seemed really sketchy to me.',
        pronunciationTip: 'Verlan of "louche".',
        level: 'B2',
        category: 'Argot'
      },
      {
        id: 'b2-9',
        french: 'bosser',
        english: 'to work hard / to grind',
        ipa: '/bɔ.se/',
        partOfSpeech: 'verb',
        exampleFrench: 'Je dois bosser tard ce soir pour boucler ce dossier.',
        exampleEnglish: 'I have to grind late tonight to wrap up this file.',
        pronunciationTip: 'Informal synonym of "travailler".',
        level: 'B2',
        category: 'Colloquial'
      },
      {
        id: 'b2-10',
        french: 'un bouquin',
        english: 'a book (casual)',
        ipa: '/œ̃ bu.kɛ̃/',
        gender: 'm',
        partOfSpeech: 'noun',
        exampleFrench: 'J’ai dévoré ce bouquin passionnant en deux jours.',
        exampleEnglish: 'I devoured this captivating book in two days.',
        pronunciationTip: 'Nasal ending /kɛ̃/. Familiar for "livre".',
        level: 'B2',
        category: 'Colloquial'
      },
      {
        id: 'b2-11',
        french: 'kiffer',
        english: 'to love / thoroughly enjoy',
        ipa: '/ki.fe/',
        partOfSpeech: 'verb',
        exampleFrench: 'Franchement, j’ai trop kiffé cette nouvelle série.',
        exampleEnglish: 'Honestly, I thoroughly enjoyed this new series.',
        pronunciationTip: 'From Arabic "kif" (pleasure). Very common among French youth.',
        level: 'B2',
        category: 'Argot'
      },
      {
        id: 'b2-12',
        french: 'laisser tomber',
        english: 'to let it drop / to give up',
        ipa: '/lɛ.se tɔ̃.be/',
        partOfSpeech: 'expression',
        exampleFrench: 'Ce n’est pas grave, laisse tomber, on verra ça demain.',
        exampleEnglish: 'It’s no big deal, let it drop, we’ll look into that tomorrow.',
        pronunciationTip: 'Nasal /ɔ̃/ on "tomber".',
        level: 'B2',
        category: 'Colloquial'
      }
    ],
    dialogue: {
      id: 'd-b2-2',
      title: 'Discussion entre Étudiants',
      scenario: 'Friends chatting outside university',
      lines: [
        { speaker: 'Maxime', french: 'Tu as vu le concert hier ? C’était un truc de ouf !', english: 'Did you see the concert yesterday? It was crazy!' },
        { speaker: 'Inès', french: 'Grave ! J’ai trop kiffé la première partie.', english: 'Totally! I loved the opening act so much.' },
        { speaker: 'Maxime', french: 'Mais aujourd’hui, faut bosser pour les partiels...', english: 'But today, we have to grind for midterms...' },
        { speaker: 'Inès', french: 'J’avoue, j’ai trop le seum de devoir réviser tout le week-end.', english: 'I admit, I am so salty about having to study all weekend.' }
      ]
    }
  },
  {
    id: 'b2-lesson-3',
    level: 'B2',
    title: 'Environnement & Transition Écologique',
    subtitle: 'Climate Discourse, Ecology & Civic Debate',
    theme: 'Ecology & Society',
    description: 'Engage in thoughtful discourse about sustainable energy, biodiversity, and climate policies.',
    grammarFocus: {
      ruleName: 'Logical Connectors: Bien que (+ subjonctif) & Bien au contraire',
      explanation: '"Bien que" expresses concession and strictly requires the subjunctive mood. "Bien au contraire" refutes a premise with emphasis.',
      examples: [
        { fr: 'Bien que des mesures soient prises, l’urgence demeure.', en: 'Although measures are being taken, the urgency remains.' },
        { fr: 'Ce n’est pas inutile, bien au contraire.', en: 'It is not useless, quite the contrary.' }
      ]
    },
    culturalNote: 'France was the birthplace of the landmark 2015 Paris Climate Agreement (Accord de Paris) and introduced groundbreaking laws against food waste in supermarkets.',
    idiomSpotlight: {
      french: 'Apporter de l’eau au moulin',
      literal: 'To bring water to the mill',
      meaning: 'To provide additional supporting evidence or arguments to a debate',
      example: 'Cette étude scientifique apporte de l’eau à notre moulin.'
    },
    vocabulary: [
      {
        id: 'b2-13',
        french: 'l’empreinte carbone',
        english: 'carbon footprint',
        ipa: '/lɑ̃.pʁɛ̃t kaʁ.bɔn/',
        gender: 'f',
        partOfSpeech: 'noun',
        exampleFrench: 'Nous devons réduire collectivement notre empreinte carbone.',
        exampleEnglish: 'We must collectively reduce our carbon footprint.',
        pronunciationTip: 'Nasal transition: /ɑ̃/ followed by /ɛ̃/.',
        level: 'B2',
        category: 'Ecology'
      },
      {
        id: 'b2-14',
        french: 'pérenne',
        english: 'sustainable / long-lasting / enduring',
        ipa: '/pe.ʁɛn/',
        partOfSpeech: 'adjective',
        exampleFrench: 'Il nous faut trouver des solutions écologiques pérennes.',
        exampleEnglish: 'We need to find sustainable, enduring ecological solutions.',
        pronunciationTip: 'Open /ɛ/ in the second syllable.',
        level: 'B2',
        category: 'Ecology'
      },
      {
        id: 'b2-15',
        french: 'la biodiversité',
        english: 'biodiversity',
        ipa: '/la bjɔ.di.vɛʁ.si.te/',
        gender: 'f',
        partOfSpeech: 'noun',
        exampleFrench: 'La préservation de la biodiversité marine est un enjeu vital.',
        exampleEnglish: 'Preserving marine biodiversity is a vital challenge.',
        pronunciationTip: 'Crisp ending with /te/.',
        level: 'B2',
        category: 'Ecology'
      },
      {
        id: 'b2-16',
        french: 'endiguer',
        english: 'to stem / curb / contain',
        ipa: '/ɑ̃.di.ɡe/',
        partOfSpeech: 'verb',
        exampleFrench: 'Des politiques audacieuses sont nécessaires pour endiguer le réchauffement.',
        exampleEnglish: 'Bold policies are required to curb global warming.',
        pronunciationTip: 'Starts with nasal /ɑ̃/, ends with hard /ɡe/.',
        level: 'B2',
        category: 'Ecology'
      },
      {
        id: 'b2-17',
        french: 'la sensibilisation',
        english: 'awareness raising / sensitization',
        ipa: '/la sɑ̃.si.bi.li.za.sjɔ̃/',
        gender: 'f',
        partOfSpeech: 'noun',
        exampleFrench: 'La sensibilisation dès le plus jeune âge change les comportements.',
        exampleEnglish: 'Raising awareness from an early age changes behaviors.',
        pronunciationTip: 'Voiced /z/ followed by /a/ and /sjɔ̃/.',
        level: 'B2',
        category: 'Society'
      },
      {
        id: 'b2-18',
        french: 'un enjeu majeur',
        english: 'a major issue / critical stake',
        ipa: '/œ̃.n‿ɑ̃.ʒø ma.ʒœʁ/',
        gender: 'm',
        partOfSpeech: 'phrase',
        exampleFrench: 'La transition énergétique représente un enjeu majeur pour l’avenir.',
        exampleEnglish: 'Energy transition represents a major stake for the future.',
        pronunciationTip: 'Open /œʁ/ on "majeur".',
        level: 'B2',
        category: 'Society'
      }
    ],
    dialogue: {
      id: 'd-b2-3',
      title: 'Table Ronde sur le Climat',
      scenario: 'Panelists debating environmental policies',
      lines: [
        { speaker: 'Modérateur', french: 'Pensez-vous que les mesures actuelles suffisent à endiguer la crise ?', english: 'Do you believe current measures suffice to curb the crisis?' },
        { speaker: 'Écologiste', french: 'Bien que des efforts soient faits, cela reste insuffisant pour assurer un avenir pérenne.', english: 'Although efforts are made, it remains insufficient to ensure a sustainable future.' },
        { speaker: 'Économiste', french: 'Il faut équilibrer la réduction de l’empreinte carbone et la viabilité des entreprises.', english: 'We must balance reducing carbon footprint and corporate viability.' },
        { speaker: 'Écologiste', french: 'C’est justement un enjeu majeur qui nécessite l’adhésion de tous.', english: 'That is precisely a major stake requiring everyone’s commitment.' }
      ]
    }
  },
  {
    id: 'b2-lesson-4',
    level: 'B2',
    title: 'Médias, Presse & Esprit Critique',
    subtitle: 'Journalistic Discourse, Disinformation & Critical Thinking',
    theme: 'Media & Critical Analysis',
    description: 'Learn how to decipher journalistic analyses, fact-checking terminology, and discuss the impact of information technology.',
    grammarFocus: {
      ruleName: 'Complex Relative Pronouns: Dont, Lequel & Auquel',
      explanation: 'Use "dont" to replace objects with "de" (le livre dont je parle). Use "lequel / laquelle / auxquels" after prepositions (la réunion à laquelle j’ai assisté).',
      examples: [
        { fr: 'Le scandale dont tout le monde parle...', en: 'The scandal about which everyone is talking...' },
        { fr: 'C’est une question complexe à laquelle nous devons répondre.', en: 'It is a complex question to which we must reply.' }
      ]
    },
    culturalNote: 'France boasts a fierce tradition of satirical journalism and press freedom, symbolized by historical weekly newspapers like "Le Canard Enchaîné" founded in 1915.',
    idiomSpotlight: {
      french: 'Prendre avec des pincettes',
      literal: 'To take with tweezers',
      meaning: 'To take with a grain of salt / view with skepticism',
      example: 'Cette rumeur sur les réseaux sociaux est à prendre avec des pincettes.'
    },
    vocabulary: [
      {
        id: 'b2-19',
        french: 'la désinformation',
        english: 'disinformation / fake news',
        ipa: '/la de.zɛ̃.fɔʁ.ma.sjɔ̃/',
        gender: 'f',
        partOfSpeech: 'noun',
        exampleFrench: 'La désinformation prolifère à grande vitesse sur les plateformes numériques.',
        exampleEnglish: 'Disinformation proliferates rapidly on digital platforms.',
        pronunciationTip: 'Voiced /z/ between "dé-" and "-in-".',
        level: 'B2',
        category: 'Media'
      },
      {
        id: 'b2-20',
        french: 'corroborer',
        english: 'to corroborate / verify with evidence',
        ipa: '/kɔ.ʁɔ.bɔ.ʁe/',
        partOfSpeech: 'verb',
        exampleFrench: 'Plusieurs sources indépendantes sont venues corroborer ce témoignage.',
        exampleEnglish: 'Several independent sources corroborated this testimony.',
        pronunciationTip: 'Double rolling /ʁ/ sound throughout.',
        level: 'B2',
        category: 'Media'
      },
      {
        id: 'b2-21',
        french: 'l’objectivité',
        english: 'objectivity / impartiality',
        ipa: '/lɔb.ʒɛk.ti.vi.te/',
        gender: 'f',
        partOfSpeech: 'noun',
        exampleFrench: 'L’objectivité journalistique exige de croiser scrupuleusement les faits.',
        exampleEnglish: 'Journalistic objectivity requires scrupulous cross-checking of facts.',
        pronunciationTip: 'Open /ɛ/ in "-jec-".',
        level: 'B2',
        category: 'Media'
      },
      {
        id: 'b2-22',
        french: 'un éditorial',
        english: 'an editorial / opinion piece',
        ipa: '/œ̃.n‿e.di.tɔ.ʁjal/',
        gender: 'm',
        partOfSpeech: 'noun',
        exampleFrench: 'Cet éditorial percutant soulève un débat démocratique crucial.',
        exampleEnglish: 'This striking editorial raises a crucial democratic debate.',
        pronunciationTip: 'Liaison "un(n)-éditorial".',
        level: 'B2',
        category: 'Media'
      },
      {
        id: 'b2-23',
        french: 'décrypter',
        english: 'to decipher / analyze in depth',
        ipa: '/de.kʁip.te/',
        partOfSpeech: 'verb',
        exampleFrench: 'Cette émission aide les citoyens à décrypter l’actualité politique.',
        exampleEnglish: 'This broadcast helps citizens decipher political current events.',
        pronunciationTip: 'Crisp ending /te/.',
        level: 'B2',
        category: 'Media'
      },
      {
        id: 'b2-24',
        french: 'scrupuleux',
        english: 'scrupulous / painstaking',
        ipa: '/skʁy.py.lø/',
        gender: 'm',
        partOfSpeech: 'adjective',
        exampleFrench: 'Le travail d’enquête requiert une vérification scrupuleuse des sources.',
        exampleEnglish: 'Investigative work requires painstaking verification of sources.',
        pronunciationTip: 'Double /y/ in the stem, ends in /lø/.',
        level: 'B2',
        category: 'Media'
      }
    ],
    dialogue: {
      id: 'd-b2-4',
      title: 'Dans la Salle de Rédaction',
      scenario: 'Journalists verifying a breaking story',
      lines: [
        { speaker: 'Rédacteur en chef', french: 'Avez-vous pu corroborer cette information auprès d’une seconde source ?', english: 'Were you able to corroborate this information with a second source?' },
        { speaker: 'Journaliste', french: 'Oui, nous avons fait un travail d’enquête scrupuleux. L’information est confirmée.', english: 'Yes, we did painstaking investigative work. The information is confirmed.' },
        { speaker: 'Rédacteur en chef', french: 'Parfait. C’est le genre d’histoire à laquelle nos lecteurs accordent une grande confiance.', english: 'Perfect. That is the kind of story in which our readers place great trust.' },
        { speaker: 'Journaliste', french: 'Je rédige l’article en veillant à la stricte objectivité des faits.', english: 'I am writing the article ensuring strict objectivity of the facts.' }
      ]
    }
  },

  // ==========================================
  // LEVEL C1: ADVANCED (4 FULL MODULES)
  // ==========================================
  {
    id: 'c1-lesson-1',
    level: 'C1',
    title: 'Rhétorique, Philosophie & Éloquence',
    subtitle: 'Rhetorical Sophistication, Nuance & Intellectual Discourse',
    theme: 'Academic & Literary Fluency',
    description: 'Elevate your expression with nuanced connectors, sophisticated philosophical terminology, and stylistic elevation.',
    grammarFocus: {
      ruleName: 'Hypothèses Soutenues & Subjonctif Imparfait',
      explanation: 'In high-register French, express hypothetical nuances with "pour peu que" (+ subjonctif), inversion of subject-verb in formal clauses, and concessive constructions.',
      examples: [
        { fr: 'Pour peu qu’on y prête attention, la vérité apparaît.', en: 'If only one pays attention, truth becomes evident.' },
        { fr: 'Aussi surprenant que cela puisse paraître...', en: 'As surprising as that may seem...' }
      ]
    },
    culturalNote: 'The tradition of "l’éloquence" in French education traces back to ancient rhetoric and the French Enlightenment (Les Lumières). Competitions of eloquence (Concours d’éloquence) remain wildly popular in universities and law schools.',
    idiomSpotlight: {
      french: 'Changer son fusil d’épaule',
      literal: 'To change one’s rifle shoulder',
      meaning: 'To change one’s strategy / alter one’s position completely',
      example: 'Devant la réaction hostile du public, le politicien a vite changé son fusil d’épaule.'
    },
    vocabulary: [
      {
        id: 'c1-1',
        french: 'nonobstant',
        english: 'notwithstanding / in spite of',
        ipa: '/nɔ.nɔb.stɑ̃/',
        partOfSpeech: 'phrase',
        exampleFrench: 'Nonobstant ces réserves théoriques, l’expérience s’avère concluante.',
        exampleEnglish: 'Notwithstanding these theoretical reservations, the experiment proves conclusive.',
        pronunciationTip: 'Formal literary register. Ends in nasal /ɑ̃/ with silent "t".',
        level: 'C1',
        category: 'Elevated Connectors'
      },
      {
        id: 'c1-2',
        french: 'l’éphémère',
        english: 'the ephemeral / fleeting nature',
        ipa: '/le.fe.mɛʁ/',
        gender: 'm',
        partOfSpeech: 'noun',
        exampleFrench: 'La poésie baudelairienne sublime la beauté dans l’éphémère.',
        exampleEnglish: 'Baudelairean poetry sublimates beauty in the ephemeral.',
        pronunciationTip: 'Melodic cadence: acute "é" followed by grave "è".',
        level: 'C1',
        category: 'Philosophy & Art'
      },
      {
        id: 'c1-3',
        french: 'subsumer',
        english: 'to subsume / incorporate under a broader concept',
        ipa: '/syb.sy.me/',
        partOfSpeech: 'verb',
        exampleFrench: 'Cette théorie générale subsume les différentes observations empiriques.',
        exampleEnglish: 'This general theory subsumes the various empirical observations.',
        pronunciationTip: 'Double rounded "u" (/y/) sound.',
        level: 'C1',
        category: 'Philosophy & Logic'
      },
      {
        id: 'c1-4',
        french: 'une pierre angulaire',
        english: 'a cornerstone',
        ipa: '/yn pjɛʁ ɑ̃.ɡy.lɛʁ/',
        gender: 'f',
        partOfSpeech: 'phrase',
        exampleFrench: 'La laïcité constitue une pierre angulaire du modèle républicain.',
        exampleEnglish: 'Secularism constitutes a cornerstone of the republican model.',
        pronunciationTip: 'Flow seamlessly across both words.',
        level: 'C1',
        category: 'Elevated Metaphor'
      },
      {
        id: 'c1-5',
        french: 'délibérément',
        english: 'deliberately / intentionally',
        ipa: '/de.li.be.ʁe.mɑ̃/',
        partOfSpeech: 'adverb',
        exampleFrench: 'L’auteur a délibérément omis cette précision pour stimuler le débat.',
        exampleEnglish: 'The author deliberately omitted this clarification to spur debate.',
        pronunciationTip: 'Smoothly pronounced five syllables ending in /mɑ̃/.',
        level: 'C1',
        category: 'Nuance'
      },
      {
        id: 'c1-6',
        french: 'équivoque',
        english: 'ambiguous / equivocal',
        ipa: '/e.ki.vɔk/',
        partOfSpeech: 'adjective',
        exampleFrench: 'Sa prise de position reste singulièrement équivoque sur ce point précis.',
        exampleEnglish: 'His stance remains curiously equivocal on this precise point.',
        pronunciationTip: 'Ends in crisp consonant /k/.',
        level: 'C1',
        category: 'Critical Thinking'
      }
    ],
    dialogue: {
      id: 'd-c1-1',
      title: 'Colloque Philosophique',
      scenario: 'Academics discussing existential freedom and ethics',
      lines: [
        { speaker: 'Professeur Valmont', french: 'Nonobstant la complexité du traité, son propos est d’une limpidité saisissante.', english: 'Notwithstanding the complexity of the treatise, its point is strikingly limpid.' },
        { speaker: 'Docteur Renard', french: 'Certes, mais sa conception de la liberté n’est-elle pas délibérément équivoque ?', english: 'Certainly, but is not his conception of freedom deliberately equivocal?' },
        { speaker: 'Professeur Valmont', french: 'Précisément ! C’est là la pierre angulaire de toute sa dialectique.', english: 'Precisely! That is the cornerstone of his entire dialectic.' },
        { speaker: 'Docteur Renard', french: 'Il cherche en vérité à subsumer les contradictions inhérentes à la condition humaine.', english: 'He seeks in truth to subsume the contradictions inherent in the human condition.' }
      ]
    }
  },
  {
    id: 'c1-lesson-2',
    level: 'C1',
    title: 'Le Registre Littéraire & Le Passé Simple',
    subtitle: 'Classical Prose, Narrative Tenses & Stylistic Aesthetics',
    theme: 'Literature & Narrative Mastery',
    description: 'Learn to recognize and appreciate the Passé Simple, literary subjunctives, and stylistic prose of great French authors.',
    grammarFocus: {
      ruleName: 'Le Passé Simple dans la Narration Écrite',
      explanation: 'The Passé Simple is the premier tense of formal written French literature and history (il fut, elle vint, ils acquirent), replacing the Passé Composé in classic narrative storytelling.',
      examples: [
        { fr: 'Il entra dans la pièce et s’assit sans mot dire.', en: 'He entered the room and sat down without uttering a word.' },
        { fr: 'Elle sut d’emblée qu’il avait raison.', en: 'She knew straightaway that he was right.' }
      ]
    },
    culturalNote: 'Marcel Proust’s "À la recherche du temps perdu" is celebrated for sentences stretching over hundreds of words with delicate sub-clauses, showcasing the architectural rhythm of French syntax.',
    idiomSpotlight: {
      french: 'La madeleine de Proust',
      literal: 'Proust’s madeleine',
      meaning: 'An involuntary sensory memory sparked by a smell, taste, or sound',
      example: 'L’odeur du café au petit matin est ma madeleine de Proust.'
    },
    vocabulary: [
      {
        id: 'c1-7',
        french: 'l’apogée',
        english: 'the climax / zenith / peak',
        ipa: '/la.pɔ.ʒe/',
        gender: 'm',
        partOfSpeech: 'noun',
        exampleFrench: 'Le classicisme français connut son apogée sous le règne de Louis XIV.',
        exampleEnglish: 'French classicism reached its zenith under the reign of Louis XIV.',
        pronunciationTip: 'Masculine noun despite ending in "-ée".',
        level: 'C1',
        category: 'Literature'
      },
      {
        id: 'c1-8',
        french: 'd’emblée',
        english: 'straightaway / from the very outset',
        ipa: '/dɑ̃.ble/',
        partOfSpeech: 'adverb',
        exampleFrench: 'Le roman captive le lecteur d’emblée par son incipit magistral.',
        exampleEnglish: 'The novel captivates the reader straightaway with its masterly opening.',
        pronunciationTip: 'Flows in two syllables: /dɑ̃/ and /ble/.',
        level: 'C1',
        category: 'Literary Style'
      },
      {
        id: 'c1-9',
        french: 'ineffable',
        english: 'ineffable / beyond words / unspeakable',
        ipa: '/i.nɛ.fabl/',
        partOfSpeech: 'adjective',
        exampleFrench: 'Le paysage de brume matinale inspirait une mélancolie ineffable.',
        exampleEnglish: 'The morning mist landscape inspired an ineffable melancholy.',
        pronunciationTip: 'Liaison sound /n/ followed by open /ɛ/.',
        level: 'C1',
        category: 'Aesthetics'
      },
      {
        id: 'c1-10',
        french: 'le dénouement',
        english: 'the resolution / denouement of a drama',
        ipa: '/lə de.nu.mɑ̃/',
        gender: 'm',
        partOfSpeech: 'noun',
        exampleFrench: 'Le dénouement tragique de la pièce bouleversa profondément la salle.',
        exampleEnglish: 'The tragic resolution of the play deeply moved the audience.',
        pronunciationTip: 'Ends in nasal /mɑ̃/.',
        level: 'C1',
        category: 'Literature'
      },
      {
        id: 'c1-11',
        french: 'sublimer',
        english: 'to sublime / elevate / exalt',
        ipa: '/sy.bli.me/',
        partOfSpeech: 'verb',
        exampleFrench: 'L’écrivain parvient à sublimer les peines ordinaires du quotidien.',
        exampleEnglish: 'The writer manages to sublime the ordinary heartbreaks of daily life.',
        pronunciationTip: 'Rounded /y/ in the first syllable.',
        level: 'C1',
        category: 'Aesthetics'
      },
      {
        id: 'c1-12',
        french: 'omniprésent',
        english: 'omnipresent / pervasive',
        ipa: '/ɔm.ni.pʁe.zɑ̃/',
        gender: 'm',
        partOfSpeech: 'adjective',
        exampleFrench: 'Le sentiment d’exil est omniprésent à travers toute son œuvre.',
        exampleEnglish: 'The feeling of exile is omnipresent throughout his entire body of work.',
        pronunciationTip: 'Voiced /z/ before nasal /ɑ̃/.',
        level: 'C1',
        category: 'Literary Criticism'
      }
    ],
    dialogue: {
      id: 'd-c1-2',
      title: 'Critique Littéraire au Salon du Livre',
      scenario: 'Reviewers dissecting a contemporary novel',
      lines: [
        { speaker: 'Critique A', french: 'Ce roman saisit d’emblée par la pureté de son écriture et son usage subtil des temps narratifs.', english: 'This novel grips straightaway with the purity of its writing and subtle use of narrative tenses.' },
        { speaker: 'Critique B', french: 'Tout à fait. L’auteur parvient à sublimer l’éphémère avec une mélancolie ineffable.', english: 'Absolutely. The author manages to sublime the ephemeral with ineffable melancholy.' },
        { speaker: 'Critique A', french: 'Et que pensez-vous du dénouement ?', english: 'And what do you think of the denouement?' },
        { speaker: 'Critique B', french: 'Il marque véritablement l’apogée dramatique de l’ouvrage.', english: 'It truly marks the dramatic climax of the work.' }
      ]
    }
  },
  {
    id: 'c1-lesson-3',
    level: 'C1',
    title: 'Diplomatie, Droit & Registre Soutenu',
    subtitle: 'Diplomatic Register, Legal Nuance & Institutional French',
    theme: 'Diplomacy & Formal Governance',
    description: 'Master formal diplomatic discourse, treaty phrasing, and syntactic inversions used in international governance.',
    grammarFocus: {
      ruleName: 'Inversion du Sujet en Style Soutenu',
      explanation: 'In elevated formal French, invert the subject pronoun or noun after adverbs like "Peut-être", "Sans doute", "À peine", or in conditional clauses without "si".',
      examples: [
        { fr: 'À peine fûmes-nous arrivés que les négociations débutèrent.', en: 'Scarcely had we arrived when negotiations began.' },
        { fr: 'Fût-il nécessaire d’intervenir, nous le ferions sans hésiter.', en: 'Were it necessary to intervene, we would do so without hesitation.' }
      ]
    },
    culturalNote: 'French served as the dominant global language of international diplomacy for centuries and remains an official working language of the UN, EU, WTO, and International Court of Justice.',
    idiomSpotlight: {
      french: 'Battre en brèche',
      literal: 'To breach with cannon fire',
      meaning: 'To thoroughly dismantle or refute an established argument',
      example: 'L’ambassadeur a battu en brèche les accusations de ses opposants.'
    },
    vocabulary: [
      {
        id: 'c1-13',
        french: 'un différend',
        english: 'a dispute / disagreement / contention',
        ipa: '/œ̃ di.fe.ʁɑ̃/',
        gender: 'm',
        partOfSpeech: 'noun',
        exampleFrench: 'Les deux États cherchent à régler leur différend frontalier par la voie pacifique.',
        exampleEnglish: 'Both states seek to settle their border dispute through peaceful means.',
        pronunciationTip: 'Ends in nasal /ʁɑ̃/, silent "d".',
        level: 'C1',
        category: 'Diplomacy'
      },
      {
        id: 'c1-14',
        french: 'ratifier',
        english: 'to ratify / solemnly approve',
        ipa: '/ʁa.ti.fje/',
        partOfSpeech: 'verb',
        exampleFrench: 'Le parlement a voté pour ratifier le traité de libre-échange.',
        exampleEnglish: 'Parliament voted to ratify the free-trade treaty.',
        pronunciationTip: 'Semi-vowel glide /j/ before /e/.',
        level: 'C1',
        category: 'Law & Governance'
      },
      {
        id: 'c1-15',
        french: 'la souveraineté',
        english: 'sovereignty',
        ipa: '/la su.vʁɛn.te/',
        gender: 'f',
        partOfSpeech: 'noun',
        exampleFrench: 'Le respect scrupuleux de la souveraineté nationale est intangible.',
        exampleEnglish: 'Scrupulous respect for national sovereignty is untouchable.',
        pronunciationTip: 'Elided /vʁɛn/ in rapid formal speech.',
        level: 'C1',
        category: 'Diplomacy'
      },
      {
        id: 'c1-16',
        french: 'irrévocable',
        english: 'irrevocable / unalterable',
        ipa: '/i.ʁe.vɔ.kabl/',
        partOfSpeech: 'adjective',
        exampleFrench: 'Cette décision de justice revêt un caractère définitif et irrévocable.',
        exampleEnglish: 'This court decision carries a final and irrevocable character.',
        pronunciationTip: 'Double rolling /ʁ/ sound.',
        level: 'C1',
        category: 'Law'
      },
      {
        id: 'c1-17',
        french: 'stipuler',
        english: 'to stipulate / specify in an agreement',
        ipa: '/sti.py.le/',
        partOfSpeech: 'verb',
        exampleFrench: 'L’article troisième stipule expressément les obligations de chaque partie.',
        exampleEnglish: 'Article three expressly stipulates the obligations of each party.',
        pronunciationTip: 'Rounded /y/ in "-pu-".',
        level: 'C1',
        category: 'Law'
      },
      {
        id: 'c1-18',
        french: 'un consensus',
        english: 'a consensus / unanimous accord',
        ipa: '/œ̃ kɔ̃.sɛ̃.sys/',
        gender: 'm',
        partOfSpeech: 'noun',
        exampleFrench: 'Après d’âpres négociations, un consensus durable a enfin été trouvé.',
        exampleEnglish: 'After bitter negotiations, a lasting consensus was finally reached.',
        pronunciationTip: 'Pronounce the final "s" (/sys/) in French!',
        level: 'C1',
        category: 'Diplomacy'
      }
    ],
    dialogue: {
      id: 'd-c1-3',
      title: 'Négociation Bilatérale à Genève',
      scenario: 'Diplomats finalizing treaty terms',
      lines: [
        { speaker: 'Délégué français', french: 'Nous nous félicitons du consensus auquel nos délégations sont parvenues.', english: 'We welcome the consensus our delegations have reached.' },
        { speaker: 'Médiateur', french: 'Le texte stipule-t-il clairement les mécanismes de règlement des différends ?', english: 'Does the text clearly stipulate the dispute resolution mechanisms?' },
        { speaker: 'Délégué français', french: 'Tout à fait. Les engagements pris sont désormais mutuels et irrévocables.', english: 'Absolutely. The commitments made are henceforth mutual and irrevocable.' },
        { speaker: 'Médiateur', french: 'Dans ces conditions, nos gouvernements pourront ratifier l’accord sans délai.', english: 'Under these conditions, our governments will be able to ratify the agreement without delay.' }
      ]
    }
  },
  {
    id: 'c1-lesson-4',
    level: 'C1',
    title: 'Subtilités Lexicales & Faux Amis Complexes',
    subtitle: 'Nuanced Polysemy, Etymology & Advanced Lexical Mastery',
    theme: 'Lexical Sophistication',
    description: 'Master fine shades of meaning between deceptive cognates, polysemic idioms, and elevated stylistic adjectives.',
    grammarFocus: {
      ruleName: 'Distinctions Lexicales Subtiles (Sens Propre vs. Figuré)',
      explanation: 'In advanced French, adjectives can dramatically alter meaning based on whether they precede or follow the noun (un homme grand = tall man; un grand homme = great historical figure).',
      examples: [
        { fr: 'Une curieuse histoire (étrange) vs. Une femme curieuse (indiscrète).', en: 'A curious story (strange) vs. A curious woman (inquisitive).' },
        { fr: 'De pauvres résultats (médiocres) vs. Un homme pauvre (démuni).', en: 'Poor results (mediocre) vs. A poor man (penniless).' }
      ]
    },
    culturalNote: 'The Académie Française, founded in 1635 by Cardinal Richelieu, is the official custodian of the French language, debating the precise dictionary definitions of every word.',
    idiomSpotlight: {
      french: 'Couper les cheveux en quatre',
      literal: 'To cut hairs into four',
      meaning: 'To split hairs / overcomplicate details unnecessarily',
      example: 'Arrêtons de couper les cheveux en quatre et passons à l’action !'
    },
    vocabulary: [
      {
        id: 'c1-19',
        french: 'insidieux',
        english: 'insidious / subtly treacherous',
        ipa: '/ɛ̃.si.djø/',
        gender: 'm',
        partOfSpeech: 'adjective',
        exampleFrench: 'Ce préjugé insidieux mine la cohésion sociale sans faire de bruit.',
        exampleEnglish: 'This insidious prejudice undermines social cohesion without making noise.',
        pronunciationTip: 'Feminine is "insidieuse" (/ɛ̃.si.djøz/).',
        level: 'C1',
        category: 'Nuance'
      },
      {
        id: 'c1-20',
        french: 'l’apanage',
        english: 'the prerogative / exclusive privilege',
        ipa: '/la.pa.naʒ/',
        gender: 'm',
        partOfSpeech: 'noun',
        exampleFrench: 'La rigueur intellectuelle n’est pas l’apanage des seuls spécialistes.',
        exampleEnglish: 'Intellectual rigor is not the exclusive preserve of specialists alone.',
        pronunciationTip: 'Soft /ʒ/ at the end.',
        level: 'C1',
        category: 'Elevated Vocabulary'
      },
      {
        id: 'c1-21',
        french: 'disséquer',
        english: 'to dissect / critically scrutinize',
        ipa: '/di.se.ke/',
        partOfSpeech: 'verb',
        exampleFrench: 'Le philosophe a disséqué les présupposés cachés de notre société.',
        exampleEnglish: 'The philosopher dissected the hidden assumptions of our society.',
        pronunciationTip: 'Voiceless /s/ sound, open /e/.',
        level: 'C1',
        category: 'Critical Thinking'
      },
      {
        id: 'c1-22',
        french: 'la quintessence',
        english: 'the quintessence / absolute embodiment',
        ipa: '/la kɛ̃.tɛ.sɑ̃s/',
        gender: 'f',
        partOfSpeech: 'noun',
        exampleFrench: 'Cette composition musicale incarne la quintessence de la Renaissance.',
        exampleEnglish: 'This musical composition embodies the quintessence of the Renaissance.',
        pronunciationTip: 'Double nasal: /kɛ̃/ and /sɑ̃s/.',
        level: 'C1',
        category: 'Aesthetics'
      },
      {
        id: 'c1-23',
        french: 'anodin',
        english: 'innocuous / insignificant / harmless',
        ipa: '/a.nɔ.dɛ̃/',
        gender: 'm',
        partOfSpeech: 'adjective',
        exampleFrench: 'Ce détail en apparence anodin s’est avéré déterminant dans l’enquête.',
        exampleEnglish: 'This seemingly innocuous detail proved decisive in the investigation.',
        pronunciationTip: 'Feminine is "anodine" (/a.nɔ.din/).',
        level: 'C1',
        category: 'Nuance'
      },
      {
        id: 'c1-24',
        french: 'exacerber',
        english: 'to exacerbate / aggravate / intensify',
        ipa: '/ɛɡ.za.sɛʁ.be/',
        partOfSpeech: 'verb',
        exampleFrench: 'Cette polémique stérile ne fait qu’exacerber les tensions existantes.',
        exampleEnglish: 'This pointless controversy only exacerbates existing tensions.',
        pronunciationTip: 'Voiced /ɡz/ at the beginning.',
        level: 'C1',
        category: 'Nuance'
      }
    ],
    dialogue: {
      id: 'd-c1-4',
      title: 'Séminaire de Linguistique Avancée',
      scenario: 'Scholars debating nuanced French semantics',
      lines: [
        { speaker: 'Docteur Lambert', french: 'En disséquant ces textes, on constate que ce terme n’est nullement anodin.', english: 'In dissecting these texts, one notices that this term is by no means innocuous.' },
        { speaker: 'Professeur Morin', french: 'Exactement. Son emploi délibéré exacerbe les ambiguïtés sous-jacentes.', english: 'Exactly. Its deliberate use exacerbates underlying ambiguities.' },
        { speaker: 'Docteur Lambert', french: 'C’est là l’apanage des grands stylistes : manier la quintessence du verbe.', english: 'That is the prerogative of great stylists: wielding the quintessence of the word.' },
        { speaker: 'Professeur Morin', french: 'Une démonstration magistrale qui ne laisse aucune place au doute.', english: 'A masterly demonstration that leaves no room for doubt.' }
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
