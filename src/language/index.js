import { initReactI18next } from "react-i18next";
import i18n from "i18next";
import { LangConstant } from "../constants";
import vi from "./vi";

i18n.use(initReactI18next).init({
  resources: {
    vi: { translation: vi },
  },
  fallbackLng: LangConstant.VIETNAM_LOCALE,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
