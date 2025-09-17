// Shared Header and Footer Functionality
// This file contains all the necessary JavaScript for header and footer components

document.addEventListener('DOMContentLoaded', function() {
    initializeHeaderScroll();
    initializeMenuToggle();
    initializeSmoothScrolling();
    initializeWhatsAppFunction();
});

// Header Scroll Functionality
function initializeHeaderScroll() {
    const header = document.querySelector('header');
    
    if (!header) return;
    
    window.addEventListener('scroll', function() {
        const logo = header.querySelector('.logo img');
        
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
            if (logo) {
                logo.src = logo.src.replace('logo-white.png', 'logo.png');
            }
            
            // Change text colors for scrolled state
            const menuText = header.querySelector('.menu-text');
            const headerPhone = header.querySelector('.header-phone');
            const headerIcons = header.querySelectorAll('.header-email, .header-whatsapp');
            const hamburgerSpans = header.querySelectorAll('.hamburger span');
            
            if (menuText) menuText.style.color = '#333';
            if (headerPhone) headerPhone.style.color = '#333';
            headerIcons.forEach(icon => icon.style.color = '#333');
            hamburgerSpans.forEach(span => span.style.background = '#333');
        } else {
            header.classList.remove('scrolled');
            if (logo) {
                logo.src = logo.src.replace('logo.png', 'logo-white.png');
            }
            
            // Reset text colors
            const menuText = header.querySelector('.menu-text');
            const headerPhone = header.querySelector('.header-phone');
            const headerIcons = header.querySelectorAll('.header-email, .header-whatsapp');
            const hamburgerSpans = header.querySelectorAll('.hamburger span');
            
            if (menuText) menuText.style.color = 'white';
            if (headerPhone) headerPhone.style.color = 'white';
            headerIcons.forEach(icon => icon.style.color = 'white');
            hamburgerSpans.forEach(span => span.style.background = 'white');
        }
    });
}

// Menu Toggle Functionality - Override any existing handlers
function initializeMenuToggle() {
    const menuToggle = document.querySelector('.menu-toggle');
    const dropdownMenu = document.querySelector('.dropdown-menu');
    
    if (menuToggle && dropdownMenu) {
        const closeButton = dropdownMenu.querySelector('.menu-close');

        // Remove all existing event listeners by cloning the element
        const newMenuToggle = menuToggle.cloneNode(true);
        menuToggle.parentNode.replaceChild(newMenuToggle, menuToggle);

        const setMenuState = (open) => {
            dropdownMenu.classList.toggle('show', open);
            document.body.classList.toggle('menu-open', open);
            dropdownMenu.setAttribute('aria-hidden', String(!open));
            newMenuToggle.setAttribute('aria-expanded', String(open));
        };

        setMenuState(dropdownMenu.classList.contains('show'));

        // Add our event listener to the new element
        newMenuToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const willOpen = !dropdownMenu.classList.contains('show');
            setMenuState(willOpen);
        });

        if (closeButton) {
            closeButton.addEventListener('click', function(e) {
                e.preventDefault();
                setMenuState(false);
            });
        }

        // Close dropdown when clicking outside
        document.addEventListener('click', function(event) {
            if (!newMenuToggle.contains(event.target) && !dropdownMenu.contains(event.target)) {
                setMenuState(false);
            }
        });

        // Close dropdown on escape key
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape') {
                setMenuState(false);
            }
        });

        // Close menu when clicking on menu links
        const menuLinks = dropdownMenu.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', function() {
                setMenuState(false);
            });
        });
    }
}

// Smooth Scrolling for Internal Links
function initializeSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const href = this.getAttribute('href');
            if (href !== '#') {
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// WhatsApp Function
function initializeWhatsAppFunction() {
    // Make sure openWhatsApp function is available globally
    if (typeof window.openWhatsApp === 'undefined') {
        window.openWhatsApp = function(message = 'Olá! Gostaria de mais informações.') {
            const phoneNumber = '5541995698089'; // Número no formato internacional (sem + e sem espaços)
            const encodedMessage = encodeURIComponent(message);
            const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
            
            // Abrir em nova aba
            window.open(whatsappURL, '_blank');
        };
    }
}

// Newsletter Form Functionality
function initializeNewsletterForm() {
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('.newsletter-input').value;
            
            if (email) {
                // Here you can add the logic to handle newsletter subscription
                alert('Obrigado por se inscrever em nossa newsletter!');
                this.querySelector('.newsletter-input').value = '';
            }
        });
    }
}

// Mobile Navigation functionality
function initializeMobileNavigation() {
    const mobileNavItems = document.querySelectorAll('.mobile-nav-item');
    const currentPath = window.location.pathname;
    
    // Set active state based on current page
    mobileNavItems.forEach(item => {
        const href = item.getAttribute('href');
        item.classList.remove('active');
        
        if (href === currentPath || 
            (href === '/' && currentPath === '/') ||
            (href !== '/' && currentPath.startsWith(href))) {
            item.classList.add('active');
        }
    });
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeHeaderScroll();
    initializeMenuToggle();
    initializeSmoothScrolling();
    initializeWhatsAppFunction();
    initializeNewsletterForm();
    initializeMobileNavigation();
});
