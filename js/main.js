// Navigation Scroll Highlighting
document.addEventListener('DOMContentLoaded', function() {
    // Navigation highlighting functionality
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    const sections = document.querySelectorAll('section[id]');
    
    function updateActiveNavLink() {
        let currentSection = '';
        let closestSection = '';
        let closestDistance = Infinity;
        
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            const sectionTop = rect.top;
            const sectionHeight = rect.height;
            
            // Calculate distance from top of viewport
            const distanceFromTop = Math.abs(sectionTop);
            
            // If section is in viewport and closest to top, make it active
            if (sectionTop <= window.innerHeight * 0.6 && rect.bottom >= 0) {
                if (distanceFromTop < closestDistance) {
                    closestDistance = distanceFromTop;
                    closestSection = section.getAttribute('id');
                }
            }
        });
        
        currentSection = closestSection;
        
        // Update navigation links
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + currentSection) {
                link.classList.add('active');
            }
        });
    }
    
    // Update on scroll with throttling for performance
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(updateActiveNavLink, 10);
    });
    
    // Update on load
    updateActiveNavLink();
    
    // Contact Form Handler
    contactFormHandler();
});

function contactFormHandler() {
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Basic validation
            if (!name || !email || !message) {
                showFormStatus('Please fill in all required fields.', 'error');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showFormStatus('Please enter a valid email address.', 'error');
                return;
            }
            
            // Simulate form submission
            showFormStatus('Thank you for your message! We\'ll get back to you soon.', 'success');
            
            // Reset form
            contactForm.reset();
        });
    }
    
    function showFormStatus(message, type) {
        formStatus.textContent = message;
        formStatus.className = type;
        formStatus.style.display = 'block';
        
        // Hide status message after 5 seconds
        setTimeout(function() {
            formStatus.style.display = 'none';
        }, 5000);
    }
}