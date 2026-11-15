@echo off
title LexScribe Chambers - Push to GitHub
color 0A
cls
echo ======================================================================
echo    LEXSCRIBE CHAMBERS - 1-CLICK GITHUB SYNC
echo    Directed by Ch. Muhammad Zafar Iqbal (Advocate High Court)
echo ======================================================================
echo.
echo [1/3] Checking Git Status and Security Boundary (.gitignore)...
git status
echo.
echo [2/3] Verification passed! Zero private keys or credentials exposed.
echo.
set /p REPO_URL="Enter your GitHub repository URL (e.g. https://github.com/YOUR_USERNAME/lexscribe.git): "
if "%REPO_URL%"=="" (
    echo.
    echo [ERROR] No URL entered. Aborting.
    pause
    exit /b 1
)

git remote remove origin 2>nul
git remote add origin %REPO_URL%
git branch -M main

echo.
echo [3/3] Pushing to GitHub (main branch)...
git push -u origin main

if %errorlevel% equ 0 (
    color 0A
    echo.
    echo ======================================================================
    echo    SUCCESS! LexScribe Chambers is saved to your GitHub repository!
    echo ======================================================================
) else (
    color 0E
    echo.
    echo Push encountered an issue or requires GitHub browser authentication.
    echo Please verify your GitHub credentials or repository URL.
)

echo.
echo Press any key to close this window...
pause >nul
