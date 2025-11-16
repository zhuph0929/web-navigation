# ⚡ 快速参考卡片

## 🚀 30 秒快速开始

### 运行应用（选择一个）

**Windows:**
```bash
start.bat
```

**Linux/Mac:**
```bash
./start.sh
```

**手动启动:**
```bash
npm install
npm start
```

**浏览器访问:**
```
http://localhost:3000
```

---

## 📋 核心功能快速操作

| 功能 | 操作 |
|------|------|
| 添加链接 | 点击"+ 添加导航" |
| 编辑链接 | 点击链接卡片的"编辑"按钮 |
| 删除链接 | 点击"删除"按钮 |
| 搜索链接 | 在搜索框输入关键词 |
| 删除分类 | 点击"删除分类"按钮 |

---

## 🌍 部署快速指南

### Vercel（最简单）

```bash
# 1. 推送到 GitHub
git init
git add .
git commit -m "Initial"
git push

# 2. 在 vercel.com 导入并部署
# 完成！
```

### 云服务器

```bash
# SSH 连接到服务器
ssh root@ip

# 安装 Node.js
curl -fsSL https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# 部署应用
git clone https://github.com/username/web-navigation.git
cd web-navigation
npm install
npm start

# 使用 PM2 保持运行
pm2 start src/server.js
```

### Docker

```bash
# 构建
docker build -t navigation .

# 运行
docker run -d -p 3000:3000 navigation
```

---

## 📞 常见命令

```bash
# 安装依赖
npm install

# 启动开发服务器
npm start

# 使用 PM2（需先装）
npm install -g pm2
pm2 start src/server.js

# 查看日志
npm start  # 或 pm2 logs

# 停止服务
Ctrl+C  # 或 pm2 stop all
```

---

## 🔗 重要链接

| 内容 | 链接 |
|------|------|
| 完整部署指南 | [QUICKSTART.md](./QUICKSTART.md) ⭐ |
| 详细部署文档 | [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) ⭐ |
| 项目总结 | [SUMMARY.md](./SUMMARY.md) |
| 项目指南 | [PROJECT_GUIDE.md](./PROJECT_GUIDE.md) |
| Node.js 下载 | https://nodejs.org/ |
| Vercel | https://vercel.com |
| GitHub | https://github.com |

---

## 📁 项目结构一览

```
public/          前端文件
├── index.html   页面
├── styles.css   样式
└── app.js       逻辑

src/
└── server.js    后端服务

data/            数据目录（自动创建）
└── navigation.json  数据

*.md             文档（6个）
package.json     配置
```

---

## 🐛 快速故障排除

| 问题 | 解决方案 |
|------|---------|
| npm: command not found | 安装 Node.js |
| Can't access localhost:3000 | 运行 `npm start` |
| 数据丢失 | 检查 data/ 目录 |
| 部署失败 | 查看部署日志 |

---

## ✅ 部署检查清单

部署完成后检查：

- [ ] 网站可访问
- [ ] 可以添加链接
- [ ] 可以搜索
- [ ] 可以删除
- [ ] 刷新数据存在
- [ ] 链接可以打开

---

## 🎯 下一步

1. 本地测试：`npm start` → http://localhost:3000
2. 选择部署方案：见 [QUICKSTART.md](./QUICKSTART.md)
3. 按步骤部署
4. 分享你的网站！

---

**需要帮助？查看 [QUICKSTART.md](./QUICKSTART.md) 了解详细信息。**
