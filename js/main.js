document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    mobileMenuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        this.classList.toggle('fa-times');
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Typewriter effect
    const typewriterElement = document.querySelector('.typewriter');
    if (typewriterElement) {
        const texts = typewriterElement.getAttribute('data-text').replace(/[\[\]']+/g, '').split(',');
        let currentText = 0;
        let currentChar = 0;
        let isDeleting = false;
        let typingSpeed = 100;
        
        function type() {
            const fullText = texts[currentText];
            
            if (isDeleting) {
                typewriterElement.textContent = fullText.substring(0, currentChar - 1);
                currentChar--;
                typingSpeed = 50;
            } else {
                typewriterElement.textContent = fullText.substring(0, currentChar + 1);
                currentChar++;
                typingSpeed = 100;
            }
            
            if (!isDeleting && currentChar === fullText.length) {
                isDeleting = true;
                typingSpeed = 1500; // Pause at end
            } else if (isDeleting && currentChar === 0) {
                isDeleting = false;
                currentText = (currentText + 1) % texts.length;
                typingSpeed = 500; // Pause before typing next
            }
            
            setTimeout(type, typingSpeed);
        }
        
        setTimeout(type, 1000);
    }

    // Animate title words
    const titleWords = document.querySelectorAll('.title-word');
    titleWords.forEach((word, index) => {
        setTimeout(() => {
            word.style.opacity = '1';
            word.style.transform = 'translateY(0)';
        }, 300 * index);
    });

    // Animate stats counting on page load
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-count'));
        const increment = target / 50;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                clearInterval(timer);
                current = target;
            }
            stat.textContent = Math.floor(current);
        }, 20);
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                navLinks.classList.remove('active');
                mobileMenuToggle.classList.remove('fa-times');
            }
        });
    });

    // Initialize particles.js
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: { value: 80, density: { enable: true, value_area: 800 } },
                color: { value: "#00f0ff" },
                shape: { type: "circle" },
                opacity: { value: 0.5, random: true },
                size: { value: 3, random: true },
                line_linked: { enable: true, distance: 150, color: "#00f0ff", opacity: 0.3, width: 1 },
                move: { enable: true, speed: 2, direction: "none", random: true, straight: false, out_mode: "out" }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: { enable: true, mode: "repulse" },
                    onclick: { enable: true, mode: "push" }
                }
            }
        });
    }

    // Skill bar animation on scroll
    const skillBars = document.querySelectorAll('.skill-level');
    const skillsSection = document.querySelector('.skills-section');
    
    function animateSkillBars() {
        skillBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0';
            setTimeout(() => {
                bar.style.width = width;
            }, 100);
        });
    }
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillBars();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    if (skillsSection) {
        observer.observe(skillsSection);
    }
});

// Experience card hover effects
document.querySelectorAll('.experience-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.querySelector('.company-logo').style.transform = 'rotate(5deg) scale(1.1)';
        this.querySelectorAll('.tech-item').forEach((item, index) => {
            setTimeout(() => {
                item.style.transform = 'translateY(-5px)';
            }, index * 100);
        });
    });
    
    card.addEventListener('mouseleave', function() {
        this.querySelector('.company-logo').style.transform = 'rotate(0) scale(1)';
        this.querySelectorAll('.tech-item').forEach(item => {
            item.style.transform = 'translateY(0)';
        });
    });
});

// Project card animations
document.querySelectorAll('.project-card').forEach((card, index) => {
    // Initial animation on load
    setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
    }, index * 200);
    
    // Stats counter animation on hover
    card.addEventListener('mouseenter', function() {
        const stats = this.querySelectorAll('.stat-value');
        stats.forEach(stat => {
            const rawText = stat.textContent.trim().replace('%','');
            const target = parseInt(rawText);
            if (isNaN(target)) return;

            let current = 0;
            const increment = target / 20;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    clearInterval(timer);
                    current = target;
                }
                stat.textContent = Math.floor(current) + '%';
            }, 50);
        });
    });
});

// Scroll animation for sections
const experienceSection = document.querySelector('.experience-section');
const projectsSection = document.querySelector('.projects-showcase');

function checkScroll() {
    const scrollPosition = window.scrollY + window.innerHeight;
    
    if (experienceSection && experienceSection.offsetTop < scrollPosition - 100) {
        experienceSection.classList.add('animate');
    }
    
    if (projectsSection && projectsSection.offsetTop < scrollPosition - 100) {
        projectsSection.classList.add('animate');
    }
}

window.addEventListener('scroll', checkScroll);
window.addEventListener('load', checkScroll);
