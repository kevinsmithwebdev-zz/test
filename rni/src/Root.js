import React from 'react'
import I18n from 'react-native-i18n'
import { Text, View } from 'react-native'

import { t } from '../locales/i18n'

class Root extends React.Component {
  render() {
    // let lang = 'en'
    // getLanguages().then(languages => {
    //   console.log(languages); // ['en-US', 'en']
    // });
    return (
      <View>
        <Text>{t('login.greeting')}</Text>
        <Text>How are you?</Text>
        {/* <Text>{`I am speaking ${lang}.`}</Text> */}
      </View>
    )
  }
}

// I18n.fallbacks = true
//
// I18n.translations = {
//   en: {
//     greeting: 'Hello!',
//     howAreYou: 'How are you?',
//     speaking: 'I am speaking English.'
//   },
//   fr: {
//     greeting: 'Bonjour!',
//     howAreYou: 'Comment allez-vous?',
//     speaking: 'Je parle francais.'
//   },
// }

export default Root
