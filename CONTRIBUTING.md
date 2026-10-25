# Contributing to Brick Booklet

Thanks for helping. Brick Booklet is used by children, so the bar is simple: every model must be buildable, and every screen must be easy for a 6-year-old to use.

## Ways to help
- **Report a problem.** Open an issue with the "Something is broken" template.
- **Suggest a model.** Use the "Idea for a model" template.
- **Add a design family.** A family is a generator with parameters. One family usually adds 10–60 models. See "Add a design family" in the README.
- **Support another brick set.** Brick counts live in `INV_LISTED` and `INV_ESTIMATED` in `index.html`. A clean way to choose between sets would help many families.
- **Improve the kid experience.** Clearer steps, better voice, translations and accessibility are all welcome.

## Getting started
1. Fork the repo and clone your fork.
2. Open `index.html` in a browser. There is nothing to install.
3. Make your change.
4. Run the library check:
   ```bash
   node tools/verify.js
   ```
5. Open a pull request. The same check runs automatically and must pass before it can be merged.

## House rules
- **One file, no build step.** Everything stays in `index.html`. The only outside code is three.js from a CDN.
- **Model numbers never change.** Children ask for "number 1310" again. Add new designs to the **end** of `CATALOG` and never reorder or remove existing entries. If a design must go, keep its slot and tell us in the pull request.
- **Every model must pass `tools/verify.js`.** It must fit the default box, obey the stacking rules, build correctly in instruction order and be structurally unique. Colour changes alone don't count as a new design.
- **Keep it kid-safe and calm.** No ads, accounts, tracking or outside links inside the app.
- **Respect trademarks.** Don't add LEGO® logos, box art or official instruction images. Describe sets by number only.

## Code of conduct
Be kind and patient, and assume good intent. Many people here are parents, teachers or first-time contributors. Harassment or insults of any kind aren't accepted; the maintainer may remove comments, close issues or block accounts to keep the project friendly.

## License
By contributing, you agree that your work is released under the project's [MIT License](LICENSE).
