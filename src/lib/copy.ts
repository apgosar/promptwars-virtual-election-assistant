import { ElectionStage, UserLanguage, UserProfile, VoterExperience } from "@/lib/types";

type UiCopy = {
  heroEyebrow: string;
  heroTitle: string;
  heroDescription: string;
  featureHighlights: [string, string, string];
  profileTitle: string;
  urgencySuffix: string;
  profileDescription: string;
  labels: {
    name: string;
    ageBand: string;
    experience: string;
    registrationStatus: string;
    language: string;
    stage: string;
    question: string;
  };
  placeholders: {
    name: string;
    question: string;
  };
  options: {
    experience: Record<VoterExperience, string>;
    registrationStatus: Record<UserProfile["registrationStatus"], string>;
    stage: Record<ElectionStage, string>;
    language: Record<UserLanguage, string>;
  };
  sections: {
    nextSteps: string;
    askAssistant: string;
    processOnly: string;
    assistantPrompt: string;
    askButton: string;
    thinking: string;
    geminiAnswer: string;
    fallbackAnswer: string;
    refusalAnswer: string;
    timelineTitle: string;
    timelineDescription: string;
    resourcesTitle: string;
    resourcesDescription: string;
  };
  buttons: {
    addCalendar: string;
    openPortal: string;
  };
};

const copy: Record<UserLanguage, UiCopy> = {
  English: {
    heroEyebrow: "India election process guide",
    heroTitle: "Understand what to do next before polling day arrives.",
    heroDescription:
      "This MVP blends a rule-based readiness guide, a visual election timeline, and a guarded AI assistant so users can understand the process without getting buried in jargon.",
    featureHighlights: ["Timeline-first UX", "Official-resource links", "Gemini with safe fallback"],
    profileTitle: "Personalize the guide",
    urgencySuffix: "urgency",
    profileDescription: "Choose your current context and the assistant will prioritize the next best actions.",
    labels: {
      name: "Name",
      ageBand: "Age band",
      experience: "Voting experience",
      registrationStatus: "Registration status",
      language: "Language",
      stage: "Current election stage",
      question: "Question"
    },
    placeholders: {
      name: "Optional",
      question: "Example: What should a first-time voter carry on polling day?"
    },
    options: {
      experience: {
        "first-time": "First-time voter",
        returning: "Returning voter"
      },
      registrationStatus: {
        "not-started": "Not started",
        "in-progress": "In progress",
        completed: "Completed"
      },
      stage: {
        "registration-open": "Registration open",
        "registration-closing": "Registration deadline approaching",
        "campaign-period": "Preparation period",
        "election-week": "Election week",
        "polling-day": "Polling day",
        "results-and-followup": "Results and follow-up"
      },
      language: {
        English: "English",
        Hindi: "Hindi",
        Marathi: "Marathi"
      }
    },
    sections: {
      nextSteps: "What should I do next?",
      askAssistant: "Ask the assistant",
      processOnly: "Process questions only",
      assistantPrompt: "Try questions about eligibility, documents, registration, polling day, or timelines.",
      askButton: "Ask assistant",
      thinking: "Thinking...",
      geminiAnswer: "Gemini-assisted answer",
      fallbackAnswer: "Fallback answer",
      refusalAnswer: "Unsupported request",
      timelineTitle: "Understand the election timeline",
      timelineDescription: "The highlighted stage reflects the context selected above so users can orient themselves immediately.",
      resourcesTitle: "Trusted explainer cards",
      resourcesDescription: "Every recommendation keeps users close to official resources instead of free-floating advice."
    },
    buttons: {
      addCalendar: "Add Google Calendar reminder",
      openPortal: "Open official voter services"
    }
  },
  Hindi: {
    heroEyebrow: "भारत चुनाव प्रक्रिया मार्गदर्शिका",
    heroTitle: "मतदान दिवस से पहले जानें कि आपको अगला कदम क्या उठाना है।",
    heroDescription:
      "यह एमवीपी नियम-आधारित तैयारी मार्गदर्शिका, दृश्य चुनाव टाइमलाइन और सुरक्षित एआई सहायक को जोड़ता है ताकि उपयोगकर्ता बिना कठिन शब्दों में उलझे प्रक्रिया समझ सकें।",
    featureHighlights: ["टाइमलाइन-आधारित अनुभव", "आधिकारिक स्रोत लिंक", "सुरक्षित फॉलबैक के साथ Gemini"],
    profileTitle: "मार्गदर्शिका को अपने अनुसार बनाएं",
    urgencySuffix: "प्राथमिकता",
    profileDescription: "अपनी वर्तमान स्थिति चुनें और सहायक आपके लिए सबसे उपयोगी अगले कदम दिखाएगा।",
    labels: {
      name: "नाम",
      ageBand: "आयु समूह",
      experience: "मतदान अनुभव",
      registrationStatus: "पंजीकरण स्थिति",
      language: "भाषा",
      stage: "वर्तमान चुनाव चरण",
      question: "प्रश्न"
    },
    placeholders: {
      name: "वैकल्पिक",
      question: "उदाहरण: पहली बार वोट देने वाले को मतदान दिवस पर क्या साथ रखना चाहिए?"
    },
    options: {
      experience: {
        "first-time": "पहली बार वोटर",
        returning: "पहले भी वोट दे चुके हैं"
      },
      registrationStatus: {
        "not-started": "शुरू नहीं किया",
        "in-progress": "प्रक्रिया जारी है",
        completed: "पूरा हो चुका है"
      },
      stage: {
        "registration-open": "पंजीकरण खुला है",
        "registration-closing": "पंजीकरण की अंतिम तिथि निकट है",
        "campaign-period": "तैयारी का समय",
        "election-week": "चुनाव सप्ताह",
        "polling-day": "मतदान दिवस",
        "results-and-followup": "परिणाम और आगे की जानकारी"
      },
      language: {
        English: "English",
        Hindi: "हिंदी",
        Marathi: "मराठी"
      }
    },
    sections: {
      nextSteps: "मुझे अगला क्या करना चाहिए?",
      askAssistant: "सहायक से पूछें",
      processOnly: "केवल प्रक्रिया से जुड़े प्रश्न",
      assistantPrompt: "योग्यता, दस्तावेज़, पंजीकरण, मतदान दिवस या टाइमलाइन से जुड़े प्रश्न पूछें।",
      askButton: "सहायक से पूछें",
      thinking: "सोच रहा है...",
      geminiAnswer: "Gemini द्वारा सहायता प्राप्त उत्तर",
      fallbackAnswer: "फॉलबैक उत्तर",
      refusalAnswer: "यह अनुरोध समर्थित नहीं है",
      timelineTitle: "चुनाव टाइमलाइन समझें",
      timelineDescription: "हाइलाइट किया गया चरण आपकी चुनी हुई स्थिति दिखाता है ताकि आप तुरंत समझ सकें कि आप कहाँ हैं।",
      resourcesTitle: "विश्वसनीय जानकारी कार्ड",
      resourcesDescription: "हर सिफारिश आपको आधिकारिक स्रोतों के करीब रखती है, अनुमान आधारित सलाह से नहीं।"
    },
    buttons: {
      addCalendar: "Google Calendar रिमाइंडर जोड़ें",
      openPortal: "आधिकारिक वोटर सेवाएं खोलें"
    }
  },
  Marathi: {
    heroEyebrow: "भारत निवडणूक प्रक्रिया मार्गदर्शक",
    heroTitle: "मतदानाच्या दिवसा आधी पुढचे पाऊल काय आहे ते समजून घ्या.",
    heroDescription:
      "हा एमव्हीपी नियमाधारित तयारी मार्गदर्शक, दृश्य निवडणूक टाइमलाइन आणि सुरक्षित एआय सहाय्यक एकत्र आणतो, ज्यामुळे वापरकर्त्यांना प्रक्रिया सोप्या पद्धतीने समजते.",
    featureHighlights: ["टाइमलाइन-केंद्रित अनुभव", "अधिकृत स्रोत दुवे", "सुरक्षित फॉलबॅकसह Gemini"],
    profileTitle: "मार्गदर्शक वैयक्तिकरित्या सानुकूलित करा",
    urgencySuffix: "प्राधान्य",
    profileDescription: "तुमची सध्याची स्थिती निवडा आणि सहाय्यक सर्वात महत्त्वाची पुढची पावले दाखवेल.",
    labels: {
      name: "नाव",
      ageBand: "वयोगट",
      experience: "मतदानाचा अनुभव",
      registrationStatus: "नोंदणी स्थिती",
      language: "भाषा",
      stage: "सध्याचा निवडणूक टप्पा",
      question: "प्रश्न"
    },
    placeholders: {
      name: "ऐच्छिक",
      question: "उदाहरण: पहिल्यांदा मतदान करणाऱ्याने मतदानाच्या दिवशी कोणती कागदपत्रे बाळगावी?"
    },
    options: {
      experience: {
        "first-time": "पहिल्यांदा मतदान करणारे",
        returning: "पूर्वी मतदान केले आहे"
      },
      registrationStatus: {
        "not-started": "सुरू केलेले नाही",
        "in-progress": "प्रक्रिया सुरू आहे",
        completed: "पूर्ण झाले आहे"
      },
      stage: {
        "registration-open": "नोंदणी खुली आहे",
        "registration-closing": "नोंदणीची अंतिम तारीख जवळ आली आहे",
        "campaign-period": "तयारीचा कालावधी",
        "election-week": "निवडणूक आठवडा",
        "polling-day": "मतदानाचा दिवस",
        "results-and-followup": "निकाल आणि पुढील माहिती"
      },
      language: {
        English: "English",
        Hindi: "हिंदी",
        Marathi: "मराठी"
      }
    },
    sections: {
      nextSteps: "मला पुढे काय करावे लागेल?",
      askAssistant: "सहाय्यकाला विचारा",
      processOnly: "फक्त प्रक्रियेवरील प्रश्न",
      assistantPrompt: "पात्रता, कागदपत्रे, नोंदणी, मतदानाचा दिवस किंवा टाइमलाइन याबद्दल प्रश्न विचारा.",
      askButton: "सहाय्यकाला विचारा",
      thinking: "विचार सुरू आहे...",
      geminiAnswer: "Gemini-सहाय्यित उत्तर",
      fallbackAnswer: "फॉलबॅक उत्तर",
      refusalAnswer: "हा विनंती प्रकार समर्थित नाही",
      timelineTitle: "निवडणूक टाइमलाइन समजून घ्या",
      timelineDescription: "हायलाइट केलेला टप्पा तुम्ही निवडलेल्या स्थितीशी जुळतो, त्यामुळे तुम्ही लगेच स्वतःची स्थिती समजू शकता.",
      resourcesTitle: "विश्वसनीय माहिती कार्ड्स",
      resourcesDescription: "प्रत्येक शिफारस तुम्हाला तर्काधारित सल्ल्याऐवजी अधिकृत स्रोतांजवळ ठेवते."
    },
    buttons: {
      addCalendar: "Google Calendar स्मरणपत्र जोडा",
      openPortal: "अधिकृत मतदार सेवा उघडा"
    }
  }
};

const stageNames: Record<UserLanguage, Record<ElectionStage, string>> = {
  English: {
    "registration-open": "registration open",
    "registration-closing": "registration deadline approaching",
    "campaign-period": "preparation period",
    "election-week": "election week",
    "polling-day": "polling day",
    "results-and-followup": "results and follow-up"
  },
  Hindi: {
    "registration-open": "पंजीकरण खुले होने के चरण",
    "registration-closing": "पंजीकरण की अंतिम तिथि के निकट चरण",
    "campaign-period": "तैयारी के चरण",
    "election-week": "चुनाव सप्ताह",
    "polling-day": "मतदान दिवस",
    "results-and-followup": "परिणाम और आगे की जानकारी वाले चरण"
  },
  Marathi: {
    "registration-open": "नोंदणी खुली असलेला टप्पा",
    "registration-closing": "नोंदणीच्या अंतिम तारखेपूर्वीचा टप्पा",
    "campaign-period": "तयारीचा टप्पा",
    "election-week": "निवडणूक आठवडा",
    "polling-day": "मतदानाचा दिवस",
    "results-and-followup": "निकाल आणि पुढील माहितीचा टप्पा"
  }
};

export function getUiCopy(language: UserLanguage): UiCopy {
  return copy[language];
}

export function getStageName(language: UserLanguage, stage: ElectionStage): string {
  return stageNames[language][stage];
}