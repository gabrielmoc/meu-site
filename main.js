var menuIcon = document.querySelector('.menu-icon');
var menu = document.querySelector('nav ul');

menuIcon.addEventListener('click', function() {
    // Alterna a classe 'active' no menu
    menu.classList.toggle('active');
});

var carRevealCards = document.querySelectorAll('[data-car-reveal]');

function runCarReveal(card) {
    if (!card || card.dataset.played === 'true') {
        return;
    }

    card.dataset.played = 'true';

    var dreamImage = card.querySelector('.car-reveal__image--dream');
    var realImage = card.querySelector('.car-reveal__image--real');

    if (!dreamImage || !realImage) {
        return;
    }

    function swapToReality() {
        var finishSwap = function() {
            card.classList.add('is-swapped');
        };

        if (!realImage.getAttribute('src')) {
            realImage.src = realImage.dataset.src;
        }

        if (realImage.complete) {
            finishSwap();
            return;
        }

        realImage.addEventListener('load', finishSwap, { once: true });
    }

    function handleDreamLoaded() {
        card.classList.add('is-loaded');

        setTimeout(function() {
            card.classList.add('is-prank');

            setTimeout(function() {
                swapToReality();
            }, 1050);
        }, 2200);
    }

    card.classList.add('is-active');
    dreamImage.src = dreamImage.dataset.src;

    if (dreamImage.complete) {
        handleDreamLoaded();
        return;
    }

    dreamImage.addEventListener('load', handleDreamLoaded, { once: true });
}

if ('IntersectionObserver' in window && carRevealCards.length > 0) {
    var carRevealObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(function(entry) {
            if (!entry.isIntersecting) {
                return;
            }

            runCarReveal(entry.target);
            observer.unobserve(entry.target);
        });
    }, {
        threshold: 0.45
    });

    carRevealCards.forEach(function(card) {
        carRevealObserver.observe(card);
    });
} else {
    carRevealCards.forEach(function(card) {
        runCarReveal(card);
    });
}
