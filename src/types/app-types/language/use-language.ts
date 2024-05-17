import * as React from "react";
import { Language } from "./language";

export const LanguageContext = React.createContext<Language>("jp");

export function useLanguage(): Language {
    return React.useContext(LanguageContext);
}