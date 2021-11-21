import i18n from 'i18next'

type LanguageSelectorProps = {
  currentLang: string
  setCurrentLang: (lang: string) => void
}

const LanguageSelector = ({currentLang, setCurrentLang}: LanguageSelectorProps) => {
  const onChangeLanguage = (lang: string) => {
    i18n.changeLanguage(lang)
    setCurrentLang(lang)
  }

  return (
      <div className="flex">
          <div className={`my-4 py-2 px-2 mr-4 ${currentLang === "en" ? "bg-blue-300" : "bg-gray-100"} font-semibold rounded-lg px-1 text-sm flex align-center space-x-1 z-50`}>
            <button onClick={() => onChangeLanguage("en")}>
              English
            </button>
          </div>
          <div className={`my-4 py-2 px-2 ${currentLang === "es" ? "bg-blue-300" : "bg-gray-100"} font-semibold rounded-lg px-1 text-sm flex align-center space-x-1 z-50`}>
            <button onClick={() => onChangeLanguage("es")}>
              Spanish
            </button>
          </div>
      </div>
  )
}

export default LanguageSelector
