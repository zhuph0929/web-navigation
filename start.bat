@echo off
REM 网址导航应用启动脚本 (Windows)

echo.
echo ==========================================
echo   网址导航应用启动向导
echo ==========================================
echo.

REM 检查 Node.js
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ 未检测到 Node.js
    echo 请访问 https://nodejs.org/ 下载并安装 Node.js
    echo.
    pause
    exit /b 1
)

echo ✅ 检测到 Node.js: 
node --version

REM 检查 npm
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ npm 不可用
    pause
    exit /b 1
)

echo ✅ npm 版本:
npm --version
echo.

REM 检查 node_modules
if not exist "node_modules" (
    echo 📦 首次运行，正在安装依赖...
    call npm install
    if %errorlevel% neq 0 (
        echo ❌ 依赖安装失败
        pause
        exit /b 1
    )
) else (
    echo ✅ 依赖已安装
)

echo.
echo 🚀 启动应用...
echo.

REM 启动应用
call npm start

pause
