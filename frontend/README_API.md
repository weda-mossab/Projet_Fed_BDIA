# API Integration Guide

## Structure

The frontend-backend integration follows a professional and structured architecture:

```
frontend/src/
├── config/
│   └── api.config.js          # API configuration (endpoints, URLs)
├── utils/
│   └── apiClient.js             # HTTP client with error handling
├── api/
│   └── backendService.js      # Service layer for API calls
└── App.js                     # Main component using services
```

## Configuration

### Environment Variables

Create a `.env` file in the `frontend/` directory:

```env
REACT_APP_API_BASE_URL=http://127.0.0.1:5000
REACT_APP_API_TIMEOUT=10000
REACT_APP_ENV=development
```

The `.env.example` file shows the required variables.

### API Configuration

All API endpoints and settings are centralized in `src/config/api.config.js`.

## Usage

### Making API Calls

```javascript
import { testBackend, addNumbers, sayHello } from './api/backendService';
import { APIError } from './utils/apiClient';

try {
  const response = await testBackend();
  console.log(response.message);
} catch (error) {
  if (error instanceof APIError) {
    console.error(`Error ${error.status}: ${error.message}`);
  } else {
    console.error(error.message);
  }
}
```

### Error Handling

The API client provides structured error handling:

- **APIError**: Custom error class with status code and error data
- Automatic timeout handling
- Network error detection
- JSON parsing with fallback

## Backend API

The FastAPI backend provides:

- **Documentation**: Available at `http://127.0.0.1:5000/docs`
- **ReDoc**: Available at `http://127.0.0.1:5000/redoc`
- **Health Check**: `GET /health`
- **API Endpoints**: All under `/api` prefix

### Available Endpoints

- `GET /api/test` - Test backend connection
- `GET /api/hello` - Get hello message
- `POST /api/add` - Add two numbers

## Best Practices

1. Always use the service layer (`backendService.js`) instead of calling `apiClient` directly
2. Handle errors properly using try-catch blocks
3. Check error types (APIError vs generic Error)
4. Use TypeScript for type safety (recommended for production)
5. Add request interceptors for authentication tokens if needed

