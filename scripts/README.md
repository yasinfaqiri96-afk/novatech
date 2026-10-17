# scripts

`capture-portfolio-screenshots.mjs` — regenerates the portfolio thumbnails under
`public/images/portfolio/`.

`download-images.ps1` was removed: every asset the site uses is now committed under
`public/`, so there is nothing left to fetch from a remote host.

`mockup-video/` — `render.cjs` renders the home hero monitor video; `imac-portfolio.py`
composites Novatech pages into a real iMac photo for the portfolio intro. See each file's header.
