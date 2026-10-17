# scripts

`capture-portfolio-screenshots.mjs` — regenerates the portfolio thumbnails under
`public/images/portfolio/`.

`download-images.ps1` was removed: every asset the site uses is now committed under
`public/`, so there is nothing left to fetch from a remote host.

`mockup-video/` — renders the monitor/laptop mockup videos in `public/media/`
(Mashal screens scrolling, 12s loop). See the header of `render.cjs`.
