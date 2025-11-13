# 快速启动指南

## 推送到 GitHub

### 1. 在 GitHub 上创建新仓库

访问 [GitHub](https://github.com) 并创建一个名为 `food-eat-frontend` 的新仓库。

**重要**: 创建时不要初始化 README、.gitignore 或 LICENSE（我们已经有了）。

### 2. 推送本地代码到 GitHub

```bash
# 添加远程仓库（如果还没添加）
git remote add origin https://github.com/Ashy6/food-eat-frontend.git

# 推送代码
git push -u origin main
```

### 3. 配置 GitHub Pages（可选）

如果要使用 GitHub Pages 部署：

1. 进入仓库的 Settings > Pages
2. Source 选择 "GitHub Actions"
3. 在 Settings > Secrets and variables > Actions 中添加：
   - Name: `VITE_API_BASE_URL`
   - Value: `https://mastra-food-app.zengjx1998.workers.dev`

推送代码后，GitHub Actions 会自动构建和部署。

## 本地开发

### 首次运行

```bash
# 1. 安装依赖
npm install

# 2. 复制环境变量文件
cp .env.example .env

# 3. 启动开发服务器
npm run dev
```

访问 `http://localhost:3000`

### 开发命令

```bash
# 开发服务器
npm run dev

# 生产构建
npm run build

# 预览构建
npm run preview

# 代码检查
npm run lint
```

## 项目结构

```text
food-eat-frontend/
├── .github/
│   └── workflows/          # GitHub Actions 工作流
├── public/                 # 静态资源
├── src/
│   ├── components/         # React 组件
│   │   ├── Header.tsx
│   │   ├── SearchForm.tsx
│   │   ├── RecipeCard.tsx
│   │   └── RecipeList.tsx
│   ├── hooks/              # 自定义 Hooks
│   │   └── useRecipes.ts
│   ├── services/           # API 服务
│   │   └── api.ts
│   ├── types/              # TypeScript 类型
│   │   └── index.ts
│   ├── styles/             # 全局样式
│   │   └── index.css
│   ├── App.tsx             # 根组件
│   ├── main.tsx            # 应用入口
│   └── vite-env.d.ts       # Vite 类型声明
├── .env.example            # 环境变量示例
├── .gitignore              # Git 忽略文件
├── index.html              # HTML 模板
├── package.json            # 项目配置
├── tsconfig.json           # TypeScript 配置
├── vite.config.ts          # Vite 配置
├── CONTRIBUTING.md         # 贡献指南
├── DEPLOY.md               # 部署指南
├── LICENSE                 # 许可证
└── README.md               # 项目文档
```

## 技术栈

### 核心框架
- React 18.2
- TypeScript 5.2
- Vite 5.0

### UI 和样式
- CSS3 with CSS Variables
- lucide-react (图标)
- 响应式设计

### 状态管理和数据
- React Hooks
- Axios (HTTP 客户端)
- react-markdown (Markdown 渲染)

### 开发工具
- ESLint (代码检查)
- TypeScript (类型检查)
- Vite (构建工具)

## API 集成

### API 端点

```typescript
// 默认 API 地址
const API_BASE_URL = 'https://mastra-food-app.zengjx1998.workers.dev'

// 获取食谱
GET /api/recipes?ingredients=chicken&category=Vegetarian&cuisine=Chinese&limit=5
```

### API 响应格式

```typescript
interface Recipe {
  id: string;
  name: string;
  category: string;
  area: string;
  tags: string[];
  instructions: string;
  thumbnail: string;
  youtubeUrl: string;
  ingredients: Array<{
    ingredient: string;
    measure: string;
  }>;
}
```

## 环境变量

创建 `.env` 文件：

```env
# API 基础地址
VITE_API_BASE_URL=https://mastra-food-app.zengjx1998.workers.dev
```

## 功能特性

### 已实现
- ✅ 食谱搜索（按食材、分类、菜系）
- ✅ 随机推荐
- ✅ 响应式设计
- ✅ Markdown 渲染
- ✅ 图片懒加载
- ✅ 错误处理
- ✅ 加载状态

### 计划中
- [ ] 食谱收藏
- [ ] 用户评论和评分
- [ ] 购物清单
- [ ] 多语言支持
- [ ] 天气集成
- [ ] PWA 支持

## 浏览器支持

- Chrome (最新版)
- Firefox (最新版)
- Safari (最新版)
- Edge (最新版)

## 性能指标

构建产物大小：
- CSS: ~7.5 KB (gzip: ~2 KB)
- JS: ~300 KB (gzip: ~97 KB)
- Total: ~307 KB

## 故障排除

### 问题：端口 3000 已被占用

```bash
# 修改 vite.config.ts 中的端口
server: {
  port: 3001,  // 改为其他端口
}
```

### 问题：API 请求失败

1. 检查 `.env` 文件配置
2. 确认后端服务正常运行
3. 检查浏览器控制台错误信息

### 问题：构建失败

```bash
# 清除缓存
rm -rf node_modules package-lock.json
npm install
```

## 下一步

1. ✅ 推送代码到 GitHub
2. 🔄 选择部署平台（Vercel/Netlify/Cloudflare Pages）
3. 🔄 配置自动部署
4. 🔄 添加自定义域名（可选）
5. 🔄 启用 HTTPS
6. 🔄 添加分析工具

## 有用的链接

- [React 文档](https://react.dev)
- [Vite 文档](https://vitejs.dev)
- [TypeScript 文档](https://www.typescriptlang.org)
- [Food Eat 后端](https://github.com/Ashy6/food-eat)

## 需要帮助？

- 查看 [README.md](README.md)
- 查看 [DEPLOY.md](DEPLOY.md)
- 查看 [CONTRIBUTING.md](CONTRIBUTING.md)
- 提交 [GitHub Issue](https://github.com/Ashy6/food-eat-frontend/issues)

---

Happy Coding! 🎉
