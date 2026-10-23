# tessera-db.github.io: the Tessera home page

This repository is the root of the Tessera website at **https://tessera-db.github.io/**.
The privacy policy lives in its own repository (`tessera-db/privacy-policy`) and is served at
**https://tessera-db.github.io/privacy-policy/**. The home page links there.

## What's in here
```
index.html              the home page (storefront)
assets/tessera.css      styles and the three themes (Liquid Glass, Dark, Light)
assets/tessera.js       theme switch and the views tabs
assets/fonts/           Bricolage Grotesque and Instrument Sans (self-hosted, no Google Fonts calls)
assets/shots/           app screenshots, one set per theme
assets/og.jpg           link-preview image for Reddit, LinkedIn, WhatsApp and others
favicon.svg, favicon.png, apple-touch-icon.png
```
Don't add a `privacy-policy/` folder to this repository. That address belongs to the privacy-policy repository.

## The Google Play button
Both "Get it on Google Play" buttons link to
`https://play.google.com/store/apps/details?id=com.tessera.app`, which is the listing address for package `com.tessera.app`.

They're styled placeholder buttons. To use Google's official badge instead:
1. Download it from Google's badge page: https://play.google.com/intl/en_us/badges/
2. Save it as `assets/google-play-badge.png`.
3. In `index.html`, find the two blocks that start with `<!-- GOOGLE PLAY: placeholder button`. Replace each `<a class="play" ...>...</a>` with:
   ```html
   <a class="play-badge" href="https://play.google.com/store/apps/details?id=com.tessera.app" target="_blank" rel="noopener">
     <img src="assets/google-play-badge.png" alt="Get it on Google Play" height="58">
   </a>
   ```
