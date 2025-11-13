import { Lightbulb } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import './SuggestionsBanner.css';

interface SuggestionsBannerProps {
  suggestions: string;
  source: string;
}

export const SuggestionsBanner = ({ suggestions, source }: SuggestionsBannerProps) => {
  const { t } = useLanguage();

  return (
    <div className="suggestions-banner fade-in">
      <div className="suggestions-icon">
        <Lightbulb size={24} />
      </div>
      <div className="suggestions-content">
        <h3>{t('suggestions.title')}</h3>
        <p>{suggestions}</p>
        <span className="suggestions-source">{t('suggestions.source')}: {source}</span>
      </div>
    </div>
  );
};
