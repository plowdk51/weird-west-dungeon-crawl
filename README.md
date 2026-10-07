# Weird West Dungeon Crawl

A mobile-first browser card-crawler set in a cursed silver mine beneath a ghost town.
Under the hood it plays by the standard rules of **Scoundrel** (Zach Gage & Kurt Bieg), but you never see
a playing card — every card is a monster, weapon, or potion with its own art.

## Play

- Latest build: https://plowdk51.github.io/weird-west-dungeon-crawl/

## Develop

```bash
npm install
npm run dev          # local dev server
npm run dev:phone    # expose on your LAN to test on a phone
npm test             # rules-engine tests
npm run build        # type-check + production build into dist/
```

## Docs

- [Build plan](docs/PLAN.md)
- [Art guide](docs/ART_GUIDE.md) — how to replace placeholder art with your own images
- [AI image prompts](docs/ART_PROMPTS.md) — a ready-to-paste prompt for every art slot
