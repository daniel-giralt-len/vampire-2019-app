from tinydb import Query
import db

def _ensure_instance_init(table_name):
  if len(db.tables[table_name])==0:
    db.tables[table_name].insert({'id':0, 'value': ''})

def get(table_name):
  try:
    _ensure_instance_init(table_name)
    value = db.tables[table_name].get(Query().id == 0)['value']
    return value
  except (IndexError, TypeError, KeyError):
    return None

def set(table_name, value):
  try:
    _ensure_instance_init(table_name)
    db.tables[table_name].update({
      'value': value,
    }, Query().id == 0)
    return { }
  except (IndexError, TypeError, KeyError):
    return { }