import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';
import type { Recipe } from '../types';
import { generateVideoLink, selectVideoPlatform, getPlatformName, type VideoPlatform } from '../utils/region';
import { useLanguage } from '../contexts/LanguageContext';
import './RecipeCard.css';

interface RecipeCardProps {
  recipe: Recipe;
}

export const RecipeCard = ({ recipe }: RecipeCardProps) => {
  const { t, language } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(false);
  const [videoPlatform, setVideoPlatform] = useState<VideoPlatform>('youtube');
  const [videoLink, setVideoLink] = useState('');

  // 检测地区并生成视频链接，当语言改变时重新检测
  useEffect(() => {
    const initVideoLink = async () => {
      const platform = await selectVideoPlatform();
      setVideoPlatform(platform);

      const link = generateVideoLink(recipe.name, platform, recipe.youtube);
      setVideoLink(link);
    };

    initVideoLink();
  }, [recipe.name, recipe.youtube, language]);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <article className="recipe-card fade-in">
      <div className="recipe-image-container">
        <img
          src={recipe.thumbnail}
          alt={recipe.name}
          className="recipe-image"
          loading="lazy"
        />
        <div className="recipe-overlay">
          <span className="recipe-category">{recipe.category}</span>
          <span className="recipe-cuisine">{recipe.area}</span>
        </div>
      </div>

      <div className="recipe-content">
        <h2 className="recipe-title">{recipe.name}</h2>

        {recipe.tags && Array.isArray(recipe.tags) && recipe.tags.length > 0 && (
          <div className="recipe-tags">
            {recipe.tags.map((tag, index) => (
              <span key={index} className="tag">
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="recipe-ingredients">
          <h3>{t('recipe.ingredients')}</h3>
          <ul>
            {recipe.ingredients.map((item, index) => (
              <li key={index}>
                <span className="ingredient-name">{item.ingredient}</span>
                {item.measure && (
                  <span className="ingredient-measure"> - {item.measure}</span>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className="recipe-instructions">
          <button
            className="expand-button"
            onClick={toggleExpand}
            aria-expanded={isExpanded}
          >
            <h3>{t('recipe.instructions')}</h3>
            {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>

          {isExpanded && (
            <div className="instructions-content">
              <ReactMarkdown>{recipe.instructions}</ReactMarkdown>
            </div>
          )}
        </div>

        {videoLink && (
          <a
            href={videoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="youtube-link"
            title={`${t('recipe.video')} - ${getPlatformName(videoPlatform)}`}
          >
            <ExternalLink size={16} />
            {t('recipe.video')}
            <span className="platform-badge">{getPlatformName(videoPlatform)}</span>
          </a>
        )}
      </div>
    </article>
  );
};
