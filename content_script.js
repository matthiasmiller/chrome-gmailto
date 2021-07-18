(function() {
    document.addEventListener("click", function (e) {
        if (e.target.tagName == 'A' &&
            e.target.href.toLowerCase().indexOf('mailto:') == 0) {

            e.preventDefault(); // Prevent a link from following the URL

            MailtoAnywhere.getTemplate(function(urlTemplate) {
                var url = MailtoAnywhere.parseURL(urlTemplate, e.target.href);
                window.open(url);
            });
        }
    });
})();
