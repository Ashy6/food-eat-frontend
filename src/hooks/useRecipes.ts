import { useState, useCallback } from 'react';
import { foodEatAPI } from '../services/api';
import type { Recipe, RecipeSearchParams } from '../types';

export const useRecipes = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRecipes = useCallback(async (params?: RecipeSearchParams) => {
    setLoading(true);
    setError(null);

    try {
      const response = await foodEatAPI.getRecipes(params);

      if (response.success && response.data) {
        setRecipes(response.data);
      } else {
        setError(response.error || '获取食谱失败');
        setRecipes([]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : '未知错误');
      setRecipes([]);
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
        setRecipes(response.data);
      } else {
        setError(response.error || '获取随机食谱失败');
        setRecipes([]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : '未知错误');
      setRecipes([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const clearRecipes = useCallback(() => {
    setRecipes([]);
    setError(null);
  }, []);

  return {
    recipes,
    loading,
    error,
    fetchRecipes,
    fetchRandomRecipes,
    clearRecipes,
  };
};
