import { Lightbulb } from 'lucide-react';
import './SuggestionsBanner.css';

interface SuggestionsBannerProps {
  suggestions: string;
  source: string;
}

export const SuggestionsBanner = ({ suggestions, source }: SuggestionsBannerProps) => {
  return (
    <div className="suggestions-banner fade-in">
      <div className="suggestions-icon">
        <Lightbulb size={24} />
      </div>
      <div className="suggestions-content">
        <h3>AI 推荐</h3>
        <p>{suggestions}</p>
        <span className="suggestions-source">数据来源: {source}</span>
      </div>
    </div>
  );
};
