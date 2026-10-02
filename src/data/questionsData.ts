import { Question, SubjectId, SubjectInfo } from '../types/quiz';

export const SUBJECTS: SubjectInfo[] = [
  {
    id: 'cdp',
    name: 'Child Development & Pedagogy',
    teluguName: 'శిశు వికాసం & బోధనా పద్ధతులు',
    description: 'Developmental psychology, Skinner, Piaget, Vygotsky, Erikson, learning theories, CCE & NEP 2020.',
    icon: 'Brain',
    color: 'indigo',
    gradient: 'from-indigo-500 to-purple-600',
    borderColor: 'border-indigo-200 dark:border-indigo-800',
    badgeBg: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-300',
    totalAvailable: 25
  },
  {
    id: 'telugu',
    name: 'Telugu Language (తెలుగు)',
    teluguName: 'తెలుగు భాషా సాహిత్యం & వ్యాకరణం',
    description: 'శతక పద్యాలు, కవుల బిరుదులు, సంధులు, సమాసాలు, అలంకారాలు, ఛందస్సు, జాతీయాలు, సామెతలు & పొడుపు కథలు.',
    icon: 'BookOpen',
    color: 'amber',
    gradient: 'from-amber-500 to-orange-600',
    borderColor: 'border-amber-200 dark:border-amber-800',
    badgeBg: 'bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300',
    totalAvailable: 25
  },
  {
    id: 'english',
    name: 'English Language',
    teluguName: 'ఇంగ్లీష్ భాష & వ్యాకరణం',
    description: 'Vocabulary (synonyms/antonyms), spelling, one-word substitutes, idioms, active-passive voice, direct-indirect, clauses & grammar.',
    icon: 'Languages',
    color: 'blue',
    gradient: 'from-blue-500 to-cyan-600',
    borderColor: 'border-blue-200 dark:border-blue-800',
    badgeBg: 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300',
    totalAvailable: 25
  },
  {
    id: 'mathematics',
    name: 'Mathematics',
    teluguName: 'గణిత శాస్త్రం & బోధనా పద్ధతులు',
    description: 'Number theory, HCF & LCM, profit & loss, geometry, trigonometry, mensuration, statistics, probability with step-by-step solutions.',
    icon: 'Calculator',
    color: 'emerald',
    gradient: 'from-emerald-500 to-teal-600',
    borderColor: 'border-emerald-200 dark:border-emerald-800',
    badgeBg: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300',
    totalAvailable: 25
  },
  {
    id: 'physical_science',
    name: 'Physical Science',
    teluguName: 'భౌతిక & రసాయన శాస్త్రాలు',
    description: 'Motion, forces, gravity, work & energy, sound, optics, electricity, carbon chemistry, acids & bases with step-by-step derivations.',
    icon: 'Atom',
    color: 'rose',
    gradient: 'from-rose-500 to-pink-600',
    borderColor: 'border-rose-200 dark:border-rose-800',
    badgeBg: 'bg-rose-100 text-rose-800 dark:bg-rose-900/50 dark:text-rose-300',
    totalAvailable: 25
  },
  {
    id: 'biology',
    name: 'Biological Science',
    teluguName: 'జీవ శాస్త్రం & పర్యావరణ విజ్ఞానం',
    description: 'Plant anatomy, cell organelles, genetics, human organ systems, hormones, ecology & conservation with memory tricks.',
    icon: 'Dna',
    color: 'green',
    gradient: 'from-green-600 to-emerald-700',
    borderColor: 'border-green-200 dark:border-green-800',
    badgeBg: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
    totalAvailable: 25
  }
];

export const QUESTIONS: Question[] = [
  // =========================================================================
  // 1. CDP (CHILD DEVELOPMENT & PEDAGOGY) - Sequential as in PDF (Page 1 onward)
  // =========================================================================
  {
    id: 1001,
    subjectId: 'cdp',
    pdfQuestionNo: 1,
    topic: 'Scope of Educational Psychology',
    questionEn: 'This does not come under the scope of Educational Psychology according to Skinner:',
    questionTe: 'స్కిన్నర్ ప్రకారం విద్యా మనోవిజ్ఞానశాస్త్ర పరిధి కిందకు రానిది:',
    options: [
      { key: 1, textEn: 'Learner', textTe: 'అభ్యాసకుడు' },
      { key: 2, textEn: 'Mandal Educational Officer', textTe: 'మండల విద్యాశాఖాధికారి' },
      { key: 3, textEn: 'Teacher', textTe: 'ఉపాధ్యాయుడు' },
      { key: 4, textEn: 'Learning Experience', textTe: 'అభ్యసనానుభవం' }
    ],
    correctAnswer: 2,
    briefExplanation: 'Skinner identified the learner, learning process, teacher, and learning situation as the primary domain of educational psychology. Administrative officials like MEO are administrative personnel, not psychological elements.',
    memoryTrick: '💡 గుర్తుంచుకునే చిట్కా: "స్కిన్నర్ తరగతి గది త్రయం: విద్యార్థి + ఉపాధ్యాయుడు + అభ్యసనం (L-T-E). బాహ్య అధికారులు (MEO) విద్యా మనోవిజ్ఞాన పరిధిలోకి రారు!"'
  },
  {
    id: 1002,
    subjectId: 'cdp',
    pdfQuestionNo: 2,
    topic: 'Development Nature',
    questionEn: 'Correct statement related to Development:',
    questionTe: 'వికాసానికి సంబంధించి సరైన వాక్యం:',
    options: [
      { key: 1, textEn: 'Development is a narrow concept', textTe: 'వికాసం సంకుచితమైనది' },
      { key: 2, textEn: 'Development can be measured accurately', textTe: 'వికాసాన్ని ఖచ్చితంగా కొలవవచ్చు' },
      { key: 3, textEn: 'Development is limited to certain age', textTe: 'వికాసం కొంత వయసు వరకు మాత్రమే జరుగుతుంది' },
      { key: 4, textEn: 'Development is an internal and integrated process', textTe: 'వికాసం అంతర్గతమైనది మరియు సమగ్రమైన ప్రక్రియ' }
    ],
    correctAnswer: 4,
    briefExplanation: 'Growth (పెరుగుదల) is external, measurable, and stops at maturity. In contrast, Development (వికాసం) is internal, lifelong, progressive, and an integrated whole.',
    memoryTrick: '💡 గుర్తుంచుకునే చిట్కా: "G = Growth (Quantitative & External), D = Development (Deep, Internal & Integrated from Womb to Tomb)!"'
  },
  {
    id: 1003,
    subjectId: 'cdp',
    pdfQuestionNo: 3,
    topic: 'Etymology',
    questionEn: 'The word “Psychology” is derived from the words of this language:',
    questionTe: 'సైకాలజీ అనే పదం ఈ భాష పదాల నుండి ఉద్భవించినది:',
    options: [
      { key: 1, textEn: 'Greek', textTe: 'గ్రీకు' },
      { key: 2, textEn: 'Telugu', textTe: 'తెలుగు' },
      { key: 3, textEn: 'Tamil', textTe: 'తమిళం' },
      { key: 4, textEn: 'Hindi', textTe: 'హిందీ' }
    ],
    correctAnswer: 1,
    briefExplanation: 'Psychology originates from Greek roots: "Psyche" (Soul/Mind) and "Logos" (Study/Science).',
    memoryTrick: '💡 గుర్తుంచుకునే చిట్కా: "గ్రీకు మేధావుల ఆత్మకథ: Psyche + Logos = గ్రీకు (Greek) మూలం!"'
  },
  {
    id: 1004,
    subjectId: 'cdp',
    pdfQuestionNo: 4,
    topic: 'Branches of Psychology',
    questionEn: 'The branch of Psychology concerned with the scientific study of teaching and learning process is:',
    questionTe: 'బోధనాభ్యసన ప్రక్రియల గురించి శాస్త్రీయంగా అధ్యయనం చేయు మనోవిజ్ఞాన శాస్త్ర విభాగం:',
    options: [
      { key: 1, textEn: 'Health Psychology', textTe: 'ఆరోగ్య మనోవిజ్ఞానశాస్త్రం' },
      { key: 2, textEn: 'Educational Psychology', textTe: 'విద్యా మనోవిజ్ఞానశాస్త్రం' },
      { key: 3, textEn: 'Animal Psychology', textTe: 'జంతు మనోవిజ్ఞానశాస్త్రం' },
      { key: 4, textEn: 'Industrial Psychology', textTe: 'పారిశ్రామిక మనోవిజ్ఞానశాస్త్రం' }
    ],
    correctAnswer: 2,
    briefExplanation: 'Educational Psychology specifically analyzes how humans learn, teaching methodologies, instructional psychology, and classroom dynamics.',
    memoryTrick: '💡 గుర్తుంచుకునే చిట్కా: "Teaching & Learning (బోధన-అభ్యసనం) = Education -> Educational Psychology!"'
  },
  {
    id: 1005,
    subjectId: 'cdp',
    pdfQuestionNo: 5,
    topic: 'Scope of Educational Psychology',
    questionEn: 'This does not come under the scope of Educational Psychology:',
    questionTe: 'విద్యామనోవిజ్ఞానశాస్త్ర పరిధి కిందకు రానిది:',
    options: [
      { key: 1, textEn: 'Emotional Development', textTe: 'ఉద్వేగ వికాసం' },
      { key: 2, textEn: 'Personality', textTe: 'మూర్తిమత్వం' },
      { key: 3, textEn: 'Financial Development', textTe: 'ఆర్థిక అభివృద్ధి' },
      { key: 4, textEn: 'Adjustment', textTe: 'సర్దుబాటు' }
    ],
    correctAnswer: 3,
    briefExplanation: 'Educational psychology encompasses emotional, cognitive, social, and personality adjustment. Financial income is an economic parameter.',
    memoryTrick: '💡 గుర్తుంచుకునే చిట్కా: "సైకాలజీ మనసు మరియు ప్రవర్తనకు సంబంధించింది, ధనానికి (Financial) కాదు!"'
  },
  {
    id: 1006,
    subjectId: 'cdp',
    pdfQuestionNo: 6,
    topic: 'Growth Concept',
    questionEn: 'Quantitative changes formed in human body is called:',
    questionTe: 'మానవ శరీరంలో ఏర్పడే పరిమాణాత్మక మార్పులు:',
    options: [
      { key: 1, textEn: 'Growth', textTe: 'పెరుగుదల' },
      { key: 2, textEn: 'Learning', textTe: 'అభ్యసన' },
      { key: 3, textEn: 'Personality', textTe: 'మూర్తిమత్వం' },
      { key: 4, textEn: 'Attitude', textTe: 'వైఖరి' }
    ],
    correctAnswer: 1,
    briefExplanation: 'Growth refers strictly to bodily changes that can be weighed, measured in inches or kg (Quantitative / పరిమాణాత్మకం).',
    memoryTrick: '💡 గుర్తుంచుకునే చిట్కా: "పరిమాణం (కొలవగలిగేది) = పెరుగుదల (Growth); గుణాత్మకం = వికాసం (Development)!"'
  },
  {
    id: 1007,
    subjectId: 'cdp',
    pdfQuestionNo: 7,
    topic: 'History of Psychology',
    questionEn: 'The first psychological laboratory was established at:',
    questionTe: 'మొదటి మనోవిజ్ఞానశాస్త్ర ప్రయోగశాల ప్రారంభించిన ప్రదేశం:',
    options: [
      { key: 1, textEn: 'Leipzig', textTe: 'లీప్ జీగ్ (జర్మనీ)' },
      { key: 2, textEn: 'Delhi', textTe: 'ఢిల్లీ' },
      { key: 3, textEn: 'New York', textTe: 'న్యూయార్క్' },
      { key: 4, textEn: 'Washington', textTe: 'వాషింగ్టన్' }
    ],
    correctAnswer: 1,
    briefExplanation: 'Wilhelm Wundt founded the first experimental psychology laboratory at the University of Leipzig, Germany in 1879.',
    memoryTrick: '💡 గుర్తుంచుకునే చిట్కా: "Wundt 1879 లో Leipzig లో ల్యాబ్ తీసి సైకాలజీకి జీవం పోశాడు!"'
  },
  {
    id: 1008,
    subjectId: 'cdp',
    pdfQuestionNo: 8,
    topic: 'Pedagogical Ethics',
    questionEn: 'Incorrect usage of Educational Psychology to a teacher is:',
    questionTe: 'ఉపాధ్యాయునికి విద్యామనోవిజ్ఞానశాస్త్ర ఉపయోగాల పరంగా సరికానిది:',
    options: [
      { key: 1, textEn: 'Understanding learner’s needs', textTe: 'అభ్యాసకుని అవసరాలను అవగాహన చేసుకొనుటకు' },
      { key: 2, textEn: 'Preparation of curriculum', textTe: 'విద్యాప్రణాళిక తయారీకి' },
      { key: 3, textEn: 'Getting promotion due to good impression at DEO', textTe: 'DEO గారి వద్ద మంచి గుర్తింపు ద్వారా ప్రమోషన్ పొందడానికి' },
      { key: 4, textEn: 'Promoting mental health', textTe: 'మానసిక ఆరోగ్యాన్ని పెంపొందించుటకు' }
    ],
    correctAnswer: 3,
    briefExplanation: 'Educational psychology aims to foster students\' optimal learning, mental well-being, and curriculum adaptation, not personal administrative promotions.',
    memoryTrick: '💡 గుర్తుంచుకునే చిట్కా: "మనోవిజ్ఞానం విద్యార్థుల మేలు కోసం, అధికారి మెప్పు/ప్రమోషన్ల కోసం కాదు!"'
  },
  {
    id: 1009,
    subjectId: 'cdp',
    pdfQuestionNo: 9,
    topic: 'Heredity vs Environment',
    questionEn: 'Development depends on:',
    questionTe: 'వికాసం దీనిపై ఆధారపడుతుంది:',
    options: [
      { key: 1, textEn: 'Only heredity', textTe: 'కేవలం అనువంశికత' },
      { key: 2, textEn: 'Only environment', textTe: 'కేవలం పర్యావరణం' },
      { key: 3, textEn: 'Product of heredity and environment', textTe: 'అనువంశికత మరియు పర్యావరణాల ఉత్పన్నం' },
      { key: 4, textEn: 'Only intelligence', textTe: 'కేవలం ప్రజ్ఞ' }
    ],
    correctAnswer: 3,
    briefExplanation: 'RS Woodworth: D = H × E (Development is a multiplication product of both Nature and Nurture, not an addition or single factor).',
    memoryTrick: '💡 గుర్తుంచుకునే చిట్కా: "D = H × E! అనువంశికత విత్తనం అయితే, పర్యావరణం నీరు/ఎరువులు - రెండూ కలిస్తేనే వికాసం!"'
  },
  {
    id: 1010,
    subjectId: 'cdp',
    pdfQuestionNo: 10,
    topic: 'Schools of Psychology',
    questionEn: '‘Behaviourist’ among the following is:',
    questionTe: 'కింది వారిలో ‘ప్రవర్తనావాది’ (Behaviourist):',
    options: [
      { key: 1, textEn: 'Galton', textTe: 'గాల్టన్' },
      { key: 2, textEn: 'Watson', textTe: 'వాట్సన్' },
      { key: 3, textEn: 'Allport', textTe: 'ఆల్ పోర్ట్' },
      { key: 4, textEn: 'Dugdale', textTe: 'డగ్ డేల్' }
    ],
    correctAnswer: 2,
    briefExplanation: 'John B. Watson is acknowledged as the father of Behaviourism (1913), emphasizing observable behaviors over unobservable conscious mind.',
    memoryTrick: '💡 గుర్తుంచుకునే చిట్కా: "Watson = Watch son -> బిహేవియర్ (ప్రవర్తన)ను పరిశీలించడమే వాట్సన్ సిద్ధాంతం!"'
  },

  // =========================================================================
  // 2. TELUGU LANGUAGE 1 - Sequential as in PDF (Page 66 onward)
  // =========================================================================
  {
    id: 2001,
    subjectId: 'telugu',
    pdfQuestionNo: 1,
    topic: 'శతక పద్యం',
    questionEn: 'Based on the poem, what is the ornament for human ears?',
    questionTe: '‘అమరుఁజెవి శాస్త్రమునఁ గుండలమునఁ గాదు...’ పై పద్యం ఆధారంగా చెవులకు అలంకారము:',
    options: [
      { key: 1, textEn: 'Listening to Shastras (Wisdom)', textTe: 'శాస్త్రశ్రవణం' },
      { key: 2, textEn: 'Earrings (Kundalalu)', textTe: 'కుండలములు' },
      { key: 3, textEn: 'Tatankamulu', textTe: 'తాటంకములు' },
      { key: 4, textEn: 'Armour', textTe: 'కవచములు' }
    ],
    correctAnswer: 1,
    briefExplanation: 'సుభాషిత రత్నావళి పద్యంలో: చెవులకు కుండలాల కన్నా సచ్ఛాస్త్రాలను వినడమే (శాస్త్రశ్రవణం) నిజమైన అలంకారం.',
    memoryTrick: '💡 గుర్తుంచుకునే చిట్కా: "కుండలం చెవికి అందం కాదు, మంచి శాస్త్రం వినడమే చెవికి అసలైన చందం!"'
  },
  {
    id: 2002,
    subjectId: 'telugu',
    pdfQuestionNo: 2,
    topic: 'భాగవత పద్యం',
    questionEn: 'Based on the poem, who should be worshipped with devotion?',
    questionTe: '‘చేతులారంగ శివుని బూజింపడేని...’ పై పద్యం ఆధారంగా చేతులారా పూజించాల్సింది:',
    options: [
      { key: 1, textEn: 'Hari', textTe: 'హరిని' },
      { key: 2, textEn: 'Mother', textTe: 'తల్లిని' },
      { key: 3, textEn: 'Shiva', textTe: 'శివుణ్ణి' },
      { key: 4, textEn: 'Father', textTe: 'తండ్రిని' }
    ],
    correctAnswer: 3,
    briefExplanation: 'పోతన భాగవత పద్యం: చేతులారా శివుని పూజించనివాడు, నోరార హరిని కీర్తించనివాడు తల్లి కడుపుకు చేటు.',
    memoryTrick: '💡 గుర్తుంచుకునే చిట్కా: "చేతులారంగ శివుని పూజించాలె... నోరారంగ హరిని పొగడాలె!"'
  },
  {
    id: 2003,
    subjectId: 'telugu',
    pdfQuestionNo: 3,
    topic: 'పద్య భావం',
    questionEn: 'In the poem, what is the supreme righteousness (Paramadharma)?',
    questionTe: '‘పరహితము సేయు నెవ్వడు...’ పై పద్యంలో పరమోత్తమ ధర్మం:',
    options: [
      { key: 1, textEn: 'Compassion to animals', textTe: 'భూతదయ' },
      { key: 2, textEn: 'Helping others (Parahitamu)', textTe: 'పరహితము' },
      { key: 3, textEn: 'Devotion to law', textTe: 'ధర్మానురక్తి' },
      { key: 4, textEn: 'Self-experience', textTe: 'స్వీయానుభవం' }
    ],
    correctAnswer: 2,
    briefExplanation: '‘పరహితమె పరమధర్మము’ అని స్పష్టంగా చెప్పబడింది. పరులకు హితం చేయుటే అందరికీ ప్రియమైనది.',
    memoryTrick: '💡 గుర్తుంచుకునే చిట్కా: "పరహితమే పరమధర్మం! పరులకు మేలు చేయడమే అత్యున్నత ధర్మం."'
  },
  {
    id: 2004,
    subjectId: 'telugu',
    pdfQuestionNo: 4,
    topic: 'పద్య భావం',
    questionEn: 'Even for supreme sages (Paramayogis), what distress is unavoidable?',
    questionTe: '‘అక్క తల్లి చెల్లె లాత్మజ యెక్కిన...’ పై పద్యం ఆధారంగా పరమయోగులకైనా తప్పనిది:',
    options: [
      { key: 1, textEn: 'Sensory torment / temptation', textTe: 'ఇంద్రియ బాధ' },
      { key: 2, textEn: 'Sensory strength', textTe: 'ఇంద్రియబలం' },
      { key: 3, textEn: 'Brotherly love', textTe: 'సోదర ప్రేమ' },
      { key: 4, textEn: 'Distress from sons', textTe: 'సుతుల పీడ' }
    ],
    correctAnswer: 1,
    briefExplanation: 'పద్యంలో: ఇంద్రియగ్రామం మిక్కిలి పీడను కలుగజేయును; పరమయోగులకైనా ఇంద్రియ బాధ తప్పదు.',
    memoryTrick: '💡 గుర్తుంచుకునే చిట్కా: "యోగులకైనా ఇంద్రియ నిగ్రహం కఠినం -> ఇంద్రియ బాధే వారికి తప్పని పరీక్ష!"'
  },
  {
    id: 2005,
    subjectId: 'telugu',
    pdfQuestionNo: 5,
    topic: 'వేమన శతకం',
    questionEn: 'In Vemana’s verse, what is the door entrance (Gummam) compared to?',
    questionTe: '‘ద్వారబంధమునకు దలుపులు గడియలు వలెనె...’ పై పద్యంలో గుమ్మాన్ని దీనితో పోల్చాడు:',
    options: [
      { key: 1, textEn: 'Doors', textTe: 'తలుపులు' },
      { key: 2, textEn: 'Mouth', textTe: 'నోరు' },
      { key: 3, textEn: 'Earth', textTe: 'భువి' },
      { key: 4, textEn: 'Bolts', textTe: 'గడియలు' }
    ],
    correctAnswer: 2,
    briefExplanation: 'ద్వారబంధానికి తలుపులు గడియలు ఎలాగో, మనిషి నోటికి సత్య నియమాలు అలా రక్షగా ఉండాలని వేమన పోల్చాడు.',
    memoryTrick: '💡 గుర్తుంచుకునే చిట్కా: "ఇంటికి గుమ్మం ద్వారం అయితే, శరీరానికి మాటలు వచ్చే నోరే గుమ్మం!"'
  },
  {
    id: 2006,
    subjectId: 'telugu',
    pdfQuestionNo: 6,
    topic: 'వేమన శతకం',
    questionEn: 'According to the verse, worldly and other-worldly existence arose from:',
    questionTe: '‘పండు వలనఁ బుట్టెఁ బరగ ప్రపంచము...’ పై పద్యం ఆధారంగా ఇహపరాలు దీనివలన పుట్టాయి:',
    options: [
      { key: 1, textEn: 'Peace', textTe: 'శాంతి వలన' },
      { key: 2, textEn: 'Creation', textTe: 'సృష్టివలన' },
      { key: 3, textEn: 'Fruit / Fruit of actions (Pandu)', textTe: 'పండు వలన' },
      { key: 4, textEn: 'Destruction', textTe: 'లయమువలన' }
    ],
    correctAnswer: 3,
    briefExplanation: 'వేమన ప్రకారం ‘పండు వలన బుట్టె పరము నిహము’ అనగా ఫలం (కర్మఫలం లేదా పండు).',
    memoryTrick: '💡 గుర్తుంచుకునే చిట్కా: "పండు = ఫలము. కర్మ ఫలం వలనే సమస్త ప్రపంచం నడుస్తుంది!"'
  },
  {
    id: 2007,
    subjectId: 'telugu',
    pdfQuestionNo: 7,
    topic: 'సుమతీ శతకం',
    questionEn: 'According to Sumati Satakam, who has poison throughout the entire body?',
    questionTe: '‘తలనుండు విషము ఫణికిని...’ పద్యం ఆధారంగా నిలువెల్ల విషం కలవాడు:',
    options: [
      { key: 1, textEn: 'Scorpion', textTe: 'వృశ్చికం' },
      { key: 2, textEn: 'Snake', textTe: 'ఫణి' },
      { key: 3, textEn: 'Bird', textTe: 'ఖగుడు' },
      { key: 4, textEn: 'Wicked person (Khaludu)', textTe: 'ఖలుడు' }
    ],
    correctAnswer: 4,
    briefExplanation: 'పాముకు తలలో, తేలుకు తోకలో విషం ఉంటుంది. కానీ దుర్జనుడైన ఖలునకు తల-తోక తేడా లేకుండా నిలువెల్లా విషమే!',
    memoryTrick: '💡 గుర్తుంచుకునే చిట్కా: "పాము=తల, తేలు=తోక, ఖలుడు (చెడ్డవాడు)=నిలువెల్లా!"'
  },
  {
    id: 2008,
    subjectId: 'telugu',
    pdfQuestionNo: 8,
    topic: 'సుమతీ శతకం',
    questionEn: 'What is the true ornament for hands according to the verse?',
    questionTe: '‘చేతులకు దొడవు దానము...’ పై పద్యం ఆధారంగా చేతులకు అలంకారము:',
    options: [
      { key: 1, textEn: 'Work', textTe: 'కార్యము' },
      { key: 2, textEn: 'Charity / Giving (Danamu)', textTe: 'దానము' },
      { key: 3, textEn: 'Bangle', textTe: 'కంకణము' },
      { key: 4, textEn: 'Ring', textTe: 'ఉంగరము' }
    ],
    correctAnswer: 2,
    briefExplanation: 'చేతులకు బంగారు గాజులు కాక దానం చేయడమే అసలైన అలంకారము (తొడవు). రాజులకు అసత్యం పలకకపోవడమే తొడవు.',
    memoryTrick: '💡 గుర్తుంచుకునే చిట్కా: "చేతులకు దానమే తొడవు (ఆభరణం), కంకణాలు కావు!"'
  },
  {
    id: 2009,
    subjectId: 'telugu',
    pdfQuestionNo: 9,
    topic: 'సుమతీ శతకం',
    questionEn: 'A pond without this is deemed futile/useless by the poet:',
    questionTe: '‘తములము వేయని నోరును...’ ఇది లేని కొలను వ్యర్థమని కవి అన్నాడు:',
    options: [
      { key: 1, textEn: 'Frogs', textTe: 'కప్పలు' },
      { key: 2, textEn: 'Fishes', textTe: 'చేపలు' },
      { key: 3, textEn: 'Lotuses (Kamalamulu)', textTe: 'తామరలు (కమలములు)' },
      { key: 4, textEn: 'Water', textTe: 'నీళ్ళు' }
    ],
    correctAnswer: 3,
    briefExplanation: 'కమలములు లేని కొలను, చంద్రుడు లేని రాత్రి, తాంబూలం వేయని నోరు శోభించవు.',
    memoryTrick: '💡 గుర్తుంచుకునే చిట్కా: "కొలనుకు కమలం అందం! తామర పూలు లేని కొలను వ్యర్థం!"'
  },
  {
    id: 2010,
    subjectId: 'telugu',
    pdfQuestionNo: 10,
    topic: 'సుమతీ శతకం',
    questionEn: 'Without which capable person does a kingdom become like a trunkless elephant?',
    questionTe: '‘మండలపతి సముఖంబున మెండైన ప్రధాని లేక...’ రాజువద్ద సమర్థుడైన ఇతడు ఉండకపోతే రాజ్యం వ్యర్థం:',
    options: [
      { key: 1, textEn: 'Soldier', textTe: 'సైనికుడు' },
      { key: 2, textEn: 'Commander', textTe: 'సైన్యాధ్యక్షుడు' },
      { key: 3, textEn: 'Minister (Pradhani/Mantri)', textTe: 'మంత్రి' },
      { key: 4, textEn: 'Treasurer', textTe: 'కోశాధికారి' }
    ],
    correctAnswer: 3,
    briefExplanation: 'మంత్రి లేని రాజు ఏనుగుకు తొండం లేనట్టివాడు. సమర్థుడైన మంత్రి లేకుంటే రాజ్యం రక్షించబడదు.',
    memoryTrick: '💡 గుర్తుంచుకునే చిట్కా: "ఏనుగుకు తొండం ఎంతో, రాజుకు ప్రధాని/మంత్రి అంత ముఖ్యం!"'
  },

  // =========================================================================
  // 3. ENGLISH LANGUAGE - Sequential as in PDF (Page 113 onward)
  // =========================================================================
  {
    id: 3001,
    subjectId: 'english',
    pdfQuestionNo: 1,
    topic: 'Synonyms',
    questionEn: 'They were stopped by a terrible noise. Choose the synonym of the word “terrible”:',
    questionTe: '"terrible" పదానికి సరైన పర్యాయపదం (Synonym):',
    options: [
      { key: 1, textEn: 'negligible', textTe: 'negligible (అల్పమైన)' },
      { key: 2, textEn: 'dreadful', textTe: 'dreadful (భయానక)' },
      { key: 3, textEn: 'insignificant', textTe: 'insignificant' },
      { key: 4, textEn: 'pleasant', textTe: 'pleasant (ఆహ్లాదకరమైన)' }
    ],
    correctAnswer: 2,
    briefExplanation: '“Terrible” means causing great shock or fear; “dreadful” conveys the exact identical meaning.',
    memoryTrick: '💡 Memory Trick: "TERRIble = DREADful = FEARful. All express terror & dread!"'
  },
  {
    id: 3002,
    subjectId: 'english',
    pdfQuestionNo: 2,
    topic: 'Synonyms',
    questionEn: 'The magic waterfall gave the delicious sake. Choose the synonym of the word “delicious”:',
    questionTe: '"delicious" పదానికి సరైన పర్యాయపదం:',
    options: [
      { key: 1, textEn: 'inedible', textTe: 'inedible' },
      { key: 2, textEn: 'unpalatable', textTe: 'unpalatable' },
      { key: 3, textEn: 'tasty', textTe: 'tasty (రుచికరమైన)' },
      { key: 4, textEn: 'horrible', textTe: 'horrible' }
    ],
    correctAnswer: 3,
    briefExplanation: '“Delicious” describes highly pleasing food or drink; its synonym is “tasty”.',
    memoryTrick: '💡 Memory Trick: "Deli-cious = Deli Food = Super Tasty!"'
  },
  {
    id: 3003,
    subjectId: 'english',
    pdfQuestionNo: 3,
    topic: 'Synonyms',
    questionEn: 'She was also a certified flight instructor. Choose the synonym of the word “instructor”:',
    questionTe: '"instructor" పదానికి సరైన పర్యాయపదం:',
    options: [
      { key: 1, textEn: 'trainer', textTe: 'trainer (శిక్షకుడు)' },
      { key: 2, textEn: 'pupil', textTe: 'pupil' },
      { key: 3, textEn: 'student', textTe: 'student' },
      { key: 4, textEn: 'schoolboy', textTe: 'schoolboy' }
    ],
    correctAnswer: 1,
    briefExplanation: 'An instructor is a teacher or guide who trains learners; hence “trainer” is the right synonym.',
    memoryTrick: '💡 Memory Trick: "Instructor INSTRUCTS & TRAINS -> Trainer!"'
  },
  {
    id: 3004,
    subjectId: 'english',
    pdfQuestionNo: 4,
    topic: 'Synonyms',
    questionEn: 'There was shock and disbelief. Choose the synonym of the word “disbelief”:',
    questionTe: '"disbelief" పదానికి సరైన పర్యాయపదం:',
    options: [
      { key: 1, textEn: 'credence', textTe: 'credence' },
      { key: 2, textEn: 'faith', textTe: 'faith' },
      { key: 3, textEn: 'belief', textTe: 'belief' },
      { key: 4, textEn: 'doubt', textTe: 'doubt (సందేహం / అపనమ్మకం)' }
    ],
    correctAnswer: 4,
    briefExplanation: 'Disbelief is the refusal to accept that something is true, synonymous with “doubt”.',
    memoryTrick: '💡 Memory Trick: "DIS + BELIEF = NO belief = Doubt!"'
  },
  {
    id: 3005,
    subjectId: 'english',
    pdfQuestionNo: 5,
    topic: 'Synonyms',
    questionEn: 'There is no misery about it. Choose the synonym of the word “misery”:',
    questionTe: '"misery" పదానికి సరైన పర్యాయపదం:',
    options: [
      { key: 1, textEn: 'pleasure', textTe: 'pleasure' },
      { key: 2, textEn: 'easy', textTe: 'easy' },
      { key: 3, textEn: 'difficulty', textTe: 'difficulty (బాధ / కష్టం)' },
      { key: 4, textEn: 'contentment', textTe: 'contentment' }
    ],
    correctAnswer: 3,
    briefExplanation: '“Misery” denotes intense unhappiness or suffering, closely related to “difficulty” / hardship.',
    memoryTrick: '💡 Memory Trick: "Miserable = Full of difficulties & distress!"'
  },
  {
    id: 3006,
    subjectId: 'english',
    pdfQuestionNo: 6,
    topic: 'Synonyms',
    questionEn: 'The two friends were seldom seen together. Choose the synonym of the word “seldom”:',
    questionTe: '"seldom" పదానికి సరైన పర్యాయపదం:',
    options: [
      { key: 1, textEn: 'often', textTe: 'often' },
      { key: 2, textEn: 'rarely', textTe: 'rarely (అరుదుగా)' },
      { key: 3, textEn: 'frequently', textTe: 'frequently' },
      { key: 4, textEn: 'never', textTe: 'never' }
    ],
    correctAnswer: 2,
    briefExplanation: '“Seldom” means not often or infrequently; its direct synonym is “rarely”.',
    memoryTrick: '💡 Memory Trick: "Seldom = Scarcely / Rarely seen!"'
  },
  {
    id: 3007,
    subjectId: 'english',
    pdfQuestionNo: 7,
    topic: 'Synonyms',
    questionEn: 'He brought us nothing but ruin. Choose the synonym of the word “ruin”:',
    questionTe: '"ruin" పదానికి సరైన పర్యాయపదం:',
    options: [
      { key: 1, textEn: 'reconstruction', textTe: 'reconstruction' },
      { key: 2, textEn: 'preservation', textTe: 'preservation' },
      { key: 3, textEn: 'care', textTe: 'care' },
      { key: 4, textEn: 'damage', textTe: 'damage (నాశనం / నష్టం)' }
    ],
    correctAnswer: 4,
    briefExplanation: '“Ruin” means the state of being decayed, collapsed, or destroyed; thus “damage”.',
    memoryTrick: '💡 Memory Trick: "Ruined building = Damaged and broken!"'
  },
  {
    id: 3008,
    subjectId: 'english',
    pdfQuestionNo: 8,
    topic: 'Synonyms',
    questionEn: 'It was to be a battle of champions. Choose the synonym of the word “battle”:',
    questionTe: '"battle" పదానికి సరైన పర్యాయపదం:',
    options: [
      { key: 1, textEn: 'truce', textTe: 'truce' },
      { key: 2, textEn: 'fight', textTe: 'fight (పోరాటం / యుద్ధం)' },
      { key: 3, textEn: 'peace', textTe: 'peace' },
      { key: 4, textEn: 'calm', textTe: 'calm' }
    ],
    correctAnswer: 2,
    briefExplanation: 'A “battle” is an armed fight or combat between adversaries; synonym is “fight”.',
    memoryTrick: '💡 Memory Trick: "Battlefield = Fighting ground -> Fight!"'
  },
  {
    id: 3009,
    subjectId: 'english',
    pdfQuestionNo: 9,
    topic: 'Synonyms',
    questionEn: 'What a weird sound! Choose the synonym of the word “weird”:',
    questionTe: '"weird" పదానికి సరైన పర్యాయపదం:',
    options: [
      { key: 1, textEn: 'normal', textTe: 'normal' },
      { key: 2, textEn: 'ordinary', textTe: 'ordinary' },
      { key: 3, textEn: 'strange', textTe: 'strange (విచిత్రమైన)' },
      { key: 4, textEn: 'usual', textTe: 'usual' }
    ],
    correctAnswer: 3,
    briefExplanation: '“Weird” refers to something uncanny, bizarre, or supernatural; synonym is “strange”.',
    memoryTrick: '💡 Memory Trick: "Weird sound = Unnatural & Strange!"'
  },
  {
    id: 3010,
    subjectId: 'english',
    pdfQuestionNo: 10,
    topic: 'Synonyms',
    questionEn: 'So many vendors came to the door. Choose the synonym of the word “vendors”:',
    questionTe: '"vendors" పదానికి సరైన పర్యాయపదం:',
    options: [
      { key: 1, textEn: 'sellers', textTe: 'sellers (విక్రేతలు)' },
      { key: 2, textEn: 'buyers', textTe: 'buyers' },
      { key: 3, textEn: 'customers', textTe: 'customers' },
      { key: 4, textEn: 'consumers', textTe: 'consumers' }
    ],
    correctAnswer: 1,
    briefExplanation: 'A “vendor” is someone who sells goods; synonym is “seller”.',
    memoryTrick: '💡 Memory Trick: "Vend = Sell (Vending machine sells items) -> Sellers!"'
  },

  // =========================================================================
  // 4. MATHEMATICS - Sequential as in PDF (Page 160 onward) with Step-by-Step
  // =========================================================================
  {
    id: 4001,
    subjectId: 'mathematics',
    pdfQuestionNo: 1,
    topic: 'Arithmetic Progression & Division',
    questionEn: 'Number of two digit numbers that are divisible by 4 is:',
    questionTe: '4 చే నిశ్శేషంగా భాగింపబడే రెండంకెల సంఖ్యల సంఖ్య:',
    options: [
      { key: 1, textEn: '21', textTe: '21' },
      { key: 2, textEn: '22', textTe: '22' },
      { key: 3, textEn: '23', textTe: '23' },
      { key: 4, textEn: '24', textTe: '24' }
    ],
    correctAnswer: 2,
    stepExplanation: {
      formulaOrConcept: 'Arithmetic Progression nth term: a_n = a + (n - 1)d, or Count = ((Last - First) / Difference) + 1',
      givenData: 'Two-digit numbers range from 10 to 99. Multiples of 4 are: 12, 16, 20, ..., 96.',
      stepByStepCalc: [
        'First two-digit number divisible by 4: a = 12',
        'Last two-digit number divisible by 4: a_n = 96 (since 99 = 4 × 24 + 3, 99 - 3 = 96)',
        'Common difference: d = 4',
        'Apply formula: n = ((96 - 12) / 4) + 1',
        'Calculate: n = (84 / 4) + 1 = 21 + 1 = 22'
      ],
      conclusion: 'Therefore, there are exactly 22 two-digit numbers divisible by 4.'
    }
  },
  {
    id: 4002,
    subjectId: 'mathematics',
    pdfQuestionNo: 2,
    topic: 'LCM & HCF Relations',
    questionEn: 'LCM of two numbers is 120 and their HCF is 10. If one of the numbers is 30, then the other number is:',
    questionTe: 'రెండు సంఖ్యల క.సా.గు 120 మరియు వాటి గ.సా.భా 10. అందులో ఒక సంఖ్య 30 అయితే రెండవ సంఖ్య:',
    options: [
      { key: 1, textEn: '20', textTe: '20' },
      { key: 2, textEn: '40', textTe: '40' },
      { key: 3, textEn: '60', textTe: '60' },
      { key: 4, textEn: '80', textTe: '80' }
    ],
    correctAnswer: 2,
    stepExplanation: {
      formulaOrConcept: 'Product of two numbers = Product of their LCM and HCF (A × B = LCM × HCF)',
      givenData: 'LCM = 120, HCF = 10, First number (A) = 30, Second number = B',
      stepByStepCalc: [
        'Set up equation: A × B = LCM × HCF',
        'Substitute values: 30 × B = 120 × 10',
        '30 × B = 1200',
        'Solve for B: B = 1200 / 30',
        'B = 40'
      ],
      conclusion: 'Thus, the other number is 40.'
    }
  },
  {
    id: 4003,
    subjectId: 'mathematics',
    pdfQuestionNo: 3,
    topic: 'Real Numbers - Decimals',
    questionEn: 'Which of the following is a terminating decimal?',
    questionTe: 'ఈ క్రింది వానిలో ఏది అంతమయ్యే దశాంశము (Terminating Decimal)?',
    options: [
      { key: 1, textEn: '77 / 210', textTe: '77 / 210' },
      { key: 2, textEn: '21 / 60', textTe: '21 / 60' },
      { key: 3, textEn: '8 / 15', textTe: '8 / 15' },
      { key: 4, textEn: '12 / 55', textTe: '12 / 55' }
    ],
    correctAnswer: 2,
    stepExplanation: {
      formulaOrConcept: 'A rational number in lowest terms p/q terminates if and only if the denominator q has prime factors of the form 2^n × 5^m.',
      givenData: 'Options: (1) 77/210, (2) 21/60, (3) 8/15, (4) 12/55',
      stepByStepCalc: [
        'Examine Option 1: 77/210 = 11/30 = 11 / (2 × 3 × 5) -> Contains 3 -> Non-terminating.',
        'Examine Option 2: 21/60 simplify by dividing numerator and denominator by 3: 21/60 = 7/20.',
        'Prime factorize denominator 20: 20 = 2² × 5¹.',
        'Since 20 has only prime factors 2 and 5, 7/20 = 0.35, which terminates!',
        'Examine Option 3: 8/15 -> Denominator 15 = 3 × 5 (contains 3) -> Non-terminating.',
        'Examine Option 4: 12/55 -> Denominator 55 = 5 × 11 (contains 11) -> Non-terminating.'
      ],
      conclusion: 'Only 21/60 reduces to 7/20 with denominator 2² × 5, hence it is a terminating decimal (0.35).'
    }
  },
  {
    id: 4004,
    subjectId: 'mathematics',
    pdfQuestionNo: 4,
    topic: 'Number Theory - Primes',
    questionEn: 'Which of the following is NOT a prime number?',
    questionTe: 'ఈ క్రింది వానిలో ప్రధాన సంఖ్య కానిది (Not a Prime):',
    options: [
      { key: 1, textEn: '4² + 5²', textTe: '4² + 5²' },
      { key: 2, textEn: '5² + 6²', textTe: '5² + 6²' },
      { key: 3, textEn: '6² + 7²', textTe: '6² + 7²' },
      { key: 4, textEn: '7² + 8²', textTe: '7² + 8²' }
    ],
    correctAnswer: 3,
    stepExplanation: {
      formulaOrConcept: 'Evaluate each expression: check if it is divisible by any integer other than 1 and itself.',
      givenData: 'Test the squares sum for all 4 options:',
      stepByStepCalc: [
        'Option 1: 4² + 5² = 16 + 25 = 41 (41 is a prime number).',
        'Option 2: 5² + 6² = 25 + 36 = 61 (61 is a prime number).',
        'Option 3: 6² + 7² = 36 + 49 = 85.',
        'Check factors of 85: 85 ends in 5, so 85 = 5 × 17 -> It has factors 1, 5, 17, 85! Composite!',
        'Option 4: 7² + 8² = 49 + 64 = 113 (113 is a prime number).'
      ],
      conclusion: '85 (6² + 7²) is divisible by 5 and 17, so it is NOT a prime number.'
    }
  },
  {
    id: 4005,
    subjectId: 'mathematics',
    pdfQuestionNo: 5,
    topic: 'LCM & Divisibility',
    questionEn: 'The smallest three digit number that is divisible by 4, 6 and 8 is:',
    questionTe: '4, 6 మరియు 8 ల చే నిశ్శేషంగా భాగించబడే అతి చిన్న మూడంకెల సంఖ్య:',
    options: [
      { key: 1, textEn: '108', textTe: '108' },
      { key: 2, textEn: '114', textTe: '114' },
      { key: 3, textEn: '120', textTe: '120' },
      { key: 4, textEn: '144', textTe: '144' }
    ],
    correctAnswer: 3,
    stepExplanation: {
      formulaOrConcept: 'Any number divisible by 4, 6, and 8 must be a multiple of LCM(4, 6, 8).',
      givenData: 'Find the smallest 3-digit multiple of LCM(4, 6, 8).',
      stepByStepCalc: [
        'Step 1: Calculate LCM(4, 6, 8):',
        '4 = 2², 6 = 2 × 3, 8 = 2³ -> LCM = 2³ × 3 = 24.',
        'Step 2: Smallest 3-digit number is 100.',
        'Step 3: Divide 100 by 24: 100 / 24 = 4 with remainder 4 (4 × 24 = 96).',
        'Step 4: Next multiple = 24 × 5 = 120.'
      ],
      conclusion: '120 is the smallest three-digit number divisible by 4, 6, and 8.'
    }
  },
  {
    id: 4006,
    subjectId: 'mathematics',
    pdfQuestionNo: 6,
    topic: 'Highest Common Factor',
    questionEn: 'HCF of 75, 105 and 175 is:',
    questionTe: '75, 105 మరియు 175 ల గ.సా.భా (HCF):',
    options: [
      { key: 1, textEn: '5', textTe: '5' },
      { key: 2, textEn: '7', textTe: '7' },
      { key: 3, textEn: '15', textTe: '15' },
      { key: 4, textEn: '35', textTe: '35' }
    ],
    correctAnswer: 1,
    stepExplanation: {
      formulaOrConcept: 'HCF is the product of the smallest powers of each common prime factor.',
      givenData: 'Numbers: 75, 105, 175',
      stepByStepCalc: [
        'Prime factorization of 75: 75 = 3 × 5² = 3¹ × 5²',
        'Prime factorization of 105: 105 = 3 × 5 × 7 = 3¹ × 5¹ × 7¹',
        'Prime factorization of 175: 175 = 5² × 7 = 5² × 7¹',
        'Identify common prime factors across all three:',
        'Prime factor 3 is missing in 175.',
        'Prime factor 7 is missing in 75.',
        'Only 5 is present in all three: minimum power is 5¹ = 5.'
      ],
      conclusion: 'Therefore, the HCF is 5.'
    }
  },
  {
    id: 4007,
    subjectId: 'mathematics',
    pdfQuestionNo: 7,
    topic: 'Factorization',
    questionEn: 'Total number of factors of 600 is:',
    questionTe: '600 నకు గల మొత్తం కారణాంకముల సంఖ్య:',
    options: [
      { key: 1, textEn: '20', textTe: '20' },
      { key: 2, textEn: '24', textTe: '24' },
      { key: 3, textEn: '30', textTe: '30' },
      { key: 4, textEn: '36', textTe: '36' }
    ],
    correctAnswer: 2,
    stepExplanation: {
      formulaOrConcept: 'If N = p^a × q^b × r^c, total factors = (a + 1)(b + 1)(c + 1)',
      givenData: 'Number N = 600',
      stepByStepCalc: [
        'Prime factorize 600: 600 = 6 × 100 = (2 × 3) × (2² × 5²)',
        '600 = 2³ × 3¹ × 5²',
        'Here exponents are: a = 3, b = 1, c = 2',
        'Total factors = (3 + 1) × (1 + 1) × (2 + 1)',
        'Total factors = 4 × 2 × 3 = 24'
      ],
      conclusion: 'The number 600 has exactly 24 factors.'
    }
  },
  {
    id: 4008,
    subjectId: 'mathematics',
    pdfQuestionNo: 8,
    topic: 'Rational Numbers',
    questionEn: 'A rational number in between 1/4 and 1/2 is:',
    questionTe: '1/4 మరియు 1/2 ల మధ్య గల ఒక అకరణీయ సంఖ్య:',
    options: [
      { key: 1, textEn: '3 / 7', textTe: '3 / 7' },
      { key: 2, textEn: '4 / 7', textTe: '4 / 7' },
      { key: 3, textEn: '5 / 8', textTe: '5 / 8' },
      { key: 4, textEn: '6 / 11', textTe: '6 / 11' }
    ],
    correctAnswer: 1,
    stepExplanation: {
      formulaOrConcept: 'Convert fractions to decimals or common denominators: 1/4 = 0.25 and 1/2 = 0.50. Look for a value x such that 0.25 < x < 0.50.',
      givenData: 'Interval: (0.25, 0.50)',
      stepByStepCalc: [
        'Option 1: 3/7 ≈ 0.428. Since 0.25 < 0.428 < 0.50, 3/7 lies strictly inside!',
        'Option 2: 4/7 ≈ 0.571 (Greater than 0.50 -> Outside).',
        'Option 3: 5/8 = 0.625 (Greater than 0.50 -> Outside).',
        'Option 4: 6/11 ≈ 0.545 (Greater than 0.50 -> Outside).'
      ],
      conclusion: 'Therefore, 3/7 is the rational number between 1/4 and 1/2.'
    }
  },
  {
    id: 4009,
    subjectId: 'mathematics',
    pdfQuestionNo: 9,
    topic: 'Averages',
    questionEn: 'The Average of 4.2, 3.8 and 7.6 is:',
    questionTe: '4.2, 3.8 మరియు 7.6 యొక్క సగటు (Average):',
    options: [
      { key: 1, textEn: '4.2', textTe: '4.2' },
      { key: 2, textEn: '4.8', textTe: '4.8' },
      { key: 3, textEn: '5.2', textTe: '5.2' },
      { key: 4, textEn: '4.6', textTe: '4.6' }
    ],
    correctAnswer: 3,
    stepExplanation: {
      formulaOrConcept: 'Average = Sum of observations / Number of observations (సరాసరి = రాశుల మొత్తం / రాశుల సంఖ్య)',
      givenData: 'Observations: 4.2, 3.8, 7.6 (Total count n = 3)',
      stepByStepCalc: [
        'Sum = 4.2 + 3.8 + 7.6',
        '4.2 + 3.8 = 8.0',
        '8.0 + 7.6 = 15.6',
        'Average = 15.6 / 3',
        '15.6 / 3 = 5.2'
      ],
      conclusion: 'The average is 5.2.'
    }
  },
  {
    id: 4010,
    subjectId: 'mathematics',
    pdfQuestionNo: 10,
    topic: 'Decimals',
    questionEn: 'Half of 0.1 is:',
    questionTe: '0.1 నందు సగము:',
    options: [
      { key: 1, textEn: '0.02', textTe: '0.02' },
      { key: 2, textEn: '0.5', textTe: '0.5' },
      { key: 3, textEn: '0.05', textTe: '0.05' },
      { key: 4, textEn: '0.2', textTe: '0.2' }
    ],
    correctAnswer: 3,
    stepExplanation: {
      formulaOrConcept: 'Half of x = x / 2',
      givenData: 'x = 0.1 = 1/10',
      stepByStepCalc: [
        'Half of 0.1 = 0.1 / 2',
        'Express as fraction: (1/10) / 2 = 1 / 20',
        'Divide 1 by 20: 1 / 20 = 5 / 100 = 0.05'
      ],
      conclusion: 'Half of 0.1 is 0.05.'
    }
  },

  // =========================================================================
  // 5. PHYSICAL SCIENCE - Sequential as in PDF (Page 182 onward) with Step-by-Step
  // =========================================================================
  {
    id: 5001,
    subjectId: 'physical_science',
    pdfQuestionNo: 1,
    topic: 'Motion - Unit Conversion',
    questionEn: 'The speed of a car is 36 km/h. Its speed in m/s is:',
    questionTe: 'ఒక కారు వడి 36 కి.మీ./గం. దాని వడి మీ/సె లలో:',
    options: [
      { key: 1, textEn: '18 m/s', textTe: '18 మీ/సె' },
      { key: 2, textEn: '72 m/s', textTe: '72 మీ/సె' },
      { key: 3, textEn: '5 m/s', textTe: '5 మీ/సె' },
      { key: 4, textEn: '10 m/s', textTe: '10 మీ/సె' }
    ],
    correctAnswer: 4,
    stepExplanation: {
      formulaOrConcept: 'Speed (m/s) = Speed (km/h) × (5 / 18), derived from 1 km = 1000m and 1 hr = 3600s (1000/3600 = 5/18).',
      givenData: 'Speed v = 36 km/h',
      stepByStepCalc: [
        'Apply conversion factor: v = 36 × (5 / 18)',
        'Divide 36 by 18: 36 / 18 = 2',
        'Multiply by 5: 2 × 5 = 10 m/s'
      ],
      conclusion: 'Hence, 36 km/h equals 10 m/s.'
    }
  },
  {
    id: 5002,
    subjectId: 'physical_science',
    pdfQuestionNo: 2,
    topic: 'Average Speed',
    questionEn: 'A car travels 16m in 3s and another 16m in 5s. The average speed of car is (in m/s):',
    questionTe: 'ఒక కారు 3 సె. లలో 16 మీ.లు ప్రయాణిస్తుంది. ఆ పై మరొక 5 సె. లలో మరో 16 మీ.లు ప్రయాణిస్తే, ఆ కారు సరాసరి వడి (మీ/సె లలో):',
    options: [
      { key: 1, textEn: '8 m/s', textTe: '8' },
      { key: 2, textEn: '6 m/s', textTe: '6' },
      { key: 3, textEn: '4 m/s', textTe: '4' },
      { key: 4, textEn: '2 m/s', textTe: '2' }
    ],
    correctAnswer: 3,
    stepExplanation: {
      formulaOrConcept: 'Average Speed = Total Distance Covered / Total Time Taken (సరాసరి వడి = మొత్తం ప్రయాణించిన దూరం / మొత్తం సమయం)',
      givenData: 'Distance 1: s1 = 16 m, Time 1: t1 = 3 s; Distance 2: s2 = 16 m, Time 2: t2 = 5 s',
      stepByStepCalc: [
        'Total Distance S = s1 + s2 = 16 m + 16 m = 32 m',
        'Total Time T = t1 + t2 = 3 s + 5 s = 8 s',
        'Average Speed = Total Distance / Total Time',
        'Average Speed = 32 m / 8 s = 4 m/s'
      ],
      conclusion: 'The average speed of the car is 4 m/s.'
    }
  },
  {
    id: 5003,
    subjectId: 'physical_science',
    pdfQuestionNo: 3,
    topic: 'Kinematics Formulas',
    questionEn: 'The formula for average velocity (when velocity changes at a uniform rate) is:',
    questionTe: 'సరాసరి వేగానికి (Average Velocity) సరైన సూత్రం:',
    options: [
      { key: 1, textEn: 'Initial velocity + Final velocity', textTe: 'తొలి వేగం + తుది వేగం' },
      { key: 2, textEn: 'Initial velocity – Final velocity', textTe: 'తొలి వేగం - తుది వేగం' },
      { key: 3, textEn: '(Initial velocity + Final velocity) / 2', textTe: '(తొలి వేగం + తుది వేగం) / 2' },
      { key: 4, textEn: '(Initial velocity − Final velocity) / 2', textTe: '(తొలి వేగం − తుది వేగం) / 2' }
    ],
    correctAnswer: 3,
    stepExplanation: {
      formulaOrConcept: 'V_avg = (u + v) / 2 for uniformly accelerated motion.',
      givenData: 'u = Initial velocity (తొలి వేగం), v = Final velocity (తుది వేగం)',
      stepByStepCalc: [
        'For constant acceleration, the velocity increases linearly over time.',
        'The arithmetic mean of initial and final velocities gives the average velocity: V_avg = (u + v) / 2.'
      ],
      conclusion: 'Therefore, Average Velocity = (Initial velocity + Final velocity) / 2.'
    }
  },
  {
    id: 5004,
    subjectId: 'physical_science',
    pdfQuestionNo: 4,
    topic: 'Units and Dimensions',
    questionEn: 'The units of Acceleration in S.I. System is:',
    questionTe: 'S.I పద్దతిలో త్వరణానికి ప్రమాణాలు (Units of Acceleration):',
    options: [
      { key: 1, textEn: 'm', textTe: 'మీ.' },
      { key: 2, textEn: 'm/s', textTe: 'మీ/సె' },
      { key: 3, textEn: 'm/s²', textTe: 'మీ/సె²' },
      { key: 4, textEn: 'm s²', textTe: 'మీ. సె²' }
    ],
    correctAnswer: 3,
    stepExplanation: {
      formulaOrConcept: 'Acceleration a = Rate of change of velocity = Δv / Δt',
      givenData: 'Unit of velocity Δv = m/s, Unit of time Δt = s',
      stepByStepCalc: [
        'Substitute units into the acceleration formula:',
        'Unit of a = (m / s) / s',
        'Unit of a = m / s² (or m·s⁻²)'
      ],
      conclusion: 'The SI unit of acceleration is m/s².'
    }
  },
  {
    id: 5005,
    subjectId: 'physical_science',
    pdfQuestionNo: 5,
    topic: 'Free Fall',
    questionEn: 'The initial velocity of a freely falling object is:',
    questionTe: 'స్వేచ్ఛా పతన వస్తువు యొక్క తొలి వేగం (Initial velocity of freely falling body):',
    options: [
      { key: 1, textEn: 'Zero', textTe: 'శూన్యం (Zero)' },
      { key: 2, textEn: 'Maximum', textTe: 'గరిష్టం' },
      { key: 3, textEn: 'One', textTe: 'ఒకటి' },
      { key: 4, textEn: 'Cannot say', textTe: 'చెప్పలేము' }
    ],
    correctAnswer: 1,
    stepExplanation: {
      formulaOrConcept: 'Definition of Free Fall: An object dropped from rest under the influence of gravity alone.',
      givenData: 'Freely falling object at t = 0',
      stepByStepCalc: [
        'At the instant an object is released from rest, no initial impulse has been imparted.',
        'Initial velocity u = 0 m/s.',
        'As time progresses, velocity increases according to v = gt.'
      ],
      conclusion: 'The initial velocity is strictly zero.'
    }
  },
  {
    id: 5006,
    subjectId: 'physical_science',
    pdfQuestionNo: 6,
    topic: 'Displacement in Circular Motion',
    questionEn: 'An athlete is running in a circular track of radius 120 m and reaches the starting point in 1 minute. The displacement of the athlete is (in meters):',
    questionTe: 'ఒక క్రీడాకారుడు 120 మీ. ల వ్యాసార్ధం గల ఒక వృత్తాకార ట్రాక్ పై పరిగెడుతూ, పరుగు మొదలు పెట్టిన స్థానానికి ఒక నిముషంలో చేరాడు. ఆయన పొందిన స్థానభ్రంశం (మీ. లలో):',
    options: [
      { key: 1, textEn: '120 m', textTe: '120' },
      { key: 2, textEn: '60 m', textTe: '60' },
      { key: 3, textEn: '2 m', textTe: '2' },
      { key: 4, textEn: '0 m', textTe: '0' }
    ],
    correctAnswer: 4,
    stepExplanation: {
      formulaOrConcept: 'Displacement is the shortest straight-line vector from the initial position to the final position.',
      givenData: 'Initial position = Starting point; Final position after 1 minute = Starting point.',
      stepByStepCalc: [
        'Distance covered = Perimeter = 2πr = 2 × π × 120 = 240π m.',
        'However, Displacement = |Final Position - Initial Position|.',
        'Since the athlete returns to the exact starting point, Final Position = Initial Position.',
        'Displacement = 0 meters.'
      ],
      conclusion: 'The displacement is 0 m.'
    }
  },
  {
    id: 5007,
    subjectId: 'physical_science',
    pdfQuestionNo: 7,
    topic: 'Equations of Motion',
    questionEn: 'In the third equation of motion v² – u² = 2as, ‘a’ represents:',
    questionTe: 'v² – u² = 2as సమీకరణము నందు ‘a’ సూచించేది:',
    options: [
      { key: 1, textEn: 'Initial velocity', textTe: 'తొలివేగం' },
      { key: 2, textEn: 'Final velocity', textTe: 'తుదివేగం' },
      { key: 3, textEn: 'Acceleration', textTe: 'త్వరణం (Acceleration)' },
      { key: 4, textEn: 'Distance', textTe: 'దూరం' }
    ],
    correctAnswer: 3,
    stepExplanation: {
      formulaOrConcept: 'Kinematic variables: v = final velocity, u = initial velocity, a = acceleration, s = displacement.',
      givenData: 'Equation v² - u² = 2as',
      stepByStepCalc: [
        'v: final velocity (తుది వేగం)',
        'u: initial velocity (తొలి వేగం)',
        'a: uniform acceleration (త్వరణం)',
        's: distance/displacement (స్థానభ్రంశం/దూరం)'
      ],
      conclusion: 'Symbol "a" designates Acceleration.'
    }
  },
  {
    id: 5008,
    subjectId: 'physical_science',
    pdfQuestionNo: 8,
    topic: 'Uniform Acceleration',
    questionEn: 'A train starting from rest gains a velocity of 20 m/s in 5 seconds. The acceleration of the train is (in m/s²):',
    questionTe: 'నిశ్చల స్థితి నుండి బయలుదేరిన ఒక రైలు బండి 5 సెకనులలో 20 మీ/సె వేగాన్ని పొందినది. ఆ రైలు బండి త్వరణం (మీ/సె² లలో):',
    options: [
      { key: 1, textEn: '2', textTe: '2' },
      { key: 2, textEn: '4', textTe: '4' },
      { key: 3, textEn: '6', textTe: '6' },
      { key: 4, textEn: '8', textTe: '8' }
    ],
    correctAnswer: 2,
    stepExplanation: {
      formulaOrConcept: 'Acceleration formula: a = (v - u) / t',
      givenData: 'Train starts from rest -> u = 0 m/s; Final velocity v = 20 m/s; Time t = 5 s',
      stepByStepCalc: [
        'Substitute into formula: a = (20 - 0) / 5',
        'a = 20 / 5',
        'a = 4 m/s²'
      ],
      conclusion: 'The acceleration is 4 m/s².'
    }
  },
  {
    id: 5009,
    subjectId: 'physical_science',
    pdfQuestionNo: 9,
    topic: 'Unit Conversion',
    questionEn: 'Five kilometres is equal to (in meters):',
    questionTe: 'ఐదు కిలోమీటర్లు దీనికి సమానం (మీ. లలో):',
    options: [
      { key: 1, textEn: '5 m', textTe: '5' },
      { key: 2, textEn: '50 m', textTe: '50' },
      { key: 3, textEn: '500 m', textTe: '500' },
      { key: 4, textEn: '5000 m', textTe: '5000' }
    ],
    correctAnswer: 4,
    stepExplanation: {
      formulaOrConcept: 'Metric prefix "kilo" represents 10³ = 1000.',
      givenData: '1 km = 1000 m',
      stepByStepCalc: [
        '5 km = 5 × 1000 m',
        '5 × 1000 = 5000 m'
      ],
      conclusion: '5 kilometres = 5000 meters.'
    }
  },
  {
    id: 5010,
    subjectId: 'physical_science',
    pdfQuestionNo: 10,
    topic: 'Types of Motion',
    questionEn: 'Motion of the needle of a sewing machine is an example of:',
    questionTe: 'కుట్టు మిషన్ సూది యొక్క కదలిక ఈ చలనాన్ని కలిగి ఉంటుంది:',
    options: [
      { key: 1, textEn: 'Rectilinear motion', textTe: 'సరళ రేఖీయ చలనం' },
      { key: 2, textEn: 'Oscillatory motion', textTe: 'డోలన చలనం (Oscillatory motion)' },
      { key: 3, textEn: 'Rotatory motion', textTe: 'భ్రమణ చలనం' },
      { key: 4, textEn: 'Circulatory motion', textTe: 'వృత్తాకార చలనం' }
    ],
    correctAnswer: 2,
    stepExplanation: {
      formulaOrConcept: 'To-and-fro periodic motion of a body about a fixed point is termed Oscillatory motion.',
      givenData: 'Needle of sewing machine moving up and down repeatedly.',
      stepByStepCalc: [
        'The sewing needle moves up and down periodically about its mean position.',
        'This repetitive back-and-forth cycle fits the definition of Oscillatory (డోలన) motion.'
      ],
      conclusion: 'Hence, the motion is Oscillatory motion.'
    }
  },

  // =========================================================================
  // 6. BIOLOGICAL SCIENCE - Sequential as in PDF (Page 205 onward) with Memory Tricks
  // =========================================================================
  {
    id: 6001,
    subjectId: 'biology',
    pdfQuestionNo: 1,
    topic: 'Plant Morphology',
    questionEn: 'Plants having parallel venation of leaves have this type of root system:',
    questionTe: 'పత్రాలలో సమాంతర ఈనెల వ్యాపనం కలిగిన మొక్కలు ఈ రకమైన వేరు వ్యవస్థను కలిగి ఉంటాయి:',
    options: [
      { key: 1, textEn: 'Tap Root System', textTe: 'తల్లి వేరు వ్యవస్థ' },
      { key: 2, textEn: 'Main Root System', textTe: 'ప్రధాన వేరు వ్యవస్థ' },
      { key: 3, textEn: 'Parallel Root System', textTe: 'సమాంతర వేరు వ్యవస్థ' },
      { key: 4, textEn: 'Fibrous Root System', textTe: 'గుబురు వేరు వ్యవస్థ (పీచు వేర్లు)' }
    ],
    correctAnswer: 4,
    briefExplanation: 'Monocotyledonous plants with parallel leaf venation (e.g. grasses, wheat, paddy) possess fibrous/adventitious root systems. Dicotyledonous plants with reticulate venation have tap root systems.',
    memoryTrick: '💡 గుర్తుంచుకునే చిట్కా: "P-F vs R-T: Parallel venation = Fibrous roots (Monocots); Reticulate venation = Tap roots (Dicots)!"'
  },
  {
    id: 6002,
    subjectId: 'biology',
    pdfQuestionNo: 2,
    topic: 'Flower Morphology',
    questionEn: 'The innermost part of the flower is A and it produces B. Find out A and B:',
    questionTe: 'పుష్పంలో లోపలిభాగం A మరియు అది B ను ఉత్పత్తి చేస్తుంది. A మరియు B లను కనుగొనండి:',
    options: [
      { key: 1, textEn: 'A-Stamen, B-Pollen', textTe: 'A- కేసరం, B- పరాగ రేణువు' },
      { key: 2, textEn: 'A-Pistil, B-Ovary', textTe: 'A- అండకోశం, B- అండాశయం' },
      { key: 3, textEn: 'A-Pistil, B-Ovules', textTe: 'A- అండకోశం (Pistil), B- అండాలు (Ovules)' },
      { key: 4, textEn: 'A-Stamen, B-Ovules', textTe: 'A- కేసరం, B- అండాలు' }
    ],
    correctAnswer: 3,
    briefExplanation: 'The central, innermost whorl of a flower is the Pistil/Carpel (అండకోశం), within which the ovary produces ovules (అండాలు).',
    memoryTrick: '💡 గుర్తుంచుకునే చిట్కా: "పుష్ప గర్భం: లోపల Pistil (అండకోశం) -> అది తయారుచేసేది Ovules (అండాలు)!"'
  },
  {
    id: 6003,
    subjectId: 'biology',
    pdfQuestionNo: 3,
    topic: 'Plant Anatomy',
    questionEn: 'Nodes and internodes are present in this plant part:',
    questionTe: 'కణుపులు, కణుపు నడిమిభాగాలు మొక్కలోని ఈ భాగంలో ఉంటాయి:',
    options: [
      { key: 1, textEn: 'Stem', textTe: 'కాండం (Stem)' },
      { key: 2, textEn: 'Root', textTe: 'వేరు' },
      { key: 3, textEn: 'Leaf', textTe: 'పత్రం' },
      { key: 4, textEn: 'Bud', textTe: 'మొగ్గ' }
    ],
    correctAnswer: 1,
    briefExplanation: 'The defining morphological feature distinguishing stems from roots is the presence of nodes (కణుపులు) and internodes (కణుపు నడిమి భాగాలు).',
    memoryTrick: '💡 గుర్తుంచుకునే చిట్కా: "చెరకు గడ చూడండి: గణుపులు (Nodes) కాండం మీదనే ఉంటాయి, వేర్ల మీద ఉండవు!"'
  },
  {
    id: 6004,
    subjectId: 'biology',
    pdfQuestionNo: 4,
    topic: 'Plant Adaptations',
    questionEn: 'Insectivorous leaves are found in this plant:',
    questionTe: 'కీటకాహార పత్రాలు ఈ మొక్కలో కనిపిస్తాయి:',
    options: [
      { key: 1, textEn: 'Vanda', textTe: 'వాండా' },
      { key: 2, textEn: 'Pitcher plant', textTe: 'పిట్చర్ ప్లాంట్ (Nepenthes)' },
      { key: 3, textEn: 'Bryophyllum', textTe: 'బ్రయోఫిల్లం' },
      { key: 4, textEn: 'Pea', textTe: 'బఠాణీ' }
    ],
    correctAnswer: 2,
    briefExplanation: 'In Pitcher plant (Nepenthes), the leaf lamina is modified into a pitcher-shaped trap with digestive enzymes to trap insects for nitrogen.',
    memoryTrick: '💡 గుర్తుంచుకునే చిట్కా: "పిట్చర్ (కుండ) ఆకారపు ఆకు -> కీటకాలను పట్టి తినే పిట్చర్ ప్లాంట్!"'
  },
  {
    id: 6005,
    subjectId: 'biology',
    pdfQuestionNo: 5,
    topic: 'Human Senses',
    questionEn: 'The external stimuli are received through these parts in living organisms:',
    questionTe: 'సజీవులలో బాహ్యప్రచోదనాలను గ్రహించే శరీర భాగాలు:',
    options: [
      { key: 1, textEn: 'Brain and Spinal cord', textTe: 'మెదడు మరియు వెన్నుపాము' },
      { key: 2, textEn: 'Nerves', textTe: 'నాడులు' },
      { key: 3, textEn: 'Sense organs', textTe: 'జ్ఞానేంద్రియాలు (Sense Organs)' },
      { key: 4, textEn: 'Muscles', textTe: 'కండరాలు' }
    ],
    correctAnswer: 3,
    briefExplanation: 'Receptors in sense organs (eyes, ears, nose, tongue, skin) detect external stimuli (light, sound, smell, taste, touch) and convert them to impulses.',
    memoryTrick: '💡 గుర్తుంచుకునే చిట్కా: "బయటి ప్రపంచానికి ద్వారాలు మన పంచ జ్ఞానేంద్రియాలే (Sense Organs)!"'
  },
  {
    id: 6006,
    subjectId: 'biology',
    pdfQuestionNo: 6,
    topic: 'Plant Nutrition',
    questionEn: 'Identify the parasitic plant among the following:',
    questionTe: 'పరాన్నజీవ మొక్కను (Parasitic plant) గుర్తించండి:',
    options: [
      { key: 1, textEn: 'Maize', textTe: 'మొక్కజొన్న' },
      { key: 2, textEn: 'Opuntia', textTe: 'ఒపన్షియా' },
      { key: 3, textEn: 'Cuscuta', textTe: 'కస్కుటా (బంగారు తీగ)' },
      { key: 4, textEn: 'Banyan', textTe: 'మర్రి' }
    ],
    correctAnswer: 3,
    briefExplanation: 'Cuscuta (Dodder) lacks chlorophyll and uses haustoria to absorb nutrients and water directly from host plants.',
    memoryTrick: '💡 గుర్తుంచుకునే చిట్కా: "కస్కుటా (Cuscuta) స్వయంగా వండదు; ఎదుటి చెట్టు రసం పీల్చే పరాన్నజీవి!"'
  },
  {
    id: 6007,
    subjectId: 'biology',
    pdfQuestionNo: 7,
    topic: 'Plant Habitats',
    questionEn: 'This is NOT an example of a herb:',
    questionTe: 'ఇది గుల్మానికి (Herb) ఉదాహరణ కాదు:',
    options: [
      { key: 1, textEn: 'Banyan', textTe: 'మర్రి (వృక్షం - Tree)' },
      { key: 2, textEn: 'Parthenium', textTe: 'పార్థీనియం' },
      { key: 3, textEn: 'Marigold', textTe: 'బంతి' },
      { key: 4, textEn: 'Tulasi', textTe: 'తులసి' }
    ],
    correctAnswer: 1,
    briefExplanation: 'Herbs are small plants with green, soft, non-woody stems (Tulasi, Marigold). Banyan is a massive perennial woody tree.',
    memoryTrick: '💡 గుర్తుంచుకునే చిట్కా: "మర్రి చెట్టు మహావృక్షం (Tree), చిన్న గుల్మం (Herb) కానే కాదు!"'
  },
  {
    id: 6008,
    subjectId: 'biology',
    pdfQuestionNo: 8,
    topic: 'Plant Structure',
    questionEn: 'Find the mismatch pair:',
    questionTe: 'సరికాని జతను గుర్తించండి:',
    options: [
      { key: 1, textEn: 'Leaf - Petiole', textTe: 'పత్రం – వృంతం' },
      { key: 2, textEn: 'Flower - Venation', textTe: 'పుష్పం – ఈనెల వ్యాపనం (Venation)' },
      { key: 3, textEn: 'Pistil - Ovary', textTe: 'అండకోశం – అండాశయం' },
      { key: 4, textEn: 'Stamen - Filament', textTe: 'కేసరం – కేసరదండం' }
    ],
    correctAnswer: 2,
    briefExplanation: 'Venation (ఈనెల వ్యాపనం) is the arrangement of veins in a LEAF, not a flower!',
    memoryTrick: '💡 గుర్తుంచుకునే చిట్కా: "ఈనెల వ్యాపనం (Venation) ఆకులలో (Leaves) ఉంటుంది, పూలలో (Flowers) కాదు!"'
  },
  {
    id: 6009,
    subjectId: 'biology',
    pdfQuestionNo: 9,
    topic: 'Root Systems',
    questionEn: 'There is a main root and several lateral roots in A, while all roots are similar in B. Find out A and B:',
    questionTe: 'A లో ఒక ప్రధాన వేరు మరియు అనేక పార్శ్వవేర్లు ఉంటాయి. కానీ B లో అన్ని వేర్లు ఒకేవిధంగా ఉంటాయి. A మరియు B లు:',
    options: [
      { key: 1, textEn: 'A-Main Root System, B-Lateral Root System', textTe: 'A- ప్రధాన వేరు, B- పార్శ్వ వేరు' },
      { key: 2, textEn: 'A-Lateral Root System, B-Main Root System', textTe: 'A- పార్శ్వ వేరు, B- ప్రధాన వేరు' },
      { key: 3, textEn: 'A-Tap Root System, B-Fibrous Root System', textTe: 'A- తల్లి వేరు వ్యవస్థ (Tap), B- గుబురు వేరు వ్యవస్థ (Fibrous)' },
      { key: 4, textEn: 'A-Main Root System, B-Fibrous Root System', textTe: 'A- ప్రధాన వేరు, B- గుబురు వేరు' }
    ],
    correctAnswer: 3,
    briefExplanation: 'Tap root system (A) has one primary tap root producing secondary/tertiary lateral branches. Fibrous root system (B) has a cluster of similar slender roots arising from base of stem.',
    memoryTrick: '💡 గుర్తుంచుకునే చిట్కా: "A = తల్లివేరు (ఒకటే ప్రధాన తల్లి, పక్కన పిల్లలు), B = గుబురువేరు (అన్నీ సమానమైన పీచు వేర్లు)!"'
  },
  {
    id: 6010,
    subjectId: 'biology',
    pdfQuestionNo: 10,
    topic: 'Respiration in Aquatic Mammals',
    questionEn: 'Dolphins and Whales respire through:',
    questionTe: 'డాల్ఫిన్లు మరియు తిమింగలాలు దీని ద్వారా శ్వాసిస్తాయి:',
    options: [
      { key: 1, textEn: 'Gills', textTe: 'మొప్పలు' },
      { key: 2, textEn: 'Skin', textTe: 'చర్మం' },
      { key: 3, textEn: 'Mouth', textTe: 'నోరు' },
      { key: 4, textEn: 'Blowholes (Lungs)', textTe: 'శ్వాస రంధ్రాలు (Blowholes / ఊపిరితిత్తులు)' }
    ],
    correctAnswer: 4,
    briefExplanation: 'Dolphins and whales are mammals, not fish! They do not possess gills; they breathe atmospheric oxygen through blowholes situated on top of their heads using lungs.',
    memoryTrick: '💡 గుర్తుంచుకునే చిట్కా: "డాల్ఫిన్ & తిమింగలం క్షీరదాలు (Mammals)! చేపలలా మొప్పలుండవు, గాలి పీల్చే Blowholes ఉంటాయి!"'
  }
];

export const INITIAL_LEADERBOARD = [
  { id: '1', name: 'Kavitha Reddy', avatar: '👩‍🏫', xp: 4850, quizzesTaken: 42, accuracy: 94, streak: 12, badge: 'Pedagogy Master' },
  { id: '2', name: 'Narayana Swamy', avatar: '👨‍🎓', xp: 4420, quizzesTaken: 38, accuracy: 91, streak: 9, badge: 'All-Rounder' },
  { id: '3', name: 'Srinivasa Rao', avatar: '👨‍🏫', xp: 3980, quizzesTaken: 34, accuracy: 89, streak: 8, badge: 'Math Wizard' },
  { id: '4', name: 'Ananya Sharma', avatar: '👩‍🎓', xp: 3610, quizzesTaken: 30, accuracy: 87, streak: 6, badge: 'Language Pro' },
  { id: '5', name: 'Venkatesh Babu', avatar: '👨‍💻', xp: 3200, quizzesTaken: 26, accuracy: 84, streak: 5, badge: 'Science Ace' },
  { id: '6', name: 'Lakshmi Prasanna', avatar: '👩‍⚕️', xp: 2950, quizzesTaken: 24, accuracy: 82, streak: 4, badge: 'Rising Star' },
  { id: '7', name: 'Chaitanya Kumar', avatar: '🧑‍🎓', xp: 2600, quizzesTaken: 21, accuracy: 80, streak: 3, badge: 'Dedicated' },
  { id: '8', name: 'Padmavathi M.', avatar: '👩‍🔬', xp: 2240, quizzesTaken: 19, accuracy: 78, streak: 2, badge: 'Achiever' }
];

export const DEFAULT_REMINDERS = [
  {
    id: 'rem-1',
    userId: 'default',
    subjectId: 'cdp' as SubjectId,
    title: 'Daily CDP Pedagogy Concepts',
    time: '07:30',
    days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] as ('Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun')[],
    enabled: true,
    notes: 'Review Skinner, Piaget, Bruner, Vygotsky and CCE bits in sequential PDF order.',
    createdAt: '2026-10-01'
  },
  {
    id: 'rem-2',
    userId: 'default',
    subjectId: 'telugu' as SubjectId,
    title: 'Telugu Sandhulu & Alankaralu',
    time: '18:00',
    days: ['Mon', 'Wed', 'Fri', 'Sun'] as ('Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun')[],
    enabled: true,
    notes: 'Practice Sumathi/Vemana sathakam verses and Telugu grammar bits.',
    createdAt: '2026-10-01'
  },
  {
    id: 'rem-3',
    userId: 'default',
    subjectId: 'mathematics' as SubjectId,
    title: 'Math Step-by-Step Derivation Drill',
    time: '20:30',
    days: ['Tue', 'Thu', 'Sat'] as ('Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun')[],
    enabled: true,
    notes: 'Work through AP/GP, LCM/HCF, ratios, profit/loss with complete step derivations.',
    createdAt: '2026-10-01'
  }
];
