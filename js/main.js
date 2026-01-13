// Main JS: nav toggle, footer year, reveal on scroll, gallery slider, premium bullets, contact form validation, lightbox
(function () {
    // --------------------------
    // Nav toggle
    // --------------------------
    const navToggle = document.getElementById('navToggle');
    const nav = document.getElementById('mainNav');
    if (navToggle && nav) {
        navToggle.addEventListener('click', function () {
            const open = nav.classList.toggle('open');
            navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        });
    }

    // --------------------------
    // Footer year
    // --------------------------
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // --------------------------
    // Reveal on scroll using IntersectionObserver
    // --------------------------
    const revealTargets = document.querySelectorAll('.reveal, .reveal-on-scroll .card, .reveal-on-scroll h2, .reveal-on-scroll p');
    if ('IntersectionObserver' in window && revealTargets.length) {
        const ro = new IntersectionObserver((entries) => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    e.target.classList.add('visible');
                    ro.unobserve(e.target); // Stop observing for performance
                }
            });
        }, { threshold: 0.12 });
        revealTargets.forEach(t => ro.observe(t));
    } else {
        // fallback: make them visible
        revealTargets.forEach(t => t.classList.add('visible'));
    }

    // --------------------------
    // Gallery slider
    // --------------------------
    const slides = document.querySelector('.slides');
    const images = slides ? slides.querySelectorAll('img') : [];
    const thumbs = document.querySelectorAll('.thumbnails img');
    const prev = document.querySelector('.prev');
    const next = document.querySelector('.next');

    if (slides && images.length) {
        let index = 0;

        function showSlide(i) {
            index = (i + images.length) % images.length;
            slides.style.transform = `translateX(-${index * 100}%)`;
            thumbs.forEach((t, j) => t.classList.toggle('active', j === index));
        }

        if (next) next.addEventListener('click', () => showSlide(index + 1));
        if (prev) prev.addEventListener('click', () => showSlide(index - 1));
        thumbs.forEach((t, i) => t.addEventListener('click', () => showSlide(i)));

        // auto slide
        setInterval(() => showSlide(index + 1), 4000);
    }

    // --------------------------
    // Simple contact form validation
    // --------------------------
    window.validateContactForm = function () {
        const form = document.getElementById('contactForm');
        if (!form) return true;
        const required = form.querySelectorAll('[required]');
        for (let el of required) {
            if (!el.value || el.value.trim() === '') {
                el.focus();
                alert('Please complete the required fields.');
                return false;
            }
        }
        return true; // allow mailto fallback
    };

    // --------------------------
    // Premium bullets animation (staggered)
    // --------------------------
    document.addEventListener('DOMContentLoaded', () => {
        const listItems = document.querySelectorAll('.premium-bullets li');

        if (listItems.length) {
            const observerOptions = { threshold: 0.5 };
            const observerCallback = (entries, observer) => {
                entries.forEach((entry, index) => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            entry.target.classList.add('is-visible');
                        }, index * 100); // 100ms stagger
                        observer.unobserve(entry.target);
                    }
                });
            };
            const observer = new IntersectionObserver(observerCallback, observerOptions);
            listItems.forEach(item => observer.observe(item));
        }
    });

    // --------------------------
    // Lightbox popup functionality
    // --------------------------
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightboxImg");
    const lightboxClose = document.getElementById("lightboxClose");
    const carouselImgs = document.querySelectorAll(".carousel img");

    if (lightbox && lightboxImg && lightboxClose && carouselImgs.length) {
        carouselImgs.forEach(img => {
            img.addEventListener("click", () => {
                lightbox.classList.add("active");
                lightboxImg.src = img.src;
                lightboxImg.alt = img.alt;
            });
        });

        lightboxClose.addEventListener("click", () => {
            lightbox.classList.remove("active");
        });

        // Close when clicking outside the image Test
        lightbox.addEventListener("click", e => {
            if (e.target === lightbox) lightbox.classList.remove("active");
        });

        // Close on ESC key
        document.addEventListener("keydown", e => {
            if (e.key === "Escape" && lightbox.classList.contains("active")) {
                lightbox.classList.remove("active");
            }
        });
    }
})();
