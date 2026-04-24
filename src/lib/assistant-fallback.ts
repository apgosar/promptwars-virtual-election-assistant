import { supportedTopics } from "@/lib/election-data";
import { AssistantResponse, UserProfile } from "@/lib/types";

const bannedPhrases = ["who should i vote for", "best party", "convince", "persuade", "campaign for"];

export function buildFallbackAssistantAnswer(question: string, profile: UserProfile): AssistantResponse {
  const normalized = question.toLowerCase();

  if (bannedPhrases.some((phrase) => normalized.includes(phrase))) {
    return {
      sourceMode: "refusal",
      answer: localize(profile, {
        English: "I can help explain the election process, timelines, registration, and polling-day steps, but I cannot recommend candidates or persuade you to vote a certain way.",
        Hindi: "मैं चुनाव प्रक्रिया, समयरेखा, पंजीकरण और मतदान दिवस के चरण समझाने में मदद कर सकता हूँ, लेकिन मैं किसी उम्मीदवार की सिफारिश या आपको किसी विशेष तरीके से वोट देने के लिए प्रेरित नहीं कर सकता।",
        Marathi: "मी निवडणूक प्रक्रिया, वेळापत्रक, नोंदणी आणि मतदान दिवसाची पावले समजावून सांगू शकतो, पण मी कोणत्याही उमेदवाराची शिफारस करू शकत नाही किंवा तुम्हाला विशिष्ट पद्धतीने मतदान करण्यास प्रवृत्त करू शकत नाही."
      })
    };
  }

  const topic = supportedTopics.find((item) => normalized.includes(item));

  if (!topic) {
    return {
      sourceMode: "fallback",
      answer: localize(profile, {
        English: `I am best at process questions such as registration, voter ID, polling day, official portals, and election timelines. For ${profile.language} support, start with the official Election Commission of India and Voters' Service Portal resources linked on this page.`,
        Hindi: `मैं पंजीकरण, वोटर आईडी, मतदान दिवस, आधिकारिक पोर्टल और चुनाव टाइमलाइन जैसे प्रक्रिया संबंधी प्रश्नों में सबसे बेहतर मदद करता हूँ। ${profile.language} सहायता के लिए इस पेज पर दिए गए भारत निर्वाचन आयोग और वोटर्स सर्विस पोर्टल से शुरुआत करें।`,
        Marathi: `मी नोंदणी, मतदार ओळखपत्र, मतदान दिवस, अधिकृत पोर्टल आणि निवडणूक टाइमलाइन यांसारख्या प्रक्रियाविषयक प्रश्नांसाठी सर्वात उपयुक्त आहे. ${profile.language} मार्गदर्शनासाठी या पानावरील भारत निवडणूक आयोग आणि मतदार सेवा पोर्टल दुव्यांपासून सुरुवात करा.`
      })
    };
  }

  return {
    sourceMode: "fallback",
    answer: localize(profile, {
      English: `Here is a grounded answer about ${topic}: first verify the latest instructions on official resources such as the Election Commission of India or Voters' Service Portal, then follow the next-step guide shown in your profile summary. This assistant is designed for process clarity, not political advice.`,
      Hindi: `${topic} पर यह भरोसेमंद उत्तर है: पहले भारत निर्वाचन आयोग या वोटर्स सर्विस पोर्टल जैसे आधिकारिक स्रोतों पर नवीनतम निर्देश जांचें, फिर अपनी प्रोफ़ाइल सारांश में दिखाए गए अगले कदमों का पालन करें। यह सहायक राजनीतिक सलाह नहीं देता, बल्कि प्रक्रिया स्पष्ट करता है।`,
      Marathi: `${topic} संदर्भातील हे विश्वसनीय उत्तर आहे: प्रथम भारत निवडणूक आयोग किंवा मतदार सेवा पोर्टलसारख्या अधिकृत स्रोतांवरील ताज्या सूचना तपासा, आणि नंतर तुमच्या प्रोफाइल सारांशातील पुढची पावले पाळा. हा सहाय्यक राजकीय सल्ला देत नाही; तो प्रक्रिया स्पष्ट करतो.`
    })
  };
}

export function buildSystemPrompt(profile: UserProfile): string {
  return [
    "You are an India election process education assistant.",
    "Only answer questions about election process, timelines, registration, documents, polling-day readiness, and official voter services.",
    "Do not recommend candidates, parties, or political persuasion.",
    "Prefer concise, practical answers with references to official resources such as ECI and Voters' Service Portal.",
    `The current user prefers ${profile.language} and is in the ${profile.stage} stage.`
  ].join(" ");
}

function localize(profile: UserProfile, values: Record<UserProfile["language"], string>): string {
  return values[profile.language];
}