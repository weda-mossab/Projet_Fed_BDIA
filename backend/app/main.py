from fastapi import FastAPI
from .routes import router  # Import des routes

app = FastAPI()

# Inclure les routes dans l'application FastAPI
app.include_router(router)

# Point de santé pour vérifier que le serveur fonctionne
@app.get("/health")
def health_check():
    return {"status": "OK"}
