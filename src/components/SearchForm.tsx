import { useState, FormEvent } from 'react';
import { Search, Shuffle } from 'lucide-react';
import { CATEGORY_OPTIONS, CUISINE_OPTIONS } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import type { RecipeSearchParams } from '../types';
import './SearchForm.css';

interface SearchFormProps {
  onSearch: (params: RecipeSearchParams) => void;
  onRandomSearch: () => void;
  loading: boolean;
}

export const SearchForm = ({ onSearch, onRandomSearch, loading }: SearchFormProps) => {
  const { t } = useLanguage();
  const [ingredients, setIngredients] = useState('');
  const [category, setCategory] = useState('');
  const [cuisine, setCuisine] = useState('');
  const [limit, setLimit] = useState(5);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const params: RecipeSearchParams = {
      limit,
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
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            disabled={loading}
          >
            <option value="">{t('search.categoryAll')}</option>
            {CATEGORY_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="cuisine">{t('search.cuisine')}</label>
          <select
            id="cuisine"
            value={cuisine}
            onChange={(e) => setCuisine(e.target.value)}
            disabled={loading}
          >
            <option value="">{t('search.cuisineAll')}</option>
            {CUISINE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
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
