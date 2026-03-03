document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       Sticky Header on Scroll
       ========================================================================== */
    const header = document.getElementById('header');

    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on init

    /* ==========================================================================
       Mobile Navigation Toggle
       ========================================================================== */
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');
    const navItems = navLinks.querySelectorAll('a');

    const toggleMenu = () => {
        navLinks.classList.toggle('active');
        const icon = mobileMenuBtn.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('ph-list');
            icon.classList.add('ph-x');
        } else {
            icon.classList.remove('ph-x');
            icon.classList.add('ph-list');
        }
    };

    mobileMenuBtn.addEventListener('click', toggleMenu);

    // Close menu when clicking a link
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    /* ==========================================================================
       Form Submission Handling
       ========================================================================== */
    const quoteForm = document.getElementById('quoteForm');
    const formMessage = document.getElementById('formMessage');

    if (quoteForm) {
        quoteForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // In a real application, here we would use fetch() to send the data
            // to the designated email or backend endpoint.
            //
            // const formData = new FormData(quoteForm);
            // const data = Object.fromEntries(formData);
            // console.log("Form Data Submitted:", data);

            // Show Success Message
            formMessage.innerHTML = '<i class="ph-fill ph-check-circle"></i> Success! We have received your request and will contact you shortly with an instant quote.';
            formMessage.classList.remove('hidden');
            formMessage.classList.add('success');

            // Reset Form fields
            quoteForm.reset();

            // Hide the message after 5 seconds
            setTimeout(() => {
                formMessage.classList.add('hidden');
            }, 5000);
        });
    }

    /* ==========================================================================
       Smooth Scrolling for Anchor Links
       ========================================================================== */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                e.preventDefault();

                // Adjust scroll position for sticky header
                const headerHeight = header.offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.scrollY - headerHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    /* ==========================================================================
       Scroll Animations with Intersection Observer
       ========================================================================== */
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Trigger when 15% of the element is visible
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Optional: Stop observing once animated
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(element => {
        scrollObserver.observe(element);
    });

    /* ==========================================================================
       Stagger delays for grid items automatically
       ========================================================================== */
    const grids = document.querySelectorAll('.features-grid, .services-grid, .steps-grid');
    grids.forEach(grid => {
        Array.from(grid.children).forEach((child, index) => {
            const delay = (index % 6 + 1) * 100; // delays 100-600
            child.classList.add(`delay-${delay}`);
        });
    });

});
