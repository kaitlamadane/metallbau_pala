/* ==================================================================
   METALLBAU PALA – JAVASCRIPT
   ------------------------------------------------------------------
   Inhalt:
     1. DOM-Referenzen
     2. Mobile Navigation (Hamburger-Menü)
     3. Header Scroll-Effekt (Hintergrund wird dunkel)
     4. Smooth Scrolling & Mobile-Menü schließen
     5. Portfolio-Filter (Leistungen)
     6. Scroll-Reveal Animation
   ================================================================== */


/* ==================================================================
   1. DOM-REFERENZEN
   ================================================================== */
const header      = document.getElementById('header');
const navToggle   = document.getElementById('nav-toggle');
const navMenu     = document.getElementById('nav-menu');
const navLinks    = document.querySelectorAll('.nav__link');
const filterBtns  = document.querySelectorAll('.filter__btn');
const projectCards = document.querySelectorAll('.project-card');


/* ==================================================================
   2. MOBILE NAVIGATION (Hamburger-Menü)
   ------------------------------------------------------------------
   Klick auf den Hamburger-Button öffnet/schließt das mobile Menü.
   ================================================================== */
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('nav__menu--open');
    navToggle.classList.toggle('nav__toggle--active');
});


/* ==================================================================
   3. HEADER SCROLL-EFFEKT
   ------------------------------------------------------------------
   Wenn der Benutzer mehr als 50px scrollt, bekommt der Header
   einen dunklen Hintergrund (.header--scrolled).
   ================================================================== */
const SCROLL_THRESHOLD = 50;

function handleHeaderScroll() {
    if (window.scrollY > SCROLL_THRESHOLD) {
        header.classList.add('header--scrolled');
    } else {
        header.classList.remove('header--scrolled');
    }
}

window.addEventListener('scroll', handleHeaderScroll);
/* Sofort beim Laden prüfen (z.B. wenn die Seite nicht ganz oben startet) */
handleHeaderScroll();


/* ==================================================================
   4. SMOOTH SCROLLING & MOBILE-MENÜ SCHLIESSEN
   ------------------------------------------------------------------
   Beim Klick auf einen Menüpunkt:
   - Weiches Scrollen zum Zielbereich (über HTML scroll-behavior)
   - Mobiles Menü wird geschlossen
   ================================================================== */
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        /* Mobiles Menü schließen */
        navMenu.classList.remove('nav__menu--open');
        navToggle.classList.remove('nav__toggle--active');
    });
});


/* ==================================================================
   5. PORTFOLIO-FILTER (Leistungen)
   ------------------------------------------------------------------
   Filtert die Projekt-Karten nach Kategorie.
   - data-filter="all" zeigt alle Karten
   - data-filter="industriebau" zeigt nur Karten mit
     data-category="industriebau" usw.
   ================================================================== */
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        /* Aktiven Button aktualisieren */
        filterBtns.forEach(b => b.classList.remove('filter__btn--active'));
        btn.classList.add('filter__btn--active');

        const selectedFilter = btn.getAttribute('data-filter');

        projectCards.forEach(card => {
            const category = card.getAttribute('data-category');

            if (selectedFilter === 'all' || category === selectedFilter) {
                card.classList.remove('project-card--hidden');
            } else {
                card.classList.add('project-card--hidden');
            }
        });
    });
});


/* ==================================================================
   6. SCROLL-REVEAL ANIMATION
   ------------------------------------------------------------------
   Elemente mit der Klasse .reveal werden sichtbar, wenn sie in
   den Viewport scrollen (IntersectionObserver).
   ================================================================== */
function initScrollReveal() {
    /* Elemente, die beim Scrollen eingeblendet werden sollen */
    const revealElements = document.querySelectorAll(
        '.section__header, .project-card, .unternehmen__text, .unternehmen__image, .kontakt__content'
    );

    /* Klasse .reveal hinzufügen (anfangs unsichtbar) */
    revealElements.forEach(el => el.classList.add('reveal'));

    /* IntersectionObserver erstellen */
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal--visible');
                observer.unobserve(entry.target);  /* Nur einmal auslösen */
            }
        });
    }, {
        threshold: 0.15,    /* 15% des Elements müssen sichtbar sein */
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
}

/* Scroll-Reveal starten, sobald die Seite geladen ist */
document.addEventListener('DOMContentLoaded', initScrollReveal);
