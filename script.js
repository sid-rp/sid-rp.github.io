// Theme Toggle Functionality
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const navRight = document.querySelector('.nav-right');
    const navLinks = document.querySelectorAll('nav ul li a');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Check for saved theme preference or use device preference
    const savedTheme = localStorage.getItem('theme');
    
    // Apply the saved theme or device preference
    if (savedTheme === 'dark' || (savedTheme === null && prefersDarkScheme.matches)) {
        document.body.classList.add('dark-theme');
    }
    
    // Toggle theme on button click
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        
        // Save preference to localStorage
        const isDarkTheme = document.body.classList.contains('dark-theme');
        localStorage.setItem('theme', isDarkTheme ? 'dark' : 'light');
    });
    
    // Mobile menu toggle functionality
    mobileMenuToggle.addEventListener('click', () => {
        mobileMenuToggle.classList.toggle('hamburger-active');
        navRight.classList.toggle('active');
        document.body.classList.toggle('no-scroll'); // Prevent scrolling when menu is open
    });
    
    // Close mobile menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navRight.classList.contains('active')) {
                mobileMenuToggle.classList.remove('hamburger-active');
                navRight.classList.remove('active');
                document.body.classList.remove('no-scroll');
            }
        });
    });
    
    // Update current year and last updated date in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    const lastUpdatedElement = document.getElementById('last-updated-date');
    if (lastUpdatedElement) {
        const currentDate = new Date();
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        lastUpdatedElement.textContent = currentDate.toLocaleDateString('en-US', options);
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 70, // Offset for header height
                behavior: 'smooth'
            });
        }
    });
});

// Add active class to nav items on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('nav ul li a');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// Animated Timeline functionality
function initializeTimelineAnimation() {
    const timelineLine = document.querySelector('.timeline-line');
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    if (!timelineLine || timelineItems.length === 0) return;
    
    // Create intersection observer for timeline line
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });
    
    // Create intersection observer for timeline items
    const itemsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add a small delay for staggered animation
                const index = Array.from(timelineItems).indexOf(entry.target);
                setTimeout(() => {
                    entry.target.classList.add('animate');
                }, index * 200); // 200ms delay between each item
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Observe timeline line
    timelineObserver.observe(timelineLine);
    
    // Observe each timeline item
    timelineItems.forEach(item => {
        itemsObserver.observe(item);
    });
}

// Initialize timeline animation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeTimelineAnimation();
});

// Dynamic Typing Animation
class TypingAnimation {
    constructor(element, texts, typeSpeed = 100, backSpeed = 50, backDelay = 2000) {
        this.element = element;
        this.texts = texts;
        this.typeSpeed = typeSpeed;
        this.backSpeed = backSpeed;
        this.backDelay = backDelay;
        this.textIndex = 0;
        this.charIndex = 0;
        this.isDeleting = false;
        this.cursor = document.querySelector('.cursor');
        
        this.type();
    }
    
    type() {
        const currentText = this.texts[this.textIndex];
        
        if (this.isDeleting) {
            // Deleting characters
            this.element.textContent = currentText.substring(0, this.charIndex - 1);
            this.charIndex--;
            
            if (this.charIndex === 0) {
                this.isDeleting = false;
                this.textIndex = (this.textIndex + 1) % this.texts.length;
                setTimeout(() => this.type(), 500); // Pause before typing next text
                return;
            }
        } else {
            // Typing characters
            this.element.textContent = currentText.substring(0, this.charIndex + 1);
            this.charIndex++;
            
            if (this.charIndex === currentText.length) {
                this.isDeleting = true;
                setTimeout(() => this.type(), this.backDelay); // Pause before deleting
                return;
            }
        }
        
        // Add typing class to cursor to stop blinking while typing
        if (this.cursor) {
            this.cursor.classList.add('typing');
        }
        
        const speed = this.isDeleting ? this.backSpeed : this.typeSpeed;
        setTimeout(() => this.type(), speed);
    }
    
    // Method to pause typing animation
    pause() {
        this.isPaused = true;
        if (this.cursor) {
            this.cursor.classList.remove('typing');
        }
    }
    
    // Method to resume typing animation
    resume() {
        this.isPaused = false;
        if (!this.isPaused) {
            this.type();
        }
    }
}

// Initialize typing animation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const typedTextElement = document.querySelector('.typed-text');
    
    if (typedTextElement) {
        const texts = [
            'Computer Science Graduate @ NYU',
            'Computer Vision Researcher',
            'Machine Learning Engineer',
            'Backend/Cloud Engineer',
            'AI/ML Enthusiast'
        ];
        
        // Start typing animation after a short delay
        setTimeout(() => {
            new TypingAnimation(typedTextElement, texts, 80, 40, 2500);
        }, 1000);
    }
});

// Back to Top Button functionality
function initializeBackToTop() {
    const backToTopButton = document.getElementById('back-to-top');
    
    if (!backToTopButton) return;
    
    // Show/hide button based on scroll position
    function toggleBackToTopButton() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    }
    
    // Smooth scroll to top
    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
    
    // Event listeners
    window.addEventListener('scroll', toggleBackToTopButton);
    backToTopButton.addEventListener('click', scrollToTop);
    
    // Keyboard accessibility
    backToTopButton.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            scrollToTop();
        }
    });
}

// Initialize back to top functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeBackToTop();
});
