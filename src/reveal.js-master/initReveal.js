Reveal.initialize({
    controls: true,
    progress: true,
    center: true,
    hash: true,
    transitionSpeed: 1000000, // milliseconds
    transition: 'zoom', // none/fade/slide/convex/concave/zoom

    // Optional reveal.js plugins
    dependencies: [
        { src: 'plugin/highlight/highlight.js', async: true },
        { src: 'plugin/zoom-js/zoom.js', async: true },
        { src: 'plugin/notes/notes.js', async: true }
    ]
});