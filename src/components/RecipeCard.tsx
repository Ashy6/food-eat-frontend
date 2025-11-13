import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';
import type { Recipe } from '../types';
import './RecipeCard.css';

interface RecipeCardProps {
  recipe: Recipe;
}

export const RecipeCard = ({ recipe }: RecipeCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

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

        {recipe.tags && recipe.tags.length > 0 && (
          <div className="recipe-tags">
            {recipe.tags.map((tag, index) => (
              <span key={index} className="tag">
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="recipe-ingredients">
          <h3>食材清单</h3>
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
            <h3>制作步骤</h3>
            {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>

          {isExpanded && (
            <div className="instructions-content">
              <ReactMarkdown>{recipe.instructions}</ReactMarkdown>
            </div>
          )}
        </div>

        {recipe.youtubeUrl && (
          <a
            href={recipe.youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="youtube-link"
          >
            <ExternalLink size={16} />
            观看视频教程
          </a>
        )}
      </div>
    </article>
  );
};
