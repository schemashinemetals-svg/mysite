// Basic UI interactions: mobile nav toggle, footer years, simple contact validation

document.addEventListener('DOMContentLoaded', function () {
    // Toggle any navs
    document.querySelectorAll('.nav-toggle').forEach(function (btn) {
        btn.addEventListener('click', function () {
            // find next .main-nav sibling or global by id
            // We toggle the nearest .main-nav in the header
            let header = btn.closest('.site-header');
            if (!header) return;
            let nav = header.querySelector('.main-nav');
            if (!nav) return;
            nav.classList.toggle('open');
        });
    });

    // Year in footer(s)
    const year = new Date().getFullYear();
    document.querySelectorAll('[id^="year"]').forEach(function (el) {
        el.textContent = year;
    });
});

// Simple contact form validation before mailto fallback
function validateContactForm() {
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const material = document.getElementById('material');
    const message = document.getElementById('message');

    if (!name || !email || !material || !message) return true;

    function showAlert(msg) { alert(msg); }

    if (name.value.trim().length < 2) {
        showAlert('Please enter your name.');
        name.focus();
        return false;
    }
    if (!/^\S+@\S+\.\S+$/.test(email.value.trim())) {
        showAlert('Please enter a valid email.');
        email.focus();
        return false;
    }
    if (material.value.trim() === '') {
        showAlert('Please select a material.');
        material.focus();
        return false;
    }
    if (message.value.trim().length < 10) {
        showAlert('Please provide more details in message (min 10 characters).');
        message.focus();
        return false;
    }

    // If you have server-side form handling, submit normally.
    // Currently the form uses mailto fallback. Return true to allow submission.
    return true;
}
