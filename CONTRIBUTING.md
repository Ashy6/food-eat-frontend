# 贡献指南

感谢您考虑为 Food Eat Frontend 做出贡献！

## 开发流程

### 1. Fork 项目

点击 GitHub 页面右上角的 "Fork" 按钮。

### 2. 克隆仓库

```bash
git clone https://github.com/YOUR_USERNAME/food-eat-frontend.git
cd food-eat-frontend
```

### 3. 安装依赖

```bash
npm install
```

### 4. 创建分支

```bash
git checkout -b feature/your-feature-name
# 或
git checkout -b fix/your-bug-fix
```

### 5. 开发

```bash
npm run dev
```

### 6. 提交更改

```bash
git add .
git commit -m "feat: add your feature description"
```

### 提交信息规范

遵循 [Conventional Commits](https://www.conventionalcommits.org/) 规范：

- `feat:` 新功能
- `fix:` 修复 bug
- `docs:` 文档更新
- `style:` 代码格式调整
- `refactor:` 代码重构
- `test:` 测试相关
- `chore:` 构建/工具相关

示例：
```
feat: add recipe favorite feature
fix: resolve API timeout issue
docs: update README installation steps
```

### 7. 推送并创建 Pull Request

```bash
git push origin feature/your-feature-name
```

然后在 GitHub 上创建 Pull Request。

## 代码规范

### TypeScript

- 使用严格模式
- 为所有函数参数和返回值添加类型
- 避免使用 `any` 类型

### React

- 使用函数组件和 Hooks
- 使用有意义的组件命名
- 保持组件单一职责

### 样式

- 使用 CSS Modules 或独立的 CSS 文件
- 遵循 BEM 命名规范
- 使用 CSS 变量定义颜色和尺寸

### 文件命名

- 组件：`PascalCase.tsx`
- 工具函数：`camelCase.ts`
- 样式：`PascalCase.css`
- Hooks：`useSomething.ts`

## 项目结构约定

```text
src/
├── components/     # UI 组件
├── hooks/          # 自定义 Hooks
├── services/       # API 服务
├── types/          # TypeScript 类型
├── styles/         # 全局样式
└── utils/          # 工具函数
```

## 测试

（待添加测试框架后更新）

```bash
# 运行测试
npm test

# 运行测试覆盖率
npm run test:coverage
```

## 代码检查

```bash
# 运行 ESLint
npm run lint

# 自动修复
npm run lint:fix
```

## Pull Request 检查清单

提交 PR 前确保：

- [ ] 代码遵循项目规范
- [ ] 所有测试通过
- [ ] 添加了必要的文档
- [ ] 提交信息清晰明了
- [ ] 没有合并冲突
- [ ] 功能在多个浏览器测试
- [ ] 响应式设计正常

## 报告 Bug

使用 GitHub Issues 报告 bug，请包含：

1. 问题描述
2. 复现步骤
3. 预期行为
4. 实际行为
5. 环境信息（浏览器、操作系统等）
6. 截图（如适用）

## 功能建议

使用 GitHub Issues 提交功能建议，请包含：

1. 功能描述
2. 使用场景
3. 预期效果
4. 可能的实现方案

## 社区准则

- 尊重所有贡献者
- 保持友好和专业
- 接受建设性批评
- 关注项目最佳利益

## 获取帮助

如有问题，可以：

- 查看 [README](README.md)
- 查看 [部署指南](DEPLOY.md)
- 提交 [GitHub Issue](https://github.com/Ashy6/food-eat-frontend/issues)

感谢您的贡献！
