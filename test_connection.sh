#!/bin/bash

# Quick connection test script
# Tests all backend endpoints

echo "Testing Backend Connection..."
echo "================================"
echo ""

# Test root endpoint
echo "1. Testing root endpoint (/)..."
curl -s http://127.0.0.1:5000/ | jq .
echo ""

# Test health endpoint
echo "2. Testing health endpoint (/health)..."
curl -s http://127.0.0.1:5000/health | jq .
echo ""

# Test API test endpoint
echo "3. Testing API test endpoint (/api/test)..."
curl -s http://127.0.0.1:5000/api/test | jq .
echo ""

# Test hello endpoint
echo "4. Testing hello endpoint (/api/hello)..."
curl -s http://127.0.0.1:5000/api/hello | jq .
echo ""

# Test add endpoint
echo "5. Testing add endpoint (/api/add)..."
curl -s -X POST http://127.0.0.1:5000/api/add \
  -H "Content-Type: application/json" \
  -d '{"a": 7, "b": 5}' | jq .
echo ""

echo "================================"
echo "Tests complete!"

