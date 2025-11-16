# 🚀 快速启动指南

## ⚠️ 前置要求

在启动项目之前，确保你的系统已安装以下软件：

### 1. 安装 Node.js

访问 https://nodejs.org/ 并下载 LTS 版本（推荐 v16 或更新版本）

**验证安装**
```bash
node --version
npm --version
```

## 📦 本地开发

### 步骤 1: 安装依赖
```bash
cd d:\Code\myfirstweb
npm install
```

### 步骤 2: 启动服务器
```bash
npm start
```

你将看到类似的输出：
```
✨ 网址导航应用已启动！
📍 访问地址: http://localhost:3000
```

### 步骤 3: 打开浏览器
访问 http://localhost:3000

## 🌍 部署到线上

### 部署选项对比

| 方案 | 难度 | 成本 | 优点 | 缺点 |
|------|------|------|------|------|
| Vercel | ⭐ | 免费 | 自动化，支持无服务器，CDN 加速 | 功能有限制 |
| 云服务器 | ⭐⭐⭐ | ¥/月 | 完全控制，可扩展性强 | 需要运维知识 |
| Docker | ⭐⭐ | 中等 | 容器化，可移植性强 | 需要理解 Docker |

---

## 方案 1️⃣: Vercel 部署（推荐 - 最简单）

### 步骤 1: 准备 Git 仓库
```bash
cd d:\Code\myfirstweb
git init
git add .
git commit -m "Initial commit: Navigation website"
```

### 步骤 2: 上传到 GitHub

1. 访问 https://github.com/new 创建新仓库
2. 仓库名称：`web-navigation` （可自定义）
3. 不要勾选"Initialize this repository"
4. 点击"Create repository"

在本地推送代码：
```bash
git remote add origin https://github.com/你的用户名/web-navigation.git
git branch -M main
git push -u origin main
```

### 步骤 3: 部署到 Vercel

1. 访问 https://vercel.com
2. 点击"Sign Up"，选择"Continue with GitHub"
3. 授权 Vercel 访问你的 GitHub 账户
4. 点击"New Project"
5. 选择刚才创建的 `web-navigation` 仓库
6. **重要**：设置环境变量（如需要）
7. 点击"Deploy"

部署完成后，你会获得一个自动生成的 URL，例如：
```
https://web-navigation-xxx.vercel.app
```

### 绑定自定义域名（可选）
在 Vercel 项目设置 → Domains 中添加你的域名。

---

## 方案 2️⃣: 云服务器部署

适用：阿里云、腾讯云、华为云、DigitalOcean 等

### 购买服务器
推荐配置：
- 系统：Ubuntu 20.04 LTS 或 CentOS 8
- CPU：1 核
- 内存：1GB+
- 带宽：1Mbps+
- 存储：20GB+

### 步骤 1: SSH 连接到服务器
```bash
ssh root@你的服务器IP
```

### 步骤 2: 安装 Node.js

使用 NVM（推荐）：
```bash
curl -fsSL https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bashrc
nvm install 16
nvm use 16
node --version
```

或直接安装：
```bash
apt update
apt install nodejs npm
```

### 步骤 3: 克隆和部署项目
```bash
cd /opt
git clone https://github.com/你的用户名/web-navigation.git
cd web-navigation
npm install --production
```

### 步骤 4: 使用 PM2 保持运行
```bash
npm install -g pm2
pm2 start src/server.js --name "navigation"
pm2 save
pm2 startup
```

### 步骤 5: 配置 Nginx 反向代理

创建配置文件：
```bash
sudo nano /etc/nginx/sites-available/navigation
```

输入以下内容：
```nginx
server {
    listen 80;
    server_name 你的域名;

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

保存后：
```bash
sudo ln -s /etc/nginx/sites-available/navigation /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### 步骤 6: 配置 HTTPS（可选但推荐）
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d 你的域名
```

---

## 方案 3️⃣: Docker 部署

### 步骤 1: 安装 Docker

参考官方文档：https://docs.docker.com/get-docker/

### 步骤 2: 构建镜像
```bash
cd d:\Code\myfirstweb
docker build -t web-navigation:latest .
```

### 步骤 3: 运行容器
```bash
docker run -d -p 3000:3000 --name navigation web-navigation:latest
```

访问 http://localhost:3000

### 步骤 4: 使用 Docker Compose（推荐）
```bash
docker-compose up -d
```

查看日志：
```bash
docker-compose logs -f
```

---

## ✅ 部署验证清单

部署完成后，验证以下功能：

- [ ] 网站可访问
- [ ] 可以添加导航链接
- [ ] 可以搜索链接
- [ ] 可以删除链接
- [ ] 刷新页面数据仍然存在（数据持久化）
- [ ] 所有链接可以正常打开

## 📝 常见部署问题

### Q: 访问网站出现 404 错误
**A:** 确认服务器正在运行，并检查防火墙是否开放了相应端口。

### Q: 数据保存后刷新丢失
**A:** 检查服务器是否有权限访问 `data/` 目录。确保目录存在且可写。

### Q: Vercel 部署失败
**A:** 查看部署日志，通常是因为 `package.json` 配置错误。确认 Node.js 版本兼容。

### Q: 云服务器访问很慢
**A:** 检查 CDN 设置和网络带宽。可以使用国内 CDN 加速。

## 🔧 维护与更新

### 更新应用代码
```bash
# 云服务器
cd /opt/web-navigation
git pull
npm install
pm2 restart navigation

# Docker
docker-compose pull
docker-compose up -d
```

### 备份数据
```bash
# 备份 data 目录
cp -r data/ data.backup/

# 或使用云存储同步
```

---

## 📚 更多资源

- [Vercel 官方文档](https://vercel.com/docs)
- [PM2 使用指南](https://pm2.keymetrics.io/)
- [Nginx 配置指南](https://nginx.org/en/docs/)
- [Docker 官方文档](https://docs.docker.com/)
- [阿里云部署指南](https://help.aliyun.com/)

---

有问题？欢迎提交 GitHub Issues 或查看 [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) 了解更多详情。
