// 数据管理
class NavigationManager {
    constructor() {
        this.data = this.loadData();
    }

    loadData() {
        const saved = localStorage.getItem('navigationData');
        return saved ? JSON.parse(saved) : this.getDefaultData();
    }

    saveData() {
        localStorage.setItem('navigationData', JSON.stringify(this.data));
    }

    getDefaultData() {
        return {
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
    }

    addLink(categoryName, linkName, linkUrl, linkIcon) {
        let category = this.data.categories.find(c => c.name === categoryName);
        
        if (!category) {
            const newId = Math.max(0, ...this.data.categories.map(c => c.id)) + 1;
            category = {
                id: newId,
                name: categoryName,
                links: []
            };
            this.data.categories.push(category);
        }

        const newLinkId = Math.max(0, ...category.links.map(l => l.id)) + 1;
        category.links.push({
            id: newLinkId,
            name: linkName,
            url: linkUrl,
            icon: linkIcon
        });

        this.saveData();
    }

    deleteLink(categoryId, linkId) {
        const category = this.data.categories.find(c => c.id === categoryId);
        if (category) {
            category.links = category.links.filter(l => l.id !== linkId);
            if (category.links.length === 0) {
                this.data.categories = this.data.categories.filter(c => c.id !== categoryId);
            }
            this.saveData();
        }
    }

    deleteCategory(categoryId) {
        this.data.categories = this.data.categories.filter(c => c.id !== categoryId);
        this.saveData();
    }

    updateLink(categoryId, linkId, updates) {
        const category = this.data.categories.find(c => c.id === categoryId);
        if (category) {
            const link = category.links.find(l => l.id === linkId);
            if (link) {
                Object.assign(link, updates);
                this.saveData();
            }
        }
    }

    searchLinks(query) {
        if (!query.trim()) {
            return this.data.categories;
        }

        const q = query.toLowerCase();
        return this.data.categories
            .map(category => ({
                ...category,
                links: category.links.filter(link =>
                    link.name.toLowerCase().includes(q) ||
                    link.url.toLowerCase().includes(q)
                )
            }))
            .filter(category => category.links.length > 0);
    }
}

// 全局变量
const manager = new NavigationManager();
let editingLink = null;

// 初始化
document.addEventListener('DOMContentLoaded', function() {
    renderCategories();
    
    document.getElementById('linkForm').addEventListener('submit', handleFormSubmit);
    document.getElementById('searchInput').addEventListener('input', handleSearch);
    
    // 点击模态框外部关闭
    document.getElementById('addModal').addEventListener('click', function(e) {
        if (e.target === this) {
            closeModal();
        }
    });
});

// 渲染分类和链接
function renderCategories() {
    const container = document.getElementById('categoriesContainer');
    const categories = manager.data.categories;

    if (categories.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <p>还没有添加任何导航链接</p>
                <button class="btn btn-primary" onclick="showAddModal()">立即添加</button>
            </div>
        `;
        return;
    }

    container.innerHTML = categories.map(category => `
        <div class="category">
            <div class="category-title">
                <span>${category.name}</span>
                <div class="category-actions">
                    <button class="btn btn-danger" onclick="deleteCategory(${category.id})">删除分类</button>
                </div>
            </div>
            <div class="links-list">
                ${category.links.map(link => `
                    <div class="link-item">
                        <a href="${link.url}" target="_blank" class="link-content">
                            <span class="link-icon">${link.icon}</span>
                            <span class="link-name">${link.name}</span>
                        </a>
                        <div class="link-actions">
                            <button class="btn btn-edit" onclick="editLink(${category.id}, ${link.id})">编辑</button>
                            <button class="btn btn-danger" onclick="deleteLink(${category.id}, ${link.id})">删除</button>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `).join('');
}

// 显示添加模态框
function showAddModal() {
    editingLink = null;
    document.getElementById('linkForm').reset();
    document.getElementById('linkIcon').value = '🔗';
    document.getElementById('addModal').classList.add('show');
}

// 编辑链接
function editLink(categoryId, linkId) {
    const category = manager.data.categories.find(c => c.id === categoryId);
    if (!category) return;
    
    const link = category.links.find(l => l.id === linkId);
    if (!link) return;

    editingLink = { categoryId, linkId };
    document.getElementById('category').value = category.name;
    document.getElementById('linkName').value = link.name;
    document.getElementById('linkUrl').value = link.url;
    document.getElementById('linkIcon').value = link.icon;
    document.getElementById('addModal').classList.add('show');
}

// 关闭模态框
function closeModal() {
    document.getElementById('addModal').classList.remove('show');
    editingLink = null;
}

// 处理表单提交
function handleFormSubmit(e) {
    e.preventDefault();

    const category = document.getElementById('category').value.trim();
    const linkName = document.getElementById('linkName').value.trim();
    const linkUrl = document.getElementById('linkUrl').value.trim();
    const linkIcon = document.getElementById('linkIcon').value.trim() || '🔗';

    if (!category || !linkName || !linkUrl) {
        alert('请填写所有必填项');
        return;
    }

    if (editingLink) {
        // 编辑模式
        const { categoryId, linkId } = editingLink;
        const oldCategory = manager.data.categories.find(c => c.id === categoryId);
        
        if (oldCategory.name !== category) {
            // 分类名称改变，需要删除旧链接并添加新链接
            manager.deleteLink(categoryId, linkId);
            manager.addLink(category, linkName, linkUrl, linkIcon);
        } else {
            // 只更新链接信息
            manager.updateLink(categoryId, linkId, {
                name: linkName,
                url: linkUrl,
                icon: linkIcon
            });
        }
    } else {
        // 添加新链接
        manager.addLink(category, linkName, linkUrl, linkIcon);
    }

    renderCategories();
    closeModal();
    document.getElementById('searchInput').value = '';
}

// 删除链接
function deleteLink(categoryId, linkId) {
    if (confirm('确定要删除这个链接吗？')) {
        manager.deleteLink(categoryId, linkId);
        renderCategories();
    }
}

// 删除分类
function deleteCategory(categoryId) {
    if (confirm('确定要删除整个分类及其所有链接吗？')) {
        manager.deleteCategory(categoryId);
        renderCategories();
    }
}

// 处理搜索
function handleSearch(e) {
    const query = e.target.value;
    const container = document.getElementById('categoriesContainer');
    const results = manager.searchLinks(query);

    if (results.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <p>没有找到匹配的链接</p>
            </div>
        `;
        return;
    }

    container.innerHTML = results.map(category => `
        <div class="category">
            <div class="category-title">
                <span>${category.name}</span>
                <div class="category-actions">
                    <button class="btn btn-danger" onclick="deleteCategory(${category.id})">删除分类</button>
                </div>
            </div>
            <div class="links-list">
                ${category.links.map(link => `
                    <div class="link-item">
                        <a href="${link.url}" target="_blank" class="link-content">
                            <span class="link-icon">${link.icon}</span>
                            <span class="link-name">${link.name}</span>
                        </a>
                        <div class="link-actions">
                            <button class="btn btn-edit" onclick="editLink(${category.id}, ${link.id})">编辑</button>
                            <button class="btn btn-danger" onclick="deleteLink(${category.id}, ${link.id})">删除</button>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `).join('');
}
