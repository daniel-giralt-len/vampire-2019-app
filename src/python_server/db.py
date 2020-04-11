from tinydb import TinyDB, Query

_db = TinyDB('database.json', indent=4)

characters = _db.table('characters')
date = _db.table('date')
maps = _db.table('maps')
narrator = _db.table('narrator')
news = _db.table('news')
players = _db.table('players')
weather = _db.table('weather')

tables = {
  "maps": maps,
  "characters": characters,
  "players": players,
  "narrator": narrator,
  "news": news,
  "date": date,
  "weather": weather
}