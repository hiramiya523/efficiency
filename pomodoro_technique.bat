@echo off

rem ** 任意設定 ** 
rem min:分, finMsg:終了メッセージ, enabledBeep:終了時にビープ音を鳴らすか(true/false)
set min=25 
set finMsg="1セット終了！"
set enabledBeep=true

rem ** ポモドーロプログラム **
set /a sec=%min%*60
timeout /t %sec% /nobreak

if %enabledBeep% equ true (
    rundll32 user32.dll,MessageBeep
)

msg %USERNAME% %finMsg%

pause