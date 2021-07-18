document.addEventListener('DOMContentLoaded', function() {
    function loadPresets() {
        document.getElementById('preset').appendChild(document.createElement('OPTION'));

        const presets = MailtoAnywhere.getPresets();
        for (const key in presets) {
            if (presets.hasOwnProperty(key)) {
                const opt = document.createElement('OPTION');
                opt.setAttribute('value', presets[key]);
                opt.appendChild(document.createTextNode(key));
                document.getElementById('preset').appendChild(opt);
            }
        }
    }

    function refreshPreset() {
        const elPresets = document.getElementById('preset');
        elPresets.value = document.getElementById('url').value;
    }

    function refreshURL() {
        const elPresets = document.getElementById('preset');
        if (elPresets.value)
            document.getElementById('url').value = elPresets.value;
    }

    function refreshPreview() {
        const template = document.getElementById('url').value;
        const mailto = 'mailto:to@example.com?' + [
            'cc=cc@example.com',
            'bcc=bcc@example.com',
            'subject=Example%20Subject',
            'Body=Example%20Body'
        ].join('&');

        const url = MailtoAnywhere.parseURL(template, mailto);

        const preview = document.getElementById('preview');
        preview.innerHTML = '';
        preview.appendChild(document.createTextNode(url));
    }

    document.getElementById('url').addEventListener('input', function() {
        refreshPreset();
        refreshPreview();
    });

    document.getElementById('preset').addEventListener('input', function() {
        refreshURL();
        refreshPreview();
    })

    loadPresets();
    MailtoAnywhere.registerTemplateCallback(function(template) {
        document.getElementById('url').value = template;
        refreshPreset();
        refreshPreview();
    });

    document.getElementById('save').addEventListener('click', function() {
        MailtoAnywhere.setTemplate(document.getElementById('url').value, function() {
            window.close();
        });
    })
});


