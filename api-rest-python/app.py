from flask import Flask, jsonify, request

app = Flask(__name__)

# Base de datos en memoria
usuarios = [
    {"id": 1, "name": "Juan", "email": "juan@example.com"},
    {"id": 2, "name": "Ana", "email": "ana@example.com"}
]

@app.route('/usuarios', methods=['GET'])
def get_usuarios():
    return jsonify(usuarios)

@app.route('/usuarios/<int:id>', methods=['GET'])
def get_usuario(id):
    usuario = next((u for u in usuarios if u['id'] == id), None)
    return jsonify(usuario) if usuario else ('', 404)

@app.route('/usuarios', methods=['POST'])
def add_usuario():
    data = request.json
    nuevo_id = len(usuarios) + 1
    nuevo_usuario = {"id": nuevo_id, "name": data['name'], "email": data['email']}
    usuarios.append(nuevo_usuario)
    return jsonify(nuevo_usuario), 201

@app.route('/usuarios/<int:id>', methods=['PUT'])
def edit_usuario(id):
    data = request.json
    usuario = next((u for u in usuarios if u['id'] == id), None)
    if usuario:
        usuario['name'] = data.get('name', usuario['name'])
        usuario['email'] = data.get('email', usuario['email'])
        return jsonify(usuario)
    return ('', 404)

@app.route('/usuarios/<int:id>', methods=['DELETE'])
def delete_usuario(id):
    global usuarios
    usuarios = [u for u in usuarios if u['id'] != id]
    return ('', 204)

if __name__ == '__main__':
    app.run(debug=True)
