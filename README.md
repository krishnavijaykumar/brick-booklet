# Brick Booklet

**Turn the bricks you already own into new models, with big, clear, step-by-step instructions a 6-year-old can follow.**

▶ **Open it in your browser: https://krishnavijaykumar.github.io/brick-booklet/**

No install, no account, no app store. It runs on a laptop, a desktop or a tablet.

I built Brick Booklet for my son. He has two big boxes of LEGO® Classic bricks, and after the box ideas were done, he kept asking "what can we build now?" This answers that question with a library of models that only use the bricks in his box. Each model turns into an instruction booklet that shows him exactly what to find and where it goes.

---

## What it does

### 1. Ideas: a library of 1,454 models
Every model in the library can be built from the bricks in **LEGO Classic 10698 (Large Creative Brick Box)** and **10696 (Medium Creative Brick Box)**.

| Category | Models | Examples |
|---|---:|---|
| Expert builds | 383 | Town streets, farms, a castle kingdom with a dragon, airports, space bases, zoos and harbours on two plates. Galleons, 20-floor skyscrapers, a grand fortress, airliners, treehouses, step temples. |
| Buildings | 233 | Houses (sizes, floors, roofs, doors, chimneys), towers, castles, bridges, pyramids, walls, stairs, arches |
| Vehicles | 225 | Planes, helicopters, cars, trucks, buses, trains, boats, tractors |
| Puzzles | 159 | Finger mazes in four levels, from Easy to Expert |
| Letters & Words | 123 | A–Z and 0–9 in two sizes, plus 3- and 4-letter words like CAT, SUN and FROG |
| Animals | 113 | Dogs, cats, giraffes, elephants, snakes, crocodiles, dinosaurs, a T-Rex, turtles, ducks |
| Robots & Fun | 69 | Robots in many poses, tables, chairs, a sofa, a throne |
| Space | 60 | Rockets, fighters, flying saucers |
| Pictures | 39 | Flat mosaics: heart, star, smiley, rocket and more |
| Nature | 37 | Trees, flowers, mushrooms, snowmen |
| Favourites | 13 | Hand-picked starters |

Search by typing ("plane", "castle", "cat"), filter by category or size (Quick, Medium, Big, Huge), or press **Surprise me**. Every model has a set number (No. 1001 onward), so a child can ask for the same one again. **Other colours** re-colours any model from what's left in your box.

### 2. Build: instructions made for kids
- One huge step number and one big **Next** button
- A **Find** tray that shows each piece as a 3D picture with a count ("3×"), so there is almost nothing to read
- A bobbing arrow over each spot, and new pieces drop in and glow
- **Read it to me** reads each step aloud
- The camera turns to face where the new pieces go
- Steps never mix layers and use only one or two kinds of piece, so children hunt for "3 red 2×4s", not a jumble
- Big models are split into **chapters** (barn, then fence, then animals), like the numbered bags in a real set
- Choose 1–4 pieces per step to match your child's pace

### 3. Studio: design your own
- Click the green plate to add bricks, plates and slopes. Paint, remove, turn, undo.
- Choose a 16×16, 8×16 or 6×12 base, or two plates side by side
- **Parts list** compares the model with your box and flags missing pieces
- **Fix with my colours** swaps missing pieces for colours you have
- **Stability check** highlights pieces held by only one stud, the ones that fall off in small hands
- Designs save automatically in your browser

### 4. My brick box
The brick counts start from LEGO's replacement-parts lists for 10698 and 10696. Some counts are estimates and are marked **≈**. Count those once and fix them, and every idea will fit your box exactly. You can also enter any other bricks you own.

---

## How it works

Everything is one file, `index.html`. It needs no build step and has no server.

- **3D view:** [three.js](https://threejs.org) r128, loaded from a CDN.
- **The stacking engine:** every piece drops straight down onto the highest thing under it, just like a real brick. Pieces can't float, and nothing can sit on the sloped side of a slope. The same rule checks designs, places pieces in the Studio and orders the instructions.
- **Design families:** most of the library comes from parametric generators. A plane family, for example, combines 3 lengths, 3 wing shapes, 3 tails and an optional cockpit. Each generator tiles shapes with the largest pieces left in your box, so models adapt to what you own.
- **The catalog:** each design is stored as just `[family, variant, pieceCount]`. Models are generated on demand, and thumbnails render only when they scroll into view.
- **Quality checks:** every design in the library is guaranteed to fit the default box, obey the stacking rules, build correctly in instruction order and be structurally unique. Colour swaps don't count as new designs.

### Run it locally
Download `index.html` and open it in a modern browser. That's it.

### Check the library
```bash
node tools/verify.js
```
Every design is rebuilt and checked. Run this before opening a pull request that changes the engine or a design family.

### Add a design family
Families live in the `FAMILIES` (and `EXPERT`) arrays in `index.html`. A family has:

```js
{ id:'boat', cat:'Vehicles', words:['boat','ship'],
  params:{ L:[7,9,11], mast:[0,1,2] },          // every combination becomes a design
  name: p => p.L + '-stud boat',
  make(g, p){                                    // build with the generator helpers
    g.fill(6, 4, 4, p.L, { colors:['blue'], y:0 });   // tile a rectangle
    g.piece('s2x2', 6, 2, 0, ['blue'], ['b2x2'], 0);  // one specific piece
    g.ring(...); g.roof(...); g.slopeRow(...);        // walls, roofs, slope rows
  } }
```
Then regenerate the `CATALOG` line with only the variants that pass the checks, and run `tools/verify.js`.

---

## Privacy
Designs and brick counts are stored only in your own browser (`localStorage`). Nothing is uploaded, and there are no accounts and no tracking.

## Use it, change it, share it
Brick Booklet is open source under the MIT License. You're free to use it at home or in a classroom, change it, host your own copy or build something new on top of it.

- **Your own copy:** click **Fork**, then turn on GitHub Pages in your fork (Settings → Pages → main → / root).
- **Send improvements back:** open a pull request. Every pull request is checked automatically by `tools/verify.js`, so the library can't be broken by accident. See [CONTRIBUTING.md](CONTRIBUTING.md).
- **Ideas and bugs:** open an [issue](../../issues/new/choose). There are templates for bugs, model ideas and support for other brick sets.

## Credits and license
Created by **Gangisetty Krishna Vijay Kumar**.

Brick counts come from LEGO's replacement-parts inventories as listed on [Brickset](https://brickset.com). three.js is © the three.js authors (MIT License).

Brick Booklet is released under the [MIT License](LICENSE).

**Disclaimer:** Brick Booklet is an independent, open-source project. It is not affiliated with, endorsed or sponsored by the LEGO Group. LEGO® is a trademark of the LEGO Group. Set numbers are used only to say which bricks the designs are made for.
