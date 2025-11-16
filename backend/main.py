from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from api.routes import router
import os
from typing import Dict

app = FastAPI(
    title="Projet Fédérateur API",
    version="1.0.0",
    description="API Backend for Projet Fédérateur using FastAPI",
    docs_url="/docs",
    redoc_url="/redoc",
)

# CORS Configuration - autorise React à communiquer
CORS_ORIGINS = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

# Add production origins if needed
if os.getenv("ENVIRONMENT") == "production":
    CORS_ORIGINS.extend([
        os.getenv("FRONTEND_URL", ""),
    ])

app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API routes
app.include_router(router, prefix="/api", tags=["api"])

# Root endpoint
@app.get("/", tags=["Root"])
def home() -> Dict[str, str]:
    """
    Root endpoint of the API.
    
    - **Returns**: Welcome message
    """
    return {"message": "Backend FastAPI running!"}

# Health check endpoint
@app.get("/health", tags=["Health"])
def health_check() -> Dict[str, str]:
    """
    Health check endpoint.
    
    - **Returns**: Health status
    """
    return {"status": "healthy", "service": "Projet Fédérateur API"}

# Global exception handler
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    """
    Global exception handler for unhandled errors.
    """
    return JSONResponse(
        status_code=500,
        content={
            "error": "Internal server error",
            "detail": str(exc) if os.getenv("ENVIRONMENT") == "development" else "An error occurred"
        }
    )

if __name__ == "__main__":
    import uvicorn
    # Use import string for reload to work properly
    uvicorn.run(
        "main:app",
        host="127.0.0.1",
        port=5000,
        reload=True,
        log_level="info"
    )