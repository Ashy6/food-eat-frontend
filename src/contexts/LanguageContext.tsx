import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// 支持的语言类型
export type Language = 'zh-CN' | 'en-US';

// 语言上下文类型
interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

// 创建上下文
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// 语言提供者属性
interface LanguageProviderProps {
  children: ReactNode;
}

// 翻译数据
const translations: Record<Language, Record<string, string>> = {
  'zh-CN': {
    // Header
    'app.title': 'Food Eat',
    'app.subtitle': 'AI 美食推荐助手 - 今天吃什么？让 AI 帮你决定！',

    // Search Form
    'search.ingredients': '食材',
    'search.ingredientsPlaceholder': '例如: chicken, tomato',
    'search.category': '分类',
    'search.categoryAll': '全部分类',
    'search.cuisine': '菜系',
    'search.cuisineAll': '全部菜系',
    'search.limit': '数量',
    'search.button': '搜索食谱',
    'search.random': '随机推荐',

    // Recipe Card
    'recipe.ingredients': '食材清单',
    'recipe.instructions': '制作步骤',
    'recipe.video': '观看视频教程',

    // Recipe List
    'list.loading': '正在获取美食推荐...',
    'list.error': '请检查网络连接或稍后重试',
    'list.empty': '还没有找到食谱',
    'list.emptyHint': '试试搜索或点击"随机推荐"按钮',

    // Suggestions
    'suggestions.title': 'AI 推荐',
    'suggestions.source': '数据来源',

    // Footer
    'footer.poweredBy': 'Powered by',
    'footer.and': '&',

    // Language
    'language.zhCN': '简体中文',
    'language.enUS': 'English',
  },
  'en-US': {
    // Header
    'app.title': 'Food Eat',
    'app.subtitle': 'AI Food Recommendation - What to eat today? Let AI decide!',

    // Search Form
    'search.ingredients': 'Ingredients',
    'search.ingredientsPlaceholder': 'e.g.: chicken, tomato',
    'search.category': 'Category',
    'search.categoryAll': 'All Categories',
    'search.cuisine': 'Cuisine',
    'search.cuisineAll': 'All Cuisines',
    'search.limit': 'Limit',
    'search.button': 'Search Recipes',
    'search.random': 'Random',

    // Recipe Card
    'recipe.ingredients': 'Ingredients',
    'recipe.instructions': 'Instructions',
    'recipe.video': 'Watch Video Tutorial',

    // Recipe List
    'list.loading': 'Loading recipes...',
    'list.error': 'Please check your network connection or try again later',
    'list.empty': 'No recipes found',
    'list.emptyHint': 'Try searching or click the "Random" button',

    // Suggestions
    'suggestions.title': 'AI Recommendations',
    'suggestions.source': 'Source',

    // Footer
    'footer.poweredBy': 'Powered by',
    'footer.and': '&',

    // Language
    'language.zhCN': '简体中文',
    'language.enUS': 'English',
  },
};

// 语言提供者组件
export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  // 从 localStorage 读取保存的语言，默认中文
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('app_language');
    return (saved as Language) || 'zh-CN';
  });

  // 保存语言选择到 localStorage
  useEffect(() => {
    localStorage.setItem('app_language', language);

    // 更新 HTML lang 属性
    document.documentElement.lang = language;
  }, [language]);

  // 设置语言
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  // 翻译函数
  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// 自定义 Hook 用于访问语言上下文
export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// 根据语言获取对应的地区
export function getRegionFromLanguage(lang: Language): 'CN' | 'OTHER' {
  return lang === 'zh-CN' ? 'CN' : 'OTHER';
}
