// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navbar = document.querySelector('.navbar');
    
    // ---------- Mobile menu toggle ----------
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.textContent = navMenu.classList.contains('active') ? '✕' : '☰';
        });
    }

    // ---------- Smooth scrolling for navigation links ----------
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return; // ignore empty links
            const target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Close mobile menu if open
                if (navMenu && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    if (hamburger) hamburger.textContent = '☰';
                }
            }
        });
    });

    // ---------- Navbar background change on scroll ----------
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.backdropFilter = 'blur(10px)';
                navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
            } else {
                navbar.style.background = '#fff';
                navbar.style.backdropFilter = 'none';
                navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
            }
        });
    }

    // ---------- Form submission (prevent default + show message) ----------
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const nameInput = this.querySelector('input[placeholder="Your Name"]');
            const emailInput = this.querySelector('input[placeholder="Your Email"]');
            const subjectInput = this.querySelector('input[placeholder="Subject"]');
            const messageInput = this.querySelector('textarea');

            if (!nameInput.value || !emailInput.value || !messageInput.value) {
                alert('Please fill in all required fields (Name, Email, Message).');
                return;
            }

            // Here you can send data to your backend using fetch()
            // For now, we just simulate success
            alert('Thank you for your message! I will get back to you soon.');
            this.reset();
        });
    }

    // ---------- Animate stats numbers (only once) ----------
    const statsSection = document.querySelector('.about-stats');
    const stats = document.querySelectorAll('.stat-number');
    let animationStarted = false;

    function animateStats() {
        if (animationStarted) return; // ensure it runs only once
        animationStarted = true;

        stats.forEach(stat => {
            const targetText = stat.textContent; // e.g., "50+"
            const targetNumber = parseInt(targetText); // 50
            if (isNaN(targetNumber)) return;

            let current = 0;
            const increment = targetNumber / 50; // increment per step
            const timer = setInterval(() => {
                current += increment;
                if (current >= targetNumber) {
                    stat.textContent = targetNumber + '+';
                    clearInterval(timer);
                } else {
                    stat.textContent = Math.floor(current) + '+';
                }
            }, 20);
        });
    }

    // Intersection Observer for stats animation
    if (statsSection && stats.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateStats();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        observer.observe(statsSection);
    }

    // ---------- Remove redundant hover effect (already in CSS) ----------
    // Project cards hover is handled by CSS, no need for JS.

    // ---------- Console welcome message ----------
    console.log('%c🚀 Portfolio Website Loaded!', 'color: #667eea; font-size: 16px; font-weight: bold;');
    console.log('%c👋 Welcome to Ankit\'s Portfolio', 'color: #764ba2; font-size: 14px;');
});

// ---------- Additional: Add active class to nav links on scroll (optional) ----------
// You can uncomment this if you want to highlight the current section in navbar
/*
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});
*/