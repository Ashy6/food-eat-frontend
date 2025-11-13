# 部署指南

本文档提供 Food Eat Frontend 项目的部署说明。

## 部署准备

### 1. 环境变量配置

在部署之前，确保配置正确的 API 地址：

```bash
# 生产环境
VITE_API_BASE_URL=https://mastra-food-app.zengjx1998.workers.dev
```

## 部署选项

### 选项 1: Vercel 部署（推荐）

1. 在 GitHub 上创建 `food-eat-frontend` 仓库
2. 推送代码到 GitHub：

```bash
git remote add origin https://github.com/Ashy6/food-eat-frontend.git
git push -u origin main
```

3. 访问 [Vercel](https://vercel.com)
4. 导入 GitHub 仓库
5. 配置环境变量：
   - Name: `VITE_API_BASE_URL`
   - Value: `https://mastra-food-app.zengjx1998.workers.dev`
6. 点击 Deploy

### 选项 2: Netlify 部署

1. 构建项目：

```bash
npm run build
```

2. 访问 [Netlify](https://netlify.com)
3. 拖拽 `dist` 文件夹到 Netlify
4. 或使用 Netlify CLI：

```bash
npm install -g netlify-cli
netlify deploy --prod
```

### 选项 3: GitHub Pages 部署

1. 修改 `vite.config.ts`：

```typescript
export default defineConfig({
  plugins: [react()],
  base: '/food-eat-frontend/',  // 添加这行
  server: {
    port: 3000,
    open: true
  }
})
```

2. 安装 gh-pages：

```bash
npm install -D gh-pages
```

3. 添加部署脚本到 `package.json`：

```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

4. 部署：

```bash
npm run deploy
```

### 选项 4: Cloudflare Pages 部署

1. 访问 [Cloudflare Pages](https://pages.cloudflare.com/)
2. 连接 GitHub 仓库
3. 配置构建设置：
   - Build command: `npm run build`
   - Build output directory: `dist`
4. 添加环境变量：
   - `VITE_API_BASE_URL`: `https://mastra-food-app.zengjx1998.workers.dev`
5. 部署

### 选项 5: 自托管（Docker）

创建 `Dockerfile`：

```dockerfile
FROM node:20-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

创建 `nginx.conf`：

```nginx
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api {
        proxy_pass https://mastra-food-app.zengjx1998.workers.dev;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

构建并运行：

```bash
docker build -t food-eat-frontend .
docker run -p 80:80 food-eat-frontend
```

## 推送到 GitHub

```bash
# 如果还没有添加远程仓库
git remote add origin https://github.com/Ashy6/food-eat-frontend.git

# 推送代码
git push -u origin main
```

## 性能优化建议

### 1. 启用 Gzip 压缩

大多数托管平台默认启用，如果自托管请确保服务器配置了 Gzip。

### 2. CDN 加速

建议使用 CDN 加速静态资源加载：
- Vercel 和 Netlify 自动提供 CDN
- Cloudflare Pages 自带 CDN
- 自托管可以使用 Cloudflare CDN

### 3. 图片优化

食谱图片来自 TheMealDB，可以考虑：
- 使用图片 CDN 服务
- 实现图片懒加载（已实现）
- 添加图片占位符

### 4. 代码分割

Vite 自动处理代码分割，确保按需加载。

## 监控和分析

建议添加：

1. **Google Analytics** - 追踪用户行为
2. **Sentry** - 错误监控
3. **Lighthouse** - 性能监控

## 环境检查清单

部署前检查：

- [ ] API 地址配置正确
- [ ] 所有依赖已安装
- [ ] 构建成功无错误
- [ ] TypeScript 类型检查通过
- [ ] ESLint 检查通过
- [ ] 所有功能测试正常
- [ ] 响应式设计在各设备测试正常
- [ ] API 调用正常返回数据

## 故障排除

### 问题 1: API 请求失败

检查：
- API 地址是否正确
- CORS 配置是否正确
- Cloudflare Workers 是否正常运行

### 问题 2: 构建失败

检查：
- Node.js 版本 >= 18
- 依赖是否完整安装
- TypeScript 配置是否正确

### 问题 3: 页面空白

检查：
- 控制台是否有错误
- 路由配置是否正确
- 静态资源路径是否正确

## 更新部署

```bash
# 拉取最新代码
git pull origin main

# 安装依赖
npm install

# 构建
npm run build

# 部署（根据选择的平台）
```

## 回滚部署

如果需要回滚到之前的版本：

```bash
# 查看提交历史
git log

# 回滚到特定提交
git reset --hard <commit-hash>

# 强制推送
git push -f origin main
```

## 技术支持

如遇问题，请访问：
- [GitHub Issues](https://github.com/Ashy6/food-eat-frontend/issues)
- [Food Eat 后端项目](https://github.com/Ashy6/food-eat)
