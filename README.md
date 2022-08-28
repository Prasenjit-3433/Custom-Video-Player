# Custom-Video-Player
A modern looking video player feat. HTML5 Video API

Tech Stack: HTML, CSS, Vanilla Js (no framework or SDK).

*** Implementation ***
* First of all, we added an SVG as a hero image because an svg can scale upto any size according as the size of the viewport.
* Then added a video element with `playsinline` attribute which gonna prevent the video to be played in full screen mode by default on mobile views.
* Building UI: [Play Icon](https://fontawesome.com/icons/play?s=solid), video, Mobile responsiveness.
* Making `video` element to take `min-width: 800px` & `max-width: 80vw` and on large smart phone (600px or less), `min-width: 0` & `max-width: 90%`.
* Building UI: controls HTML, show controls on hover.
* By default, `control-container` has opacity 0 but on hover over it, it'll get opacity of 1 and added animation of style `ease-out` with delay of 2s. 
* Building UI: Progress Bar - width, hover
* A progress-bar consists of two parts: the `progress-range` & the `progress-bar` itself. We used `calc()` CSS function to set width of `progress-range` and added some `animation` on hover as the `thikness` increases!.