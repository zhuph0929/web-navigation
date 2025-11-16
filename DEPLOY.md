# 云服务器部署指南

## 快速部署（5 分钟）

### 1. SSH 连接到服务器
```bash
ssh root@你的服务器IP
# 例如：ssh root@120.26.186.168
```

### 2. 安装 Node.js
```bash
# 使用 NVM（推荐）
curl -fsSL https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bashrc
nvm install 16
nvm use 16

# 验证安装
node --version
npm --version
```

### 3. 部署应用
```bash
# 进入 /opt 目录
cd /opt

# 克隆项目
git clone https://github.com/zhuph0929/web-navigation.git
cd web-navigation

# 安装依赖
npm install --production

# 使用 PM2 启动应用
npm install -g pm2
pm2 start src/server.js --name "nav"
pm2 save
pm2 startup
```

### 4. 开放防火墙端口
```bash
# 查看防火墙状态
sudo ufw status

# 允许 3000 端口
sudo ufw allow 3000/tcp
sudo ufw reload

# 验证端口监听
netstat -tlnp | grep 3000
```

### 5. 访问应用
在浏览器中访问：
```
http://你的服务器IP:3000
```

---

## 管理应用

### 查看应用状态
```bash
pm2 status
```

### 查看应用日志
```bash
pm2 logs nav
```

### 重启应用
```bash
pm2 restart nav
```

### 停止应用
```bash
pm2 stop nav
```

---

## 更新应用

### 拉取最新代码
```bash
cd /opt/web-navigation
git pull
npm install
pm2 restart nav
```

---

## 常见问题

### Q: 连接超时（一直转圈）
A: 检查以下几点：
1. 防火墙是否开放了 3000 端口：`sudo ufw allow 3000/tcp`
2. 应用是否运行：`pm2 status`
3. 应用是否有错误：`pm2 logs nav`

### Q: 应用启动失败
A: 查看错误日志：
```bash
pm2 logs nav --lines 100
```

### Q: 如何完全卸载应用
A: 运行以下命令：
```bash
pm2 delete nav
pm2 save
rm -rf /opt/web-navigation
```

---

## 文件说明

- `src/server.js` - 后端服务（Node.js + Express）
- `public/` - 前端文件（HTML、CSS、JavaScript）
- `data/` - 数据存储目录

数据持久化位置：`/opt/web-navigation/data/navigation.json`

---

祝部署顺利！
