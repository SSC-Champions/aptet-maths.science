import { Question, SubjectId, SubjectInfo } from '../types/quiz';

export const SUBJECTS: SubjectInfo[] = [
  {
    id: 'cdp',
    name: 'Child Development & Pedagogy',
    teluguName: 'శిశు వికాసం & బోధనా పద్ధతులు',
    description: 'Developmental psychology, Piaget, Vygotsky, Erikson, learning theories, CCE & NEP 2020.',
    icon: 'Brain',
    color: 'indigo',
    gradient: 'from-indigo-500 to-purple-600',
    borderColor: 'border-indigo-200 dark:border-indigo-800',
    badgeBg: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-300',
    totalAvailable: 45
  },
  {
    id: 'telugu',
    name: 'Telugu Language (తెలుగు)',
    teluguName: 'తెలుగు భాషా సాహిత్యం & వ్యాకరణం',
    description: 'శతక పద్యాలు, సంధులు, సమాసాలు, అలంకారాలు, జాతీయాలు, సామెతలు & పొడుపు కథలు.',
    icon: 'BookOpen',
    color: 'amber',
    gradient: 'from-amber-500 to-orange-600',
    borderColor: 'border-amber-200 dark:border-amber-800',
    badgeBg: 'bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300',
    totalAvailable: 45
  },
  {
    id: 'english',
    name: 'English Language',
    teluguName: 'ఇంగ్లీష్ భాష & వ్యాకరణం',
    description: 'Grammar, vocabulary, active-passive voice, direct-indirect, clauses, idioms & comprehension.',
    icon: 'Languages',
    color: 'blue',
    gradient: 'from-blue-500 to-cyan-600',
    borderColor: 'border-blue-200 dark:border-blue-800',
    badgeBg: 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300',
    totalAvailable: 45
  },
  {
    id: 'mathematics',
    name: 'Mathematics',
    teluguName: 'గణిత శాస్త్రం & బోధనా పద్ధతులు',
    description: 'Arithmetic, LCM & HCF, Geometry, Mensuration, Algebra, Statistics, Probability & Pedagogy.',
    icon: 'Calculator',
    color: 'emerald',
    gradient: 'from-emerald-500 to-teal-600',
    borderColor: 'border-emerald-200 dark:border-emerald-800',
    badgeBg: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300',
    totalAvailable: 40
  },
  {
    id: 'physical_science',
    name: 'Physical Science',
    teluguName: 'భౌతిక & రసాయన శాస్త్రాలు',
    description: 'Mechanics, Heat, Optics, Electricity, Magnetism, Chemical reactions, Metallurgy & Pedagogy.',
    icon: 'Atom',
    color: 'rose',
    gradient: 'from-rose-500 to-pink-600',
    borderColor: 'border-rose-200 dark:border-rose-800',
    badgeBg: 'bg-rose-100 text-rose-800 dark:bg-rose-900/50 dark:text-rose-300',
    totalAvailable: 40
  },
  {
    id: 'biology',
    name: 'Biological Science',
    teluguName: 'జీవ శాస్త్రం & పర్యావరణ విజ్ఞానం',
    description: 'Plant & Animal Biology, Cell organelles, Genetics, Human organ systems, Ecology & Pedagogy.',
    icon: 'Dna',
    color: 'green',
    gradient: 'from-green-600 to-emerald-700',
    borderColor: 'border-green-200 dark:border-green-800',
    badgeBg: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
    totalAvailable: 40
  }
];

export const QUESTIONS: Question[] = [
  // ==========================================
  // SUBJECT 1: CDP (Child Development & Pedagogy)
  // ==========================================
  {
    id: 101,
    subjectId: 'cdp',
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
    explanation: 'Skinner outlined the learner, learning process, teacher, and learning situation as the main scope of educational psychology. Administrative officials like MEO are administrative roles, not primary psychological components.'
  },
  {
    id: 102,
    subjectId: 'cdp',
    topic: 'Principles of Development',
    questionEn: 'Correct statement related to Development:',
    questionTe: 'వికాసానికి సంబంధించి సరైన వాక్యం:',
    options: [
      { key: 1, textEn: 'Development is a narrow concept', textTe: 'వికాసం సంకుచితమైనది' },
      { key: 2, textEn: 'Development can be measured accurately', textTe: 'వికాసాన్ని ఖచ్చితంగా కొలవవచ్చు' },
      { key: 3, textEn: 'Development is limited to certain age', textTe: 'వికాసం కొంత వయసు వరకు మాత్రమే జరుగుతుంది' },
      { key: 4, textEn: 'Development is an internal and integrated process', textTe: 'వికాసం అంతర్గతమైనది మరియు సమగ్రమైన ప్రక్రియ' }
    ],
    correctAnswer: 4,
    explanation: 'Development (వికాసం) is progressive, continuous, internal, and multi-dimensional, unlike physical growth which stops at maturity and is purely quantitative.'
  },
  {
    id: 103,
    subjectId: 'cdp',
    topic: 'Foundations of Psychology',
    questionEn: 'The word "Psychology" is derived from the words of this language:',
    questionTe: 'సైకాలజీ అనే పదం ఈ భాష పదాల నుండి ఉద్భవించినది:',
    options: [
      { key: 1, textEn: 'Greek', textTe: 'గ్రీకు' },
      { key: 2, textEn: 'Telugu', textTe: 'తెలుగు' },
      { key: 3, textEn: 'Tamil', textTe: 'తమిళం' },
      { key: 4, textEn: 'Hindi', textTe: 'హిందీ' }
    ],
    correctAnswer: 1,
    explanation: 'Psychology is derived from Greek words "Psyche" (Soul/Mind) and "Logos" (Science/Study).'
  },
  {
    id: 104,
    subjectId: 'cdp',
    topic: 'Growth & Development',
    questionEn: 'Quantitative changes formed in human body is called:',
    questionTe: 'మానవ శరీరంలో ఏర్పడే పరిమాణాత్మక మార్పులు:',
    options: [
      { key: 1, textEn: 'Growth', textTe: 'పెరుగుదల' },
      { key: 2, textEn: 'Learning', textTe: 'అభ్యసన' },
      { key: 3, textEn: 'Personality', textTe: 'మూర్తిమత్వం' },
      { key: 4, textEn: 'Attitude', textTe: 'వైఖరి' }
    ],
    correctAnswer: 1,
    explanation: 'Physical, measurable changes in size, weight, and height are designated as Growth (పెరుగుదల).'
  },
  {
    id: 105,
    subjectId: 'cdp',
    topic: 'Experimental Psychology',
    questionEn: 'The first psychological laboratory was established at:',
    questionTe: 'మొదటి మనోవిజ్ఞానశాస్త్ర ప్రయోగశాల ప్రారంభించిన ప్రదేశం:',
    options: [
      { key: 1, textEn: 'Leipzig (Germany)', textTe: 'లీప్‌జీగ్' },
      { key: 2, textEn: 'Delhi', textTe: 'ఢిల్లీ' },
      { key: 3, textEn: 'New York', textTe: 'న్యూయార్క్' },
      { key: 4, textEn: 'Washington', textTe: 'వాషింగ్టన్' }
    ],
    correctAnswer: 1,
    explanation: 'Wilhelm Wundt established the first formal psychological research laboratory at Leipzig, Germany in 1879.'
  },
  {
    id: 106,
    subjectId: 'cdp',
    topic: 'Heredity and Environment',
    questionEn: 'Development depends on:',
    questionTe: 'వికాసం దీనిపై ఆధారపడుతుంది:',
    options: [
      { key: 1, textEn: 'Only heredity', textTe: 'కేవలం అనువంశికత' },
      { key: 2, textEn: 'Only environment', textTe: 'కేవలం పర్యావరణం' },
      { key: 3, textEn: 'Product of heredity and environment', textTe: 'అనువంశికత మరియు పర్యావరణాల ఉత్పన్నం' },
      { key: 4, textEn: 'Only intelligence', textTe: 'కేవలం ప్రజ్ఞ' }
    ],
    correctAnswer: 3,
    explanation: 'Woodworth established that Development = Heredity × Environment. It is the joint interaction of both.'
  },
  {
    id: 107,
    subjectId: 'cdp',
    topic: 'Principles of Development',
    questionEn: 'Development follows from head to foot. This principle of development is called:',
    questionTe: 'వికాసం తల నుండి కాలి వరకు సాగుతుంది. ఈ వికాస నియమం:',
    options: [
      { key: 1, textEn: 'Principle of Continuity', textTe: 'వికాసం అవిచ్ఛిన్నమైనది' },
      { key: 2, textEn: 'Principle of Cumulative development', textTe: 'వికాసం సంచితమైనది' },
      { key: 3, textEn: 'Principle of Proximodistal', textTe: 'సమీప దూరస్థ నియమం' },
      { key: 4, textEn: 'Principle of Cephalocaudal development', textTe: 'శిరః పాదాభిముఖ వికాస నియమం' }
    ],
    correctAnswer: 4,
    explanation: 'Cephalocaudal trend describes physical and motor development proceeding from head downwards towards feet.'
  },
  {
    id: 108,
    subjectId: 'cdp',
    topic: 'Piaget Cognitive Development',
    questionEn: 'At this stage of Cognitive Development according to Piaget, a child exhibits Animism (believing non-living things have life):',
    questionTe: 'ప్రాణం లేని వస్తువులకు ప్రాణం ఉందని భావించే పియాజె సంజ్ఞానాత్మక దశ:',
    options: [
      { key: 1, textEn: 'Sensory Motor Stage', textTe: 'జ్ఞానేంద్రియ చలన దశ (0-2 సం.)' },
      { key: 2, textEn: 'Pre-Operational Stage', textTe: 'పూర్వ ప్రచాలక దశ (2-7 సం.)' },
      { key: 3, textEn: 'Concrete Operational Stage', textTe: 'మూర్త ప్రచాలక దశ (7-11 సం.)' },
      { key: 4, textEn: 'Formal Operational Stage', textTe: 'అమూర్త ప్రచాలక దశ (11+ సం.)' }
    ],
    correctAnswer: 2,
    explanation: 'Animism and Ego-centrism are hallmark characteristics of Piaget\'s Pre-operational stage (2 to 7 years).'
  },
  {
    id: 109,
    subjectId: 'cdp',
    topic: 'Piaget Cognitive Development',
    questionEn: 'According to Piaget, "Schemata" represents:',
    questionTe: 'పియాజె ప్రకారం స్కిమాటా (Schemata) అనగా:',
    options: [
      { key: 1, textEn: 'Cognitive structures or mental models', textTe: 'సంజ్ఞానాత్మక నిర్మితులు' },
      { key: 2, textEn: 'Controlling emotions', textTe: 'ఉద్వేగాలను అదుపులో ఉంచుకోవడం' },
      { key: 3, textEn: 'Digital resource', textTe: 'డిజిటల్ వనరు' },
      { key: 4, textEn: 'Personality structures', textTe: 'మూర్తిమత్వ నిర్మితులు' }
    ],
    correctAnswer: 1,
    explanation: 'Schema refers to the mental frameworks and cognitive structures built through assimilation and accommodation.'
  },
  {
    id: 110,
    subjectId: 'cdp',
    topic: 'Erikson Psychosocial Development',
    questionEn: 'According to Erik Erikson, the psychosocial crisis faced during adolescence is:',
    questionTe: 'ఎరిక్ ఎరిక్సన్ ప్రకారం, కౌమార దశలోని వ్యక్తి ఎదుర్కొనే మనో సాంఘిక క్లిష్ట పరిస్థితి:',
    options: [
      { key: 1, textEn: 'Role Identity vs. Role Confusion', textTe: 'పాత్ర గుర్తింపు – పాత్ర సందిగ్ధం' },
      { key: 2, textEn: 'Intimacy vs. Isolation', textTe: 'సన్నిహితం – ఏకాంతం' },
      { key: 3, textEn: 'Autonomy vs. Doubt', textTe: 'స్వయంప్రతిపత్తి – సందేహం' },
      { key: 4, textEn: 'Integrity vs. Despair', textTe: 'సమగ్రత – నిరాశ' }
    ],
    correctAnswer: 1,
    explanation: 'In Erikson\'s 5th stage (Adolescence 12-18 yrs), adolescents explore identity and face Identity vs. Role Confusion.'
  },
  {
    id: 111,
    subjectId: 'cdp',
    topic: 'Kohlberg Moral Development',
    questionEn: 'The number of levels and stages in Kohlberg\'s Moral Development Theory are:',
    questionTe: 'కోల్ బర్గ్ నైతిక వికాసంలోని స్థాయిలు, దశల సంఖ్య:',
    options: [
      { key: 1, textEn: '3 Levels, 6 Stages', textTe: '3 స్థాయిలు, 6 దశలు' },
      { key: 2, textEn: '2 Levels, 4 Stages', textTe: '2 స్థాయిలు, 4 దశలు' },
      { key: 3, textEn: '5 Levels, 8 Stages', textTe: '5 స్థాయిలు, 8 దశలు' },
      { key: 4, textEn: '4 Levels, 10 Stages', textTe: '4 స్థాయిలు, 10 దశలు' }
    ],
    correctAnswer: 1,
    explanation: 'Kohlberg outlined 3 levels (Pre-conventional, Conventional, Post-conventional), each having 2 stages, totaling 6 stages.'
  },
  {
    id: 112,
    subjectId: 'cdp',
    topic: 'Intelligence & IQ',
    questionEn: 'Formula to calculate Intelligence Quotient (IQ) is:',
    questionTe: 'ప్రజ్ఞాలబ్ధి (IQ) గణించే సరైన సూత్రం:',
    options: [
      { key: 1, textEn: 'IQ = (Mental Age / Chronological Age) × 100', textTe: 'IQ = (MA / CA) × 100' },
      { key: 2, textEn: 'IQ = (Chronological Age / Mental Age) × 100', textTe: 'IQ = (CA / MA) × 100' },
      { key: 3, textEn: 'IQ = MA × CA × 100', textTe: 'IQ = MA × CA × 100' },
      { key: 4, textEn: 'IQ = (MA + CA) / 100', textTe: 'IQ = (MA + CA) / 100' }
    ],
    correctAnswer: 1,
    explanation: 'William Stern invented the concept, and Lewis Terman perfected the formula: IQ = (Mental Age / Chronological Age) × 100.'
  },
  {
    id: 113,
    subjectId: 'cdp',
    topic: 'Theories of Learning',
    questionEn: 'Classical Conditioning theory was propounded by:',
    questionTe: 'శాస్త్రీయ నిబంధన సిద్ధాంత రూపకర్త:',
    options: [
      { key: 1, textEn: 'B.F. Skinner', textTe: 'స్కిన్నర్' },
      { key: 2, textEn: 'Thorndike', textTe: 'థారన్ డైక్' },
      { key: 3, textEn: 'Bandura', textTe: 'బండూర' },
      { key: 4, textEn: 'Ivan Pavlov', textTe: 'ఇవాన్ పావ్ లోవ్' }
    ],
    correctAnswer: 4,
    explanation: 'Russian physiologist Ivan Pavlov developed Classical Conditioning (S-R conditioned reflex) with his experiments on dogs.'
  },
  {
    id: 114,
    subjectId: 'cdp',
    topic: 'Vygotsky Social Constructivism',
    questionEn: 'In Vygotsky\'s Socio-Cultural Theory, ZPD stands for:',
    questionTe: 'వైగోట్స్కీ ప్రకారం ZPD అనగా:',
    options: [
      { key: 1, textEn: 'Zone of Pre Development', textTe: 'Zone of Pre Development' },
      { key: 2, textEn: 'Zone of Proximal Development', textTe: 'సమీప వికాస రంగం (Zone of Proximal Development)' },
      { key: 3, textEn: 'Zone of Personality Development', textTe: 'Zone of Personality Development' },
      { key: 4, textEn: 'Zone of Psychological Development', textTe: 'Zone of Psychological Development' }
    ],
    correctAnswer: 2,
    explanation: 'ZPD is the distance between what a learner can do independently and what they can achieve with guidance from a More Knowledgeable Other (MKO).'
  },
  {
    id: 115,
    subjectId: 'cdp',
    topic: 'National Education Policy 2020',
    questionEn: 'According to NEP 2020, the new pedagogical and curricular structure of school education is:',
    questionTe: 'జాతీయ విద్యావిధానం (NEP 2020) ప్రతిపాదించిన నూతన పాఠశాల విద్యా నిర్మాణం:',
    options: [
      { key: 1, textEn: '10 + 2 + 3', textTe: '10 + 2 + 3' },
      { key: 2, textEn: '11 + 1 + 3', textTe: '11 + 1 + 3' },
      { key: 3, textEn: '5 + 3 + 3 + 4', textTe: '5 + 3 + 3 + 4' },
      { key: 4, textEn: '10 + 3 + 3', textTe: '10 + 3 + 3' }
    ],
    correctAnswer: 3,
    explanation: 'NEP 2020 replaced the 10+2 structure with 5 (Foundational) + 3 (Preparatory) + 3 (Middle) + 4 (Secondary).'
  },

  // ==========================================
  // SUBJECT 2: TELUGU LANGUAGE 1
  // ==========================================
  {
    id: 201,
    subjectId: 'telugu',
    topic: 'శతక సాహిత్యం',
    questionEn: 'Based on the poem, what is the true ornament for human ears?',
    questionTe: '‘అమరుఁజెవి శాస్త్రమునఁ గుండలమునఁ గాదు...’ పై పద్యం ఆధారంగా చెవులకు నిజమైన అలంకారము:',
    options: [
      { key: 1, textEn: 'Listening to Shastras (Knowledge)', textTe: 'శాస్త్రశ్రవణం' },
      { key: 2, textEn: 'Earrings (Kundalalu)', textTe: 'కుండలములు' },
      { key: 3, textEn: 'Tatankamulu', textTe: 'తాటంకములు' },
      { key: 4, textEn: 'Armour', textTe: 'కవచములు' }
    ],
    correctAnswer: 1,
    explanation: 'కవి ప్రకారం చెవులకు కుండలాలు కాదు, మంచి శాస్త్రాలను వినడమే అసలైన అలంకారం (చెవులకు శాస్త్రశ్రవణమే భూషణం).'
  },
  {
    id: 202,
    subjectId: 'telugu',
    topic: 'సుమతీ శతకం',
    questionEn: 'According to Sumati Satakam, poison exists throughout the whole body in:',
    questionTe: '‘తలనుండు విషము ఫణికిని...’ పద్యం ఆధారంగా నిలువెల్ల విషం కలవాడు ఎవరు?',
    options: [
      { key: 1, textEn: 'Scorpion', textTe: 'వృశ్చికం (తేలు)' },
      { key: 2, textEn: 'Serpent', textTe: 'ఫణి (పాము)' },
      { key: 3, textEn: 'Bird', textTe: 'ఖగుడు' },
      { key: 4, textEn: 'Wicked / Evil person', textTe: 'ఖలుడు (దుర్మార్గుడు)' }
    ],
    correctAnswer: 4,
    explanation: 'పాముకు తలలో, తేలుకు తోకలో విషముంటుంది; కానీ దుర్మార్గుడైన ఖలునకు ఒళ్లంతా (నిలువెల్లా) విషమే నిండి ఉంటుంది.'
  },
  {
    id: 203,
    subjectId: 'telugu',
    topic: 'కవులు & బిరుదులు',
    questionEn: 'The title "Abhinava Vaganushasanudu" belongs to:',
    questionTe: '‘అభినవ వాగనుశాసనులు’ అని ఎవరిని పిలుస్తారు?',
    options: [
      { key: 1, textEn: 'Nannaya', textTe: 'నన్నయ' },
      { key: 2, textEn: 'Kandukuri Veeresalingam', textTe: 'కందుకూరి వీరేశలింగం' },
      { key: 3, textEn: 'Gidugu Rama Murthy', textTe: 'శ్రీ గిడుగు రామమూర్తి' },
      { key: 4, textEn: 'Gurajada Apparao', textTe: 'గురజాడ అప్పారావు' }
    ],
    correctAnswer: 3,
    explanation: 'వ్యావహారిక భాషా ఉద్యమ పితామహుడు గిడుగు వెంకట రామమూర్తి పంతులు గారిని ‘అభినవ వాగనుశాసనుడు’ అని సత్కరించారు.'
  },
  {
    id: 204,
    subjectId: 'telugu',
    topic: 'సంధులు',
    questionEn: 'What is the Sandhi in the word "మహర్షి"?',
    questionTe: '‘మహర్షి’ పదంలోని సంధి ఏది? (మహా + ఋషి)',
    options: [
      { key: 1, textEn: 'Atva Sandhi', textTe: 'అత్వసంధి' },
      { key: 2, textEn: 'Savarna Deergha Sandhi', textTe: 'సవర్ణదీర్ఘసంధి' },
      { key: 3, textEn: 'Guna Sandhi', textTe: 'గుణసంధి' },
      { key: 4, textEn: 'Yanadesha Sandhi', textTe: 'యణాదేశసంధి' }
    ],
    correctAnswer: 3,
    explanation: 'అ-కారమునకు ‘ఋ’ పరమైనప్పుడు ‘అర్’ ఏకాదేశమగును (మహా + ఋషి = మహర్షి). కావున ఇది గుణసంధి.'
  },
  {
    id: 205,
    subjectId: 'telugu',
    topic: 'సమాసాలు',
    questionEn: 'Identify the compound (Samasam) for "ఏడుదీవులు":',
    questionTe: '‘ఏడుదీవులు’ ఏ సమాసము?',
    options: [
      { key: 1, textEn: 'Dvigu Samasam', textTe: 'ద్విగు సమాసం' },
      { key: 2, textEn: 'Dvandva Samasam', textTe: 'ద్వంద్వ సమాసం' },
      { key: 3, textEn: 'Rupaka Samasam', textTe: 'రూపక సమాసం' },
      { key: 4, textEn: 'Bahuvrihi Samasam', textTe: 'బహువ్రీహి సమాసం' }
    ],
    correctAnswer: 1,
    explanation: 'సంఖ్యా పూర్వో ద్విగుః - పూర్వపదం సంఖ్యను తెలిపేది ద్విగు సమాసం (ఏడు సంఖ్య గల దీవులు).'
  },
  {
    id: 206,
    subjectId: 'telugu',
    topic: 'ఛందస్సు',
    questionEn: 'The Ganas "న, జ, భ, జ, జ, జ, ర" belong to which meter (Padyam)?',
    questionTe: '‘న, జ, భ, జ, జ, జ, ర’ గణాలు గల వృత్త పద్య పాదం ఏది?',
    options: [
      { key: 1, textEn: 'Utpalamala', textTe: 'ఉత్పలమాల' },
      { key: 2, textEn: 'Champakamala', textTe: 'చంపకమాల' },
      { key: 3, textEn: 'Shardoolam', textTe: 'శార్దూలం' },
      { key: 4, textEn: 'Mattebham', textTe: 'మత్తేభం' }
    ],
    correctAnswer: 2,
    explanation: 'చంపకమాలలో ప్రతి పాదంలో న, జ, భ, జ, జ, జ, ర అనే గణాలు ఉంటాయి. 21 అక్షరాలు, 11వ అక్షరం యతి స్థానం.'
  },
  {
    id: 207,
    subjectId: 'telugu',
    topic: 'అలంకారాలు',
    questionEn: '"ఆమె ముఖం చంద్రబింబం వలె ప్రకాశిస్తున్నది" - Identify the figure of speech (Alankaram):',
    questionTe: '‘ఆమె ముఖం చంద్రబింబం వలె ప్రకాశిస్తున్నది’ – ఈ వాక్యంలోని అలంకారం:',
    options: [
      { key: 1, textEn: 'Upama Alankaram', textTe: 'ఉపమాలంకారం' },
      { key: 2, textEn: 'Rupaka Alankaram', textTe: 'రూపకాలంకారం' },
      { key: 3, textEn: 'Utpreksha Alankaram', textTe: 'ఉత్ప్రేక్షాలంకారం' },
      { key: 4, textEn: 'Atishayokti Alankaram', textTe: 'అతిశయోక్తి అలంకారం' }
    ],
    correctAnswer: 1,
    explanation: 'ఉపమేయ, ఉపమానములకు మనోహరమైన సాదృశ్యమును ‘వలె’ అను ఉపమావాచకముతో పోల్చి చెప్పుట ఉపమాలంకారం.'
  },
  {
    id: 208,
    subjectId: 'telugu',
    topic: 'జాతీయాలు',
    questionEn: 'Meaning of the idiom "సుగ్రీవాజ్ఞ" (Sugreevaajna):',
    questionTe: '‘సుగ్రీవాజ్ఞ’ అనే జాతీయానికి సరైన అర్థం:',
    options: [
      { key: 1, textEn: 'Irrevocable command / order that must be obeyed', textTe: 'చెప్పిన మాటకు తిరుగులేని ఆజ్ఞ' },
      { key: 2, textEn: 'Request made humbly', textTe: 'వినయంతో కూడిన ప్రార్థన' },
      { key: 3, textEn: 'Secret discussion', textTe: 'గుసగుసలాడటం' },
      { key: 4, textEn: 'Wasted effort', textTe: 'బూడిదలో పోసిన పన్నీరు' }
    ],
    correctAnswer: 1,
    explanation: 'సుగ్రీవుడు ఇచ్చిన ఆజ్ఞను ఎవరూ ఉల్లంఘించలేరు. తప్పనిసరిగా ఆచరించాల్సిన తిరుగులేని ఆదేశాన్ని సుగ్రీవాజ్ఞ అంటారు.'
  },
  {
    id: 209,
    subjectId: 'telugu',
    topic: 'సామెతలు',
    questionEn: 'Complete the popular Telugu proverb: "కోటి విద్యలు ______"',
    questionTe: 'సామెతను పూరించండి: ‘కోటి విద్యలు ______’',
    options: [
      { key: 1, textEn: 'Kooti korake (For livelihood)', textTe: 'కూటి కొరకే' },
      { key: 2, textEn: 'Medalu kattinatlu', textTe: 'మేడలు కట్టినట్లు' },
      { key: 3, textEn: 'Kasu korake', textTe: 'కాసు కొరకే' },
      { key: 4, textEn: 'Patoka rotha', textTe: 'పాతోక రోత' }
    ],
    correctAnswer: 1,
    explanation: 'మనిషి ఎన్ని విద్యలు నేర్చినా అంతిమంగా జీవనోపాధి కొరకే కనుక ‘కోటి విద్యలు కూటి కొరకే’ అంటారు.'
  },
  {
    id: 210,
    subjectId: 'telugu',
    topic: 'పొడుపు కథలు',
    questionEn: 'Solve the riddle: "రెండు మిద్దెలకు ఒకటే దూలము" (Two attics sharing one beam):',
    questionTe: '‘రెండు మిద్దెలకు ఒకటే దూలము’ అనే పొడుపుకథకు విడుపు:',
    options: [
      { key: 1, textEn: 'Nose', textTe: 'ముక్కు' },
      { key: 2, textEn: 'Lamp', textTe: 'దీపము' },
      { key: 3, textEn: 'Stick', textTe: 'ముల్లుగర్ర' },
      { key: 4, textEn: 'Mat', textTe: 'చాప' }
    ],
    correctAnswer: 1,
    explanation: 'రెండు ముక్కు రంధ్రాలు మిద్దెలు అయితే వాటి నడుమ ఉన్న ఎముక/గోడ దూలము వంటిది (ముక్కు).'
  },

  // ==========================================
  // SUBJECT 3: ENGLISH LANGUAGE
  // ==========================================
  {
    id: 301,
    subjectId: 'english',
    topic: 'Vocabulary - Synonyms',
    questionEn: 'Choose the synonym of the word "terrible" in: "They were stopped by a terrible noise."',
    questionTe: '"terrible" పదానికి సరైన పర్యాయపదం (Synonym):',
    options: [
      { key: 1, textEn: 'negligible', textTe: 'అల్పమైన' },
      { key: 2, textEn: 'dreadful', textTe: 'భయంకరమైన' },
      { key: 3, textEn: 'insignificant', textTe: 'ప్రాముఖ్యత లేని' },
      { key: 4, textEn: 'pleasant', textTe: 'ఆహ్లాదకరమైన' }
    ],
    correctAnswer: 2,
    explanation: '"Terrible" means extremely bad or serious, frightening. "Dreadful" is an exact synonym.'
  },
  {
    id: 302,
    subjectId: 'english',
    topic: 'Vocabulary - Antonyms',
    questionEn: 'Choose the antonym of the word "valiant" in: "Our valiant soldiers have made great sacrifices for us."',
    questionTe: '"valiant" (ధైర్యవంతులైన) పదానికి సరైన వ్యతిరేక పదం (Antonym):',
    options: [
      { key: 1, textEn: 'very brave', textTe: 'చాలా ధైర్యం కల' },
      { key: 2, textEn: 'cowardly', textTe: 'పిరికి' },
      { key: 3, textEn: 'firm', textTe: 'దృఢమైన' },
      { key: 4, textEn: 'bold', textTe: 'సాహసోపేత' }
    ],
    correctAnswer: 2,
    explanation: '"Valiant" means showing courage or determination. Its direct opposite is "cowardly".'
  },
  {
    id: 303,
    subjectId: 'english',
    topic: 'Spelling',
    questionEn: 'Choose the correctly spelt word:',
    questionTe: 'కింది వానిలో సరిగ్గా స్పెల్లింగ్ ఉన్న పదం:',
    options: [
      { key: 1, textEn: 'favarate', textTe: 'favarate' },
      { key: 2, textEn: 'favorate', textTe: 'favorate' },
      { key: 3, textEn: 'favurate', textTe: 'favurate' },
      { key: 4, textEn: 'favourite', textTe: 'favourite' }
    ],
    correctAnswer: 4,
    explanation: 'The standard British English spelling is "favourite" (f-a-v-o-u-r-i-t-e).'
  },
  {
    id: 304,
    subjectId: 'english',
    topic: 'One Word Substitution',
    questionEn: 'A person who knows many languages is called a:',
    questionTe: 'అనేక భాషలు తెలిసిన వ్యక్తిని ఏమంటారు?',
    options: [
      { key: 1, textEn: 'grammarian', textTe: 'వ్యాకరణవేత్త' },
      { key: 2, textEn: 'bilingual', textTe: 'ద్విభాషా కోవిదుడు' },
      { key: 3, textEn: 'fatalist', textTe: 'విధిని నమ్మువాడు' },
      { key: 4, textEn: 'polyglot', textTe: 'బహుభాషావేత్త (Polyglot)' }
    ],
    correctAnswer: 4,
    explanation: 'A "polyglot" is a person who knows and is able to use several languages.'
  },
  {
    id: 305,
    subjectId: 'english',
    topic: 'Idiomatic Expressions',
    questionEn: 'Choose the correct idiomatic expression meaning "to be very close or easily accessible":',
    questionTe: 'చేతికి అందుబాటులో ఉండే దాన్ని సూచించే సరైన జాతీయం:',
    options: [
      { key: 1, textEn: 'at your fingertips', textTe: 'at your fingertips' },
      { key: 2, textEn: 'at your house', textTe: 'at your house' },
      { key: 3, textEn: 'at your school', textTe: 'at your school' },
      { key: 4, textEn: 'at your gates', textTe: 'at your gates' }
    ],
    correctAnswer: 1,
    explanation: '"At your fingertips" means readily available for immediate use.'
  },
  {
    id: 306,
    subjectId: 'english',
    topic: 'Active & Passive Voice',
    questionEn: 'Choose the correct passive voice for: "She dusted the chair."',
    questionTe: '"She dusted the chair" కు సరైన కర్మణి రూపం (Passive Voice):',
    options: [
      { key: 1, textEn: 'The chair has been dusted by her.', textTe: 'The chair has been dusted by her.' },
      { key: 2, textEn: 'The chair was dusted by she.', textTe: 'The chair was dusted by she.' },
      { key: 3, textEn: 'The chair has dusted by her.', textTe: 'The chair has dusted by her.' },
      { key: 4, textEn: 'The chair was dusted by her.', textTe: 'The chair was dusted by her.' }
    ],
    correctAnswer: 4,
    explanation: 'Simple past tense active: S + V2 + O. Passive structure: O + was/were + V3 + by + S (objective form "her").'
  },
  {
    id: 307,
    subjectId: 'english',
    topic: 'Subject-Verb Agreement',
    questionEn: 'Choose the sentence with correct subject-verb agreement:',
    questionTe: 'కర్త-క్రియల పొందిక (Subject-Verb agreement) సరైన వాక్యం:',
    options: [
      { key: 1, textEn: 'Gold and silver is precious metals.', textTe: 'Gold and silver is precious metals.' },
      { key: 2, textEn: 'Gold and silver was precious metals.', textTe: 'Gold and silver was precious metals.' },
      { key: 3, textEn: 'Gold and silver has precious metals.', textTe: 'Gold and silver has precious metals.' },
      { key: 4, textEn: 'Gold and silver are precious metals.', textTe: 'Gold and silver are precious metals.' }
    ],
    correctAnswer: 4,
    explanation: 'Two singular nouns joined by "and" taking plural context require a plural verb ("are").'
  },
  {
    id: 308,
    subjectId: 'english',
    topic: 'Order of Adjectives',
    questionEn: 'Choose the expression where adjectives are placed in correct order:',
    questionTe: 'విశేషణాల సరైన క్రమం (Order of adjectives) గల వాక్యం:',
    options: [
      { key: 1, textEn: 'a little smart boy', textTe: 'a little smart boy' },
      { key: 2, textEn: 'smart a little boy', textTe: 'smart a little boy' },
      { key: 3, textEn: 'a smart little boy', textTe: 'a smart little boy' },
      { key: 4, textEn: 'smart little a boy', textTe: 'smart little a boy' }
    ],
    correctAnswer: 3,
    explanation: 'Opinion adjective comes before size adjective: "a" + opinion (smart) + size (little) + noun (boy).'
  },
  {
    id: 309,
    subjectId: 'english',
    topic: 'Question Tags',
    questionEn: 'Select the correct question tag: "The show was amazing, ______"',
    questionTe: 'సరైన క్వశ్చన్ ట్యాగ్ ఎన్నుకోండి: "The show was amazing, ______"',
    options: [
      { key: 1, textEn: 'was it?', textTe: 'was it?' },
      { key: 2, textEn: 'wasn\'t it?', textTe: 'wasn\'t it?' },
      { key: 3, textEn: 'is it?', textTe: 'is it?' },
      { key: 4, textEn: 'isn\'t it?', textTe: 'isn\'t it?' }
    ],
    correctAnswer: 2,
    explanation: 'Positive sentence with auxiliary "was" requires a negative question tag in the same tense: "wasn\'t it?".'
  },
  {
    id: 310,
    subjectId: 'english',
    topic: 'Grammar - Clauses',
    questionEn: 'Identify the clause type of the underlined part in: "I don\'t believe [what he says]."',
    questionTe: '"what he says" అనేది ఏ రకమైన క్లాజ్?',
    options: [
      { key: 1, textEn: 'Noun clause', textTe: 'Noun clause (నామవాచక ఉపవాక్యం)' },
      { key: 2, textEn: 'Adverb clause', textTe: 'Adverb clause' },
      { key: 3, textEn: 'Adjective clause', textTe: 'Adjective clause' },
      { key: 4, textEn: 'Non-finite clause', textTe: 'Non-finite clause' }
    ],
    correctAnswer: 1,
    explanation: '"what he says" acts as the object of the verb "believe", thus functioning as a Noun clause.'
  },

  // ==========================================
  // SUBJECT 4: MATHEMATICS
  // ==========================================
  {
    id: 401,
    subjectId: 'mathematics',
    topic: 'Number System',
    questionEn: 'The number of two-digit numbers that are divisible by 4 is:',
    questionTe: '4 చే నిశ్శేషంగా భాగింపబడే రెండంకెల సంఖ్యల సంఖ్య:',
    options: [
      { key: 1, textEn: '21', textTe: '21' },
      { key: 2, textEn: '22', textTe: '22' },
      { key: 3, textEn: '23', textTe: '23' },
      { key: 4, textEn: '24', textTe: '24' }
    ],
    correctAnswer: 2,
    explanation: 'Two-digit numbers divisible by 4: 12, 16, 20, ..., 96. Total = (96 - 12)/4 + 1 = 84/4 + 1 = 21 + 1 = 22.'
  },
  {
    id: 402,
    subjectId: 'mathematics',
    topic: 'LCM & HCF',
    questionEn: 'LCM of two numbers is 120 and their HCF is 10. If one number is 30, then the other number is:',
    questionTe: 'రెండు సంఖ్యల క.సా.గు 120 మరియు గ.సా.భా 10. ఒక సంఖ్య 30 అయితే రెండవ సంఖ్య:',
    options: [
      { key: 1, textEn: '20', textTe: '20' },
      { key: 2, textEn: '40', textTe: '40' },
      { key: 3, textEn: '60', textTe: '60' },
      { key: 4, textEn: '80', textTe: '80' }
    ],
    correctAnswer: 2,
    explanation: 'Product of two numbers = LCM × HCF. Other number = (120 × 10) / 30 = 1200 / 30 = 40.'
  },
  {
    id: 403,
    subjectId: 'mathematics',
    topic: 'Ratios and Proportions',
    questionEn: 'If ₹60 is divided in the ratio 1:2 between Krithi and Kiran, the share of Kiran is:',
    questionTe: 'కృతి, కిరణ్ లకు ₹60 ను 1:2 నిష్పత్తిలో పంచిన, కిరణ్ వాటా:',
    options: [
      { key: 1, textEn: '₹40', textTe: '₹40' },
      { key: 2, textEn: '₹20', textTe: '₹20' },
      { key: 3, textEn: '₹30', textTe: '₹30' },
      { key: 4, textEn: '₹10', textTe: '₹10' }
    ],
    correctAnswer: 1,
    explanation: 'Total parts = 1 + 2 = 3. Kiran\'s share = (2/3) × 60 = ₹40.'
  },
  {
    id: 404,
    subjectId: 'mathematics',
    topic: 'Commercial Mathematics',
    questionEn: 'If a toy bought for ₹700 is sold at a profit of 20%, then its selling price is:',
    questionTe: 'ఒక బొమ్మ కొన్నవెల ₹700 మరియు దానిని 20% లాభమునకు అమ్మితే, దాని అమ్మకపు వెల:',
    options: [
      { key: 1, textEn: '₹720', textTe: '₹720' },
      { key: 2, textEn: '₹840', textTe: '₹840' },
      { key: 3, textEn: '₹560', textTe: '₹560' },
      { key: 4, textEn: '₹780', textTe: '₹780' }
    ],
    correctAnswer: 2,
    explanation: 'Profit = 20% of 700 = 140. Selling Price = 700 + 140 = ₹840.'
  },
  {
    id: 405,
    subjectId: 'mathematics',
    topic: 'Geometry - Circles & Triangles',
    questionEn: 'The sum of all interior angles of a convex quadrilateral is:',
    questionTe: 'ఒక కుంభాకార చతుర్భుజం యొక్క అన్ని అంతరకోణాల మొత్తం:',
    options: [
      { key: 1, textEn: '360°', textTe: '360°' },
      { key: 2, textEn: '180°', textTe: '180°' },
      { key: 3, textEn: '90°', textTe: '90°' },
      { key: 4, textEn: '270°', textTe: '270°' }
    ],
    correctAnswer: 1,
    explanation: 'The sum of the four interior angles of any planar quadrilateral is always (4 - 2) × 180° = 360°.'
  },
  {
    id: 406,
    subjectId: 'mathematics',
    topic: 'Statistics',
    questionEn: 'The median of the scores 14, 17, 16, 12, 8, 4, 24, 22 is:',
    questionTe: '14, 17, 16, 12, 8, 4, 24, 22 రాశుల మధ్యగతం:',
    options: [
      { key: 1, textEn: '14', textTe: '14' },
      { key: 2, textEn: '16', textTe: '16' },
      { key: 3, textEn: '15', textTe: '15' },
      { key: 4, textEn: '17', textTe: '17' }
    ],
    correctAnswer: 3,
    explanation: 'Arranged in ascending order: 4, 8, 12, 14, 16, 17, 22, 24. Since n=8 (even), median is average of 4th and 5th terms: (14 + 16)/2 = 15.'
  },
  {
    id: 407,
    subjectId: 'mathematics',
    topic: 'Trigonometry',
    questionEn: 'If tan A = 4/3, then the value of sin A is:',
    questionTe: 'tan A = 4/3 అయిన sin A విలువ:',
    options: [
      { key: 1, textEn: '3/5', textTe: '3/5' },
      { key: 2, textEn: '4/5', textTe: '4/5' },
      { key: 3, textEn: '5/4', textTe: '5/4' },
      { key: 4, textEn: '3/4', textTe: '3/4' }
    ],
    correctAnswer: 2,
    explanation: 'Opposite = 4, Adjacent = 3. Hypotenuse = √(4² + 3²) = 5. Therefore sin A = Opposite / Hypotenuse = 4/5.'
  },
  {
    id: 408,
    subjectId: 'mathematics',
    topic: 'Trigonometry - Heights & Distances',
    questionEn: 'The ratio of height of a tree to the shadow of the tree is √3 : 1. Then the angle of inclination of the sun at that time is:',
    questionTe: 'ఒక చెట్టు యొక్క ఎత్తు మరియు నీడ పొడవుల నిష్పత్తి √3 : 1 అయిన పతన కోణము విలువ:',
    options: [
      { key: 1, textEn: '30°', textTe: '30°' },
      { key: 2, textEn: '60°', textTe: '60°' },
      { key: 3, textEn: '45°', textTe: '45°' },
      { key: 4, textEn: '90°', textTe: '90°' }
    ],
    correctAnswer: 2,
    explanation: 'tan θ = Height / Shadow = √3 / 1 = √3. Therefore θ = 60°.'
  },
  {
    id: 409,
    subjectId: 'mathematics',
    topic: 'Pedagogy of Mathematics',
    questionEn: '"Mathematics is the mirror of civilization" — was stated by:',
    questionTe: '‘గణితము సంస్కృతికి అద్దము వంటిది’ అని పేర్కొన్నవారు:',
    options: [
      { key: 1, textEn: 'Hogben', textTe: 'హాగ్బెన్' },
      { key: 2, textEn: 'Aristotle', textTe: 'అరిస్టాటిల్' },
      { key: 3, textEn: 'Lindsay', textTe: 'లిండ్ సే' },
      { key: 4, textEn: 'Gauss', textTe: 'గాస్' }
    ],
    correctAnswer: 1,
    explanation: 'Lancelot Hogben famously asserted that "Mathematics is the mirror of civilization" in his work Mathematics for the Million.'
  },
  {
    id: 410,
    subjectId: 'mathematics',
    topic: 'Probability',
    questionEn: 'The probability of drawing a face card from a well-shuffled deck of 52 cards is:',
    questionTe: 'బాగుగా కలపబడిన 52 కార్డుల పేకముక్కల కట్ట నుండి ముఖ కార్డు (Face Card) ను తీయు సంభావ్యత:',
    options: [
      { key: 1, textEn: '3/13', textTe: '3/13' },
      { key: 2, textEn: '2/13', textTe: '2/13' },
      { key: 3, textEn: '1/13', textTe: '1/13' },
      { key: 4, textEn: '3/52', textTe: '3/52' }
    ],
    correctAnswer: 1,
    explanation: 'Face cards are Jacks, Queens, and Kings (4 of each = 12 cards). Probability = 12 / 52 = 3 / 13.'
  },

  // ==========================================
  // SUBJECT 5: PHYSICAL SCIENCE
  // ==========================================
  {
    id: 501,
    subjectId: 'physical_science',
    topic: 'Motion & Mechanics',
    questionEn: 'The speed of a car is 36 km/h. Its speed in m/s is:',
    questionTe: 'ఒక కారు వడి 36 కి.మీ./గం. దాని వడి మీ/సె లలో:',
    options: [
      { key: 1, textEn: '18 m/s', textTe: '18 మీ/సె' },
      { key: 2, textEn: '72 m/s', textTe: '72 మీ/సె' },
      { key: 3, textEn: '5 m/s', textTe: '5 మీ/సె' },
      { key: 4, textEn: '10 m/s', textTe: '10 మీ/సె' }
    ],
    correctAnswer: 4,
    explanation: 'Conversion factor from km/h to m/s is 5/18. Speed = 36 × (5/18) = 10 m/s.'
  },
  {
    id: 502,
    subjectId: 'physical_science',
    topic: 'Force and Friction',
    questionEn: 'The decreasing order of frictional forces is:',
    questionTe: 'ఘర్షణ బలాల అవరోహణాక్రమం (Decreasing order):',
    options: [
      { key: 1, textEn: 'Rolling, Static, Sliding', textTe: 'దొర్లుడు, స్థైతిక, జారుడు' },
      { key: 2, textEn: 'Rolling, Sliding, Static', textTe: 'దొర్లుడు, జారుడు, స్థైతిక' },
      { key: 3, textEn: 'Static, Sliding, Rolling', textTe: 'స్థైతిక ఘర్షణ > జారుడు ఘర్షణ > దొర్లుడు ఘర్షణ' },
      { key: 4, textEn: 'Sliding, Static, Rolling', textTe: 'జారుడు, స్థైతిక, దొర్లుడు' }
    ],
    correctAnswer: 3,
    explanation: 'Static friction is maximum, followed by sliding friction, and rolling friction is the least.'
  },
  {
    id: 503,
    subjectId: 'physical_science',
    topic: 'Gravitation',
    questionEn: 'If the weight of an object is 60 N on earth, its weight on the moon will be:',
    questionTe: 'భూమి పై ఒక వస్తువు భారం 60 N అయిన అదే వస్తువు భారం చంద్రునిపై:',
    options: [
      { key: 1, textEn: '6 N', textTe: '6 N' },
      { key: 2, textEn: '10 N', textTe: '10 N' },
      { key: 3, textEn: '0 N', textTe: '0 N' },
      { key: 4, textEn: '36 N', textTe: '36 N' }
    ],
    correctAnswer: 2,
    explanation: 'The gravitational acceleration on the moon is approximately 1/6th of that on Earth. Weight on moon = 60 / 6 = 10 N.'
  },
  {
    id: 504,
    subjectId: 'physical_science',
    topic: 'Sound & Acoustics',
    questionEn: 'The repeated reflection of sound that results in the persistence of sound in a hall is called:',
    questionTe: 'పలుమార్లు పరావర్తనం కారణంగా సాగదీయబడిన ధ్వనిని ఏమంటారు?',
    options: [
      { key: 1, textEn: 'Echo', textTe: 'ప్రతిధ్వని' },
      { key: 2, textEn: 'Multiple reflections', textTe: 'బహుళ పరావర్తనాలు' },
      { key: 3, textEn: 'Reverberation', textTe: 'ప్రతినాదం (Reverberation)' },
      { key: 4, textEn: 'Resonance', textTe: 'అనునాదం' }
    ],
    correctAnswer: 3,
    explanation: 'Reverberation is the persistence of sound in an enclosed space after the original sound is produced, caused by repeated reflections.'
  },
  {
    id: 505,
    subjectId: 'physical_science',
    topic: 'Optics & Vision',
    questionEn: 'The lens used to correct the eye defect Myopia (Nearsightedness) is:',
    questionTe: 'హ్రస్వ దృష్టి (Myopia) లోపాన్ని సవరించుటకు వాడే కటకం:',
    options: [
      { key: 1, textEn: 'Concave lens', textTe: 'పుటాకార కటకం' },
      { key: 2, textEn: 'Convex lens', textTe: 'కుంభాకార కటకం' },
      { key: 3, textEn: 'Plano convex lens', textTe: 'సమతల కుంభాకార కటకం' },
      { key: 4, textEn: 'Cylindrical lens', textTe: 'స్థూపాకార కటకం' }
    ],
    correctAnswer: 1,
    explanation: 'Myopia causes light rays to converge in front of the retina. A diverging (concave) lens of suitable focal length is used to correct it.'
  },
  {
    id: 506,
    subjectId: 'physical_science',
    topic: 'Electricity',
    questionEn: 'One kilowatt-hour (1 kWh) of electrical energy is equal to:',
    questionTe: 'ఒక కిలోవాట్ అవర్ (1 KWh) దీనికి సమానం:',
    options: [
      { key: 1, textEn: '3.6 × 10⁶ erg', textTe: '3.6 × 10⁶ erg' },
      { key: 2, textEn: '3.6 × 10⁶ Joules', textTe: '3.6 × 10⁶ జౌల్స్' },
      { key: 3, textEn: '3.6 erg', textTe: '3.6 erg' },
      { key: 4, textEn: '3.6 Joules', textTe: '3.6 జౌల్స్' }
    ],
    correctAnswer: 2,
    explanation: '1 kWh = 1000 W × 3600 seconds = 3,600,000 Joules = 3.6 × 10⁶ J.'
  },
  {
    id: 507,
    subjectId: 'physical_science',
    topic: 'Chemistry - Matter & Changes',
    questionEn: 'The chemical name of baking soda is:',
    questionTe: 'వంట సోడా రసాయన నామము:',
    options: [
      { key: 1, textEn: 'Sodium carbonate', textTe: 'సోడియం కార్బోనేట్' },
      { key: 2, textEn: 'Sodium bicarbonate', textTe: 'సోడియం బైకార్బోనేట్ (NaHCO₃)' },
      { key: 3, textEn: 'Sodium sulphate', textTe: 'సోడియం సల్ఫేట్' },
      { key: 4, textEn: 'Sodium chloride', textTe: 'సోడియం క్లోరైడ్' }
    ],
    correctAnswer: 2,
    explanation: 'Baking soda is Sodium Bicarbonate (or Sodium Hydrogen Carbonate, NaHCO₃).'
  },
  {
    id: 508,
    subjectId: 'physical_science',
    topic: 'Acids, Bases & Salts',
    questionEn: 'The acid present in Tomato is:',
    questionTe: 'టొమాటోలో ఉండే ప్రధాన ఆమ్లం:',
    options: [
      { key: 1, textEn: 'Oxalic acid', textTe: 'ఆక్సాలిక్ ఆమ్లం' },
      { key: 2, textEn: 'Tartaric acid', textTe: 'టార్టారిక్ ఆమ్లం' },
      { key: 3, textEn: 'Citric acid', textTe: 'సిట్రిక్ ఆమ్లం' },
      { key: 4, textEn: 'Acetic acid', textTe: 'ఎసిటిక్ ఆమ్లం' }
    ],
    correctAnswer: 1,
    explanation: 'Tomatoes contain high amounts of Oxalic acid along with mild citric and malic acids.'
  },
  {
    id: 509,
    subjectId: 'physical_science',
    topic: 'Carbon & its Compounds',
    questionEn: 'The main component of Biogas and Compressed Natural Gas (CNG) is:',
    questionTe: 'బయోగ్యాస్ మరియు CNG లలో ముఖ్య అనుఘటకం:',
    options: [
      { key: 1, textEn: 'Ethane', textTe: 'ఈథేన్' },
      { key: 2, textEn: 'Methane', textTe: 'మీథేన్ (CH₄)' },
      { key: 3, textEn: 'Propane', textTe: 'ప్రొపేన్' },
      { key: 4, textEn: 'Butane', textTe: 'బ్యూటేన్' }
    ],
    correctAnswer: 2,
    explanation: 'Methane (CH₄) makes up 60-70% of biogas and up to 80-95% of CNG.'
  },
  {
    id: 510,
    subjectId: 'physical_science',
    topic: 'Science Pedagogy',
    questionEn: 'The first step in the "Scientific Method" of inquiry is:',
    questionTe: 'శాస్త్రీయ పద్ధతి లోని మొదటి సోపానం:',
    options: [
      { key: 1, textEn: 'Identification of the problem', textTe: 'సమస్యను గుర్తించడం' },
      { key: 2, textEn: 'Analyzing problem', textTe: 'సమస్యను విశ్లేషించడం' },
      { key: 3, textEn: 'Testing hypothesis', textTe: 'ప్రాకల్పనను పరీక్షించడం' },
      { key: 4, textEn: 'Generalization of results', textTe: 'ఫలితాలను సాధారణీకరించడం' }
    ],
    correctAnswer: 1,
    explanation: 'Scientific investigation always begins with feeling and identifying the problem, followed by hypothesis formulation, experiment, observation, and inference.'
  },

  // ==========================================
  // SUBJECT 6: BIOLOGICAL SCIENCE
  // ==========================================
  {
    id: 601,
    subjectId: 'biology',
    topic: 'Botany - Plant Structure',
    questionEn: 'Plants having parallel venation of leaves possess this type of root system:',
    questionTe: 'పత్రాలలో సమాంతర ఈనెల వ్యాపనం కలిగిన మొక్కలు ఈ రకమైన వేరు వ్యవస్థను కలిగి ఉంటాయి:',
    options: [
      { key: 1, textEn: 'Tap Root System', textTe: 'తల్లి వేరు వ్యవస్థ' },
      { key: 2, textEn: 'Main Root System', textTe: 'ప్రధాన వేరు వ్యవస్థ' },
      { key: 3, textEn: 'Lateral Root System', textTe: 'పార్శ్వ వేరు వ్యవస్థ' },
      { key: 4, textEn: 'Fibrous Root System', textTe: 'గుబురు వేరు వ్యవస్థ (పీచు వేర్లు)' }
    ],
    correctAnswer: 4,
    explanation: 'Monocots with parallel leaf venation (like grass, paddy, maize) have fibrous root systems, whereas reticulate venation corresponds to tap root systems.'
  },
  {
    id: 602,
    subjectId: 'biology',
    topic: 'Cytology - Cell Biology',
    questionEn: 'Which cell organelle is called the "Suicidal bags of the cell"?',
    questionTe: 'కణంలో ‘స్వయం విచ్ఛిత్తి సంచులు’ (Suicidal bags) గా పిలువబడే కణాంగం:',
    options: [
      { key: 1, textEn: 'Nucleus', textTe: 'కేంద్రకం' },
      { key: 2, textEn: 'Mitochondria', textTe: 'మైటోకాండ్రియా' },
      { key: 3, textEn: 'Lysosomes', textTe: 'లైసోజోములు' },
      { key: 4, textEn: 'Ribosomes', textTe: 'రైబోజోములు' }
    ],
    correctAnswer: 3,
    explanation: 'Lysosomes contain powerful digestive hydrolytic enzymes capable of digesting damaged cell contents when bursting.'
  },
  {
    id: 603,
    subjectId: 'biology',
    topic: 'Cytology - Cell Biology',
    questionEn: 'Which cell organelle is known as the "Powerhouse of the cell"?',
    questionTe: '‘కణ శక్త్యాగారం’ (Powerhouse of the cell) గా పిలువబడే కణాంగం:',
    options: [
      { key: 1, textEn: 'Mitochondria', textTe: 'మైటోకాండ్రియా' },
      { key: 2, textEn: 'Vacuole', textTe: 'రిక్తిక' },
      { key: 3, textEn: 'Plastid', textTe: 'ప్లాస్టిడ్' },
      { key: 4, textEn: 'Endoplasmic Reticulum', textTe: 'అంతర్జీవ ద్రవ్యజాలం' }
    ],
    correctAnswer: 1,
    explanation: 'Mitochondria are the sites of cellular respiration where ATP (energy currency) is generated.'
  },
  {
    id: 604,
    subjectId: 'biology',
    topic: 'Microbiology & Diseases',
    questionEn: 'Which bacterium lives symbiotically inside the root nodules of leguminous plants for nitrogen fixation?',
    questionTe: 'చిక్కుడు జాతి మొక్కల వేర్ల బొడిపెలలో నివసించే నత్రజని స్థాపక బాక్టీరియా:',
    options: [
      { key: 1, textEn: 'Lactobacillus', textTe: 'లాక్టోబాసిల్లస్' },
      { key: 2, textEn: 'Cyanobacteria', textTe: 'సైనోబాక్టీరియా' },
      { key: 3, textEn: 'Rhizobium', textTe: 'రైజోబియం' },
      { key: 4, textEn: 'Streptococcus', textTe: 'స్ట్రెప్టోకోకస్' }
    ],
    correctAnswer: 3,
    explanation: 'Rhizobium forms symbiotic nodules in pulses/legumes, converting atmospheric nitrogen into usable nitrates.'
  },
  {
    id: 605,
    subjectId: 'biology',
    topic: 'Human Physiology - Circulation',
    questionEn: 'The normal blood pressure in a healthy human adult is:',
    questionTe: 'మానవులలో సాధారణ రక్త పీడనం (Normal Blood Pressure):',
    options: [
      { key: 1, textEn: '120/80 mm of H₂O', textTe: '120/80 mm of H₂O' },
      { key: 2, textEn: '80/120 mm of H₂O', textTe: '80/120 mm of H₂O' },
      { key: 3, textEn: '80/120 mm of Hg', textTe: '80/120 mm of Hg' },
      { key: 4, textEn: '120/80 mm of Hg', textTe: '120/80 mm of Hg (పాదరస స్తంభం)' }
    ],
    correctAnswer: 4,
    explanation: 'Standard healthy arterial BP is 120 mm Hg systolic over 80 mm Hg diastolic.'
  },
  {
    id: 606,
    subjectId: 'biology',
    topic: 'Physiology - Coordination & Control',
    questionEn: 'The junction or microscopic gap between two neurons is termed:',
    questionTe: 'రెండు న్యూరాన్ల (నాడీకణాల) మధ్య గల ఖాళీ ప్రదేశం:',
    options: [
      { key: 1, textEn: 'Dendrite', textTe: 'డెండ్రైట్' },
      { key: 2, textEn: 'Synapse', textTe: 'సైనాప్స్' },
      { key: 3, textEn: 'Axon', textTe: 'ఆక్సాన్' },
      { key: 4, textEn: 'Myelin Sheath', textTe: 'మయలిన్ తొడుగు' }
    ],
    correctAnswer: 2,
    explanation: 'A synapse is a small junction across which electrical or neurotransmitter signals pass from one neuron to the next.'
  },
  {
    id: 607,
    subjectId: 'biology',
    topic: 'Reproduction & Genetics',
    questionEn: 'Vegetative propagation through leaf margins is famously exhibited by:',
    questionTe: 'ఆకుల అంచుల ద్వారా శాఖీయ ప్రత్యుత్పత్తి జరిపే మొక్క:',
    options: [
      { key: 1, textEn: 'Banyan', textTe: 'మర్రి' },
      { key: 2, textEn: 'Rose', textTe: 'గులాబీ' },
      { key: 3, textEn: 'Bryophyllum', textTe: 'బ్రయోఫిల్లం (రణపాల)' },
      { key: 4, textEn: 'Sugarcane', textTe: 'చెరకు' }
    ],
    correctAnswer: 3,
    explanation: 'Bryophyllum (రణపాల) produces adventitious plantlets directly in the notches of its leaf margins.'
  },
  {
    id: 608,
    subjectId: 'biology',
    topic: 'Ecology & Environmental Science',
    questionEn: 'Which layer in the atmosphere protects the Earth from harmful ultraviolet (UV) radiation?',
    questionTe: 'సూర్యుని ప్రమాదకర అతినీలలోహిత (UV) వికిరణాల నుండి జీవులను రక్షించే పొర:',
    options: [
      { key: 1, textEn: 'Carbon monoxide', textTe: 'CO' },
      { key: 2, textEn: 'Nitrogen layer', textTe: 'N₂' },
      { key: 3, textEn: 'Carbon dioxide', textTe: 'CO₂' },
      { key: 4, textEn: 'Ozone layer', textTe: 'ఓజోన్ పొర (O₃)' }
    ],
    correctAnswer: 4,
    explanation: 'The stratospheric ozone (O₃) layer absorbs almost 98% of harmful ultraviolet radiation emitted by the Sun.'
  },
  {
    id: 609,
    subjectId: 'biology',
    topic: 'Forests & Conservation',
    questionEn: 'The first designated Reserve Forest in India is:',
    questionTe: 'భారతదేశంలోని మొదటి రిజర్వ్ అటవీ ప్రాంతం:',
    options: [
      { key: 1, textEn: 'Pachmarhi Sanctuary', textTe: 'పచ్మర్వి వన్యప్రాణ సంరక్షణా కేంద్రం' },
      { key: 2, textEn: 'Satpura National Park', textTe: 'సాత్పురా జాతీయ పార్క్ (మధ్యప్రదేశ్)' },
      { key: 3, textEn: 'Bori Reserve Forest', textTe: 'బోరి రిజర్వ్ ఫారెస్ట్' },
      { key: 4, textEn: 'Kaziranga National Park', textTe: 'ఖజిరంగా జాతీయ పార్క్' }
    ],
    correctAnswer: 2,
    explanation: 'Satpura National Park is historically documented as the first Reserve Forest of India, famous for fine Indian Teak.'
  },
  {
    id: 610,
    subjectId: 'biology',
    topic: 'Pedagogy of Biological Science',
    questionEn: 'In Bloom\'s revised taxonomy of educational objectives, the very first step in the Cognitive Domain is:',
    questionTe: 'బ్లూమ్స్ విద్యా లక్ష్యాల వర్గీకరణలో జ్ఞానాత్మక రంగంలోని మొదటి సోపానం:',
    options: [
      { key: 1, textEn: 'Understanding', textTe: 'అవగాహన' },
      { key: 2, textEn: 'Application', textTe: 'అన్వయము' },
      { key: 3, textEn: 'Knowledge (Remembering)', textTe: 'జ్ఞానం (స్మరణ/గుర్తుకు తెచ్చుకోవడం)' },
      { key: 4, textEn: 'Evaluation', textTe: 'మూల్యాంకనం' }
    ],
    correctAnswer: 3,
    explanation: 'The foundational baseline of the cognitive domain hierarchy is Knowledge/Remembering.'
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
    subjectId: 'cdp' as SubjectId,
    title: 'Daily CDP Pedagogy Concepts',
    time: '07:30',
    days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] as ('Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun')[],
    enabled: true,
    notes: 'Review Piaget cognitive stages, Vygotsky ZPD and Erikson crises.',
    createdAt: '2026-10-01'
  },
  {
    id: 'rem-2',
    subjectId: 'telugu' as SubjectId,
    title: 'Telugu Sandhulu & Alankaralu',
    time: '18:00',
    days: ['Mon', 'Wed', 'Fri', 'Sun'] as ('Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun')[],
    enabled: true,
    notes: 'Practice Utpalamala/Champakamala chandassu and Sumathi sathakam bits.',
    createdAt: '2026-10-01'
  },
  {
    id: 'rem-3',
    subjectId: 'english' as SubjectId,
    title: 'English Grammar & Vocabulary Drill',
    time: '20:30',
    days: ['Tue', 'Thu', 'Sat'] as ('Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun')[],
    enabled: true,
    notes: 'Revise active/passive voice, direct/indirect and question tags.',
    createdAt: '2026-10-01'
  }
];
