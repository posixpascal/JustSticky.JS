# JustSticky.JS

JustSticky.JS is another super tiny JS solution to make things sticky.
You can see it live on my website when scrolling past the navigation bar.

## How to use
JustSticky provides a single global function for defining an element sticky:

```javascript
	JustSticky(".domSelector", {/* options */});
```

JustSticky debounces the `window.scroll` event to prevent any lags which could occur. 
When an element is sticky, JustSticky attaches a CSS class to it (namely `just-sticky`).

Also it sets the element's zIndex to 9999 and it's position to fixed (top => 0).
If you don't want these values, you can overwrite them with the `just-sticky` CSS class.

## Why?
JustSticky was born because I needed a JustSticky solution for myself an didn't bother trying to include what others already made.
It's neither feature-rich nor battle-tested but it does it job on my website.

Feel free to contribute if you want to.