from flask import Blueprint, jsonify, request

api_blueprint = Blueprint('api', __name__)

@api_blueprint.route('/hello', methods=['GET'])
def hello():
    return jsonify({"message": "Hello depuis ton API Flask !"})

@api_blueprint.route('/add', methods=['POST'])
def add_numbers():
    data = request.get_json()
    a = data.get('a', 0)
    b = data.get('b', 0)
    return jsonify({"result": a + b})

