var GmailTo = (function() {
    var GOOGLE_DEFAULT = 'https://mail.google.com/mail/?extsrc=mailto&url={URL}';
    var PRESETS = {
        'Google (Default Account)': GOOGLE_DEFAULT,
        'Google (Account #1)': 'https://mail.google.com/mail/u/0/?extsrc=mailto&url={URL}',
        'Google (Account #2)': 'https://mail.google.com/mail/u/1/?extsrc=mailto&url={URL}',
        'Google (Account #3)': 'https://mail.google.com/mail/u/2/?extsrc=mailto&url={URL}',
        'Google (Account #4)': 'https://mail.google.com/mail/u/3/?extsrc=mailto&url={URL}',
        'Google (Account #5)': 'https://mail.google.com/mail/u/4/?extsrc=mailto&url={URL}',
        'AOL': 'http://webmail.aol.com/Mail/ComposeMessage.aspx?{RAW_QUERY}',
        'Yahoo! Mail': 'http://compose.mail.yahoo.com/?{RAW_QUERY}',
        'Hotmail/Live.com': 'https://outlook.live.com/owa/#{RAW_QUERY}&path=%2fmail%2faction%2fcompose'
    }

    return {
        getPresets: function() {
            return PRESETS;
        },

        getTemplate: function (callback) {
            chrome.storage.sync.get({
                url: GOOGLE_DEFAULT
            }, function (items) {
                callback(items.url);
            });
        },

        parseURL: function (template, mailto) {
            const url = new URL(mailto);

            const dest = template.replace(/{([^}]*)}/g, function (keyword) {
                // Trim the curly braces.
                var keyword = keyword.substr(1, keyword.length - 2).toLowerCase();

                // Handle special keywords
                if (keyword == 'url')
                    return encodeURIComponent(mailto);
                if (keyword == 'raw_query')
                    return url.search.substr(1); //remove ?
                if (keyword == 'to')
                    return encodeURIComponent(url.pathname);

                // Pull the rest from the mailto query string.
                return encodeURIComponent(url.searchParams.get(keyword) || '');
            });
            return dest;
        }
    }
})();
