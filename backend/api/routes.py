# routes.py
from fastapi import APIRouter
from .chatbot import get_chatbot_response  # Fonction pour générer des réponses du chatbot

router = APIRouter()

@router.post("/chat/")
async def chat_with_bot(user_message: str):
    response = get_chatbot_response(user_message)
    return {"response": response}
