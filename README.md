# Time Ranger promo site

One-page static site (HTML, CSS, a little JS). No build step: open `index.html` or serve the folder.

```
python -m http.server 8080
```

## Swapping in GIFs / new art

Feature and level media live in `assets/media/`. Each one is a still for now, marked with a "GIF soon" /
"Placeholder" tag. To replace one:

1. Drop the new file in `assets/media/` (GIF, or better, a small MP4/WebM).
2. In `index.html`, change the `src` of that `<img>` (or swap it for
   `<video src="..." autoplay muted loop playsinline></video>`), and delete the `<span class="tag">` next to it.

| Slot | File |
|---|---|
| Dual-wield gunplay | `assets/media/feature-dual-wield.jpg` |
| Dodge & ricochet | `assets/media/feature-dodge.jpg` |
| Time is currency | `assets/media/feature-time.jpg` |
| Boss showdowns | `assets/media/feature-boss.jpg` |
| Paradox encounters | `assets/media/feature-paradox.jpg` |
| Challenges & leaderboards | `assets/media/feature-challenges.jpg` |
| Stage 01 Wild West | `assets/media/level-01.jpg` |
| Stage 02 Bank Heist (placeholder crop) | `assets/media/level-02.jpg` |
| Stage 03 Coming soon | `assets/media/level-03.jpg` |

Screenshots are in `assets/img/shots/`, key art and logos in `assets/img/`. The page uses the draft
"fractured time" logo (`logo-fracture.webp`, black keyed out to transparency); the press kit still offers the
current `logo.png`.

## Links to keep up to date

- Meta Quest wishlist and demo, itch.io, SideQuest: in the hero, the "Where to play" section and the final CTA.
- Steam: marked "Coming later" in "Where to play"; swap the disabled button for a link when the page is live.
- Trailer: YouTube id `glyHTb7BkSE` on the `.yt` button (the player loads only when clicked).
- `privacy.html` and `terms.html` hold the Time Ranger privacy policy and terms (same text as the Squarespace code
  blocks of 17 November 2026), styled by `legal.css`. The footer links to both and to invisiblegamedesign.com.
- Deploy: pushing to `main` publishes to GitHub Pages.
