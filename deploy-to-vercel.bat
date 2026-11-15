@echo off
title LexScribe Chambers - 1-Click Vercel Deployment
color 0A
cls
echo ======================================================================
echo    LEXSCRIBE CHAMBERS - 1-CLICK VERCEL AUTOMATED DEPLOYMENT
echo    Directed by Ch. Muhammad Zafar Iqbal (Advocate High Court)
echo ======================================================================
echo.
echo [1/3] Running Rigorous Site Verification Suite...
echo.
call node verify_site.js
if %errorlevel% neq 0 (
    color 0C
    echo.
    echo [ERROR] Verification checks failed! Deployment aborted to protect integrity.
    echo Please review the errors above.
    pause
    exit /b %errorlevel%
)

echo.
echo [2/3] Verification passed! Deploying Flagship to Vercel Production...
echo.
echo If this is your first time deploying, a browser window will open
echo to authenticate your free Vercel account. You do NOT need to type anything.
echo.
call npx vercel --prod

if %errorlevel% equ 0 (
    color 0A
    echo.
    echo ======================================================================
    echo    SUCCESS! LexScribe Chambers is LIVE on Vercel Production!
    echo ======================================================================
) else (
    color 0E
    echo.
    echo Deployment completed or paused. Check above status messages.
)

echo.
echo Press any key to close this window...
pause >nul
