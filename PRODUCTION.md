# 生产环境配置指南

## 环境变量配置

创建 `.env` 文件：
```bash
# 服务器配置
PORT=3000
NODE_ENV=production

# 数据配置
DATA_DIR=./data

# 日志配置
LOG_LEVEL=info
```

## 性能优化

### 1. 启用 Gzip 压缩
在 `src/server.js` 中添加：
```javascript
const compression = require('compression');
app.use(compression());
```

### 2. 启用 HTTP 缓存
```javascript
app.use(express.static(path.join(__dirname, '../public'), {
    maxAge: '1d',
    etag: false
}));
```

### 3. 限制请求频率
```javascript
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
});
app.use(limiter);
```

## 安全配置

### 1. 启用 CORS 白名单
```javascript
const corsOptions = {
    origin: process.env.ALLOWED_ORIGINS?.split(',') || '*',
    credentials: true
};
app.use(cors(corsOptions));
```

### 2. 添加安全响应头
```javascript
const helmet = require('helmet');
app.use(helmet());
```

### 3. 验证输入数据
```javascript
const { validateURL } = require('url-validator');
// 在添加链接前验证 URL
```

## 监控和日志

### 使用 Winston 日志库
```javascript
const winston = require('winston');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' })
    ]
});
```

### 使用 PM2 监控
```bash
pm2 monit
pm2 logs
pm2 status
```

## 数据库迁移方案

### 迁移到 MongoDB
```javascript
const mongoose = require('mongoose');

const linkSchema = new mongoose.Schema({
    categoryId: Number,
    linkId: Number,
    name: String,
    url: String,
    icon: String,
    createdAt: Date
});

const Link = mongoose.model('Link', linkSchema);
```

### 迁移到 PostgreSQL
```javascript
const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});
```

## 备份策略

### 自动每日备份
```bash
#!/bin/bash
# backup.sh
BACKUP_DIR="/backups/navigation"
mkdir -p $BACKUP_DIR
cp -r /app/data $BACKUP_DIR/data-$(date +%Y%m%d)
```

计划任务（Cron）：
```
0 2 * * * /scripts/backup.sh
```

## CI/CD 配置

### GitHub Actions 示例
```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '16'
      - run: npm install
      - run: npm test
      - run: npm run build
      - name: Deploy to Vercel
        run: npx vercel --prod
```

## 扩展功能实现

### 添加数据库存储
见 `docs/database-setup.md`

### 添加用户认证
见 `docs/authentication.md`

### 添加数据统计
见 `docs/analytics.md`

---

详见项目文档获取更多信息。
