@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo SVM LAB: http://127.0.0.1:8000
echo Open this address in your browser. Stop: Ctrl+C.
where py >nul 2>&1
if errorlevel 1 (
  python -m http.server 8000 --bind 127.0.0.1 --directory dist
) else (
  py -3 -m http.server 8000 --bind 127.0.0.1 --directory dist
)
pause
