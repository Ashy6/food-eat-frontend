# Food Eat Frontend

🍕 一个基于 React 的 AI 美食推荐前端应用，连接 [Food Eat](https://github.com/Ashy6/food-eat) Mastra Agents 后端服务。

## ✨ 特性

- 🔍 **智能搜索** - 根据食材、分类、菜系搜索食谱
- 🎲 **随机推荐** - AI 随机推荐美味食谱
- 📱 **响应式设计** - 完美适配手机、平板和桌面设备
- 🎨 **现代化 UI** - 精美的卡片式布局和流畅动画
- 📝 **Markdown 支持** - 使用 react-markdown 渲染食谱步骤
- ⚡ **快速加载** - 基于 Vite 构建，极速开发体验

## 🛠️ 技术栈

- **框架**: React 18 + TypeScript
- **构建工具**: Vite
- **样式**: CSS3 + CSS Variables
- **HTTP 客户端**: Axios
- **Markdown 渲染**: react-markdown
- **图标**: lucide-react
- **后端 API**: Cloudflare Workers (Mastra Agents)

## 📦 安装

```bash
# 克隆仓库
git clone https://github.com/Ashy6/food-eat-frontend.git
cd food-eat-frontend

# 安装依赖
npm install
# 或
pnpm install
```

## ⚙️ 配置

创建 `.env` 文件并配置 API 地址：

```bash
# 复制示例配置文件
cp .env.example .env
```

编辑 `.env` 文件：

```env
VITE_API_BASE_URL=https://mastra-food-app.zengjx1998.workers.dev
```

## 🚀 运行

### 开发模式

```bash
npm run dev
```

应用将在 `http://localhost:3000` 启动。

### 生产构建

```bash
npm run build
```

构建产物将生成在 `dist` 目录。

### 预览构建

```bash
npm run preview
```

## 📖 使用指南

### 搜索食谱

1. **按食材搜索**: 在"食材"输入框中输入食材名称（如：chicken, tomato）
2. **按分类筛选**: 选择食物分类（如：Vegetarian, Seafood）
3. **按菜系筛选**: 选择地区菜系（如：Chinese, Italian）
4. **设置数量**: 选择返回的食谱数量（1-10）
5. 点击"搜索食谱"按钮

### 随机推荐

点击"随机推荐"按钮，获取 AI 随机推荐的 5 道美食。

### 查看食谱详情

- 查看食谱的封面图片、分类和菜系
- 浏览完整的食材清单和用量
- 展开查看详细的制作步骤（支持 Markdown 格式）
- 点击"观看视频教程"链接跳转到 YouTube 教程

## 📡 API 接口

### 获取食谱

```http
GET /api/recipes
```

**查询参数**:

- `ingredients`: 食材（逗号分隔）
- `category`: 分类（如：Vegetarian, Seafood）
- `cuisine`: 菜系（如：Chinese, Italian）
- `limit`: 数量限制（1-10，默认 5）

**响应示例**:

```json
[
  {
    "id": "52772",
    "name": "Teriyaki Chicken Casserole",
    "category": "Chicken",
    "area": "Japanese",
    "tags": ["Meat", "Casserole"],
    "instructions": "Preheat oven to 350° F...",
    "thumbnail": "https://www.themealdb.com/images/media/meals/wvpsxx1468256321.jpg",
    "youtubeUrl": "https://www.youtube.com/watch?v=4aZr5hZXP_s",
    "ingredients": [
      {
        "ingredient": "soy sauce",
        "measure": "3/4 cup"
      }
    ]
  }
]
```

## 🗂️ 项目结构

```text
food-eat-frontend/
├── src/
│   ├── components/          # React 组件
│   │   ├── Header.tsx       # 页面头部
│   │   ├── SearchForm.tsx   # 搜索表单
│   │   ├── RecipeCard.tsx   # 食谱卡片
│   │   └── RecipeList.tsx   # 食谱列表
│   ├── hooks/               # 自定义 Hooks
│   │   └── useRecipes.ts    # 食谱数据管理
│   ├── services/            # API 服务层
│   │   └── api.ts           # API 客户端
│   ├── types/               # TypeScript 类型定义
│   │   └── index.ts         # 类型声明
│   ├── styles/              # 全局样式
│   │   └── index.css        # 全局 CSS
│   ├── App.tsx              # 根组件
│   ├── main.tsx             # 应用入口
│   └── vite-env.d.ts        # Vite 类型声明
├── public/                  # 静态资源
├── index.html               # HTML 模板
├── package.json             # 项目配置
├── tsconfig.json            # TypeScript 配置
├── vite.config.ts           # Vite 配置
└── README.md                # 项目文档
```

## 🎨 设计特点

### 配色方案

- **主色调**: `#ff6b6b` (温暖的红色)
- **次要色**: `#4ecdc4` (清新的青色)
- **强调色**: `#ffe66d` (活力的黄色)
- **深色**: `#2c3e50` (专业的深蓝)
- **浅色**: `#ecf0f1` (柔和的灰白)

### 响应式断点

- **移动端**: < 768px
- **平板**: 768px - 1024px
- **桌面**: > 1024px

## 🔗 相关链接

- [Food Eat 后端项目](https://github.com/Ashy6/food-eat) - Mastra Agents 后端服务
- [Mastra Framework](https://mastra.ai/) - AI Agents 框架
- [TheMealDB](https://www.themealdb.com/) - 食谱数据源

## 📝 开发计划

- [ ] 添加食谱收藏功能
- [ ] 实现用户评论和评分
- [ ] 添加购物清单功能
- [ ] 支持多语言（中文/英文）
- [ ] 集成天气查询，根据天气推荐
- [ ] PWA 支持，离线访问

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

ISC License

## 👨‍💻 作者

[Ashy6](https://github.com/Ashy6)

---

⭐ 如果这个项目对你有帮助，请给它一个 Star！
