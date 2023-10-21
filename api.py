import flask
from flask_cors import CORS
import json
from flask import Flask

app = flask.Flask(__name__)


with open('usuarios.json', 'r') as archivo_json:
    lista_de_usuarios = json.load(archivo_json)


CORS(app)


@app.route('/login', methods=['POST'])
def login():
    data = flask.request.get_json()
    username = data.get('username')
    password = data.get('password')

    for usuario in lista_de_usuarios:  
        if usuario['username'] == username and usuario['password'] == password:
            return flask.jsonify({"authenticated": True,"token":"asdf1234"}), 200
    else:
        return flask.Response(status=401)

if __name__ == "__main__":
    app.run(debug=True)
