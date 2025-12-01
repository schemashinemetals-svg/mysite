// Main JS: nav toggle, year, reveal on scroll, gallery slider, simple form validation
(function () {
    // Nav toggle
    const navToggle = document.getElementById('navToggle');
    const nav = document.getElementById('mainNav');
    if (navToggle && nav) {
        navToggle.addEventListener('click', function () {
            const open = nav.classList.toggle('open');
            navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        });
    }

    // Footer year
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // Reveal on scroll using IntersectionObserver
    const revealTargets = document.querySelectorAll('.reveal, .reveal-on-scroll .card, .reveal-on-scroll h2, .reveal-on-scroll p');
    if ('IntersectionObserver' in window && revealTargets.length) {
        const ro = new IntersectionObserver((entries) => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    e.target.classList.add('visible');
                    // if you want to unobserve to save performance
                    ro.unobserve(e.target);
                }
            });
        }, { threshold: 0.12 });
        revealTargets.forEach(t => ro.observe(t));
    } else {
        // fallback: make them visible
        revealTargets.forEach(t => t.classList.add('visible'));
    }

    // Gallery slider (if present)
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

    // Simple contact form validation
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
        // allow mailto fallback to work
        return true;
    };
})();

document.addEventListener('DOMContentLoaded', () => {
    const listItems = document.querySelectorAll('.premium-bullets li');

    const observerOptions = {
        threshold: 0.5 // Trigger when 50% of the item is visible
    };

    const observerCallback = (entries, observer) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add staggered delay
                setTimeout(() => {
                    entry.target.classList.add('is-visible');
                }, index * 100); // 100ms delay between each item
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    listItems.forEach(item => {
        observer.observe(item);
    });
});
// Lightbox popup functionality
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxClose = document.getElementById("lightboxClose");

document.querySelectorAll(".carousel img").forEach(img => {
    img.addEventListener("click", () => {
        lightbox.classList.add("active");
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
    });
});

lightboxClose.addEventListener("click", () => {
    lightbox.classList.remove("active");
});

// Close when clicking outside the image
lightbox.addEventListener("click", e => {
    if (e.target === lightbox) {
        lightbox.classList.remove("active");
    }
});

 
<script>
document.querySelector(".nav-toggle")?.addEventListener("click", () => {
        document.querySelector(".main-nav").classList.toggle("open");
});
</script>
