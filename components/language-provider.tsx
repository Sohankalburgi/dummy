"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type Language = "en" | "hi" | "kn"

type LanguageContextType = {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations = {
  en: {
    // Common
    "app.name": "Krishi Bhoomi AI",
    "nav.home": "Home",
    "nav.services": "Services",
    "nav.chatbot": "AI Chatbot",
    "nav.crop": "Crop Suggestion",
    "nav.data": "Your Data",
    "nav.login": "Login",
    "nav.signup": "Sign Up",
    "nav.logout": "Logout",

    // Auth
    "auth.email": "Email",
    "auth.password": "Password",
    "auth.fullName": "Full Name",
    "auth.login": "Login",
    "auth.signup": "Sign Up",
    "auth.forgotPassword": "Forgot Password?",
    "auth.alreadyAccount": "Already have an account?",
    "auth.noAccount": "Don't have an account?",

    // Services
    "services.title": "Our Services",
    "services.rover": "Rover Service And Drone Serivce",
    "services.drone": "Drone Service And Rover Service yearly plan",
    "services.both": "Rover & Drone Service",
    "services.book": "Book Service",
    "services.name": "Name",
    "services.phone": "Phone",
    "services.state": "State",
    "services.country": "Country",
    "services.district": "District",
    "services.land": "Land (sq ft)",
    "services.crop": "Crop",
    "services.type": "Service Type",
    "services.submit": "Submit",


    // Chatbot
    "chatbot.title": "AI Chatbot",
    "chatbot.placeholder": "Ask anything about agriculture...",
    "chatbot.upload": "Upload Image",
    "chatbot.send": "Send",

    // Crop Suggestion
    "crop.title": "Crop Suggestion",
    "crop.type": "Crop Type",
    "crop.land": "Land Area (sq ft)",
    "crop.location": "Location",
    "crop.submit": "Get Suggestions",

    // Dashboard
    "dashboard.welcome": "Welcome to Krishi Bhoomi AI",
    "dashboard.subtitle": "Modern solutions for agriculture",
  },
  hi: {
    // Common
    "app.name": "कृषि भूमि AI",
    "nav.home": "होम",
    "nav.services": "सेवाएं",
    "nav.chatbot": "AI चैटबॉट",
    "nav.crop": "फसल सुझाव",
    "nav.data": "आपका डेटा",
    "nav.login": "लॉगिन",
    "nav.signup": "साइन अप",
    "nav.logout": "लॉगआउट",

    // Auth
    "auth.email": "ईमेल",
    "auth.password": "पासवर्ड",
    "auth.fullName": "पूरा नाम",
    "auth.login": "लॉगिन",
    "auth.signup": "साइन अप",
    "auth.forgotPassword": "पासवर्ड भूल गए?",
    "auth.alreadyAccount": "पहले से ही एक खाता है?",
    "auth.noAccount": "खाता नहीं है?",

    // Services
    "services.title": "हमारी सेवाएँ",    
     "services.rover": "रोवर सेवा और ड्रोन सेवा",
  "services.drone": "ड्रोन सेवा और रोवर सेवा की वार्षिक योजना",
    "services.both": "रोवर और ड्रोन सेवा",
    "services.book": "सेवा बुक करें",
    "services.name": "नाम",
    "services.phone": "फ़ोन",
    "services.state": "राज्य",
    "services.country": "देश",
    "services.district": "जिला",
    "services.land": "भूमि (वर्ग फुट)",
    "services.crop": "फसल",
    "services.type": "सेवा का प्रकार",
    "services.submit": "प्रस्तुत करें",
    // Chatbot
    "chatbot.title": "AI चैटबॉट",
    "chatbot.placeholder": "कृषि के बारे में कुछ भी पूछें...",
    "chatbot.upload": "छवि अपलोड करें",
    "chatbot.send": "भेजें",

    // Crop Suggestion
    "crop.title": "फसल सुझाव",
    "crop.type": "फसल प्रकार",
    "crop.land": "भूमि क्षेत्र (वर्ग फुट)",
    "crop.location": "स्थान",
    "crop.submit": "सुझाव प्राप्त करें",

    // Dashboard
    "dashboard.welcome": "कृषि भूमि AI में आपका स्वागत है",
    "dashboard.subtitle": "कृषि के लिए आधुनिक समाधान",
  },
  kn: {
    // Common
    "app.name": "ಕೃಷಿ ಭೂಮಿ AI",
    "nav.home": "ಮುಖಪುಟ",
    "nav.services": "ಸೇವೆಗಳು",
    "nav.chatbot": "AI ಚಾಟ್‌ಬಾಟ್",
    "nav.crop": "ಬೆಳೆ ಸಲಹೆ",
    "nav.data": "ನಿಮ್ಮ ಡೇಟಾ",
    "nav.login": "ಲಾಗಿನ್",
    "nav.signup": "ಸೈನ್ ಅಪ್",
    "nav.logout": "ಲಾಗ್ಔಟ್",

    // Auth
    "auth.email": "ಇಮೇಲ್",
    "auth.password": "ಪಾಸ್‌ವರ್ಡ್",
    "auth.fullName": "ಪೂರ್ಣ ಹೆಸರು",
    "auth.login": "ಲಾಗಿನ್",
    "auth.signup": "ಸೈನ್ ಅಪ್",
    "auth.forgotPassword": "ಪಾಸ್‌ವರ್ಡ್ ಮರೆತಿರಾ?",
    "auth.alreadyAccount": "ಈಗಾಗಲೇ ಖಾತೆ ಇದೆಯೇ?",
    "auth.noAccount": "ಖಾತೆ ಇಲ್ಲವೇ?",

    // Services
    "services.title": "ನಮ್ಮ ಸೇವೆಗಳು",
   
    "services.rover": "ರೋವರ್ ಸೇವೆ ಮತ್ತು ಡ್ರೋನ್ ಸೇವೆ",
    "services.drone": "ಡ್ರೋನ್ ಸೇವೆ ಮತ್ತು ರೋವರ್ ಸೇವೆಯ ವಾರ್ಷಿಕ ಯೋಜನೆ",
    "services.both": "ರೋವರ್ & ಡ್ರೋನ್ ಸೇವೆ",
    "services.book": "ಸೇವೆ ಬುಕ್ ಮಾಡಿ",
    "services.name": "ಹೆಸರು",
    "services.phone": "ಫೋನ್",
    "services.state": "ರಾಜ್ಯ",
    "services.country": "ದೇಶ",
    "services.district": "ಜಿಲ್ಲೆ",
    "services.land": "ಭೂಮಿ (ಚ.ಅಡಿ)",
    "services.crop": "ಕೃಷಿ ಬೆಳೆ",
    "services.type": "ಸೇವೆಯ ಪ್ರಕಾರ",
    "services.submit": "ಸಲ್ಲಿಸಿ",

    // Chatbot
    "chatbot.title": "AI ಚಾಟ್‌ಬಾಟ್",
    "chatbot.placeholder": "ಕೃಷಿ ಬಗ್ಗೆ ಏನಾದರೂ ಕೇಳಿ...",
    "chatbot.upload": "ಚಿತ್ರ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ",
    "chatbot.send": "ಕಳುಹಿಸಿ",

    // Crop Suggestion
    "crop.title": "ಬೆಳೆ ಸಲಹೆ",
    "crop.type": "ಬೆಳೆ ಪ್ರಕಾರ",
    "crop.land": "ಭೂಮಿ ಪ್ರದೇಶ (ಚದರ ಅಡಿ)",
    "crop.location": "ಸ್ಥಳ",
    "crop.submit": "ಸಲಹೆಗಳನ್ನು ಪಡೆಯಿರಿ",

    // Dashboard
    "dashboard.welcome": "ಕೃಷಿ ಭೂಮಿ AI ಸುಸ್ವಾಗತ",
    "dashboard.subtitle": "ಕೃಷಿಗೆ ಆಧುನಿಕ ಪರಿಹಾರಗಳು",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && ["en", "hi", "kn"].includes(savedLanguage)) {
      setLanguage(savedLanguage)
    }
  }, [])

  const changeLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem("language", lang)
  }

  const t = (key: string): string => {
    return translations[language][key as keyof (typeof translations)[typeof language]] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: changeLanguage, t }}>{children}</LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

