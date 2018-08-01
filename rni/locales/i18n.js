import React, { NativeModules } from 'react-native'
import I18n, { getLanguages} from 'react-native-i18n'

// console.log('I18n', I18n)
// console.log(I18n.locales.get())
// I18n.locales.get().then(languages => {
//   console.log(I18n.locales.get()) // ['en-US', 'en']
// })

// Import all locales
import en from './en.json'
import es from './es.json'

// Should the app fallback to English if user locale doesn't exists
I18n.fallbacks = true

// Define the supported translations
I18n.translations = {
  en,
  es
}
I18n.langs = [
  en,
  es
]
// console.log("Device Locale", DeviceInfo.getDeviceLocale());
I18n.locale = 'en'

setInterval(() => {
  console.log('in inteval, I18n.locale =', I18n.locale)
  if (I18n.locale === 'en')
    I18n.locale = 'es'
  else
    I18n.locale = 'en'
  console.log(I18n.locale)
}, 3000)

// Is it a RTL language?
export const isRTL = I18n.locale.indexOf('he') === 0 || I18n.locale.indexOf('ar') === 0

// Allow RTL alignment in RTL languages
React.I18nManager.allowRTL(isRTL)

// The method we'll use instead of a regular string
export function t(name, params = { }) {
  return I18n.t(name, { locale: I18n.locale, ...params })
}

I18n.switchLanguage = () => {
    const index = I18n.langs.indexOf(I18n.locale);
    if (index === I18n.langs.length - 1)
        I18n.locale = I18n.langs[0];
    else
        I18n.locale = I18n.langs[index + 1];
};

setInterval(() => {
  console.log('in inteval, I18n.locale =', I18n.locale)
  if (I18n.locale === 'en')
    I18n.switchLanguage('es')
  else
    I18n.switchLanguage('en')
  console.log(I18n.locale)
}, 3000)


export default I18n
