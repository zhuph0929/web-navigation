# 网址导航网站 - 部署指南

## 项目介绍

这是一个现代化的网址导航网站，支持添加、编辑、删除链接和分类，数据可持久化存储。

## 功能特性

✨ **核心功能**
- 快速访问常用网站
- 按分类组织链接
- 添加/编辑/删除链接和分类
- 搜索功能（前端）
- 本地存储 + 服务器存储

🎨 **用户体验**
- 现代化的渐变设计
- 响应式布局，支持移动设备
- 流畅的动画和交互
- Emoji 图标支持

## 项目结构

```
myfirstweb/
├── public/                    # 前端文件
│   ├── index.html            # 主页面
│   ├── styles.css            # 样式文件
│   └── app.js                # 前端逻辑
├── src/
│   └── server.js             # Express 后端服务
├── data/                      # 数据文件（自动创建）
│   └── navigation.json       # 持久化数据
└── package.json              # 项目配置
```

## 快速开始

### 本地运行

#### 1. 安装依赖
```bash
cd myfirstweb
npm install
```

#### 2. 启动服务器
```bash
npm start
```

服务器将在 `http://localhost:3000` 启动。

### 使用应用

1. **添加导航链接**
   - 点击"+ 添加导航"按钮
   - 填写分类名称、链接名称、链接地址和图标
   - 点击"保存"

2. **搜索链接**
   - 在搜索框输入关键词
   - 实时显示匹配的链接

3. **编辑链接**
   - 点击链接卡片上的"编辑"按钮
   - 修改信息后点击"保存"

4. **删除链接**
   - 点击"删除"按钮删除单个链接
   - 点击"删除分类"删除整个分类及其所有链接

## 部署到服务器

### 方案 1: 使用 Vercel（推荐 - 免费）

1. **准备代码**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. **上传到 GitHub**
   - 在 GitHub 创建新仓库
   - 推送代码：
   ```bash
   git remote add origin https://github.com/your-username/your-repo.git
   git push -u origin main
   ```

3. **部署到 Vercel**
   - 访问 https://vercel.com
   - 用 GitHub 账户登录
   - 选择导入 GitHub 仓库
   - 选择 Node.js 运行时
   - 点击"Deploy"

4. **自定义域名（可选）**
   - 在 Vercel 项目设置中配置域名

### 方案 2: 使用云服务器（如阿里云、腾讯云）

#### 准备服务器
- 购买云服务器（推荐 Linux，如 Ubuntu 20.04+）
- SSH 连接到服务器

#### 安装 Node.js
```bash
# 使用 nvm（推荐）
curl -fsSL https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install 16
nvm use 16

# 或直接安装
sudo apt update
sudo apt install nodejs npm
```

#### 部署应用
```bash
# 克隆项目
git clone https://github.com/your-username/your-repo.git
cd myfirstweb

# 安装依赖
npm install --production

# 启动应用
npm start

# 使用 PM2 保持运行（推荐）
npm install -g pm2
pm2 start src/server.js --name "navigation"
pm2 save
pm2 startup
```

#### 配置 Nginx 反向代理
创建 `/etc/nginx/sites-available/navigation` 文件：
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

启用配置：
```bash
sudo ln -s /etc/nginx/sites-available/navigation /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

#### 配置 SSL（HTTPS）
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

### 方案 3: 使用 Docker

创建 `Dockerfile`：
```dockerfile
FROM node:16-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
```

构建和运行：
```bash
docker build -t navigation:latest .
docker run -d -p 3000:3000 --name navigation navigation:latest
```

## 环境变量配置

创建 `.env` 文件（可选）：
```
PORT=3000
NODE_ENV=production
```

## API 文档

### 获取所有数据
```
GET /api/navigation
返回：{ categories: [...] }
```

### 添加链接
```
POST /api/navigation/link
请求体：{
  categoryName: "string",
  linkName: "string",
  linkUrl: "string",
  linkIcon: "string"
}
```

### 删除链接
```
DELETE /api/navigation/link/:categoryId/:linkId
```

### 删除分类
```
DELETE /api/navigation/category/:categoryId
```

### 更新链接
```
PUT /api/navigation/link/:categoryId/:linkId
请求体：{
  linkName: "string",
  linkUrl: "string",
  linkIcon: "string"
}
```

## 数据持久化

应用使用两种方式存储数据：

1. **前端本地存储**（LocalStorage）
   - 用于快速响应和离线访问
   - 仅在本浏览器有效

2. **服务器端存储**（JSON 文件）
   - 存储在 `data/navigation.json`
   - 多用户共享数据
   - 持久化保存

## 常见问题

### Q: 如何修改默认链接？
A: 编辑 `src/server.js` 中的 `defaultData` 对象，或直接修改 `data/navigation.json`。

### Q: 如何更改端口号？
A: 设置环境变量 `PORT=8080` 或修改 `src/server.js` 中的 PORT 值。

### Q: 如何备份数据？
A: 备份 `data/navigation.json` 文件即可。

### Q: 支持多用户登录吗？
A: 当前版本所有用户共享同一份数据。如需用户系统，可添加数据库和身份验证。

## 扩展功能建议

- [ ] 添加数据库支持（MongoDB/PostgreSQL）
- [ ] 用户登录和权限管理
- [ ] 导入导出功能
- [ ] 链接访问统计
- [ ] 夜间模式
- [ ] 多语言支持
- [ ] 链接分享功能

## 技术栈

- **前端**：HTML5, CSS3, Vanilla JavaScript
- **后端**：Node.js, Express
- **存储**：JSON 文件
- **部署**：Vercel, Docker, Linux 服务器

## 许可证

MIT License

## 支持

有问题？欢迎提交 Issue 或 PR！
