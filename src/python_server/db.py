from tinydb import TinyDB, Query

_db = TinyDB('database.json', indent=4)
maps = _db.table('maps')
characters = _db.table('characters')
players = _db.table('players')
narrator = _db.table('narrator')
date = _db.table('date')
weather = _db.table('weather')P
tables = {
  "maps": maps,
  "characters": characters,
  "players": players,
  "narrator": narrator,
  "date": date,
  "weather": weather
}