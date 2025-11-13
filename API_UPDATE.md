# API 响应格式更新说明

## 新的 API 响应结构

后端 API 现在返回更丰富的响应格式，包含 AI 建议、食谱列表、数据来源和请求信息。

### 响应格式

```typescript
interface RecipeAPIResponse {
  suggestions: string;          // AI 生成的推荐说明
  recipes: Recipe[];            // 食谱列表
  source: string;               // 数据来源（如 "TheMealDB"）
  request: {
    original: {                 // 用户原始输入
      ingredients?: string;
      category?: string;
      cuisine?: string;
      limit: number;
    };
    normalized: {               // 标准化后的输入（如中文转英文）
      ingredients?: string;
      category?: string;
      cuisine?: string;
      limit: number;
    };
  };
}
```

### 示例响应

```json
{
  "suggestions": "找到 5 道候选菜：Brown Stew Chicken、Callaloo Jamaican Style、Chivito uruguayo、Falafel Pita Sandwich with Tahini Sauce、Kapsalon",
  "recipes": [
    {
      "id": "52940",
      "name": "Brown Stew Chicken",
      "category": "Chicken",
      "area": "Jamaican",
      "tags": ["Stew"],
      "instructions": "Squeeze lime over chicken...",
      "thumbnail": "https://www.themealdb.com/images/media/meals/sypxpx1515365095.jpg",
      "youtube": "https://www.youtube.com/watch?v=_gFB1fkNhXs",
      "ingredients": [
        {
          "ingredient": "Chicken",
          "measure": "1 whole"
        }
      ]
    }
  ],
  "source": "TheMealDB",
  "request": {
    "original": {
      "ingredients": "西红柿",
      "limit": 5
    },
    "normalized": {
      "ingredients": "tomato",
      "limit": 5
    }
  }
}
```

## 前端更新

### 1. 类型定义更新

**src/types/index.ts**

```typescript
// 新增 RecipeAPIResponse 接口
export interface RecipeAPIResponse {
  suggestions: string;
  recipes: Recipe[];
  source: string;
  request: {
    original: { ... };
    normalized: { ... };
  };
}

// Recipe 接口更新
export interface Recipe {
  // ...
  tags: string[] | null;        // tags 可能为 null
  youtube: string;               // 字段名改为 youtube（原 youtubeUrl）
  // ...
}
```

### 2. API 服务更新

**src/services/api.ts**

```typescript
// 返回类型改为 RecipeAPIResponse
async getRecipes(params?: RecipeSearchParams): Promise<ApiResponse<RecipeAPIResponse>> {
  // ...
  const response = await this.client.get<RecipeAPIResponse>(url);
  return {
    data: response.data,
    success: true,
  };
}
```

### 3. Hooks 更新

**src/hooks/useRecipes.ts**

```typescript
export const useRecipes = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [suggestions, setSuggestions] = useState<string>('');  // 新增
  const [source, setSource] = useState<string>('');            // 新增
  // ...

  // 从响应中提取数据
  if (response.success && response.data) {
    setRecipes(response.data.recipes || []);
    setSuggestions(response.data.suggestions || '');
    setSource(response.data.source || '');
  }

  return {
    recipes,
    suggestions,  // 新增
    source,       // 新增
    // ...
  };
};
```

### 4. 新增建议展示组件

**src/components/SuggestionsBanner.tsx**

显示 AI 生成的推荐说明，包括：
- 灯泡图标
- 推荐文本
- 数据来源

```typescript
interface SuggestionsBannerProps {
  suggestions: string;
  source: string;
}

export const SuggestionsBanner = ({ suggestions, source }: SuggestionsBannerProps) => {
  return (
    <div className="suggestions-banner">
      <div className="suggestions-icon">
        <Lightbulb size={24} />
      </div>
      <div className="suggestions-content">
        <h3>AI 推荐</h3>
        <p>{suggestions}</p>
        <span className="suggestions-source">数据来源: {source}</span>
      </div>
    </div>
  );
};
```

### 5. 组件更新

**src/components/RecipeCard.tsx**

```typescript
// 字段名更新
{recipe.youtube && (
  <a href={recipe.youtube}>观看视频教程</a>
)}

// tags 可能为 null 的处理
{recipe.tags && Array.isArray(recipe.tags) && recipe.tags.length > 0 && (
  <div className="recipe-tags">
    {recipe.tags.map((tag, index) => (
      <span key={index} className="tag">{tag}</span>
    ))}
  </div>
)}
```

**src/App.tsx**

```typescript
function App() {
  const { recipes, suggestions, source, loading, error, fetchRecipes, fetchRandomRecipes } = useRecipes();

  return (
    <div className="app">
      <Header />
      <main>
        <SearchForm ... />
        {/* 新增：显示 AI 建议 */}
        {suggestions && !loading && !error && (
          <SuggestionsBanner suggestions={suggestions} source={source} />
        )}
        <RecipeList recipes={recipes} loading={loading} error={error} />
      </main>
    </div>
  );
}
```

## UI 效果

### 建议横幅

当用户搜索食谱后，会在搜索表单下方显示一个漂亮的横幅：

```
┌─────────────────────────────────────────────────────┐
│ 💡 AI 推荐                                          │
│                                                     │
│ 找到 5 道候选菜：Brown Stew Chicken、              │
│ Callaloo Jamaican Style、Chivito uruguayo、        │
│ Falafel Pita Sandwich with Tahini Sauce、Kapsalon  │
│                                                     │
│ 数据来源: TheMealDB                                 │
└─────────────────────────────────────────────────────┘
```

样式特点：
- 渐变紫色背景
- 灯泡图标
- 白色文字
- 圆角和阴影
- 响应式设计

## 兼容性说明

### 向后兼容

虽然响应结构改变了，但前端已更新以适配新格式：
- ✅ 正确提取 `recipes` 数组
- ✅ 显示 `suggestions` 信息
- ✅ 处理 `tags` 可能为 `null`
- ✅ 使用正确的字段名 `youtube`

### 错误处理

如果 API 返回的数据不完整：
- `recipes` 为空时显示"还没有找到食谱"
- `suggestions` 为空时不显示建议横幅
- `tags` 为 null 时跳过标签显示

## 测试建议

### 1. 测试不同搜索场景

```bash
# 启动开发服务器
npm run dev
```

**测试用例：**

1. **中文食材搜索**
   - 输入：西红柿
   - 预期：显示 AI 建议"找到 X 道候选菜..."
   - 预期：显示原始输入和标准化输入

2. **分类搜索**
   - 选择：Vegetarian
   - 预期：显示素食类食谱

3. **随机推荐**
   - 点击：随机推荐
   - 预期：显示 5 道随机食谱和 AI 建议

4. **组合搜索**
   - 食材：chicken
   - 分类：Chicken
   - 菜系：Italian
   - 预期：显示符合条件的食谱

### 2. 检查数据显示

- ✅ AI 建议横幅正常显示
- ✅ 数据来源正确显示
- ✅ 食谱卡片信息完整
- ✅ YouTube 链接可点击
- ✅ 标签正常显示（如果有）

### 3. 边界情况测试

- 无结果时的显示
- 网络错误时的处理
- tags 为 null 的食谱
- youtube 链接为空的食谱

## 调试技巧

### 1. 查看完整响应

在浏览器控制台：

```javascript
// 打开 Network 标签
// 找到 /api/recipes 请求
// 查看 Response 标签页
```

### 2. 检查状态

在 `useRecipes` hook 中添加日志：

```typescript
console.log('Recipes:', recipes);
console.log('Suggestions:', suggestions);
console.log('Source:', source);
```

### 3. 使用 React DevTools

- 查看 App 组件的 props
- 检查 useRecipes hook 的返回值
- 验证 SuggestionsBanner 是否接收到正确的 props

## 常见问题

### Q1: 建议横幅不显示

**可能原因：**
- `suggestions` 为空字符串
- 正在加载中（`loading` 为 true）
- 有错误（`error` 不为 null）

**解决方法：**
检查 API 响应是否包含 `suggestions` 字段。

### Q2: YouTube 链接无效

**可能原因：**
- 字段名使用错误（应该是 `youtube` 而不是 `youtubeUrl`）

**解决方法：**
确保使用 `recipe.youtube` 访问链接。

### Q3: tags 显示错误

**可能原因：**
- `tags` 可能为 `null` 而不是空数组

**解决方法：**
添加类型检查：`recipe.tags && Array.isArray(recipe.tags)`

## 性能影响

### 构建大小

更新后的构建大小：
- CSS: ~8.4 KB (gzip: ~2.2 KB) - 增加约 0.9 KB
- JS: ~301 KB (gzip: ~97 KB) - 增加约 1 KB

新增：
- SuggestionsBanner 组件
- 额外的类型定义

### 运行时性能

- ✅ 无明显性能影响
- ✅ 建议横幅使用条件渲染
- ✅ 数据提取在 Hook 中完成，不影响渲染

## 迁移检查清单

- [x] 更新类型定义（RecipeAPIResponse）
- [x] 更新 API 服务返回类型
- [x] 更新 useRecipes hook
- [x] 创建 SuggestionsBanner 组件
- [x] 更新 App 组件集成建议显示
- [x] 修复 RecipeCard 字段名
- [x] 处理 tags 为 null 的情况
- [x] 构建测试通过
- [x] 提交代码

## 总结

新的 API 响应格式提供了更丰富的信息：
- 🎯 AI 生成的推荐说明
- 📊 完整的请求上下文
- 🌐 数据来源标识
- 🔄 输入标准化信息

前端已完全适配新格式，用户体验得到提升！
