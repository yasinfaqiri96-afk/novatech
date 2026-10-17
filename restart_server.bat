@echo off
setlocal
cd /d "%~dp0"

powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0restart_server.ps1"
if errorlevel 1 exit /b %errorlevel%

echo Starting the development server...
npm run dev