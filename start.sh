#!/bin/bash

# 网址导航应用启动脚本 (Linux/Mac)

echo ""
echo "=========================================="
echo "   网址导航应用启动向导"
echo "=========================================="
echo ""

# 检查 Node.js
if ! command -v node &> /dev/null
then
    echo "❌ 未检测到 Node.js"
    echo "请访问 https://nodejs.org/ 下载并安装 Node.js"
    echo ""
    exit 1
fi

echo "✅ 检测到 Node.js:"
node --version

# 检查 npm
if ! command -v npm &> /dev/null
then
    echo "❌ npm 不可用"
    exit 1
fi

echo "✅ npm 版本:"
npm --version
echo ""

# 检查 node_modules
if [ ! -d "node_modules" ]; then
    echo "📦 首次运行，正在安装依赖..."
    npm install
    if [ $? -ne 0 ]; then
        echo "❌ 依赖安装失败"
        exit 1
    fi
else
    echo "✅ 依赖已安装"
fi

echo ""
echo "🚀 启动应用..."
echo ""

# 启动应用
npm start
