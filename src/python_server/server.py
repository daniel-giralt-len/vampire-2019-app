from flask import Flask, jsonify, request
from flask_cors import CORS
from tinydb import Query
import db
import token_operations
import single_instance_operations as instance

from time import time

app = Flask(__name__)
CORS(app)

@app.route('/')
def hello_world():
  return 'Healthy'

@app.route('/character', methods=['GET'])
def character():
  try:
    token = request.args.get('token')
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

@app.route('/theme', methods=['GET'])
def get_theme():
  try:
    token = request.args.get('token')
    player = db.players.get(Query().token == token)
    return jsonify({'theme': player['theme']})
  except (IndexError, TypeError, KeyError):
    return {}

@app.route('/theme', methods=['POST'])
def update_theme():
  try:
    db.players.update({
      "theme": request.json['theme'],
    }, Query().token == request.json['token'])
    return { }
  except (IndexError, TypeError, KeyError):
    return { }

@app.route('/date', methods=['GET'])
def get_date():
  return { 'epoch': instance.get('date') }

@app.route('/date', methods=['POST'])
def set_date():
  timestamp = request.json['epoch']
  return instance.set('date', timestamp)

@app.route('/weather', methods=['GET'])
def get_weather():
  return { 'weather': instance.get('weather') }

@app.route('/weather', methods=['POST'])
def set_weather():
  weather = request.json['weather']
  return instance.set('weather', weather)

# Player requests

@app.route('/verify-password', methods=['POST'])
def verify_password():
  Player = Query()
  password = request.json['password']
  player = db.players.get(Player.password == password)
  if not player:
    return { "verified": False }
  token = token_operations.add_token_data_to_instance(player['id'], 'players')
  return {
    "verified": True,
    "token": token,
  }

@app.route('/verify-token', methods=['POST'])
def verify_token():
  return token_operations.verify_token(request, 'players')

# Narrator requests

def ensure_narrator_init():
  if len(db.narrator)==0:
    db.narrator.insert({"id":0})

@app.route('/admin-password-set', methods=['GET'])
def is_admin_password_set():
  ensure_narrator_init()
  has_password = len(db.narrator.search(Query().password.exists())) > 0
  return { 'isPasswordSet': has_password }

@app.route('/admin-password-set', methods=['POST'])
def set_admin_password():
  ensure_narrator_init()
  password = request.json['password']
  db.narrator.update({
    "password": password,
  }, ~ Query().password.exists())
  return { }

@app.route('/admin/verify-token', methods=['POST'])
def verify_admin_token():
  return token_operations.verify_token(request, 'narrator')

@app.route('/admin/password', methods=['POST'])
def is_admin_password_valid():
  try:
    password = request.json['password']
    narrator = db.narrator.get(Query().password == password)
    is_password_valid = len(narrator) > 0
    if not is_password_valid:
      return { 'isPasswordValid': False }
    token = token_operations.add_token_data_to_instance(narrator['id'], 'narrator')
    return { 'isPasswordValid': True,'token': token }
  except (IndexError, TypeError, KeyError):
    return { 'isPasswordValid': False }

if __name__ == '__main__':
    app.run(ssl_context='adhoc')