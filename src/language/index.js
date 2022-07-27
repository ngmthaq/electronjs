import { initReactI18next } from "react-i18next";
import i18n from "i18next";
import { LangConstant } from "../const";
import vi from "./vi";
import en from "./en";

i18n.use(initReactI18next).init({
  resources: {
    vi: { translation: vi },
    en: { translation: en },
  },
  fallbackLng: LangConstant.VIETNAM_LOCALE,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
