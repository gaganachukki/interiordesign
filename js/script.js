document.addEventListener('DOMContentLoaded', () => {
    // ========================
    // Preloader & Hero Animation
    // ========================
    const preloader = document.getElementById('preloader');
    if (preloader) {
        // Hide preloader after 2 seconds and start hero animations
        setTimeout(() => {
            preloader.classList.add('hidden');
            
            // Trigger hero content animations on all pages
            const heroContent = document.querySelector('.hero-content');
            const pageHeroContent = document.querySelector('.page-hero-content');
            
            if (heroContent) {
                heroContent.classList.add('animate-hero');
            }
            if (pageHeroContent) {
                pageHeroContent.classList.add('animate-hero');
            }
        }, 2000);
    }

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // ========================
    // Hamburger Menu Toggle
    // ========================
    const hamburger = document.querySelector('.hamburger');
    const mobileOverlay = document.querySelector('.mobile-menu-overlay');

    if (hamburger && mobileOverlay) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            mobileOverlay.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        });

        // Close mobile menu when a link is clicked
        const mobileLinks = mobileOverlay.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                mobileOverlay.classList.remove('active');
                document.body.classList.remove('no-scroll');
            });
        });

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mobileOverlay.classList.contains('active')) {
                hamburger.classList.remove('active');
                mobileOverlay.classList.remove('active');
                document.body.classList.remove('no-scroll');
            }
        });
    }

    // ========================
    // Dashboard Hamburger Menu Toggle (Mobile)
    // ========================
    const dashboardHamburger = document.querySelector('.hamburger-dashboard');
    const dashboardSidebar = document.querySelector('.dashboard-sidebar');
    const closeSidebarBtn = document.querySelector('.close-sidebar');

    if (dashboardHamburger && dashboardSidebar) {
        // Open sidebar on hamburger click
        dashboardHamburger.addEventListener('click', () => {
            dashboardSidebar.classList.add('active');
            document.body.classList.add('no-scroll');
        });

        // Close sidebar on close button click
        if (closeSidebarBtn) {
            closeSidebarBtn.addEventListener('click', () => {
                dashboardSidebar.classList.remove('active');
                document.body.classList.remove('no-scroll');
            });
        }

        // Close sidebar when a nav-link is clicked
        const dashboardNavLinks = dashboardSidebar.querySelectorAll('.nav-link');
        dashboardNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                dashboardSidebar.classList.remove('active');
                document.body.classList.remove('no-scroll');
            });
        });

        // Close sidebar when logout link is clicked
        const logoutLink = dashboardSidebar.querySelector('.logout-link');
        if (logoutLink) {
            logoutLink.addEventListener('click', () => {
                dashboardSidebar.classList.remove('active');
                document.body.classList.remove('no-scroll');
            });
        }

        // Close sidebar on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && dashboardSidebar.classList.contains('active')) {
                dashboardSidebar.classList.remove('active');
                document.body.classList.remove('no-scroll');
            }
        });
    }

    // ========================
    // Scroll Animations
    // ========================
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => observer.observe(el));

    // ========================
    // Count Animation
    // ========================
    const countElements = document.querySelectorAll('.count-animate');
    const countedElements = new Set();

    const countObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !countedElements.has(entry.target)) {
                countedElements.add(entry.target);
                animateCount(entry.target);
            }
        });
    }, { threshold: 0.5 });

    countElements.forEach(el => countObserver.observe(el));

    function animateCount(element) {
        const target = parseInt(element.getAttribute('data-target'));
        const suffix = element.getAttribute('data-suffix') || '';
        let current = 0;
        const increment = Math.ceil(target / 30);
        const speed = 50;

        const counter = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(counter);
            }
            element.textContent = current + suffix;
        }, speed);
    }

    // ========================
    // Portfolio Filtering
    // ========================
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    if (filterBtns.length > 0 && portfolioItems.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                filterBtns.forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                btn.classList.add('active');

                const filterValue = btn.getAttribute('data-filter');

                portfolioItems.forEach(item => {
                    if (filterValue === 'all' || item.classList.contains(`category-${filterValue}`)) {
                        item.classList.remove('hidden');
                        setTimeout(() => item.style.opacity = '1', 50);
                    } else {
                        item.classList.add('hidden');
                        item.style.opacity = '0';
                    }
                });
            });
        });
    }

    // ========================
    // Contact Form Submission
    // ========================
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Check if all required fields are filled
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            if (name && email && message) {
                // Redirect to 404 page if form is filled
                window.location.href = '404.html';
            } else {
                // Optionally show error message if fields are empty
                alert('Please fill in all required fields.');
            }
        });
    }

    // ========================
    // Hero Slideshow
    // ========================
    const slides = document.querySelectorAll('.hero-slideshow .slide');
    if (slides.length > 0) {
        let currentSlide = 0;
        setInterval(() => {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }, 3000);
    }

    // ========================
    // FAQ Accordion
    // ========================
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            const isActive = question.classList.contains('active');

            // Close all others
            faqQuestions.forEach(q => {
                q.classList.remove('active');
                q.nextElementSibling.style.maxHeight = null;
            });

            // Toggle current
            if (!isActive) {
                question.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });
});
