# chatbot.py

def get_chatbot_response(user_message: str) -> str:
    # Logique du chatbot : répondre selon le message
    if "hello" in user_message.lower():
        return "Hello! How can I assist you today?"
    elif "sentiment" in user_message.lower():
        return "I will analyze your sentiment soon."
    elif "emotion" in user_message.lower():
        return "I can detect your emotion in your message!"
    else:
        return "Sorry, I didn’t understand that."
