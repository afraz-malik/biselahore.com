@echo off
setlocal

pushd "%~dp0"

echo Running local build check...
call npm run build

if errorlevel 1 (
  echo Local build failed. Deployment was not triggered.
  popd
  pause
  exit /b %errorlevel%
)

echo Starting remote deployment...
echo Connecting to server and running deployment script...

ssh -tt root@biselahore.com "cd ~/Projects/biselahore.com && ./deployment.sh"

if errorlevel 1 (
  echo Deployment failed.
  popd
  pause
  exit /b %errorlevel%
)

echo Deployment completed successfully.
popd
pause
exit /b 0