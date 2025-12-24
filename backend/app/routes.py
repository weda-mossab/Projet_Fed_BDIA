# routes.py
from fastapi import APIRouter
from pydantic import BaseModel
from .chatbot import get_chatbot_response  # Fonction pour générer des réponses du chatbot

router = APIRouter()

# Modèle pour recevoir les messages utilisateur
class UserMessage(BaseModel):
    message: str

@router.post("/chat/")
async def chat_with_bot(user_message: UserMessage):
    response = get_chatbot_response(user_message.message)
    return {"response": response}



