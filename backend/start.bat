@echo off
echo ================================
echo Elysian Men Backend - Quick Start
echo ================================
echo.

echo Checking if MongoDB is running...
mongosh --eval "db.version()" > nul 2>&1
if %errorlevel% neq 0 (
    echo [WARNING] MongoDB is not running!
    echo Please start MongoDB with: net start MongoDB
    echo Or run: mongod
    echo.
    pause
    exit /b 1
)

echo MongoDB is running!
echo.

echo Starting Spring Boot Application...
echo.
mvn spring-boot:run
