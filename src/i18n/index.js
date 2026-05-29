import { createI18n } from 'vue-i18n'
import en from './locales/en.json'
import de from './locales/de.json'
import da from './locales/da.json'

const savedLocale = localStorage.getItem('locale') || 'en'

export const i18n = createI18n({
  legacy: false,
  locale: savedLocale,
  fallbackLocale: 'en',
  messages: { en, de, da }
})
