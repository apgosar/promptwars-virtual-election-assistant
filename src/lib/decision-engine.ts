import { getStageName } from "@/lib/copy";
import { GuidanceResult, UserLanguage, UserProfile } from "@/lib/types";

const baseTopics = ["Eligibility basics", "Registration status", "Polling day checklist"];

const languageTopics: Record<UserLanguage, string[]> = {
  English: baseTopics,
  Hindi: ["योग्यता की मूल बातें", "पंजीकरण स्थिति", "मतदान दिवस चेकलिस्ट"],
  Marathi: ["पात्रतेची मूलभूत माहिती", "नोंदणी स्थिती", "मतदान दिवस तपासणी सूची"]
};

export function getGuidance(profile: UserProfile): GuidanceResult {
  const isUrgentStage = profile.stage === "registration-closing" || profile.stage === "election-week" || profile.stage === "polling-day";
  const isUnregistered = profile.registrationStatus !== "completed";
  const urgency: GuidanceResult["urgency"] = isUnregistered && isUrgentStage ? "high" : isUrgentStage ? "medium" : "low";

  const nextSteps: string[] = [];

  if (isUnregistered) {
    nextSteps.push(localize(profile.language, {
      English: "Verify your voter registration status on the official Voters' Service Portal.",
      Hindi: "आधिकारिक वोटर्स सर्विस पोर्टल पर अपनी मतदाता पंजीकरण स्थिति सत्यापित करें।",
      Marathi: "अधिकृत मतदार सेवा पोर्टलवर तुमची मतदार नोंदणी स्थिती तपासा."
    }));
    nextSteps.push(localize(profile.language, {
      English: "Gather identity and address documents before you start or update your application.",
      Hindi: "आवेदन शुरू करने या अपडेट करने से पहले पहचान और पते से जुड़े दस्तावेज़ तैयार रखें।",
      Marathi: "अर्ज सुरू किंवा अद्ययावत करण्यापूर्वी ओळख आणि पत्त्याची कागदपत्रे तयार ठेवा."
    }));
  } else {
    nextSteps.push(localize(profile.language, {
      English: "Review the polling process and confirm what identification to carry on voting day.",
      Hindi: "मतदान प्रक्रिया की समीक्षा करें और मतदान दिवस पर कौन सा पहचान पत्र साथ रखना है, यह सुनिश्चित करें।",
      Marathi: "मतदान प्रक्रिया पाहा आणि मतदानाच्या दिवशी कोणते ओळखपत्र बाळगायचे ते निश्चित करा."
    }));
  }

  if (profile.stage === "election-week" || profile.stage === "polling-day") {
    nextSteps.push(localize(profile.language, {
      English: "Plan how you will reach the polling station and save an election reminder to your calendar.",
      Hindi: "मतदान केंद्र तक पहुंचने की योजना बनाएं और अपने कैलेंडर में चुनाव रिमाइंडर सहेजें।",
      Marathi: "मतदान केंद्रापर्यंत कसे पोहोचायचे याची योजना करा आणि कॅलेंडरमध्ये निवडणूक स्मरणपत्र जतन करा."
    }));
  } else {
    nextSteps.push(localize(profile.language, {
      English: "Read the election timeline so you know what changes as polling day gets closer.",
      Hindi: "चुनाव टाइमलाइन पढ़ें ताकि मतदान दिवस करीब आने पर क्या बदलता है, यह स्पष्ट रहे।",
      Marathi: "निवडणूक टाइमलाइन वाचा, जेणेकरून मतदानाचा दिवस जवळ येताना काय बदलते ते समजेल."
    }));
  }

  if (profile.experience === "first-time") {
    nextSteps.push(localize(profile.language, {
      English: "Open the explainer cards to understand what happens before, during, and after voting.",
      Hindi: "जानकारी कार्ड खोलें और समझें कि मतदान से पहले, दौरान और बाद में क्या होता है।",
      Marathi: "माहिती कार्ड उघडा आणि मतदानाच्या आधी, दरम्यान आणि नंतर काय होते ते समजून घ्या."
    }));
  } else {
    nextSteps.push(localize(profile.language, {
      English: "Use the assistant for quick clarification if a step or deadline feels unclear.",
      Hindi: "यदि कोई चरण या अंतिम तिथि स्पष्ट न लगे तो त्वरित स्पष्टीकरण के लिए सहायक का उपयोग करें।",
      Marathi: "एखादा टप्पा किंवा अंतिम तारीख अस्पष्ट वाटल्यास जलद स्पष्टीकरणासाठी सहाय्यक वापरा."
    }));
  }

  const headline = isUnregistered
    ? localize(profile.language, {
        English: "Start with registration and official document checks",
        Hindi: "पंजीकरण और आधिकारिक दस्तावेज़ जांच से शुरुआत करें",
        Marathi: "नोंदणी आणि अधिकृत कागदपत्र पडताळणीपासून सुरुवात करा"
      })
    : localize(profile.language, {
        English: "You are close to ready. Focus on voting-day preparation.",
        Hindi: "आप लगभग तैयार हैं। अब मतदान दिवस की तैयारी पर ध्यान दें।",
        Marathi: "तुमची तयारी जवळपास पूर्ण आहे. आता मतदानाच्या दिवसाच्या तयारीवर लक्ष द्या."
      });

  const summaryParts = [
    localize(profile.language, {
      English: `${profile.name || "You"} selected ${profile.language} guidance for the ${getStageName(profile.language, profile.stage)} stage.`,
      Hindi: `${profile.name || "आपने"} ${getStageName(profile.language, profile.stage)} के लिए ${profile.language} मार्गदर्शन चुना है।`,
      Marathi: `${profile.name || "तुम्ही"} ${getStageName(profile.language, profile.stage)} साठी ${profile.language} मार्गदर्शन निवडले आहे.`
    }),
    isUnregistered
      ? localize(profile.language, {
          English: "Your highest-value action is to confirm or complete voter registration through official channels.",
          Hindi: "आपके लिए सबसे महत्वपूर्ण कदम है कि आधिकारिक माध्यम से मतदाता पंजीकरण की पुष्टि करें या उसे पूरा करें।",
          Marathi: "तुमच्यासाठी सर्वात महत्त्वाचे पाऊल म्हणजे अधिकृत माध्यमातून मतदार नोंदणीची पडताळणी किंवा पूर्तता करणे."
        })
      : localize(profile.language, {
          English: "Your registration is marked complete, so the app is prioritizing readiness and polling-day clarity.",
          Hindi: "आपका पंजीकरण पूरा दिख रहा है, इसलिए ऐप अब तैयारी और मतदान दिवस की स्पष्ट जानकारी को प्राथमिकता दे रहा है।",
          Marathi: "तुमची नोंदणी पूर्ण झालेली दिसते, त्यामुळे अ‍ॅप आता तयारी आणि मतदान दिनाची स्पष्ट माहिती यांना प्राधान्य देत आहे."
        }),
    profile.experience === "first-time"
      ? localize(profile.language, {
          English: "Because this is a first-time journey, the recommendations lean toward simpler explainers and step-by-step help.",
          Hindi: "क्योंकि यह पहली बार का मतदान अनुभव है, इसलिए सुझाव सरल जानकारी और चरण-दर-चरण सहायता पर केंद्रित हैं।",
          Marathi: "हा पहिल्यांदाचा मतदान अनुभव असल्यामुळे शिफारसी अधिक सोप्या माहितीवर आणि टप्प्याटप्प्याने मदतीवर केंद्रित आहेत."
        })
      : localize(profile.language, {
          English: "Because you have voted before, the recommendations stay concise and action-oriented.",
          Hindi: "क्योंकि आपने पहले भी मतदान किया है, इसलिए सुझाव संक्षिप्त और सीधे कार्रवाई पर आधारित रखे गए हैं।",
          Marathi: "तुम्ही यापूर्वी मतदान केले असल्यामुळे शिफारसी संक्षिप्त आणि कृतीकेंद्रित ठेवण्यात आल्या आहेत."
        })
  ];

  return {
    urgency,
    headline,
    summary: summaryParts.join(" "),
    nextSteps,
    reminderTitle: isUnregistered
      ? localize(profile.language, {
          English: "Voter registration follow-up",
          Hindi: "मतदाता पंजीकरण फॉलो-अप",
          Marathi: "मतदार नोंदणी फॉलो-अप"
        })
      : localize(profile.language, {
          English: "Election preparation reminder",
          Hindi: "चुनाव तैयारी रिमाइंडर",
          Marathi: "निवडणूक तयारी स्मरणपत्र"
        }),
    explainerTopics: languageTopics[profile.language].concat(
      profile.experience === "first-time"
        ? localizeArray(profile.language, {
            English: ["How voting works", "What to carry"],
            Hindi: ["मतदान कैसे होता है", "क्या साथ ले जाएं"],
            Marathi: ["मतदान कसे होते", "काय बाळगावे"]
          })
        : localizeArray(profile.language, {
            English: ["Polling day checklist"],
            Hindi: ["मतदान दिवस चेकलिस्ट"],
            Marathi: ["मतदान दिवस तपासणी सूची"]
          })
    )
  };
}

export function buildCalendarLink(title: string): string {
  const startDate = "20260430T090000Z";
  const endDate = "20260430T100000Z";
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: title,
    dates: `${startDate}/${endDate}`,
    details: "Review official election guidance and complete your next voting-related step.",
    location: "https://voters.eci.gov.in/"
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

function localize(language: UserLanguage, values: Record<UserLanguage, string>): string {
  return values[language];
}

function localizeArray(language: UserLanguage, values: Record<UserLanguage, string[]>): string[] {
  return values[language];
}