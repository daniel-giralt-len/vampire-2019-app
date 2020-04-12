const { int, 
  string, 
  stringFromList, 
  float, 
  intRange, 
  boolean,
  url } = require('./database-element-generators')

const structure = {
  "players": [
    {
      "id": int,
      "password": string(/^[A-J]{8}$/),
      "token": string('utid1'),
      "token_timestamp": float('epoch'),
      "theme": stringFromList(["light", "dark"])
    }
  ],
  "narrator": {
    "password": string(), //unhashed
    "token": string('utid1'),
    "token_timestamp": float('epoch')
  },
  "date": {
    "id": int,
    "value": float('epoch')
  },
  "weather": {
    "id": int,
    "value": stringFromList([
      'partially_cloudy',
      'cloudy',
      'rainy',
      'clear',
      'day',
      'stormy',
      'tornado'
    ])
  },
  "maps": [
    {
      "id": int,
      "location": {
        "latitude": float('latitude'),
        "longitude": float('longitude')
      }
    }
  ],
  "characters": [
    {
      "id": int,
      "general":{
        "name": string(),
        "clan": stringFromList([
          "brujah", 
          "gangrel",
          "malkavian",
          "nosferatu",
          "toreador",
          "tremer",
          "ventrue",
          "caitiff",
          "thin_blooad"
        ]),
        "player": string(),
        "generation": int,
      },
      "stats": {
        "attributes": {
          "strength": intRange(0,5),
          "dexterity": intRange(0,5),
          "resistance": intRange(0,5),
          "charisma": intRange(0,5),
          "manipulation": intRange(0,5),
          "composure": intRange(0,5),
          "intelligence": intRange(0,5),
          "wits": intRange(0,5),
          "resolve": intRange(0,5)
        },
        "skills": {
          "firearms": intRange(0,5),
          "crafts": intRange(0,5),
          "athletics": intRange(0,5),
          "driving": intRange(0,5),
          "robbery": intRange(0,5),
          "fight": intRange(0,5),
          "weapon": intRange(0,5),
          "stealth": intRange(0,5),
          "survival": intRange(0,5),
          "streetSmarts": intRange(0,5),
          "etiquette": intRange(0,5),
          "performance": intRange(0,5),
          "intimidation": intRange(0,5),
          "leadership": intRange(0,5),
          "insight": intRange(0,5),
          "persuasion": intRange(0,5),
          "subterfuge": intRange(0,5),
          "animalHandling": intRange(0,5),
          "academia": intRange(0,5),
          "science": intRange(0,5),
          "conscience": intRange(0,5),
          "finances": intRange(0,5),
          "investigation": intRange(0,5),
          "medicine": intRange(0,5),
          "occult": intRange(0,5),
          "politics": intRange(0,5),
          "technology": intRange(0,5)
        },
        "disciplines": {
          "animalism": intRange(0,5),
          "auspex": intRange(0,5),
          "celerity": intRange(0,5),
          "dominate": intRange(0,5),
          "fortitude": intRange(0,5),
          "obfuscate": intRange(0,5),
          "potence": intRange(0,5),
          "presence": intRange(0,5),
          "protean": intRange(0,5),
          "blood_sorcery": intRange(0,5),
          "ceremonies": intRange(0,5),
          "thin-blood_alchemy": intRange(0,5)
        }
      },
      "damage": {
        "physical": {
          "superficial": intRange(0,10),
          "aggravated": intRange(0,10),
        },
        "willpower":{
          "superficial": intRange(0,10),
          "aggravated": intRange(0,10),
        }
      },
      "anxiety": intRange(0,5),
      "humanity": intRange(0,10),
      "avatars": {
        "ok": url('ok'),
        "hurt": url('hurt'),
        "letargy": url('letargy'),
      },
      "danger": stringFromList(["ok","hurt","letargy"])
    }
  ],
  "news": [
    {
      "header": string(),
      "body": string(),
      "archived": boolean
    }
  ]
}

module.exports = structure