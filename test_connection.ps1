# Quick connection test script for PowerShell
# Tests all backend endpoints

Write-Host "Testing Backend Connection..." -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

# Test root endpoint
Write-Host "1. Testing root endpoint (/)..."
try {
    $response = Invoke-RestMethod -Uri "http://127.0.0.1:5000/" -Method Get
    $response | ConvertTo-Json
} catch {
    Write-Host "Error: $_" -ForegroundColor Red
}
Write-Host ""

# Test health endpoint
Write-Host "2. Testing health endpoint (/health)..."
try {
    $response = Invoke-RestMethod -Uri "http://127.0.0.1:5000/health" -Method Get
    $response | ConvertTo-Json
} catch {
    Write-Host "Error: $_" -ForegroundColor Red
}
Write-Host ""

# Test API test endpoint
Write-Host "3. Testing API test endpoint (/api/test)..."
try {
    $response = Invoke-RestMethod -Uri "http://127.0.0.1:5000/api/test" -Method Get
    $response | ConvertTo-Json
} catch {
    Write-Host "Error: $_" -ForegroundColor Red
}
Write-Host ""

# Test hello endpoint
Write-Host "4. Testing hello endpoint (/api/hello)..."
try {
    $response = Invoke-RestMethod -Uri "http://127.0.0.1:5000/api/hello" -Method Get
    $response | ConvertTo-Json
} catch {
    Write-Host "Error: $_" -ForegroundColor Red
}
Write-Host ""

# Test add endpoint
Write-Host "5. Testing add endpoint (/api/add)..."
try {
    $body = @{ a = 7; b = 5 } | ConvertTo-Json
    $response = Invoke-RestMethod -Uri "http://127.0.0.1:5000/api/add" -Method Post -Body $body -ContentType "application/json"
    $response | ConvertTo-Json
} catch {
    Write-Host "Error: $_" -ForegroundColor Red
}
Write-Host ""

Write-Host "================================" -ForegroundColor Cyan
Write-Host "Tests complete!" -ForegroundColor Green

