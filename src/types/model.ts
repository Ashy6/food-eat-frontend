/**
 * 模型相关类型定义
 */

export interface Model {
  id: string;
  name: string;
  provider: string;
}

export interface ModelsResponse {
  models: Model[];
}
