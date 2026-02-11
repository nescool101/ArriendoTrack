/**
 * ArriendoTrack - Main JavaScript
 * Language toggle & UI interactions
 */

(function () {
    'use strict';

    // ========== Language Toggle ==========
    const LANG_KEY = 'arriendotrack_lang';
    let currentLang = localStorage.getItem(LANG_KEY) || 'es';

    function setLanguage(lang) {
        currentLang = lang;
        localStorage.setItem(LANG_KEY, lang);

        // Update all elements with data-es / data-en attributes
        document.querySelectorAll('[data-es][data-en]').forEach(function (el) {
            var text = el.getAttribute('data-' + lang);
            if (text) {
                if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                    el.placeholder = text;
                } else {
                    el.textContent = text;
                }
            }
        });

        // Update html lang attribute
        document.documentElement.lang = lang;

        // Update active state on toggle
        document.querySelectorAll('.lang-option').forEach(function (opt) {
            opt.classList.toggle('active', opt.getAttribute('data-lang') === lang);
        });

        // Update page title
        if (lang === 'en') {
            document.title = 'ArriendoTrack - Automate Your Rental Billing';
        } else {
            document.title = 'ArriendoTrack - Automatiza tus Cuentas de Cobro de Arrendamiento';
        }
    }

    // Language toggle click
    var langToggle = document.getElementById('langToggle');
    if (langToggle) {
        langToggle.addEventListener('click', function () {
            setLanguage(currentLang === 'es' ? 'en' : 'es');
        });
    }

    // Initialize language
    setLanguage(currentLang);

    // ========== Mobile Menu ==========
    var mobileMenuBtn = document.getElementById('mobileMenuBtn');
    var navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', function () {
            navLinks.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
        });

        // Close menu on link click
        navLinks.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                navLinks.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
            });
        });
    }

    // ========== Smooth Scroll for anchor links ==========
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            var targetId = this.getAttribute('href');
            if (targetId === '#') return;

            var target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // ========== Header scroll effect ==========
    var header = document.querySelector('.header');
    var lastScroll = 0;

    window.addEventListener('scroll', function () {
        var currentScroll = window.pageYOffset;

        if (currentScroll > 50) {
            header.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
        } else {
            header.style.boxShadow = 'none';
        }

        lastScroll = currentScroll;
    });

    // ========== Intersection Observer for animations ==========
    var observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
    };

    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Animate cards on scroll
    document.querySelectorAll('.step-card, .feature-card, .pricing-card').forEach(function (el) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(el);
    });

})();
