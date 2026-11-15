@echo off
title LexScribe Chambers - 1-Click Verification Suite
color 0B
cls
echo ======================================================================
echo    LEXSCRIBE CHAMBERS - AUTOMATED TEST AND VERIFICATION SUITE
echo    Directed by Ch. Muhammad Zafar Iqbal (Advocate High Court)
echo ======================================================================
echo.
call node verify_site.js
echo.
echo Press any key to close this window...
pause >nul
