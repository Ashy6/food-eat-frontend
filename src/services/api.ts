import axios, { AxiosInstance } from 'axios';
import type { Recipe, RecipeSearchParams, ApiResponse } from '../types';

// 配置 API 基础地址
// 开发环境使用代理，生产环境使用完整 URL
const API_BASE_URL = import.meta.env.DEV
  ? '' // 开发环境使用代理，baseURL 为空，直接访问 /api
  : (import.meta.env.VITE_API_BASE_URL || 'https://mastra-food-app.zengjx1998.workers.dev');

class FoodEatAPI {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // 响应拦截器
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        console.error('API Error:', error);
        return Promise.reject(error);
      }
    );
  }

  /**
   * 获取食谱推荐
   * @param params 搜索参数
   * @returns 食谱列表
   */
  async getRecipes(params?: RecipeSearchParams): Promise<ApiResponse<Recipe[]>> {
    try {
      const queryParams = new URLSearchParams();

      if (params?.ingredients) {
        queryParams.append('ingredients', params.ingredients);
      }
      if (params?.category) {
        queryParams.append('category', params.category);
      }
      if (params?.cuisine) {
        queryParams.append('cuisine', params.cuisine);
      }
      if (params?.limit) {
        queryParams.append('limit', String(params.limit));
      }

      const url = `/api/recipes${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
      const response = await this.client.get<Recipe[]>(url);

      return {
        data: response.data,
        success: true,
      };
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : '获取食谱失败',
        success: false,
      };
    }
  }

  /**
   * 获取随机食谱推荐
   * @param limit 数量限制
   * @returns 食谱列表
   */
  async getRandomRecipes(limit: number = 5): Promise<ApiResponse<Recipe[]>> {
    return this.getRecipes({ limit });
  }

  /**
   * 根据食材搜索食谱
   * @param ingredients 食材（逗号分隔）
   * @param limit 数量限制
   * @returns 食谱列表
   */
  async searchByIngredients(ingredients: string, limit: number = 5): Promise<ApiResponse<Recipe[]>> {
    return this.getRecipes({ ingredients, limit });
  }

  /**
   * 根据分类搜索食谱
   * @param category 分类
   * @param limit 数量限制
   * @returns 食谱列表
   */
  async searchByCategory(category: string, limit: number = 5): Promise<ApiResponse<Recipe[]>> {
    return this.getRecipes({ category, limit });
  }

  /**
   * 根据菜系搜索食谱
   * @param cuisine 菜系
   * @param limit 数量限制
   * @returns 食谱列表
   */
  async searchByCuisine(cuisine: string, limit: number = 5): Promise<ApiResponse<Recipe[]>> {
    return this.getRecipes({ cuisine, limit });
  }
}

// 导出单例实例
export const foodEatAPI = new FoodEatAPI();
export default foodEatAPI;
