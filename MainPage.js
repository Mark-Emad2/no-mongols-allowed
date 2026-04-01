window.addEventListener('load', function () {

    var heading = document.getElementById('leftH');
    var quote = document.getElementById('leftP');
    var titleLine = document.querySelector('.title-line');
    var quoteDecor = document.querySelector('.quote-decor');
    var cornerDecor = document.querySelector('.corner-decor');
    var sideWord = document.querySelector('.side-word');
    var authLinks = document.querySelector('.auth-links');
    var navItems = document.querySelectorAll('nav ul li');

    // Nav items fade in
    navItems.forEach(function (item, index) {
        setTimeout(function () {
            item.animate([
                { opacity: 0, transform: 'translateY(-15px)' },
                { opacity: 1, transform: 'translateY(0)' }
            ], {
                duration: 600,
                fill: 'forwards',
                easing: 'ease'
            });
        }, 100 + (index * 150));
    });

    // Corner decor
    setTimeout(function () {
        cornerDecor.animate([
            { width: '0px', height: '0px' },
            { width: '55px', height: '0px', offset: 0.5 },
            { width: '55px', height: '55px' }
        ], {
            duration: 1000,
            fill: 'forwards',
            easing: 'ease'
        });
    }, 300);

    // Heading
    setTimeout(function () {
        heading.animate([
            { opacity: 0, transform: 'translateY(30px)' },
            { opacity: 1, transform: 'translateY(0)' }
        ], {
            duration: 1200,
            fill: 'forwards',
            easing: 'ease'
        });
    }, 500);

    // Title line expand
    setTimeout(function () {
        titleLine.animate([
            { width: '0px' },
            { width: '180px' }
        ], {
            duration: 800,
            fill: 'forwards',
            easing: 'ease'
        });
    }, 800);

    // Quote decor fade in
    setTimeout(function () {
        quoteDecor.animate([
            { opacity: 0 },
            { opacity: 0.5 }
        ], {
            duration: 1000,
            fill: 'forwards',
            easing: 'ease'
        });
    }, 1000);

    // Quote text
    setTimeout(function () {
        quote.animate([
            { opacity: 0, transform: 'translateY(30px)' },
            { opacity: 1, transform: 'translateY(0)' }
        ], {
            duration: 1200,
            fill: 'forwards',
            easing: 'ease'
        });
    }, 1200);

    // Side word
    setTimeout(function () {
        sideWord.animate([
            { opacity: 0 },
            { opacity: 0.9 }
        ], {
            duration: 1200,
            fill: 'forwards',
            easing: 'ease'
        });
    }, 1400);

    // Auth links
    setTimeout(function () {
        authLinks.animate([
            { opacity: 0, transform: 'translateY(20px)' },
            { opacity: 1, transform: 'translateY(0)' }
        ], {
            duration: 1000,
            fill: 'forwards',
            easing: 'ease'
        });
    }, 1600);


    var scrollElements = document.querySelectorAll('.autoShow');

    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.2
    });

    scrollElements.forEach(function (el) {
        observer.observe(el);
    });

});