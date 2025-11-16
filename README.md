# 网址导航网站

一个现代化、轻量级的网址导航应用，支持快速访问常用网站。

## 功能特性

- ✨ 现代化的 UI 设计，渐变背景和流畅动画
- 🔗 添加、编辑、删除链接和分类
- 🔍 实时搜索功能
- 💾 本地存储 + 服务器存储
- 📱 响应式设计，支持手机和平板
- 🎨 Emoji 图标支持
- 🚀 部署简单，支持多种部署方式

## 快速开始

### 1. 安装依赖
```bash
npm install
```

### 2. 启动开发服务器
```bash
npm start
```

访问 http://localhost:3000 即可使用。

## 部署

详见 [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)

支持以下部署方式：
- **Vercel**（免费，推荐）
- **云服务器**（阿里云、腾讯云等）
- **Docker**
- **传统服务器**（需要 Node.js）

## 项目结构

```
├── public/
│   ├── index.html      # 主页面
│   ├── styles.css      # 样式
│   └── app.js          # 前端逻辑
├── src/
│   └── server.js       # 后端服务
├── data/
│   └── navigation.json # 数据存储
└── package.json
```

## API 端点

```
GET    /api/navigation                        # 获取所有数据
POST   /api/navigation/link                   # 添加链接
PUT    /api/navigation/link/:categoryId/:linkId  # 更新链接
DELETE /api/navigation/link/:categoryId/:linkId  # 删除链接
DELETE /api/navigation/category/:categoryId      # 删除分类
```

## 技术栈

- Node.js + Express
- Vanilla JavaScript（无框架依赖）
- CSS3 Flexbox 和 Grid
- LocalStorage API

## License

MIT
