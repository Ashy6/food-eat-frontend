import { RecipeCard } from './RecipeCard';
import type { Recipe } from '../types';
import './RecipeList.css';

interface RecipeListProps {
  recipes: Recipe[];
  loading: boolean;
  error: string | null;
}

export const RecipeList = ({ recipes, loading, error }: RecipeListProps) => {
  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>正在获取美食推荐...</p>
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
          请检查网络连接或稍后重试
        </p>
      </div>
    );
  }

  if (recipes.length === 0) {
    return (
      <div className="empty-container">
        <p>还没有找到食谱</p>
        <p className="empty-hint">
          试试搜索或点击"随机推荐"按钮
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
