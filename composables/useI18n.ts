import trTranslations from '~/locales/tr'
import enTranslations from '~/locales/en'

export const useI18n = () => {
  const locale = useState<string>('locale', () => {
    if (process.client) {
      const savedLocale = localStorage.getItem('locale')
      if (savedLocale) return savedLocale
      
      const browserLocale = navigator.language.split('-')[0]
      return ['tr', 'en'].includes(browserLocale) ? browserLocale : 'tr'
    }
    return 'tr'
  })

  const translations: Record<string, any> = {
    tr: trTranslations,
    en: enTranslations,
  }

  const availableLocales = [
    { code: 'tr', name: 'Türkçe' },
    { code: 'en', name: 'English' },
  ]

  const t = (key: string): string => {
    const keys = key.split('.')
    let value: any = translations[locale.value]

    for (const k of keys) {
      value = value?.[k]
    }

    return value || key
  }

  const setLocale = (newLocale: string) => {
    if (['tr', 'en'].includes(newLocale)) {
      locale.value = newLocale
      if (process.client) {
        localStorage.setItem('locale', newLocale)
      }
    }
  }

  return {
    locale,
    t,
    setLocale,
    availableLocales,
  }
}

