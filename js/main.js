// Authentication and Contact Form Handler
document.addEventListener('DOMContentLoaded', function() {
    // Authentication elements
    const loginBtn = document.getElementById('login-btn');
    const logoutBtn = document.getElementById('logout-btn');
    const userGreeting = document.getElementById('user-greeting');
    const usernameDisplay = document.getElementById('username-display');
    const loginModal = document.getElementById('login-modal');
    const closeModal = document.querySelector('.close-modal');
    const loginForm = document.getElementById('login-form');
    const loginStatus = document.getElementById('login-status');
    const loginLink = document.getElementById('login-link');
    
    // Contact form elements
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    const contactFormContainer = document.getElementById('contact-form-container');
    const contactProtected = document.getElementById('contact-protected');
    
    // Demo credentials
    const DEMO_USERNAME = 'demo';
    const DEMO_PASSWORD = 'password';
    
    // Initialize authentication state
    checkAuthState();
    
    // Authentication event listeners
    loginBtn.addEventListener('click', function(e) {
        e.preventDefault();
        showLoginModal();
    });
    
    loginLink.addEventListener('click', function(e) {
        e.preventDefault();
        showLoginModal();
    });
    
    logoutBtn.addEventListener('click', function(e) {
        e.preventDefault();
        logout();
    });
    
    closeModal.addEventListener('click', function() {
        hideLoginModal();
    });
    
    window.addEventListener('click', function(e) {
        if (e.target === loginModal) {
            hideLoginModal();
        }
    });
    
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('login-username').value.trim();
        const password = document.getElementById('login-password').value.trim();
        
        if (!username || !password) {
            showLoginStatus('Please fill in all fields.', 'error');
            return;
        }
        
        if (username === DEMO_USERNAME && password === DEMO_PASSWORD) {
            login(username);
            hideLoginModal();
            showLoginStatus('Login successful!', 'success');
        } else {
            showLoginStatus('Invalid username or password.', 'error');
        }
    });
    
    // Contact form handler (existing functionality)
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
    
    // Authentication functions
    function checkAuthState() {
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        const username = localStorage.getItem('username');
        
        if (isLoggedIn && username) {
            updateUIForLoggedInUser(username);
        } else {
            updateUIForLoggedOutUser();
        }
    }
    
    function login(username) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('username', username);
        updateUIForLoggedInUser(username);
    }
    
    function logout() {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('username');
        updateUIForLoggedOutUser();
        showFormStatus('You have been logged out.', 'success');
    }
    
    function updateUIForLoggedInUser(username) {
        loginBtn.style.display = 'none';
        logoutBtn.style.display = 'inline';
        userGreeting.style.display = 'inline';
        usernameDisplay.textContent = username;
        
        // Show contact form, hide protected message
        contactFormContainer.style.display = 'block';
        contactProtected.style.display = 'none';
    }
    
    function updateUIForLoggedOutUser() {
        loginBtn.style.display = 'inline';
        logoutBtn.style.display = 'none';
        userGreeting.style.display = 'none';
        
        // Hide contact form, show protected message
        contactFormContainer.style.display = 'none';
        contactProtected.style.display = 'block';
    }
    
    function showLoginModal() {
        loginModal.style.display = 'block';
        document.getElementById('login-username').focus();
    }
    
    function hideLoginModal() {
        loginModal.style.display = 'none';
        loginForm.reset();
        loginStatus.style.display = 'none';
    }
    
    function showLoginStatus(message, type) {
        loginStatus.textContent = message;
        loginStatus.className = type;
        loginStatus.style.display = 'block';
        
        // Hide status message after 3 seconds for success
        if (type === 'success') {
            setTimeout(function() {
                loginStatus.style.display = 'none';
            }, 3000);
        }
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
});