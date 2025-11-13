import { useState, FormEvent } from 'react';
import { Search, Shuffle } from 'lucide-react';
import type { RecipeSearchParams, MealCategory, Cuisine } from '../types';
import './SearchForm.css';

interface SearchFormProps {
  onSearch: (params: RecipeSearchParams) => void;
  onRandomSearch: () => void;
  loading: boolean;
}

const CATEGORIES: MealCategory[] = [
  'Beef', 'Chicken', 'Dessert', 'Lamb', 'Pasta', 'Pork',
  'Seafood', 'Vegetarian', 'Vegan', 'Breakfast', 'Starter'
];

const CUISINES: Cuisine[] = [
  'American', 'British', 'Chinese', 'French', 'Greek', 'Indian',
  'Italian', 'Japanese', 'Mexican', 'Thai', 'Turkish'
];

export const SearchForm = ({ onSearch, onRandomSearch, loading }: SearchFormProps) => {
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
          <label htmlFor="ingredients">食材</label>
          <input
            id="ingredients"
            type="text"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            placeholder="例如: chicken, tomato"
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">分类</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            disabled={loading}
          >
            <option value="">全部分类</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="cuisine">菜系</label>
          <select
            id="cuisine"
            value={cuisine}
            onChange={(e) => setCuisine(e.target.value)}
            disabled={loading}
          >
            <option value="">全部菜系</option>
            {CUISINES.map((cuis) => (
              <option key={cuis} value={cuis}>
                {cuis}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="limit">数量</label>
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
          搜索食谱
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={handleRandom}
          disabled={loading}
        >
          <Shuffle size={20} />
          随机推荐
        </button>
      </div>
    </form>
  );
};
