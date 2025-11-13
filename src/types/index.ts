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

export type MealCategory =
  | 'Beef'
  | 'Chicken'
  | 'Dessert'
  | 'Lamb'
  | 'Miscellaneous'
  | 'Pasta'
  | 'Pork'
  | 'Seafood'
  | 'Side'
  | 'Starter'
  | 'Vegan'
  | 'Vegetarian'
  | 'Breakfast'
  | 'Goat';

export type Cuisine =
  | 'American'
  | 'British'
  | 'Canadian'
  | 'Chinese'
  | 'Croatian'
  | 'Dutch'
  | 'Egyptian'
  | 'Filipino'
  | 'French'
  | 'Greek'
  | 'Indian'
  | 'Irish'
  | 'Italian'
  | 'Jamaican'
  | 'Japanese'
  | 'Kenyan'
  | 'Malaysian'
  | 'Mexican'
  | 'Moroccan'
  | 'Polish'
  | 'Portuguese'
  | 'Russian'
  | 'Spanish'
  | 'Thai'
  | 'Tunisian'
  | 'Turkish'
  | 'Vietnamese';
