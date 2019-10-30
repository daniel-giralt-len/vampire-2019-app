from flask import Flask, jsonify, request
from flask_cors import CORS
from tinydb import Query
from tinydb.operations import delete
from uuid import uuid1
from time import time, ctime
import db

app = Flask(__name__)
CORS(app)
token_ttl = 100

@app.route('/')
def hello_world():
  return 'Healthy'

@app.route('/character/<int:id>', methods=['GET'])
def character(id):
  try:
    return db.characters.search(Query().id == id)[0]
  except IndexError:
    return {}

@app.route('/couterie', methods=['GET'])
def couterie():
  couterie = []
  for c in db.characters.all():
    couterie.append({
      'name': c['name'],
      'playerName': c['playerName'],
      'avatar': c['avatars'][c['danger']],
      'danger': c['danger'],
      'damage': c['damage'],
    })
  return jsonify(couterie)

@app.route('/maps', methods=['GET'])
def maps():
  maps = []
  for c in db.characters.all():
    map_data = db.maps.search(Query().id == c['id'])[0]
    maps.append({
      'name': c['name'],
      'avatar': c['avatars'][c['danger']],
      'danger': c['danger'],
      'location': map_data['location']
    })
  return jsonify(maps)

@app.route('/verify-password', methods=['POST'])
def verify_password():
  Player = Query()
  password = request.json['password']
  players = db.players.search(Player.password == password)
  if len(players) == 0 or 'token' in players[0]:
    return { "verified": False }
  token = str(uuid1())
  db.players.update({
    "token": token,
    "token_timestamp": time()
  }, Player.password == password)
  return {
    "verified": True,
    "token": token,
  }

@app.route('/verify-token', methods=['POST'])
def verify_token():
  Player = Query()
  if not 'token' in request.json:
    return { "verified": False }
  token = request.json['token']
  players = db.players.search(Player.token == token)
  if len(players) == 0:
    return { "verified": False }
  player = players[0]
  time_passed = time() - player['token_timestamp']
  if time_passed > token_ttl:
    db.players.update(delete('token_timestamp'), Player.token == token)
    db.players.update(delete('token'), Player.token == token)
    return { "verified": False }
  return { "verified": True }

if __name__ == '__main__':
    app.run(ssl_context='adhoc')