import MissionFeed from './components/MissionFeed'
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { translations_en, translations_es } from './locales'

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {translation: translations_en},
      es: {translation: translations_es},
    },
    lng: "en",
    fallbackLng: "en",
    interpolation: {escapeValue: false}
  })

function App() {
  return (
    <div className="container mx-auto px-4">
       <MissionFeed />
    </div>
  );
}

export default App;
