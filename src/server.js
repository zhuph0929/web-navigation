const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// 中间件
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public')));

// 数据文件路径
const dataFile = path.join(__dirname, '../data/navigation.json');

// 确保数据目录存在
const dataDir = path.dirname(dataFile);
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
}

// 默认数据
const defaultData = {
    categories: [
        {
            id: 1,
            name: '搜索引擎',
            links: [
                { id: 1, name: 'Google', url: 'https://www.google.com', icon: '🔍' },
                { id: 2, name: '百度', url: 'https://www.baidu.com', icon: '🎯' },
                { id: 3, name: 'Bing', url: 'https://www.bing.com', icon: '🌐' }
            ]
        },
        {
            id: 2,
            name: '开发工具',
            links: [
                { id: 4, name: 'GitHub', url: 'https://github.com', icon: '🐙' },
                { id: 5, name: 'Stack Overflow', url: 'https://stackoverflow.com', icon: '📚' },
                { id: 6, name: 'MDN Web Docs', url: 'https://developer.mozilla.org', icon: '📖' }
            ]
        },
        {
            id: 3,
            name: '社交媒体',
            links: [
                { id: 7, name: '微博', url: 'https://weibo.com', icon: '💬' },
                { id: 8, name: '抖音', url: 'https://www.douyin.com', icon: '🎵' },
                { id: 9, name: 'Twitter', url: 'https://twitter.com', icon: '🐦' }
            ]
        }
    ]
};

// 读取数据
function readData() {
    try {
        if (fs.existsSync(dataFile)) {
            const data = fs.readFileSync(dataFile, 'utf8');
            return JSON.parse(data);
        }
    } catch (error) {
        console.error('Error reading data file:', error);
    }
    return defaultData;
}

// 写入数据
function writeData(data) {
    try {
        fs.writeFileSync(dataFile, JSON.stringify(data, null, 2), 'utf8');
        return true;
    } catch (error) {
        console.error('Error writing data file:', error);
        return false;
    }
}

// API 路由

// 获取所有分类和链接
app.get('/api/navigation', (req, res) => {
    const data = readData();
    res.json(data);
});

// 添加新链接
app.post('/api/navigation/link', (req, res) => {
    const { categoryName, linkName, linkUrl, linkIcon } = req.body;

    if (!categoryName || !linkName || !linkUrl) {
        return res.status(400).json({ error: '缺少必填项' });
    }

    const data = readData();
    let category = data.categories.find(c => c.name === categoryName);

    if (!category) {
        const newId = Math.max(0, ...data.categories.map(c => c.id)) + 1;
        category = {
            id: newId,
            name: categoryName,
            links: []
        };
        data.categories.push(category);
    }

    const newLinkId = Math.max(0, ...category.links.map(l => l.id)) + 1;
    category.links.push({
        id: newLinkId,
        name: linkName,
        url: linkUrl,
        icon: linkIcon || '🔗'
    });

    if (writeData(data)) {
        res.json({ success: true, message: '链接添加成功' });
    } else {
        res.status(500).json({ error: '保存失败' });
    }
});

// 删除链接
app.delete('/api/navigation/link/:categoryId/:linkId', (req, res) => {
    const { categoryId, linkId } = req.params;
    const data = readData();
    const category = data.categories.find(c => c.id === parseInt(categoryId));

    if (!category) {
        return res.status(404).json({ error: '分类不存在' });
    }

    category.links = category.links.filter(l => l.id !== parseInt(linkId));

    if (category.links.length === 0) {
        data.categories = data.categories.filter(c => c.id !== parseInt(categoryId));
    }

    if (writeData(data)) {
        res.json({ success: true, message: '链接删除成功' });
    } else {
        res.status(500).json({ error: '删除失败' });
    }
});

// 删除分类
app.delete('/api/navigation/category/:categoryId', (req, res) => {
    const { categoryId } = req.params;
    const data = readData();
    data.categories = data.categories.filter(c => c.id !== parseInt(categoryId));

    if (writeData(data)) {
        res.json({ success: true, message: '分类删除成功' });
    } else {
        res.status(500).json({ error: '删除失败' });
    }
});

// 更新链接
app.put('/api/navigation/link/:categoryId/:linkId', (req, res) => {
    const { categoryId, linkId } = req.params;
    const { linkName, linkUrl, linkIcon } = req.body;
    const data = readData();
    const category = data.categories.find(c => c.id === parseInt(categoryId));

    if (!category) {
        return res.status(404).json({ error: '分类不存在' });
    }

    const link = category.links.find(l => l.id === parseInt(linkId));
    if (!link) {
        return res.status(404).json({ error: '链接不存在' });
    }

    if (linkName) link.name = linkName;
    if (linkUrl) link.url = linkUrl;
    if (linkIcon) link.icon = linkIcon;

    if (writeData(data)) {
        res.json({ success: true, message: '链接更新成功' });
    } else {
        res.status(500).json({ error: '更新失败' });
    }
});

// 根目录重定向
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

// 启动服务器
app.listen(PORT, () => {
    console.log(`网址导航应用已启动！`);
    console.log(`访问地址: http://localhost:${PORT}`);
    console.log(`\nAPI 端点:`);
    console.log(`  GET  /api/navigation - 获取所有数据`);
    console.log(`  POST /api/navigation/link - 添加链接`);
    console.log(`  DELETE /api/navigation/link/:categoryId/:linkId - 删除链接`);
    console.log(`  DELETE /api/navigation/category/:categoryId - 删除分类`);
    console.log(`  PUT /api/navigation/link/:categoryId/:linkId - 更新链接`);
});

module.exports = app;
