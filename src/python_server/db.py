from tinydb import TinyDB, Query

_db = TinyDB('database.json', indent=4)
maps = _db.table('maps')
characters = _db.table('characters')
players = _db.table('players')