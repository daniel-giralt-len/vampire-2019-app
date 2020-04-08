from uuid import uuid1
from tinydb import Query
from tinydb.operations import delete
from time import time
import db

token_ttl = 100000

def verify_token(request, database_name):
  """Returns {"verified": True} if the token is correct and alive (false otherwise)
    If the token's dead, removes it.
  """
  if not 'token' in request.json:
    return { "verified": False }
  token = request.json['token']
  db_instance = db.tables[database_name].get(Query().token == token)
  if not db_instance:
    return { "verified": False }
  time_passed = time() - db_instance['token_timestamp']
  if time_passed > token_ttl:
    db.tables[database_name].update(delete('token_timestamp'), Query().id == db_instance['id'])
    db.tables[database_name].update(delete('token'), Query().id == db_instance['id'])
    return { "verified": False }
  return { "verified": True }

def add_token_data_to_instance(instance_id, database_name):
  """Returns a session token
    Updates the instance of the database with a token and token_timestamp
    Instance needs an id field    
  """
  token = str(uuid1())
  db.tables[database_name].update({
    'token': token,
    'token_timestamp': time()
  }, Query().id == instance_id)
  return token