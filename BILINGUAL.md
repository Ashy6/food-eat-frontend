# 双语支持说明

## 概述

项目现已支持中英文双语显示，用户界面显示中文标签，同时保持与后端 API 的英文值兼容性。

## 实现方式

### 1. 数据结构

**类型定义** ([src/types/index.ts](src/types/index.ts))

```typescript
// 分类选项接口
export interface CategoryOption {
  value: MealCategory;  // API 使用的英文值
  label: string;        // 用户看到的中文标签
}

// 菜系选项接口
export interface CuisineOption {
  value: Cuisine;       // API 使用的英文值
  label: string;        // 用户看到的中文标签
}
```

### 2. 选项映射

#### 分类选项 (CATEGORY_OPTIONS)

| 英文值 (API) | 中文标签 (UI) |
|-------------|--------------|
| Beef | 牛肉 |
| Chicken | 鸡肉 |
| Dessert | 甜点 |
| Lamb | 羊肉 |
| Miscellaneous | 其他 |
| Pasta | 意面 |
| Pork | 猪肉 |
| Seafood | 海鲜 |
| Side | 配菜 |
| Starter | 开胃菜 |
| Vegan | 纯素 |
| Vegetarian | 素食 |
| Breakfast | 早餐 |
| Goat | 羊肉（山羊）|

#### 菜系选项 (CUISINE_OPTIONS)

| 英文值 (API) | 中文标签 (UI) |
|-------------|--------------|
| American | 美式 |
| British | 英式 |
| Canadian | 加拿大 |
| Chinese | 中式 |
| Croatian | 克罗地亚 |
| Dutch | 荷兰 |
| Egyptian | 埃及 |
| Filipino | 菲律宾 |
| French | 法式 |
| Greek | 希腊 |
| Indian | 印度 |
| Irish | 爱尔兰 |
| Italian | 意大利 |
| Jamaican | 牙买加 |
| Japanese | 日式 |
| Kenyan | 肯尼亚 |
| Malaysian | 马来西亚 |
| Mexican | 墨西哥 |
| Moroccan | 摩洛哥 |
| Polish | 波兰 |
| Portuguese | 葡萄牙 |
| Russian | 俄罗斯 |
| Spanish | 西班牙 |
| Thai | 泰式 |
| Tunisian | 突尼斯 |
| Turkish | 土耳其 |
| Vietnamese | 越南 |

### 3. 组件使用

**搜索表单** ([src/components/SearchForm.tsx](src/components/SearchForm.tsx))

```typescript
import { CATEGORY_OPTIONS, CUISINE_OPTIONS } from '../types';

// 分类选择器
<select>
  <option value="">全部分类</option>
  {CATEGORY_OPTIONS.map((option) => (
    <option key={option.value} value={option.value}>
      {option.label}  {/* 显示中文 */}
    </option>
  ))}
</select>

// 菜系选择器
<select>
  <option value="">全部菜系</option>
  {CUISINE_OPTIONS.map((option) => (
    <option key={option.value} value={option.value}>
      {option.label}  {/* 显示中文 */}
    </option>
  ))}
</select>
```

## 工作流程

### 用户操作流程

1. **用户选择选项**
   ```
   用户在下拉菜单中看到：
   ┌─────────────┐
   │ 全部分类    │
   │ 牛肉       │ ← 用户看到中文
   │ 鸡肉       │
   │ 甜点       │
   └─────────────┘
   ```

2. **表单提交**
   ```typescript
   // 用户选择 "牛肉"
   // 实际发送的值
   params.category = "Beef"  // 英文值
   ```

3. **API 请求**
   ```http
   GET /api/recipes?category=Beef&limit=5
   ```

4. **响应显示**
   ```
   用户看到搜索结果，包含牛肉类食谱
   ```

### 数据流程图

```
用户界面 (中文)              应用逻辑 (英文)              后端 API (英文)
─────────────────           ──────────────             ────────────────

选择 "牛肉"      →          value: "Beef"      →      category=Beef
选择 "中式"      →          value: "Chinese"   →      cuisine=Chinese
选择 "素食"      →          value: "Vegetarian" →     category=Vegetarian
```

## 优势

### 1. 用户体验
- ✅ 中文界面更友好
- ✅ 降低理解成本
- ✅ 提升操作效率

### 2. 技术实现
- ✅ 保持 API 兼容性
- ✅ 无需修改后端
- ✅ 易于维护和扩展

### 3. 可扩展性
- ✅ 轻松添加更多语言
- ✅ 统一的数据结构
- ✅ 类型安全

## 添加新选项

如需添加新的分类或菜系，只需修改 `src/types/index.ts`：

```typescript
// 添加新分类
export const CATEGORY_OPTIONS: CategoryOption[] = [
  // ... 现有选项
  { value: 'NewCategory', label: '新分类' },  // 添加这里
];

// 添加新菜系
export const CUISINE_OPTIONS: CuisineOption[] = [
  // ... 现有选项
  { value: 'NewCuisine', label: '新菜系' },   // 添加这里
];
```

同时更新类型定义：

```typescript
export type MealCategory =
  | 'Beef'
  // ... 现有类型
  | 'NewCategory';  // 添加这里

export type Cuisine =
  | 'American'
  // ... 现有类型
  | 'NewCuisine';   // 添加这里
```

## 国际化扩展

如需支持更多语言，可以进一步改进：

### 1. 创建语言文件

```typescript
// src/i18n/zh-CN.ts
export const zhCN = {
  categories: {
    Beef: '牛肉',
    Chicken: '鸡肉',
    // ...
  },
  cuisines: {
    Chinese: '中式',
    Italian: '意大利',
    // ...
  }
};

// src/i18n/en-US.ts
export const enUS = {
  categories: {
    Beef: 'Beef',
    Chicken: 'Chicken',
    // ...
  },
  cuisines: {
    Chinese: 'Chinese',
    Italian: 'Italian',
    // ...
  }
};
```

### 2. 使用 i18n 库

推荐使用 `react-i18next` 或 `react-intl` 实现完整的国际化支持。

## 测试建议

### 1. 显示测试

访问 `http://localhost:3000` 验证：

- ✓ 分类下拉菜单显示中文
- ✓ 菜系下拉菜单显示中文
- ✓ 所有选项翻译正确

### 2. 功能测试

测试 API 请求：

1. 选择"牛肉"分类
2. 打开浏览器开发者工具 → Network
3. 查看请求：应该是 `?category=Beef`
4. 确认返回正确的牛肉类食谱

### 3. 边界测试

- 选择"全部分类"或"全部菜系"
- 组合多个条件搜索
- 验证随机推荐功能

## 常见问题

### Q1: 为什么不在 API 中使用中文？

**原因：**
- 后端 API 使用 TheMealDB，其数据源是英文
- 中文字符在 URL 中需要编码，可能导致兼容性问题
- 保持前后端分离，翻译在前端进行

### Q2: 如何添加新语言支持？

**方法：**
1. 创建新的选项映射（如 `CATEGORY_OPTIONS_EN`）
2. 根据语言设置切换不同的映射
3. 考虑使用 i18n 库管理多语言

### Q3: 选项顺序可以调整吗？

**可以！**

直接修改 `CATEGORY_OPTIONS` 或 `CUISINE_OPTIONS` 数组的顺序：

```typescript
export const CATEGORY_OPTIONS: CategoryOption[] = [
  { value: 'Vegetarian', label: '素食' },  // 调整到前面
  { value: 'Vegan', label: '纯素' },
  { value: 'Beef', label: '牛肉' },
  // ...
];
```

## 性能影响

### 构建大小

添加双语映射后：
- 增加约 ~1 KB（未压缩）
- Gzip 压缩后几乎无影响
- 不影响运行时性能

### 运行时

- ✅ 映射在编译时处理
- ✅ 无额外网络请求
- ✅ 选项渲染性能优秀

## 维护建议

### 1. 保持同步

确保：
- TypeScript 类型定义完整
- 所有选项都有对应的中文翻译
- 新增选项及时添加翻译

### 2. 统一命名

- 使用统一的翻译规则
- 保持术语一致性
- 考虑用户习惯

### 3. 文档更新

新增或修改选项时：
- 更新本文档
- 更新 README
- 添加注释说明

## 示例代码

### 完整示例

```typescript
// types/index.ts
export const CATEGORY_OPTIONS: CategoryOption[] = [
  { value: 'Beef', label: '牛肉' },
  { value: 'Chicken', label: '鸡肉' },
];

// components/SearchForm.tsx
import { CATEGORY_OPTIONS } from '../types';

function SearchForm() {
  const [category, setCategory] = useState('');

  return (
    <select
      value={category}
      onChange={(e) => setCategory(e.target.value)}
    >
      <option value="">全部分类</option>
      {CATEGORY_OPTIONS.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

// API 调用
const params = {
  category: category, // "Beef" - 英文值
  limit: 5
};

await api.getRecipes(params);
// GET /api/recipes?category=Beef&limit=5
```

## 总结

双语支持通过简单的映射机制实现了：
- 🎯 用户友好的中文界面
- 🔄 完整的 API 兼容性
- 📦 最小的性能开销
- 🚀 易于扩展和维护

这为未来支持更多语言奠定了良好基础！
