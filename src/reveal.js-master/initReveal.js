Reveal.initialize({
    controls: true,
    progress: true,
    center: true,
    hash: true,
    autoPlayMedia: true, // for da video
    transitionSpeed: 100000, // milliseconds
    transition: 'concave', // none/fade/slide/convex/concave/zoom

    // Optional reveal.js plugins
    dependencies: [
        { src: 'plugin/highlight/highlight.js', async: true },
        { src: 'plugin/zoom-js/zoom.js', async: true },
        { src: 'plugin/notes/notes.js', async: true }
    ]
});