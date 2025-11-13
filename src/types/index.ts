export interface Recipe {
  id: string;
  name: string;
  category: string;
  area: string;
  tags: string[] | null;
  instructions: string;
  thumbnail: string;
  youtube: string; // 注意：API 返回的字段名是 youtube，不是 youtubeUrl
  ingredients: Array<{
    ingredient: string;
    measure: string;
  }>;
}

export interface RecipeSearchParams {
  ingredients?: string;
  category?: string;
  cuisine?: string;
  limit?: number;
  model?: string;
  language?: 'zh-CN' | 'en-US';
}

// 新的 API 响应结构
export interface RecipeAPIResponse {
  suggestions: string;
  recipes: Recipe[];
  source: string;
  request: {
    original: {
      ingredients?: string;
      category?: string;
      cuisine?: string;
      limit: number;
    };
    normalized: {
      ingredients?: string;
      category?: string;
      cuisine?: string;
      limit: number;
    };
  };
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  success: boolean;
}

export type MealCategory = string;

export type Cuisine = string;

// 分类选项（中英文映射）
export interface CategoryOption {
  value: string;
  label: string;
}

export const CATEGORY_OPTIONS: CategoryOption[] = [
  { value: 'Beef', label: '牛肉' },
  { value: 'Chicken', label: '鸡肉' },
  { value: 'Dessert', label: '甜点' },
  { value: 'Lamb', label: '羊肉' },
  { value: 'Miscellaneous', label: '其他' },
  { value: 'Pasta', label: '意面' },
  { value: 'Pork', label: '猪肉' },
  { value: 'Seafood', label: '海鲜' },
  { value: 'Side', label: '配菜' },
  { value: 'Starter', label: '开胃菜' },
  { value: 'Vegan', label: '纯素' },
  { value: 'Vegetarian', label: '素食' },
  { value: 'Breakfast', label: '早餐' },
  { value: 'Goat', label: '羊肉（山羊）' },
];

// 菜系选项（中英文映射）
export interface CuisineOption {
  value: string;
  label: string;
}

export const CUISINE_OPTIONS: CuisineOption[] = [
  { value: 'American', label: '美式' },
  { value: 'British', label: '英式' },
  { value: 'Canadian', label: '加拿大' },
  { value: 'Chinese', label: '中式' },
  { value: 'Croatian', label: '克罗地亚' },
  { value: 'Dutch', label: '荷兰' },
  { value: 'Egyptian', label: '埃及' },
  { value: 'Filipino', label: '菲律宾' },
  { value: 'French', label: '法式' },
  { value: 'Greek', label: '希腊' },
  { value: 'Indian', label: '印度' },
  { value: 'Irish', label: '爱尔兰' },
  { value: 'Italian', label: '意大利' },
  { value: 'Jamaican', label: '牙买加' },
  { value: 'Japanese', label: '日式' },
  { value: 'Kenyan', label: '肯尼亚' },
  { value: 'Malaysian', label: '马来西亚' },
  { value: 'Mexican', label: '墨西哥' },
  { value: 'Moroccan', label: '摩洛哥' },
  { value: 'Polish', label: '波兰' },
  { value: 'Portuguese', label: '葡萄牙' },
  { value: 'Russian', label: '俄罗斯' },
  { value: 'Spanish', label: '西班牙' },
  { value: 'Thai', label: '泰式' },
  { value: 'Tunisian', label: '突尼斯' },
  { value: 'Turkish', label: '土耳其' },
  { value: 'Vietnamese', label: '越南' },
];
