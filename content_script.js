(function() {
    var urlTemplate;
    GmailTo.getTemplate(function(template) {
        urlTemplate = template;
    });

    document.addEventListener("click", function (e) {
        if (e.target.tagName == 'A' &&
            e.target.href.toLowerCase().indexOf('mailto:') == 0) {

            e.preventDefault(); // Prevent a link from following the URL
            var url = GmailTo.parseURL(urlTemplate, e.target.href);
            window.open(url);
        }
    });
})();
