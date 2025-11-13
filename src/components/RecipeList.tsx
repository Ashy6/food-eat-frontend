import { RecipeCard } from './RecipeCard';
import { useLanguage } from '../contexts/LanguageContext';
import type { Recipe } from '../types';
import './RecipeList.css';

interface RecipeListProps {
  recipes: Recipe[];
  loading: boolean;
  error: string | null;
}

export const RecipeList = ({ recipes, loading, error }: RecipeListProps) => {
  const { t } = useLanguage();

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>{t('list.loading')}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p className="error-message">
          {error}
        </p>
        <p className="error-hint">
          {t('list.error')}
        </p>
      </div>
    );
  }

  if (recipes.length === 0) {
    return (
      <div className="empty-container">
        <p>{t('list.empty')}</p>
        <p className="empty-hint">
          {t('list.emptyHint')}
        </p>
      </div>
    );
  }

  return (
    <div className="recipe-list">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
};
