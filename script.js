// =============================
// Theme Toggle Functionality
// =============================
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const navRight = document.querySelector('.nav-right');
    const navLinks = document.querySelectorAll('nav ul li a');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Check for saved theme preference or use device preference
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark' || (savedTheme === null && prefersDarkScheme.matches)) {
        document.body.classList.add('dark-theme');
    }
    
    // Toggle theme on button click
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        const isDarkTheme = document.body.classList.contains('dark-theme');
        localStorage.setItem('theme', isDarkTheme ? 'dark' : 'light');
    });
    
    // Mobile menu toggle functionality
    mobileMenuToggle.addEventListener('click', () => {
        mobileMenuToggle.classList.toggle('hamburger-active');
        navRight.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
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
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        lastUpdatedElement.textContent = new Date().toLocaleDateString('en-US', options);
    }
});

// =============================
// Smooth Scrolling for Nav Links
// =============================
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });
        }
    });
});

// =============================
// Active Nav Highlighting on Scroll
// =============================
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('nav ul li a');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
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

// =============================
// Scroll-Reveal Animations
// =============================
function initializeScrollReveal() {
    const revealSections = document.querySelectorAll('.reveal-section');
    const revealItems = document.querySelectorAll('.reveal-item');
    
    // Observer for section headings
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -60px 0px'
    });
    
    // Observer for individual items (staggered reveal)
    const itemObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Stagger the animation based on sibling index
                const parent = entry.target.parentElement;
                const siblings = Array.from(parent.querySelectorAll('.reveal-item'));
                const index = siblings.indexOf(entry.target);
                
                setTimeout(() => {
                    entry.target.classList.add('revealed');
                }, index * 100);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
    });
    
    revealSections.forEach(section => sectionObserver.observe(section));
    revealItems.forEach(item => itemObserver.observe(item));
}

document.addEventListener('DOMContentLoaded', () => {
    initializeScrollReveal();
});

// =============================
// Animated Timeline
// =============================
function initializeTimelineAnimation() {
    const timelineLine = document.querySelector('.timeline-line');
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    if (!timelineLine || timelineItems.length === 0) return;
    
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
    
    const itemsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const index = Array.from(timelineItems).indexOf(entry.target);
                setTimeout(() => {
                    entry.target.classList.add('animate');
                }, index * 200);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    });
    
    timelineObserver.observe(timelineLine);
    timelineItems.forEach(item => itemsObserver.observe(item));
}

document.addEventListener('DOMContentLoaded', () => {
    initializeTimelineAnimation();
});

// =============================
// Dynamic Typing Animation
// =============================
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
        this.isPaused = false;
        this.cursor = document.querySelector('.cursor');
        
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.resume();
                } else {
                    this.pause();
                }
            });
        });

        this.observer.observe(this.element.parentElement);
        this.type();
    }
    
    type() {
        if (this.isPaused) return;

        const currentText = this.texts[this.textIndex];
        
        if (this.isDeleting) {
            this.element.textContent = currentText.substring(0, this.charIndex - 1);
            this.charIndex--;
            
            if (this.charIndex === 0) {
                this.isDeleting = false;
                this.textIndex = (this.textIndex + 1) % this.texts.length;
                setTimeout(() => this.type(), 500);
                return;
            }
        } else {
            this.element.textContent = currentText.substring(0, this.charIndex + 1);
            this.charIndex++;
            
            if (this.charIndex === currentText.length) {
                this.isDeleting = true;
                setTimeout(() => this.type(), this.backDelay);
                return;
            }
        }
        
        if (this.cursor) {
            this.cursor.classList.add('typing');
        }
        
        const speed = this.isDeleting ? this.backSpeed : this.typeSpeed;
        setTimeout(() => this.type(), speed);
    }
    
    pause() {
        this.isPaused = true;
        if (this.cursor) {
            this.cursor.classList.remove('typing');
        }
    }
    
    resume() {
        if (this.isPaused) {
            this.isPaused = false;
            this.type();
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const typedTextElement = document.querySelector('.typed-text');
    
    if (typedTextElement) {
        const texts = [
            'Computer Science Graduate @ NYU',
            'Computer Vision Researcher',
            'Machine Learning Engineer',
            'Backend / Cloud Engineer',
            'AI/ML Enthusiast'
        ];
        
        setTimeout(() => {
            new TypingAnimation(typedTextElement, texts, 80, 40, 2500);
        }, 800);
    }
});

// =============================
// Back to Top Button
// =============================
function initializeBackToTop() {
    const backToTopButton = document.getElementById('back-to-top');
    if (!backToTopButton) return;
    
    function toggleBackToTopButton() {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    }
    
    function scrollToTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    window.addEventListener('scroll', toggleBackToTopButton);
    backToTopButton.addEventListener('click', scrollToTop);
    
    backToTopButton.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            scrollToTop();
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initializeBackToTop();
});
