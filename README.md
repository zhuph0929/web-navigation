# 网址导航网站

一个现代化、轻量级的网址导航应用，支持快速访问常用网站。

## 功能特性

- ✨ 现代化的 UI 设计，渐变背景和流畅动画
- 🔗 添加、编辑、删除链接和分类
- 🔍 实时搜索功能
- 📱 响应式设计，支持手机和平板
- 🎨 Emoji 图标支持
- 🔐 密码保护，管理员认证（密码：admin123）

## 云服务器部署

支持部署到阿里云、腾讯云、华为云等任何 Linux 云服务器。

### 前置准备

1. **购买云服务器**
   - 推荐配置：2 核 CPU，2GB 内存，50GB 硬盘
   - 系统：Ubuntu 20.04 LTS 或 CentOS 7+
   - 预留 3000 端口

2. **配置安全组/防火墙**
   ```
   开放端口：
   - 3000（应用端口）
   - 22（SSH 远程连接）
   - 80（HTTP）
   - 443（HTTPS）
   ```

### 部署步骤

#### Step 1: SSH 连接到服务器
```bash
ssh -i your-key.pem ubuntu@your-server-ip
# 或使用密码登录
ssh ubuntu@your-server-ip
```

#### Step 2: 安装 Node.js
```bash
# 更新系统
sudo apt update && sudo apt upgrade -y

# 安装 Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# 验证
node --version
npm --version
```

#### Step 3: 上传或克隆项目
```bash
# 方法 A: 从 GitHub 克隆
cd /home/ubuntu
git clone https://github.com/你的用户名/web-navigation.git
cd web-navigation

# 方法 B: 上传本地文件（本地机器执行）
scp -r ./myfirstweb ubuntu@your-server-ip:/home/ubuntu/
```

#### Step 4: 安装依赖
```bash
npm install
```

#### Step 5: 使用 PM2 运行应用

```bash
# 安装 PM2
sudo npm install -g pm2

# 启动应用
pm2 start src/server.js --name "web-navigation"

# 开机自启
pm2 startup
pm2 save

# 查看状态
pm2 status
pm2 logs web-navigation
```

#### Step 6: 配置 Nginx 反向代理

```bash
# 安装 Nginx
sudo apt install -y nginx

# 编辑配置
sudo nano /etc/nginx/sites-available/web-navigation
```

**粘贴以下配置：**
```nginx
server {
    listen 80;
    server_name _;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

**启用配置：**
```bash
sudo ln -s /etc/nginx/sites-available/web-navigation /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl restart nginx
```

#### Step 7: 配置 HTTPS（可选）

```bash
# 安装 Certbot
sudo apt install -y certbot python3-certbot-nginx

# 申请免费证书
sudo certbot --nginx -d your-domain.com

# 自动续期
sudo systemctl enable certbot.timer
sudo systemctl start certbot.timer
```

### 一键部署脚本

保存为 `deploy.sh`，在服务器上执行 `bash deploy.sh`：

```bash
#!/bin/bash
set -e

echo "=== 网址导航应用一键部署 ==="

# 系统更新
echo "1. 更新系统..."
sudo apt update && sudo apt upgrade -y

# 安装 Node.js
echo "2. 安装 Node.js..."
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# 克隆项目
echo "3. 克隆项目..."
cd /home/ubuntu
git clone https://github.com/你的用户名/web-navigation.git
cd web-navigation

# 安装依赖
echo "4. 安装依赖..."
npm install

# PM2 设置
echo "5. 配置 PM2..."
sudo npm install -g pm2
pm2 start src/server.js --name "web-navigation"
pm2 startup
pm2 save

# Nginx 配置
echo "6. 配置 Nginx..."
sudo apt install -y nginx
sudo tee /etc/nginx/sites-available/web-navigation > /dev/null <<'EOF'
server {
    listen 80;
    server_name _;
    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
EOF

sudo ln -sf /etc/nginx/sites-available/web-navigation /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl restart nginx

echo "✅ 部署完成！"
echo "📍 访问地址：http://your-server-ip"
echo "🔐 默认密码：admin123（请修改）"
echo ""
echo "常用命令："
echo "  pm2 status              # 查看状态"
echo "  pm2 logs web-navigation # 查看日志"
echo "  pm2 restart web-navigation # 重启应用"
```

## 常见问题

### 修改管理员密码
编辑 `public/app.js`，搜索 `adminPassword`：
```javascript
this.adminPassword = 'your-new-password';
```

### 备份数据
```bash
cp data/navigation.json data/navigation.json.backup
```

### 故障排查
```bash
# 查看应用状态
pm2 status

# 查看错误日志
pm2 logs web-navigation

# 查看 Nginx 状态
sudo systemctl status nginx
sudo nginx -t

# 检查端口
sudo netstat -tulpn | grep 3000
```

## 项目结构

```
├── public/           # 前端文件
│   ├── index.html   # 主页
│   ├── app.js       # 逻辑
│   └── styles.css   # 样式
├── src/
│   └── server.js    # 后端服务
├── data/            # 数据存储
├── package.json
└── README.md
```

## License

MIT
