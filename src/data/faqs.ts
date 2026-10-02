export interface FAQItem {
  id: string;
  category: 'udid' | 'percentage' | 'benchmark' | 'certificate' | 'general' | 'contacts';
  question: string;
  questionHi: string;
  answer: string;
  answerHi: string;
  actionUrl?: string;
  actionLabel?: string;
  actionLabelHi?: string;
}

export const FAQS_DATA: FAQItem[] = [
  {
    id: 'faq-udid-what',
    category: 'udid',
    question: 'What is a UDID Card and why is it important?',
    questionHi: 'यूडीआईडी (UDID) कार्ड क्या है और यह क्यों जरूरी है?',
    answer: 'UDID (Unique Disability Identity) Card is a single nationwide digital smart card issued by the Ministry of Social Justice and Empowerment, Government of India. It replaces the need to carry multiple physical paper certificates across states, departments, railway counters, and scholarship portals. It contains your verified disability percentage, QR code, and unique 18-digit identity number.',
    answerHi: 'यूडीआईडी (विशिष्ट दिव्यांगता पहचान) कार्ड भारत सरकार के सामाजिक न्याय एवं अधिकारिता मंत्रालय द्वारा जारी एक डिजिटल स्मार्ट कार्ड है। यह पूरे देश में मान्य है और आपको हर जगह भारी-भरकम मेडिकल फाइल ले जाने की जरूरत नहीं होती। इसमें आपका सत्यापित दिव्यांगता प्रतिशत, क्यूआर कोड और 18 अंकों का विशिष्ट नंबर दर्ज होता है।',
    actionUrl: 'https://www.swavlambancard.gov.in/',
    actionLabel: 'Visit Official UDID Portal (swavlambancard.gov.in)',
    actionLabelHi: 'आधिकारिक यूडीआईडी पोर्टल पर जाएं',
  },
  {
    id: 'faq-disability-percentage',
    category: 'percentage',
    question: 'I don\'t understand my disability percentage. Where do I find it?',
    questionHi: 'मुझे अपना दिव्यांगता प्रतिशत समझ नहीं आ रहा। यह कहां लिखा होता है?',
    answer: 'Your disability percentage is explicitly written on your Disability Certificate and printed on the front or back of your UDID smart card (e.g., "40%", "60%", "85%"). It is scientifically evaluated by a Government Medical Board (consisting of Orthopedic, ENT, Eye, or Psychiatric specialists) based on standardized national guidelines of functional limitation.',
    answerHi: 'आपका दिव्यांगता प्रतिशत आपके दिव्यांगता प्रमाण पत्र और यूडीआईडी कार्ड पर स्पष्ट रूप से अंकित होता है (जैसे "40%", "60%", "80%")। यह सरकारी डॉक्टरों के मेडिकल बोर्ड द्वारा राष्ट्रीय दिशा-निर्देशों के अनुसार शारीरिक या संवेदी कार्यक्षमता के आधार पर तय किया जाता है।',
  },
  {
    id: 'faq-benchmark-disability',
    category: 'benchmark',
    question: 'What does "Benchmark Disability" mean?',
    questionHi: '"बेंचमार्क दिव्यांगता" (मानक दिव्यांगता) का क्या अर्थ है?',
    answer: 'Under Section 2(r) of the Rights of Persons with Disabilities (RPwD) Act 2016, a "Person with Benchmark Disability" means a person certified to have not less than 40% of any specified disability. Almost all major government welfare benefits, reservations in jobs (4%), admissions in universities (5%), and free assistive devices require a minimum benchmark disability of 40%.',
    answerHi: 'दिव्यांगजन अधिकार अधिनियम 2016 की धारा 2(r) के तहत, "बेंचमार्क दिव्यांगता" का अर्थ है कि व्यक्ति के पास कम से कम 40% या उससे अधिक प्रमाणित दिव्यांगता है। अधिकांश सरकारी योजनाओं, 4% सरकारी नौकरी आरक्षण, 5% कॉलेज आरक्षण और निःशुल्क सहायक उपकरणों का लाभ लेने के लिए न्यूनतम 40% दिव्यांगता होना अनिवार्य है।',
  },
  {
    id: 'faq-no-certificate',
    category: 'certificate',
    question: 'I don\'t have a disability certificate or UDID card yet. How do I get one?',
    questionHi: 'मेरे पास अभी दिव्यांगता प्रमाण पत्र या यूडीआईडी कार्ड नहीं है। इसे कैसे बनवाएं?',
    answer: 'Getting a certificate is straightforward:\n1. Visit the UDID portal (swavlambancard.gov.in) and click "Apply for Disability Certificate & UDID Card".\n2. Upload your Aadhaar card and recent passport photo.\n3. Choose your nearest District Civil Hospital / CMO office.\n4. You will receive an appointment date for a physical medical assessment.\n5. The Medical Board will assess your condition and issue the digital certificate and mail the laminated plastic UDID card to your home address free of charge.',
    answerHi: 'प्रमाण पत्र बनवाना बहुत आसान है:\n1. swavlambancard.gov.in पोर्टल पर जाकर "Apply for Disability Certificate & UDID Card" पर क्लिक करें।\n2. अपना आधार कार्ड और पासपोर्ट साइज फोटो अपलोड करें।\n3. अपने नजदीकी जिला सरकारी अस्पताल / सीएमओ कार्यालय का चयन करें।\n4. मेडिकल जांच के लिए आपको एक तारीख (अपॉइंटमेंट) मिलेगी।\n5. मेडिकल बोर्ड द्वारा जांच के बाद डिजिटल सर्टिफिकेट ऑनलाइन जारी हो जाएगा और प्लास्टिक स्मार्ट कार्ड डाक द्वारा आपके घर निःशुल्क भेज दिया जाएगा।',
    actionUrl: 'https://www.swavlambancard.gov.in/pwd/application',
    actionLabel: 'Apply Online for UDID / Certificate',
    actionLabelHi: 'यूडीआईडी / प्रमाण पत्र हेतु ऑनलाइन आवेदन करें',
  },
  {
    id: 'faq-how-are-schemes-filtered',
    category: 'general',
    question: 'How does DivyangSahay match and filter schemes for me?',
    questionHi: 'दिव्यांगसहाय मेरे लिए योजनाओं का चयन और मिलान कैसे करता है?',
    answer: 'DivyangSahay uses an intelligent rule engine that matches your age, state, disability type, certified percentage, family income, employment situation, and expressed needs against the exact gazetted guidelines of 25+ Central and State welfare policies. It categorizes your eligibility into Likely Eligible, May Be Eligible, and Check Eligibility with transparent checklists.',
    answerHi: 'दिव्यांगसहाय एक स्मार्ट नियम प्रणाली का उपयोग करता है जो आपकी उम्र, राज्य, दिव्यांगता के प्रकार, प्रतिशत, आय और वर्तमान स्थिति की तुलना 25+ केंद्र व राज्य सरकार की सरकारी नीतियों के नियमों से करता है। यह आपको स्पष्ट रूप से संभावित पात्र योजनाओं की सूची और आवश्यक दस्तावेजों की चेकलिस्ट दिखाता है।',
  },
];

export interface ImportantContact {
  id: string;
  title: string;
  titleHi: string;
  authority: string;
  authorityHi: string;
  phone: string;
  email?: string;
  timing: string;
  timingHi: string;
  description: string;
  descriptionHi: string;
  portalUrl?: string;
  badge: 'National' | 'State' | 'Toll-Free' | 'Emergency';
}

export const IMPORTANT_CONTACTS: ImportantContact[] = [
  {
    id: 'contact-depwd',
    title: 'National Disability Helpline',
    titleHi: 'राष्ट्रीय दिव्यांगजन हेल्पलाइन',
    authority: 'Department of Empowerment of Persons with Disabilities (DEPwD)',
    authorityHi: 'दिव्यांगजन सशक्तिकरण विभाग, भारत सरकार',
    phone: '1800-11-2001',
    email: 'secretaryda-msje@nic.in',
    timing: '9:00 AM - 5:30 PM (Mon-Fri)',
    timingHi: 'सुबह 9:00 से शाम 5:30 (सोमवार से शुक्रवार)',
    description: 'Central enquiry and assistance for national schemes, scholarships and policies.',
    descriptionHi: 'राष्ट्रीय योजनाओं, छात्रवृत्तियों और सरकारी नीतियों के लिए केंद्रीय पूछताछ और सहायता।',
    portalUrl: 'https://disabilityaffairs.gov.in/',
    badge: 'Toll-Free',
  },
  {
    id: 'contact-kiran',
    title: 'KIRAN - 24x7 Mental Health Helpline',
    titleHi: 'किरण - 24x7 मानसिक स्वास्थ्य एवं पुनर्वास हेल्पलाइन',
    authority: 'DEPwD, Ministry of Social Justice & Empowerment',
    authorityHi: 'सामाजिक न्याय एवं अधिकारिता मंत्रालय',
    phone: '1800-599-0019',
    timing: '24 Hours, 7 Days a Week',
    timingHi: '24 घंटे, सातों दिन (निःशुल्क)',
    description: 'Toll-free 24/7 mental health rehabilitation helpline operating in 13 regional languages for counseling, distress support and psychological first-aid.',
    descriptionHi: 'तनाव, चिंता और मनोवैज्ञानिक सहायता के लिए 13 भारतीय भाषाओं में 24 घंटे चलने वाली निःशुल्क पुनर्वास हेल्पलाइन।',
    portalUrl: 'https://disabilityaffairs.gov.in/',
    badge: 'Emergency',
  },
  {
    id: 'contact-alimco',
    title: 'ALIMCO Assistive Aids & Camp Helpline',
    titleHi: 'एलिम्को (ALIMCO) सहायक उपकरण एवं वितरण शिविर हेल्पलाइन',
    authority: 'Artificial Limbs Manufacturing Corporation of India',
    authorityHi: 'भारतीय कृत्रिम अंग निर्माण निगम',
    phone: '1800-180-5129',
    email: 'alimco@alimco.in',
    timing: '9:30 AM - 6:00 PM',
    timingHi: 'सुबह 9:30 से शाम 6:00 बजे तक',
    description: 'Enquire about upcoming free distribution camps for motorized tricycles, smart wheelchairs, hearing aids, Braille kits and artificial limbs.',
    descriptionHi: 'मोटराइज्ड ट्राइसाइकिल, व्हीलचेयर, हियरिंग एड और कृत्रिम अंगों के निःशुल्क वितरण शिविरों की जानकारी हेतु।',
    portalUrl: 'https://www.alimco.in/',
    badge: 'Toll-Free',
  },
  {
    id: 'contact-ccpd',
    title: 'Chief Commissioner for Persons with Disabilities (Grievances)',
    titleHi: 'मुख्य दिव्यांगजन आयुक्त कार्यालय (अधिकार व शिकायत निवारण)',
    authority: 'Office of the Chief Commissioner for Persons with Disabilities (CCPD)',
    authorityHi: 'मुख्य दिव्यांगजन आयुक्त का कार्यालय (भारत सरकार)',
    phone: '011-20897725',
    email: 'ccpd@nic.in',
    timing: '10:00 AM - 5:00 PM',
    timingHi: 'सुबह 10:00 से शाम 5:00 बजे तक',
    description: 'Quasi-judicial authority to register official legal complaints regarding discrimination, denial of 4% job reservation, barrier access or violation of rights under RPwD Act 2016.',
    descriptionHi: 'सरकारी नौकरी आरक्षण में भेदभाव, सुगम्यता की कमी या दिव्यांग अधिकारों के हनन पर सीधी कानूनी शिकायत दर्ज कराने का अर्ध-न्यायिक मंच।',
    portalUrl: 'http://www.ccdisabilities.nic.in/',
    badge: 'National',
  },
  {
    id: 'contact-national-trust',
    title: 'The National Trust Helpdesk',
    titleHi: 'द नेशनल ट्रस्ट सहायता केंद्र (ऑटिज्म, सीपी, एमआर)',
    authority: 'The National Trust for Autism, CP, MR and Multiple Disabilities',
    authorityHi: 'द नेशनल ट्रस्ट, सामाजिक न्याय मंत्रालय',
    phone: '011-20897711 / 011-20897712',
    email: 'contactus@thenationaltrust.in',
    timing: '9:30 AM - 5:30 PM (Mon-Fri)',
    timingHi: 'सुबह 9:30 से शाम 5:30 (सोमवार से शुक्रवार)',
    description: 'Support for Niramaya Health Insurance, Samarth Respite Care, Gharaunda Group Homes, and Legal Guardianship appointment.',
    descriptionHi: 'निरामया स्वास्थ्य बीमा, समर्थ राहत गृह, घरौंदा और कानूनी अभिभावक (लीगल गार्जियनशिप) प्रमाण पत्र के लिए संपर्क करें।',
    portalUrl: 'https://thenationaltrust.gov.in/',
    badge: 'National',
  },
  {
    id: 'contact-udid-support',
    title: 'UDID Portal Technical & Card Status Support',
    titleHi: 'यूडीआईडी पोर्टल तकनीकी एवं कार्ड स्टेटस सहायता',
    authority: 'Unique Disability ID Project Cell',
    authorityHi: 'यूडीआईडी प्रोजेक्ट सेल',
    phone: '011-24365019',
    email: 'support.udid-msje@gov.in',
    timing: '9:30 AM - 5:30 PM',
    timingHi: 'सुबह 9:30 से शाम 5:30',
    description: 'Assistance for online application errors, tracking card printing and postal dispatch status.',
    descriptionHi: 'ऑनलाइन आवेदन में त्रुटि सुधार, कार्ड प्रिंटिंग और डाक डिलीवरी स्टेटस ट्रैक करने के लिए।',
    portalUrl: 'https://www.swavlambancard.gov.in/',
    badge: 'National',
  },
];
