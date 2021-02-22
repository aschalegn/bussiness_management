import i18n from "i18next";
import LanguageDetectior from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";

i18n.use(LanguageDetectior).use(Backend).use(initReactI18next).init({
    fallbackLng: "he",
    debug: true,
    detection: {
        order: ["queryString", 'cookie'],
        cache: ["cookie"]
    },
    interpolation: {
        escapeValue: false
    },
   
});

export default i18n;