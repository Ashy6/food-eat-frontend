import { ChefHat } from 'lucide-react';
import { useLanguage, type Language } from '../contexts/LanguageContext';
import './Header.css';

export const Header = () => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <ChefHat size={32} />
          <h1>{t('app.title')}</h1>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value as Language)}
            className="language-selector"
            aria-label="Select language"
          >
            <option value="zh-CN">{t('language.zhCN')}</option>
            <option value="en-US">{t('language.enUS')}</option>
          </select>
        </div>
        <p className="tagline">{t('app.subtitle')}</p>
      </div>
    </header>
  );
};
