from flask import Flask
from api.routes import api_blueprint
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # autorise React à communiquer

app.register_blueprint(api_blueprint, url_prefix="/api")

@app.route("/")
def home():
    return {"message": "Backend Flask running!"}

if __name__ == "__main__":
    app.run(debug=True)
