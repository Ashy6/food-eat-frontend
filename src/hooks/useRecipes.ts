import { useState, useCallback } from 'react';
import { foodEatAPI } from '../services/api';
import type { Recipe, RecipeSearchParams } from '../types';
import { STRINGS, getFriendlyErrorMessage } from '../constants/strings';

export const useRecipes = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [suggestions, setSuggestions] = useState<string>('');
  const [source, setSource] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRecipes = useCallback(async (params?: RecipeSearchParams) => {
    setLoading(true);
    setError(null);

    try {
      const response = await foodEatAPI.getRecipes(params);

      if (response.success && response.data) {
        setRecipes(response.data.recipes || []);
        setSuggestions(response.data.suggestions || '');
        setSource(response.data.source || '');
      } else {
        setError(response.error || STRINGS.ERROR.FETCH_FAILED);
        setRecipes([]);
        setSuggestions('');
        setSource('');
      }
    } catch (err) {
      setError(getFriendlyErrorMessage(err));
      setRecipes([]);
      setSuggestions('');
      setSource('');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchRandomRecipes = useCallback(async (limit: number = 5) => {
    setLoading(true);
    setError(null);

    try {
      const response = await foodEatAPI.getRandomRecipes(limit);

      if (response.success && response.data) {
        setRecipes(response.data.recipes || []);
        setSuggestions(response.data.suggestions || '');
        setSource(response.data.source || '');
      } else {
        setError(response.error || STRINGS.ERROR.RANDOM_FETCH_FAILED);
        setRecipes([]);
        setSuggestions('');
        setSource('');
      }
    } catch (err) {
      setError(getFriendlyErrorMessage(err));
      setRecipes([]);
      setSuggestions('');
      setSource('');
    } finally {
      setLoading(false);
    }
  }, []);

  const clearRecipes = useCallback(() => {
    setRecipes([]);
    setSuggestions('');
    setSource('');
    setError(null);
  }, []);

  return {
    recipes,
    suggestions,
    source,
    loading,
    error,
    fetchRecipes,
    fetchRandomRecipes,
    clearRecipes,
  };
};
