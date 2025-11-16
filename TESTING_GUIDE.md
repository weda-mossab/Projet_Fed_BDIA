# Testing Guide: Frontend-Backend Integration

This guide explains how to test that your React frontend is properly connected to your FastAPI backend.

## Prerequisites

1. **Backend**: Python 3.11+ with FastAPI installed
2. **Frontend**: Node.js with React installed
3. **Browser**: Any modern browser (Chrome, Firefox, Edge)

---

## Step 1: Start the Backend Server

### Option A: Using Python directly
```bash
cd backend
python main.py
```

### Option B: Using uvicorn directly
```bash
cd backend
uvicorn main:app --host 127.0.0.1 --port 5000 --reload
```

### Expected Output:
```
INFO:     Uvicorn running on http://127.0.0.1:5000 (Press CTRL+C to quit)
INFO:     Started reloader process
INFO:     Started server process
INFO:     Waiting for application startup.
INFO:     Application startup complete.
```

**✅ Success Indicator**: You should see the server running on `http://127.0.0.1:5000`

### Quick Test (Backend Only):
Open your browser and visit:
- **Root**: http://127.0.0.1:5000/
- **Health Check**: http://127.0.0.1:5000/health
- **API Docs**: http://127.0.0.1:5000/docs
- **API Test Endpoint**: http://127.0.0.1:5000/api/test

---

## Step 2: Start the Frontend Server

Open a **new terminal** (keep backend running) and run:

```bash
cd frontend
npm start
```

### Expected Output:
```
Compiled successfully!

You can now view projetfederateur in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://192.168.x.x:3000

Note that the development build is not optimized.
```

**✅ Success Indicator**: Browser should automatically open to `http://localhost:3000`

---

## Step 3: Test the Connection

### Method 1: Visual Testing (UI)

1. **Open the React app** at `http://localhost:3000`
2. You should see:
   - A header with "Communication React → FastAPI"
   - Backend Status section showing the connection status
   - Two buttons: "Get Hello Message" and "Add 7 + 5"

3. **Test Backend Status**:
   - The page should automatically load and show:
     - Status: `success`
     - Message: `Backend FastAPI is working!`
   - If you see an error, check the backend is running

4. **Test Hello Endpoint**:
   - Click "Get Hello Message" button
   - Should display: `Hello depuis ton API FastAPI !`

5. **Test Add Endpoint**:
   - Click "Add 7 + 5" button
   - Should display: `Result: 12`

### Method 2: Browser Developer Tools

1. Open Developer Tools (F12 or Right-click → Inspect)
2. Go to the **Network** tab
3. Interact with the app (click buttons)
4. You should see API calls to:
   - `http://127.0.0.1:5000/api/test`
   - `http://127.0.0.1:5000/api/hello`
   - `http://127.0.0.1:5000/api/add`
5. Check that responses have status **200 OK**

### Method 3: FastAPI Interactive Docs

1. Open http://127.0.0.1:5000/docs
2. You'll see the Swagger UI documentation
3. Test each endpoint:
   - **GET /api/test**: Click "Try it out" → "Execute"
   - **GET /api/hello**: Click "Try it out" → "Execute"
   - **POST /api/add**: Click "Try it out", enter `{"a": 7, "b": 5}` → "Execute"
4. Check responses match expected format

### Method 4: Using curl (Command Line)

Open a **third terminal** and test:

```bash
# Test root endpoint
curl http://127.0.0.1:5000/

# Test health check
curl http://127.0.0.1:5000/health

# Test API endpoint
curl http://127.0.0.1:5000/api/test

# Test hello endpoint
curl http://127.0.0.1:5000/api/hello

# Test add endpoint (POST)
curl -X POST http://127.0.0.1:5000/api/add \
  -H "Content-Type: application/json" \
  -d "{\"a\": 7, \"b\": 5}"
```

---

## Step 4: Verify CORS Configuration

If you see CORS errors in the browser console, verify:

1. **Backend CORS** is configured in `backend/main.py`:
   ```python
   allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"]
   ```

2. **Frontend API URL** in `frontend/src/config/api.config.js`:
   ```javascript
   baseURL: process.env.REACT_APP_API_BASE_URL || 'http://127.0.0.1:5000'
   ```

---

## Troubleshooting

### Problem: "Cannot reach backend" or Network Error

**Solutions:**
1. ✅ Check backend is running on port 5000
2. ✅ Verify no firewall is blocking the connection
3. ✅ Check the API URL in `api.config.js` matches backend URL
4. ✅ Try accessing backend directly: http://127.0.0.1:5000/api/test

### Problem: CORS Error in Browser Console

**Solutions:**
1. ✅ Verify CORS origins in `backend/main.py` include `http://localhost:3000`
2. ✅ Restart backend server after changing CORS settings
3. ✅ Check browser console for specific CORS error details

### Problem: 404 Not Found

**Solutions:**
1. ✅ Verify endpoint path: should be `/api/test` not `/test`
2. ✅ Check router prefix in `backend/main.py`: `prefix="/api"`
3. ✅ Verify routes are registered correctly

### Problem: 500 Internal Server Error

**Solutions:**
1. ✅ Check backend terminal for error messages
2. ✅ Verify all dependencies are installed: `pip install -r requirements.txt`
3. ✅ Check FastAPI logs in terminal output

### Problem: Frontend shows "Loading..." forever

**Solutions:**
1. ✅ Check network tab in browser DevTools
2. ✅ Verify backend is responding (test with curl or browser)
3. ✅ Check for JavaScript errors in browser console
4. ✅ Verify API timeout settings in `api.config.js`

---

## Expected Successful Response Examples

### GET /api/test
```json
{
  "status": "success",
  "message": "Backend FastAPI is working!"
}
```

### GET /api/hello
```json
{
  "message": "Hello depuis ton API FastAPI !"
}
```

### POST /api/add
**Request:**
```json
{
  "a": 7,
  "b": 5
}
```

**Response:**
```json
{
  "result": 12
}
```

---

## Quick Test Checklist

- [ ] Backend server starts without errors
- [ ] Frontend server starts without errors
- [ ] Backend responds at http://127.0.0.1:5000/health
- [ ] Frontend loads at http://localhost:3000
- [ ] Backend status automatically loads on page load
- [ ] "Get Hello Message" button works
- [ ] "Add 7 + 5" button returns correct result (12)
- [ ] No CORS errors in browser console
- [ ] Network tab shows successful API calls (200 status)

---

## Additional Resources

- **FastAPI Docs**: http://127.0.0.1:5000/docs
- **ReDoc**: http://127.0.0.1:5000/redoc
- **Backend Health**: http://127.0.0.1:5000/health

Happy Testing! 🚀

