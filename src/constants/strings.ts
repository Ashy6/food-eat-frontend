/**
 * 前端中文字符串常量
 * 集中管理所有 UI 文本和错误消息
 */

export const STRINGS = {
  // 错误消息
  ERROR: {
    FETCH_FAILED: '获取食谱失败',
    UNKNOWN: '未知错误',
    RANDOM_FETCH_FAILED: '获取随机食谱失败',
    NETWORK_ERROR: '网络连接错误，请检查您的网络',
    SERVER_ERROR: '服务器错误，请稍后重试',
  },

  // 表单标签
  FORM: {
    INGREDIENTS_LABEL: '可用食材',
    INGREDIENTS_PLACEHOLDER: '例如：鸡肉、西兰花、大蒜',
    CATEGORY_LABEL: '菜品类别',
    CATEGORY_PLACEHOLDER: '选择类别',
    CUISINE_LABEL: '菜系',
    CUISINE_PLACEHOLDER: '选择菜系',
    TASTE_LABEL: '口味偏好',
    TASTE_PLACEHOLDER: '例如：清淡、麻辣、鲜甜',
    TIME_BUDGET_LABEL: '制作时间（分钟）',
    TIME_BUDGET_PLACEHOLDER: '例如：30',
    SERVINGS_LABEL: '份数',
    SERVINGS_PLACEHOLDER: '例如：2',
    EQUIPMENT_LABEL: '可用设备',
    EQUIPMENT_PLACEHOLDER: '例如：炒锅、电饭煲',
    SUBMIT_BUTTON: '获取推荐',
    RANDOM_BUTTON: '随机推荐',
  },

  // 食谱卡片
  RECIPE_CARD: {
    INGREDIENTS_TITLE: '食材清单',
    INSTRUCTIONS_TITLE: '制作步骤',
    VIDEO_BUTTON: '观看视频教程',
    CATEGORY_PREFIX: '分类：',
    CUISINE_PREFIX: '菜系：',
    TAGS_PREFIX: '标签：',
  },

  // 推荐横幅
  BANNER: {
    AI_RECOMMENDATION: 'AI 推荐',
    SUGGESTIONS_PREFIX: '建议：',
  },

  // 加载状态
  LOADING: {
    FETCHING: '正在获取食谱...',
    TRANSLATING: '正在翻译...',
    PROCESSING: '正在处理...',
  },

  // 空状态
  EMPTY: {
    NO_RECIPES: '暂无食谱',
    NO_RESULTS: '没有找到符合条件的食谱，请尝试调整搜索条件',
    START_SEARCH: '输入食材或选择类别开始搜索',
  },

  // 成功消息
  SUCCESS: {
    RECIPES_LOADED: '成功加载食谱',
  },

  // 页面标题
  PAGE: {
    TITLE: '今天吃什么',
    SUBTITLE: '让 AI 帮你决定今天的菜单',
  },
};

/**
 * 获取友好的错误消息
 */
export function getFriendlyErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    if (error.message.includes('fetch')) {
      return STRINGS.ERROR.NETWORK_ERROR;
    }
    if (error.message.includes('500') || error.message.includes('server')) {
      return STRINGS.ERROR.SERVER_ERROR;
    }
    return error.message;
  }
  return STRINGS.ERROR.UNKNOWN;
}
