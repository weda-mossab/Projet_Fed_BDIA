from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field
from typing import Optional

router = APIRouter()

# Request Models
class AddRequest(BaseModel):
    a: int = Field(..., description="First number", example=7)
    b: int = Field(..., description="Second number", example=5)

# Response Models
class MessageResponse(BaseModel):
    message: str = Field(..., description="Response message")

class TestResponse(BaseModel):
    status: str = Field(..., description="Status of the response")
    message: str = Field(..., description="Response message")

class AddResponse(BaseModel):
    result: int = Field(..., description="Sum of the two numbers")

class ErrorResponse(BaseModel):
    error: str = Field(..., description="Error message")
    detail: Optional[str] = Field(None, description="Error details")

@router.get('/hello', response_model=MessageResponse, summary="Get hello message")
def hello():
    """
    Returns a hello message from the API.
    
    - **Returns**: A message response
    """
    return MessageResponse(message="Hello depuis ton API FastAPI !")

@router.post('/add', response_model=AddResponse, summary="Add two numbers")
def add_numbers(request: AddRequest):
    """
    Adds two numbers together.
    
    - **a**: First number
    - **b**: Second number
    - **Returns**: The sum of the two numbers
    """
    try:
        result = request.a + request.b
        return AddResponse(result=result)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error calculating sum: {str(e)}")

@router.get('/test', response_model=TestResponse, summary="Test backend connection")
def test():
    """
    Tests the backend connection.
    
    - **Returns**: Status and message indicating the backend is working
    """
    return TestResponse(
        status="success",
        message="Backend FastAPI is working!"
    )
