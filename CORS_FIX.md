# CORS 跨域问题解决方案

## 问题描述

在本地开发时，浏览器会阻止前端（`http://localhost:3000`）直接访问后端 API（`https://mastra-food-app.zengjx1998.workers.dev`），因为它们属于不同的源（协议、域名或端口不同），触发了浏览器的 CORS（跨域资源共享）安全策略。

错误信息：
```
Access to XMLHttpRequest at 'https://mastra-food-app.zengjx1998.workers.dev/api/recipes'
from origin 'http://localhost:3000' has been blocked by CORS policy:
No 'Access-Control-Allow-Origin' header is present on the requested resource.
```

## 解决方案

### 方案 1: Vite 代理（已实现 ✅ 推荐）

在开发环境使用 Vite 的代理功能，将 API 请求转发到后端服务器。

#### 配置说明

**1. vite.config.ts**

```typescript
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
    proxy: {
      '/api': {
        target: 'https://mastra-food-app.zengjx1998.workers.dev',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path
      }
    }
  }
})
```

**配置解释：**
- `'/api'`: 拦截所有以 `/api` 开头的请求
- `target`: 后端 API 地址
- `changeOrigin: true`: 修改请求头的 origin 为目标 URL
- `secure: false`: 允许转发到 HTTPS（即使证书有问题）
- `rewrite: (path) => path`: 保持原路径不变

**2. src/services/api.ts**

```typescript
// 开发环境使用代理，生产环境使用完整 URL
const API_BASE_URL = import.meta.env.DEV
  ? '' // 开发环境：baseURL 为空，直接访问 /api（会被代理）
  : (import.meta.env.VITE_API_BASE_URL || 'https://mastra-food-app.zengjx1998.workers.dev');
```

**工作流程：**

开发环境：
```
浏览器 -> http://localhost:3000/api/recipes
  ↓
Vite 代理拦截
  ↓
转发到 -> https://mastra-food-app.zengjx1998.workers.dev/api/recipes
  ↓
返回数据 -> 浏览器
```

生产环境：
```
浏览器 -> https://your-domain.com
  ↓
直接请求 -> https://mastra-food-app.zengjx1998.workers.dev/api/recipes
```

### 方案 2: 后端添加 CORS 头（推荐生产环境）

如果你有权限修改后端代码（food-eat 项目），可以在 Cloudflare Workers 中添加 CORS 响应头。

在你的 `food-eat` 项目中添加 CORS 中间件：

```typescript
// src/index.ts 或相应的入口文件

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*', // 生产环境建议指定具体域名
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}

export default {
  async fetch(request: Request): Promise<Response> {
    // 处理 OPTIONS 预检请求
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: corsHeaders(),
      });
    }

    // 处理实际请求
    try {
      const response = await handleRequest(request);

      // 添加 CORS 头到响应
      const headers = new Headers(response.headers);
      Object.entries(corsHeaders()).forEach(([key, value]) => {
        headers.set(key, value);
      });

      return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers,
      });
    } catch (error) {
      return new Response('Internal Server Error', { status: 500 });
    }
  },
};
```

**生产环境安全配置：**

```typescript
const ALLOWED_ORIGINS = [
  'https://your-frontend-domain.com',
  'https://www.your-frontend-domain.com',
];

function corsHeaders(origin: string) {
  const isAllowed = ALLOWED_ORIGINS.includes(origin);
  return {
    'Access-Control-Allow-Origin': isAllowed ? origin : ALLOWED_ORIGINS[0],
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400', // 24小时
  };
}
```

### 方案 3: 浏览器插件（仅用于临时测试）

⚠️ **不推荐用于开发或生产环境**

安装浏览器 CORS 插件（如 "Allow CORS"），临时禁用 CORS 检查。这种方法仅用于快速测试，不应作为长期解决方案。

## 使用说明

### 开发环境

1. 确保已安装依赖：
   ```bash
   npm install
   ```

2. 启动开发服务器：
   ```bash
   npm run dev
   ```

3. 访问 `http://localhost:3000`，现在应该可以正常调用 API 了

### 生产环境

生产环境部署到 Vercel、Netlify 等平台时：

1. 设置环境变量：
   ```
   VITE_API_BASE_URL=https://mastra-food-app.zengjx1998.workers.dev
   ```

2. 构建项目：
   ```bash
   npm run build
   ```

3. 如果后端已添加 CORS 头，前端可以直接访问
4. 如果后端没有 CORS 头，需要联系后端开发者添加

## 验证 CORS 配置

### 检查请求头

在浏览器开发者工具中查看网络请求：

**开发环境（使用代理）：**
```
Request URL: http://localhost:3000/api/recipes
Request Method: GET
```

**生产环境：**
```
Request URL: https://mastra-food-app.zengjx1998.workers.dev/api/recipes
Request Method: GET
```

### 检查响应头

如果后端正确配置了 CORS，响应头应包含：
```
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
Access-Control-Allow-Headers: Content-Type
```

## 常见问题

### Q1: 重启开发服务器后仍然报 CORS 错误

**解决方法：**
1. 清除浏览器缓存
2. 强制刷新页面（Ctrl/Cmd + Shift + R）
3. 检查 vite.config.ts 配置是否正确

### Q2: 生产环境出现 CORS 错误

**解决方法：**
1. 确认后端是否已添加 CORS 响应头
2. 检查环境变量 `VITE_API_BASE_URL` 是否正确配置
3. 联系后端开发者添加 CORS 支持

### Q3: Vite 代理不工作

**解决方法：**
1. 确认请求路径以 `/api` 开头
2. 检查 vite.config.ts 语法是否正确
3. 重启开发服务器：
   ```bash
   # Ctrl + C 停止
   npm run dev  # 重新启动
   ```

### Q4: OPTIONS 请求失败

这是浏览器的"预检请求"，后端需要正确处理 OPTIONS 方法。

**后端示例：**
```typescript
if (request.method === 'OPTIONS') {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
```

## 最佳实践

### 开发环境
✅ 使用 Vite 代理（已配置）
✅ 保持简单的配置
✅ 定期重启开发服务器

### 生产环境
✅ 后端添加 CORS 响应头
✅ 指定允许的域名（不使用 `*`）
✅ 设置合理的 `Access-Control-Max-Age`

### 安全建议
⚠️ 生产环境不要使用 `Access-Control-Allow-Origin: *`
⚠️ 验证请求来源
⚠️ 使用 HTTPS
⚠️ 实现请求频率限制

## 相关文档

- [MDN: CORS](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CORS)
- [Vite Proxy 配置](https://vitejs.dev/config/server-options.html#server-proxy)
- [Cloudflare Workers CORS](https://developers.cloudflare.com/workers/examples/cors-header-proxy/)

## 总结

当前项目已配置好 Vite 代理，开发环境的 CORS 问题已解决。如需部署到生产环境，建议：

1. ✅ 使用当前的代理配置进行开发
2. 🔄 联系后端团队在 `food-eat` 项目中添加 CORS 响应头
3. 🔄 部署后设置正确的环境变量

现在你可以正常开发了！🎉
