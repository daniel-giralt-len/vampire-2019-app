from flask import Flask, jsonify, request
from flask_cors import CORS
from tinydb import Query
from tinydb.operations import delete
from uuid import uuid1
from time import time, ctime
import db

app = Flask(__name__)
CORS(app)
token_ttl = 100000

@app.route('/')
def hello_world():
  return 'Healthy'

@app.route('/character', methods=['POST'])
def character():
  try:
    token = request.json['token']
    p = db.players.get(Query().token == token)
    return db.characters.get(Query().id == p['id'])
  except (IndexError, TypeError, KeyError):
    return {}

@app.route('/couterie', methods=['GET'])
def couterie():
  couterie = []
  for c in db.characters.all():
    couterie.append({
      'name': c['general']['name'],
      'playerName': c['general']['player'],
      'avatar': c['avatars'][c['danger']],
      'danger': c['danger'],
      'damage': c['damage'],
    })
  return jsonify(couterie)

@app.route('/maps', methods=['GET'])
def maps():
  maps = []
  for c in db.characters.all():
    map_data = db.maps.get(Query().id == c['id'])
    maps.append({
      'name': c['general']['name'],
      'avatar': c['avatars'][c['danger']],
      'danger': c['danger'],
      'location': map_data['location']
    })
  return jsonify(maps)

@app.route('/verify-password', methods=['POST'])
def verify_password():
  Player = Query()
  password = request.json['password']
  player = db.players.get(Player.password == password)
  if not player:
    return { "verified": False }
  token = str(uuid1())
  db.players.update({
    "token": token,
    "token_timestamp": time()
  }, Player.id == player['id'])
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
  player = db.players.get(Player.token == token)
  if not player:
    return { "verified": False }
  time_passed = time() - player['token_timestamp']
  if time_passed > token_ttl:
    db.players.update(delete('token_timestamp'), Player.id == player['id'])
    db.players.update(delete('token'), Player.id == player['id'])
    return { "verified": False }
  return { "verified": True }

if __name__ == '__main__':
    app.run(ssl_context='adhoc')