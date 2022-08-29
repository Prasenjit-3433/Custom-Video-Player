# Custom-Video-Player
A modern looking video player feat. HTML5 Video API

Tech Stack: HTML, CSS, Vanilla Js (no framework or SDK).

*** Implementation ***
* First of all, we added an SVG as a hero image because an svg can scale upto any size according as the size of the viewport.
* Then added a video element with attribute `playsinline` which gonna prevent the video to be played in full screen mode by default on mobile views.
* `UI COMPONENTS`: [Play Icon](https://fontawesome.com/icons/play?s=solid), video, Mobile responsiveness.
* Making `video` element to take `min-width: 800px` & `max-width: 80vw` and on large smart phone (600px or less), `min-width: 0` & `max-width: 90%`.
* On the click on `play-icon` or on the video, the video starts playing and `play-icon` turn into `pause-icon` & vice-versa. Also, when the current playlist is ended i.e. when [ended](https://www.w3schools.com/tags/av_event_ended.asp) event fires, `pause-icon` turn into `play-icon`.
* `UI COMPONENTS`: controls HTML, show controls on hover.
* By default, `control-container` has `opacity` 0 but when hover over it, it'll get opacity of 1 and added animation of style `ease-out` with delay of 2s. 
* `UI COMPONENTS`: Progress Bar - width-increment, hover-effect.
* A progress-bar consists of two parts: the `progress-range` & the `progress-bar` itself. We used `calc()` CSS function to set width of `progress-range` and added some `animation` on hover as the `thikness` increases!.
* On the fire of [canPlay](https://www.w3schools.com/tags/av_event_canplay.asp), [timeupdate](https://www.w3schools.com/tags/av_event_timeupdate.asp) events, the values of these properties `currentTime`, `duration` extracted from `video` element and calculated percentage of `currentTime` in `duration` & set it as `width` of Progress-Bar. Followed by `time-elapsed`, `total-duration` update.
* Also, on the click at different position on progress bar, it'll change current playback position. To do that, extract `offsetX` & `offsetWidth` value from Progress Bar element and calculate the percentage of `offsetX` in `offsetWidth`along `duration`, then update `width` of progress-bar, `time-elapsed`, `total-duration` etc.
* `UI COMPONENTS`: Playback Speed Dropdown.