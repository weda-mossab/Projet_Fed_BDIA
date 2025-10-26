from flask import Flask
from api.routes import api_blueprint

app = Flask(__name__)

# Enregistrement des routes de l’API
app.register_blueprint(api_blueprint, url_prefix="/api")

@app.route('/')
def home():
    return {"message": "Bienvenue sur ton backend Flask 🚀"}

if __name__ == "__main__":
    app.run(debug=True)

