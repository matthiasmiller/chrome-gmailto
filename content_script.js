document.addEventListener("click", function (e) {
    if (e.target.tagName == 'A' &&
        e.target.href.toLowerCase().indexOf('mailto:') == 0) {

        e.preventDefault(); // Prevent a link from following the URL
        var url = 'https://mail.google.com/mail/?extsrc=mailto&url=';
        url += encodeURIComponent(e.target.href);
        window.open(url);
    }
});
