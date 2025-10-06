import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe, ChevronDown } from 'lucide-react';
import Flag from 'react-world-flags';

const languages = [
  { code: 'en', name: 'English', flag: 'GB' },
  { code: 'es', name: 'Español', flag: 'MX' },
  { code: 'fr', name: 'Français', flag: 'FR' },
  { code: 'de', name: 'Deutsch', flag: 'DE' },
  { code: 'zh', name: '中文', flag: 'CN' },
  { code: 'ja', name: '日本語', flag: 'JP' },
];

// Componente de bandera usando react-world-flags
const FlagIcon = ({ countryCode, className = "w-5 h-4" }) => {
  return (
    <Flag 
      code={countryCode} 
      className={`${className} rounded-sm`}
      style={{ width: '20px', height: '16px', objectFit: 'cover' }} 
    />
  );
};

export default function LanguageSelector() {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Sincronizar con el fallbackLng configurado en i18n para mantener consistencia
  const fallbackLng = Array.isArray(i18n.options.fallbackLng)
    ? i18n.options.fallbackLng[0]
    : i18n.options.fallbackLng;

  // Extraer solo el código de idioma (primeras 2 letras) para manejar variantes regionales
  // Ejemplo: "es-MX" -> "es", "en-US" -> "en"
  const currentLangCode = i18n.language?.split('-')[0] || fallbackLng;

  const currentLanguage = languages.find(lang => lang.code === currentLangCode) ||
                          languages.find(lang => lang.code === fallbackLng) ||
                          languages[0];

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageChange = (languageCode) => {
    i18n.changeLanguage(languageCode);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-200 border border-white/10 hover:border-white/20"
        aria-label="Select language"
      >
        <span className="text-sm font-medium text-white/90 flex items-center gap-2">
          <FlagIcon countryCode={currentLanguage.flag} />
          {currentLanguage.code.toUpperCase()}
        </span>
        <ChevronDown 
          className={`w-4 h-4 text-white/70 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`} 
        />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 sm:right-0 left-0 sm:left-auto mt-2 w-full sm:w-48 max-w-xs bg-black/90 backdrop-blur-md rounded-lg border border-white/10 shadow-xl overflow-hidden z-50">
          {languages.map((language) => {
            // Comparar solo el código base del idioma (sin variante regional)
            const isActive = language.code === currentLangCode;

            return (
              <button
                key={language.code}
                onClick={() => handleLanguageChange(language.code)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors duration-200 ${
                  isActive
                    ? 'bg-blue-500/20 text-blue-300'
                    : 'text-white/80 hover:bg-white/5 hover:text-white'
                }`}
              >
                <FlagIcon countryCode={language.flag} />
                <span className="font-medium">{language.name}</span>
                {isActive && (
                  <div className="ml-auto w-2 h-2 bg-blue-400 rounded-full"></div>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}