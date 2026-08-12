@echo off
setlocal

echo Starting remote deployment...
echo Connecting to server and running deployment script...

ssh -tt root@biselahore.com "cd ~/Projects/biselahore.com && ./deployment.sh"

if errorlevel 1 (
  echo Deployment failed.
  pause
  exit /b %errorlevel%
)

echo Deployment completed successfully.
pause
exit /b 0