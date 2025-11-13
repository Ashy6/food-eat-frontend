import axios, { AxiosInstance } from 'axios';
import type { Model, ModelsResponse } from '../types/model';

// 配置 API 基础地址
const API_BASE_URL = import.meta.env.DEV
  ? '' // 开发环境使用代理
  : (import.meta.env.VITE_API_BASE_URL || 'https://mastra-food-app.zengjx1998.workers.dev');

class ModelAPI {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // 响应拦截器
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        console.error('Model API Error:', error);
        return Promise.reject(error);
      }
    );
  }

  /**
   * 获取可用模型列表
   * @returns 模型列表
   */
  async getModels(): Promise<Model[]> {
    try {
      const response = await this.client.get<ModelsResponse>('/api/models');
      return response.data.models || [];
    } catch (error) {
      console.error('Failed to fetch models:', error);
      // 返回默认模型列表作为后备
      return [
        { id: 'gpt-4o-mini', name: 'GPT-4o Mini', provider: 'openai' },
        { id: 'gpt-4o', name: 'GPT-4o', provider: 'openai' },
        { id: 'gpt-4', name: 'GPT-4', provider: 'openai' },
        { id: 'gpt-4-turbo', name: 'GPT-4 Turbo', provider: 'openai' },
        { id: 'gpt-3.5-turbo', name: 'GPT-3.5 Turbo', provider: 'openai' },
      ];
    }
  }
}

// 导出单例实例
export const modelAPI = new ModelAPI();
export default modelAPI;
