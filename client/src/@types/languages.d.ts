import { LanguageCodes } from '../Languages';
export type LanguageCode = Extract<keyof typeof LanguageCodes, string>;