import { ChefHat, Settings } from 'lucide-react';
import { useLanguage, type Language } from '../contexts/LanguageContext';
import { useModels } from '../hooks/useModels';
import './Header.css';

export const Header = () => {
  const { language, setLanguage, t } = useLanguage();
  const { models, selectedModel, changeModel, loading } = useModels();

  return (
    <header className="header">
      <div className="header-content">
        {/* 左侧：Logo 和标题 */}
        <div className="logo">
          <ChefHat size={32} />
          <h1>{t('app.title')}</h1>
        </div>

        {/* 中间：模型选择器 */}
        <div className="model-selector-container">
          <Settings size={16} className="settings-icon" />
          <select
            value={selectedModel}
            onChange={(e) => changeModel(e.target.value)}
            className="model-selector"
            disabled={loading}
            aria-label="选择AI模型"
            title="选择AI模型"
          >
            {models.map((model) => (
              <option key={model.id} value={model.id}>
                {model.name}
              </option>
            ))}
          </select>
        </div>

        {/* 右侧：语言选择器 */}
        <div className="language-container">
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
      </div>
      <p className="tagline">{t('app.subtitle')}</p>
    </header>
  );
};
