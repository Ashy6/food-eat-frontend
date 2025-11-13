import { useState, FormEvent } from 'react';
import { Search, Shuffle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import type { RecipeSearchParams } from '../types';
import './SearchForm.css';

interface SearchFormProps {
  onSearch: (params: RecipeSearchParams) => void;
  onRandomSearch: () => void;
  loading: boolean;
}

export const SearchForm = ({ onSearch, onRandomSearch, loading }: SearchFormProps) => {
  const { t, language } = useLanguage();
  const [ingredients, setIngredients] = useState('');
  const [category, setCategory] = useState('');
  const [cuisine, setCuisine] = useState('');
  const [limit, setLimit] = useState(5);
  const [validationError, setValidationError] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setValidationError('');

    // Validate: require at least one search parameter besides limit
    if (!ingredients.trim() && !category && !cuisine) {
      const errorMsg = language === 'zh-CN'
        ? '请至少填写一个食材 / 分类 / 菜系'
        : 'Please provide at least one ingredient, category, or cuisine';
      setValidationError(errorMsg);
      return;
    }

    const params: RecipeSearchParams = {
      limit,
      language,
    };

    if (ingredients.trim()) {
      params.ingredients = ingredients.trim();
    }
    if (category) {
      params.category = category;
    }
    if (cuisine) {
      params.cuisine = cuisine;
    }

    onSearch(params);
  };

  const handleRandom = () => {
    setIngredients('');
    setCategory('');
    setCuisine('');
    onRandomSearch();
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      {validationError && (
        <div className="validation-error" style={{
          padding: '12px',
          marginBottom: '16px',
          backgroundColor: '#fee2e2',
          border: '1px solid #fecaca',
          borderRadius: '8px',
          color: '#991b1b',
          fontSize: '14px'
        }}>
          {validationError}
        </div>
      )}
      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="ingredients">{t('search.ingredients')}</label>
          <input
            id="ingredients"
            type="text"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            placeholder={t('search.ingredientsPlaceholder')}
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">{t('search.category')}</label>
          <input
            id="category"
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder={t('search.categoryPlaceholder')}
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="cuisine">{t('search.cuisine')}</label>
          <input
            id="cuisine"
            type="text"
            value={cuisine}
            onChange={(e) => setCuisine(e.target.value)}
            placeholder={t('search.cuisinePlaceholder')}
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="limit">{t('search.limit')}</label>
          <input
            id="limit"
            type="number"
            min="1"
            max="10"
            value={limit}
            onChange={(e) => setLimit(Number(e.target.value))}
            disabled={loading}
          />
        </div>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary" disabled={loading}>
          <Search size={20} />
          {t('search.button')}
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={handleRandom}
          disabled={loading}
        >
          <Shuffle size={20} />
          {t('search.random')}
        </button>
      </div>
    </form>
  );
};
