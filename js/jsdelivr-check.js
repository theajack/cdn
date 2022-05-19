(function () {
    const SOURCE = 'https://cdn.jsdelivr.net';
    const DEST = 'https://gcore.jsdelivr.net'; // fastly.jsdelivr.net
    const $ = document.querySelectorAll.bind(document);
    const checkAvailable = function (callback) {
        const img = new Image();
        const timeoutId = setTimeout(function () {
            callback(false);
        }, 3000);
        img.addEventListener('load', function () {
            clearTimeout(timeoutId);
            callback(true);
        });

        img.src = SOURCE + '/favicon.ico';
    };

    const replaceElementSrc = () => {
        for (const element of $('img')) {
            if (element.src && element.src.indexOf(SOURCE) !== -1) {
                element.src = element.src.replace(SOURCE, DEST);
            }
        }

        for (const element of $('link[rel="stylesheet"]')) {
            if (element.href && element.href.indexOf(SOURCE) !== -1) {
                element.href = element.href.replace(SOURCE, DEST);
            }
        }

        for (const element of $('script')) {
            if (element.src && element.src.indexOf(SOURCE) !== -1) {
                const newNode = document.createElement('script');
                newNode.src = element.src.replace(SOURCE, DEST);
                element.after(newNode);
                element.remove();
            }
        }
    };

    console.log(document.currentScript);

    checkAvailable(function (isAvailable) {
        if (isAvailable) {
            return;
        }

        console.warn(SOURCE + ' is not available.');

        replaceElementSrc();
        // Replace dynamically added elements

        var currentScript = document.currentScript || ([].slice.call(document.getElementsByTagName('script')).find(function() {
            return item.src.indexOf('jsdelivr-check') !== -1
        }));

        var interval = currentScript.getAttribute('interval');
        if(interval){
            interval = parseInt(interval);
            if(typeof interval === 'number' && !Number.isNaN(interval)){
                setInterval(replaceElementSrc, parseInt(interval));
            }
        }
    });
})();
