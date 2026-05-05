@echo off
setlocal

cd /d "%~dp0"

where node >nul 2>nul
if errorlevel 1 (
  echo Node.js kurulu degil. Once Node.js kurun: https://nodejs.org
  pause
  exit /b 1
)

if not exist node_modules (
  echo Paketler kuruluyor...
  call npm install
  if errorlevel 1 (
    echo Paket kurulumu basarisiz oldu.
    pause
    exit /b 1
  )
)

echo Backend baslatiliyor...
start "Not Web Backend" cmd /k "cd /d ""%~dp0"" && npm start"

timeout /t 3 /nobreak >nul
start "" "http://127.0.0.1:3000/giris.html?next=admin"

echo Admin giris sayfasi acildi.
endlocal
