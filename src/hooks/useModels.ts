import { useState, useEffect } from 'react';
import { modelAPI } from '../services/modelApi';
import type { Model } from '../types/model';

export const useModels = () => {
  const [models, setModels] = useState<Model[]>([]);
  const [selectedModel, setSelectedModel] = useState<string>('gpt-4o-mini');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchModels = async () => {
      setLoading(true);
      setError(null);

      try {
        const modelList = await modelAPI.getModels();
        setModels(modelList);

        // 如果当前选择的模型不在列表中，设置为第一个模型
        if (modelList.length > 0 && !modelList.some(m => m.id === selectedModel)) {
          setSelectedModel(modelList[0].id);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : '获取模型列表失败');
      } finally {
        setLoading(false);
      }
    };

    fetchModels();
  }, []);

  const changeModel = (modelId: string) => {
    if (models.some(m => m.id === modelId)) {
      setSelectedModel(modelId);
      // 可以在这里保存到 localStorage
      localStorage.setItem('selectedModel', modelId);
    }
  };

  // 从 localStorage 恢复选择的模型
  useEffect(() => {
    const savedModel = localStorage.getItem('selectedModel');
    if (savedModel && models.some(m => m.id === savedModel)) {
      setSelectedModel(savedModel);
    }
  }, [models]);

  return {
    models,
    selectedModel,
    changeModel,
    loading,
    error,
  };
};
