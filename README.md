![Image showing a character sheet](README-media\cover-image.png)

## What is this?

The world of Vampire: The Masquerade is canonically set in the world of today. That means usage of smartphones is encouraged in-game.

In my sessions, my GM would allow us to actually use our phone to communicate through texts without being seen by the NPCs.

This app hopes to improve the experience by providing information on the chapters without breaking immersion.

## Development

I'm attempting an MVP approach for anyone that would like to already try the app. The current release status would be:

**If you're a React dev, you can make it work. :sweat_smile:**

The upcoming tasks are in this [Trello board](https://trello.com/b/xDMz1sOl/vampire-2019-app).

## Install
You must have `python>=3` in the server computer.

```bash
  pip install -r src/python_server/requirements.txt
```

For the moment, you must also have `node>=12` and `yarn` in the server computer.

I'm planning to release builds that can somehow be hosted / pointing to the server, but that's very WIP.

## Run

In two consoles, run

```bash
  yarn client:dev
```

and 

```bash
  yarn server:dev
```

The page will be accessed through `localhost:3000`