import { ExplainerCard, TimelineEntry, UserLanguage } from "@/lib/types";

const timelineByLanguage: Record<UserLanguage, TimelineEntry[]> = {
  English: [
    {
      id: "registration-open",
      title: "Check eligibility and registration",
      window: "Start here",
      description: "Confirm voter eligibility, gather documents, and verify your status before deadlines become urgent."
    },
    {
      id: "registration-closing",
      title: "Complete registration before the deadline",
      window: "Deadline approaching",
      description: "Use official election portals to submit or correct voter details and avoid last-minute mistakes."
    },
    {
      id: "campaign-period",
      title: "Understand your constituency and ballot basics",
      window: "Preparation period",
      description: "Learn what documents to carry, what happens at the polling station, and how the voting process works."
    },
    {
      id: "election-week",
      title: "Plan your voting day",
      window: "One week before polling",
      description: "Decide when you will go, how you will travel, and which official resources you will use if information changes."
    },
    {
      id: "polling-day",
      title: "Vote with confidence",
      window: "Polling day",
      description: "Carry the right identification, follow the polling process, and use official help desks if you need assistance."
    },
    {
      id: "results-and-followup",
      title: "Track official results and keep your records updated",
      window: "After polling",
      description: "Use official result portals and save what you learned for the next election cycle."
    }
  ],
  Hindi: [
    {
      id: "registration-open",
      title: "योग्यता और पंजीकरण जांचें",
      window: "यहीं से शुरू करें",
      description: "मतदाता योग्यता की पुष्टि करें, दस्तावेज़ तैयार रखें और अंतिम तिथियों से पहले अपनी स्थिति जांचें।"
    },
    {
      id: "registration-closing",
      title: "अंतिम तिथि से पहले पंजीकरण पूरा करें",
      window: "अंतिम तिथि निकट है",
      description: "आधिकारिक पोर्टल का उपयोग करके आवेदन जमा करें या विवरण सुधारें ताकि अंतिम समय की गलती न हो।"
    },
    {
      id: "campaign-period",
      title: "अपने निर्वाचन क्षेत्र और मतदान की मूल बातें समझें",
      window: "तैयारी का समय",
      description: "जानें कि कौन से दस्तावेज़ साथ रखने हैं, मतदान केंद्र पर क्या होगा और मतदान प्रक्रिया कैसे चलती है।"
    },
    {
      id: "election-week",
      title: "मतदान दिवस की योजना बनाएं",
      window: "मतदान से एक सप्ताह पहले",
      description: "निर्णय लें कि कब जाना है, कैसे पहुंचना है और यदि जानकारी बदले तो किन आधिकारिक स्रोतों पर भरोसा करना है।"
    },
    {
      id: "polling-day",
      title: "आत्मविश्वास के साथ वोट दें",
      window: "मतदान दिवस",
      description: "सही पहचान पत्र साथ रखें, मतदान प्रक्रिया का पालन करें और जरूरत होने पर आधिकारिक सहायता लें।"
    },
    {
      id: "results-and-followup",
      title: "आधिकारिक परिणाम देखें और रिकॉर्ड अपडेट रखें",
      window: "मतदान के बाद",
      description: "आधिकारिक परिणाम पोर्टल का उपयोग करें और अगली चुनावी प्रक्रिया के लिए सीखी गई बातें संजोए रखें।"
    }
  ],
  Marathi: [
    {
      id: "registration-open",
      title: "पात्रता आणि नोंदणी तपासा",
      window: "इथून सुरुवात करा",
      description: "मतदार पात्रता तपासा, कागदपत्रे तयार ठेवा आणि अंतिम तारखांपूर्वी तुमची स्थिती पडताळा."
    },
    {
      id: "registration-closing",
      title: "अंतिम तारखेपूर्वी नोंदणी पूर्ण करा",
      window: "अंतिम तारीख जवळ आली आहे",
      description: "अधिकृत पोर्टल वापरून अर्ज करा किंवा दुरुस्ती करा, जेणेकरून शेवटच्या क्षणी गोंधळ होणार नाही."
    },
    {
      id: "campaign-period",
      title: "तुमचे मतदारसंघ आणि मतदानाची मूलभूत माहिती समजा",
      window: "तयारीचा कालावधी",
      description: "कोणती कागदपत्रे बाळगायची, मतदान केंद्रावर काय होईल आणि मतदान प्रक्रिया कशी चालते ते समजून घ्या."
    },
    {
      id: "election-week",
      title: "मतदानाच्या दिवसाची योजना करा",
      window: "मतदानापूर्वीचा एक आठवडा",
      description: "कधी जायचे, कसे पोहोचायचे आणि माहिती बदलल्यास कोणत्या अधिकृत स्रोतांवर विश्वास ठेवायचा ते ठरवा."
    },
    {
      id: "polling-day",
      title: "आत्मविश्वासाने मतदान करा",
      window: "मतदानाचा दिवस",
      description: "योग्य ओळखपत्र बाळगा, मतदानाची प्रक्रिया पाळा आणि गरज असल्यास अधिकृत मदत घ्या."
    },
    {
      id: "results-and-followup",
      title: "अधिकृत निकाल पाहा आणि नोंदी अद्ययावत ठेवा",
      window: "मतदानानंतर",
      description: "अधिकृत निकाल पोर्टल वापरा आणि पुढील निवडणुकीसाठी उपयुक्त शिकवण लक्षात ठेवा."
    }
  ]
};

const cardsByLanguage: Record<UserLanguage, ExplainerCard[]> = {
  English: [
    {
      id: "eci",
      title: "Election Commission of India",
      description: "Primary official resource for election process guidance, schedules, and announcements.",
      actionLabel: "Visit ECI",
      href: "https://www.eci.gov.in/"
    },
    {
      id: "voters-service",
      title: "Voters' Service Portal",
      description: "Use the official voter services portal for registration, corrections, and status checks.",
      actionLabel: "Open portal",
      href: "https://voters.eci.gov.in/"
    },
    {
      id: "nvsp",
      title: "National Voters' Service Portal",
      description: "Cross-check voter services and learn more about registration and participation.",
      actionLabel: "Go to NVSP",
      href: "https://www.nvsp.in/"
    }
  ],
  Hindi: [
    {
      id: "eci",
      title: "भारत निर्वाचन आयोग",
      description: "चुनाव प्रक्रिया, कार्यक्रम और आधिकारिक घोषणाओं के लिए मुख्य स्रोत।",
      actionLabel: "ECI खोलें",
      href: "https://www.eci.gov.in/"
    },
    {
      id: "voters-service",
      title: "वोटर्स सर्विस पोर्टल",
      description: "पंजीकरण, सुधार और स्थिति जांच के लिए आधिकारिक वोटर सेवा पोर्टल का उपयोग करें।",
      actionLabel: "पोर्टल खोलें",
      href: "https://voters.eci.gov.in/"
    },
    {
      id: "nvsp",
      title: "नेशनल वोटर्स सर्विस पोर्टल",
      description: "मतदाता सेवाओं की पुष्टि करें और पंजीकरण व भागीदारी के बारे में अधिक जानें।",
      actionLabel: "NVSP पर जाएं",
      href: "https://www.nvsp.in/"
    }
  ],
  Marathi: [
    {
      id: "eci",
      title: "भारत निवडणूक आयोग",
      description: "निवडणूक प्रक्रिया, वेळापत्रक आणि अधिकृत घोषणांसाठी मुख्य स्रोत.",
      actionLabel: "ECI उघडा",
      href: "https://www.eci.gov.in/"
    },
    {
      id: "voters-service",
      title: "मतदार सेवा पोर्टल",
      description: "नोंदणी, दुरुस्ती आणि स्थिती तपासणीसाठी अधिकृत मतदार सेवा पोर्टल वापरा.",
      actionLabel: "पोर्टल उघडा",
      href: "https://voters.eci.gov.in/"
    },
    {
      id: "nvsp",
      title: "नॅशनल वोटर्स सर्विस पोर्टल",
      description: "मतदार सेवांची पडताळणी करा आणि नोंदणी व सहभागाबद्दल अधिक जाणून घ्या.",
      actionLabel: "NVSP वर जा",
      href: "https://www.nvsp.in/"
    }
  ]
};

export function getElectionTimeline(language: UserLanguage): TimelineEntry[] {
  return timelineByLanguage[language];
}

export function getExplainerCards(language: UserLanguage): ExplainerCard[] {
  return cardsByLanguage[language];
}

export const supportedTopics = [
  "registration",
  "voter id",
  "polling day",
  "election timeline",
  "eci",
  "constituency",
  "eligibility",
  "official portal",
  "documents"
];