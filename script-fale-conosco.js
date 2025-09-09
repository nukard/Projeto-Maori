// Fale Conosco - JavaScript Functionality
// Maori Incorporadora

document.addEventListener('DOMContentLoaded', function() {
    initializeContactOptions();
    initializeScrollAnimations();
    initializeHeaderScroll();
    initializeSmoothScroll();
    initializeMenuToggle();
});

// Contact Options Functionality
function initializeContactOptions() {
    const relacionamentoBtn = document.getElementById('relacionamentoBtn');
    const consultoresBtn = document.getElementById('consultoresBtn');
    
    if (relacionamentoBtn && consultoresBtn) {
        // Set default active state
        relacionamentoBtn.classList.add('active');
        
        // For now, buttons don't do anything - just visual feedback
        relacionamentoBtn.addEventListener('click', () => selectContactType('relacionamento'));
        consultoresBtn.addEventListener('click', () => selectContactType('consultores'));
    }
}

// Select contact type function
function selectContactType(type) {
    const relacionamentoBtn = document.getElementById('relacionamentoBtn');
    const consultoresBtn = document.getElementById('consultoresBtn');
    
    // Remove active class from both buttons
    relacionamentoBtn.classList.remove('active');
    consultoresBtn.classList.remove('active');
    
    // Add active class to selected button
    if (type === 'relacionamento') {
        relacionamentoBtn.classList.add('active');
    } else {
        consultoresBtn.classList.add('active');
    }
}

// Form Validation
function initializeFormValidation() {
    const form = document.getElementById('contactForm');
    
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
        
        // Add error clearing listeners to all form fields
        const formFields = form.querySelectorAll('input, select, textarea');
        formFields.forEach(field => {
            field.addEventListener('input', function() {
                const formGroup = this.closest('.form-group');
                if (formGroup && formGroup.classList.contains('error')) {
                    formGroup.classList.remove('error');
                }
            });
            
            field.addEventListener('change', function() {
                const formGroup = this.closest('.form-group');
                if (formGroup && formGroup.classList.contains('error')) {
                    formGroup.classList.remove('error');
                }
            });
        });
    }
}

// Handle form submission
function handleFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitBtn = form.querySelector('.btn-submit');
    
    // Clear previous errors
    clearFormErrors(form);
    
    // Validate required fields
    if (!validateRequiredFields(form)) {
        return; // Stop submission if validation fails
    }
    
    // Show loading state
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> ENVIANDO...';
    
    // Collect form data
    const formData = new FormData(form);
    
    // Get the selected contact type
    const contactType = document.querySelector('.choice-btn.active').textContent.includes('RELACIONAMENTO') 
        ? 'Relacionamento com Cliente' 
        : 'Consultores Comerciais';
    
    // Add contact type to form data
    formData.append('tipoContato', contactType);
    
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        // Reset loading state
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'ENVIAR';
        
        // Show success message
        showSuccessMessage();
        
        // Reset form
        form.reset();
        
        // Reset contact type to default
        selectContactType('relacionamento');
        
        // Clear file upload display
        const fileNameSpan = document.querySelector('.file-name');
        if (fileNameSpan) {
            fileNameSpan.textContent = 'No file chosen';
        }
    }, 2000);
}

// Validate required fields
function validateRequiredFields(form) {
    let isValid = true;
    const requiredFields = form.querySelectorAll('[required]');
    
    requiredFields.forEach(field => {
        const formGroup = field.closest('.form-group');
        
        if (!field.value.trim()) {
            formGroup.classList.add('error');
            isValid = false;
        } else {
            // Additional validation for specific field types
            if (field.type === 'email' && !isValidEmail(field.value)) {
                formGroup.classList.add('error');
                isValid = false;
            }
        }
    });
    
    return isValid;
}

// Clear form errors
function clearFormErrors(form) {
    const errorGroups = form.querySelectorAll('.form-group.error');
    errorGroups.forEach(group => {
        group.classList.remove('error');
    });
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show success message
function showSuccessMessage() {
    // Create and show a toast notification
    const toast = document.createElement('div');
    toast.className = 'toast success';
    toast.innerHTML = `
        <div class="toast-content">
            <i class="fas fa-check-circle"></i>
            <div class="toast-text">
                <strong>Mensagem enviada com sucesso!</strong>
                <p>Entraremos em contato em breve.</p>
            </div>
        </div>
    `;
    
    // Add toast styles
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #51cf66;
        color: white;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(toast);
    
    // Animate in
    setTimeout(() => {
        toast.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        toast.style.transform = 'translateX(400px)';
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 5000);
}

// File Upload Functionality
function initializeFileUpload() {
    const fileInput = document.getElementById('anexo');
    const fileNameSpan = document.querySelector('.file-name');
    
    if (fileInput && fileNameSpan) {
        fileInput.addEventListener('change', function() {
            if (this.files && this.files.length > 0) {
                const fileName = this.files[0].name;
                fileNameSpan.textContent = fileName;
            } else {
                fileNameSpan.textContent = 'No file chosen';
            }
        });
    }
}

// Phone Input Masks
function initializePhoneMasks() {
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    
    phoneInputs.forEach(input => {
        input.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            let formattedValue = '';
            
            if (value.length > 0) {
                if (value.length <= 2) {
                    formattedValue = `(${value}`;
                } else if (value.length <= 6) {
                    formattedValue = `(${value.slice(0, 2)}) ${value.slice(2)}`;
                } else if (value.length <= 10) {
                    formattedValue = `(${value.slice(0, 2)}) ${value.slice(2, 6)}-${value.slice(6)}`;
                } else {
                    formattedValue = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7, 11)}`;
                }
            }
            
            e.target.value = formattedValue;
        });
    });
}

// City Select Based on State
function initializeCitySelect() {
    const estadoSelect = document.getElementById('estado');
    const cidadeSelect = document.getElementById('cidade');
    
    if (estadoSelect && cidadeSelect) {
        estadoSelect.addEventListener('change', function() {
            const selectedState = this.value;
            populateCities(selectedState, cidadeSelect);
        });
    }
}

// Populate cities based on selected state
function populateCities(state, citySelect) {
    // Clear existing options
    citySelect.innerHTML = '<option value="">Selecionar</option>';
    
    // Simplified city data - in a real app, this would come from an API
    const cities = {
        'PR': ['Curitiba', 'Londrina', 'Maringá', 'Ponta Grossa', 'Cascavel', 'São José dos Pinhais', 'Foz do Iguaçu', 'Colombo', 'Guaratuba', 'Matinhos', 'Pontal do Paraná'],
        'SP': ['São Paulo', 'Campinas', 'Santos', 'Ribeirão Preto', 'Sorocaba', 'São José dos Campos'],
        'RJ': ['Rio de Janeiro', 'Niterói', 'Nova Iguaçu', 'Duque de Caxias', 'Campos dos Goytacazes'],
        'MG': ['Belo Horizonte', 'Uberlândia', 'Contagem', 'Juiz de Fora', 'Betim'],
        'SC': ['Florianópolis', 'Joinville', 'Blumenau', 'São José', 'Criciúma'],
        'RS': ['Porto Alegre', 'Caxias do Sul', 'Pelotas', 'Canoas', 'Santa Maria']
    };
    
    if (cities[state]) {
        cities[state].forEach(city => {
            const option = document.createElement('option');
            option.value = city.toLowerCase().replace(/\s+/g, '-');
            option.textContent = city;
            citySelect.appendChild(option);
        });
    }
}

// Scroll Animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.choice-btn, .info-card, .form-container');
    animatedElements.forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
}

// Header Scroll Effect
function initializeHeaderScroll() {
    const header = document.querySelector('header');
    const logo = header.querySelector('.logo img');
    
    window.addEventListener('scroll', () => {
        // Increase threshold to prevent premature white header
        if (window.scrollY > 150) {
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

// Smooth Scrolling
function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Menu Toggle Functionality
function initializeMenuToggle() {
    const menuToggle = document.querySelector('.menu-toggle');
    const dropdownMenu = document.querySelector('.dropdown-menu');
    const menuClose = document.querySelector('.menu-close');
    const body = document.body;
    
    if (menuToggle && dropdownMenu) {
        menuToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const isActive = this.classList.contains('active');
            
            if (isActive) {
                closeMenu();
            } else {
                openMenu();
            }
        });
        
        if (menuClose) {
            menuClose.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                closeMenu();
            });
        }
        
        // Close menu when clicking on a menu link
        const menuLinks = dropdownMenu.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', function() {
                closeMenu();
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (dropdownMenu.classList.contains('active') && 
                !menuToggle.contains(e.target) && 
                !dropdownMenu.contains(e.target)) {
                closeMenu();
            }
        });
        
        // Close menu on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && dropdownMenu.classList.contains('active')) {
                closeMenu();
            }
        });
    }
    
    function openMenu() {
        menuToggle.classList.add('active');
        dropdownMenu.classList.add('active');
        // Removed body.style.overflow = 'hidden' to allow scrolling
        // Removed body.style.paddingRight to maintain normal layout
    }
    
    function closeMenu() {
        menuToggle.classList.remove('active');
        dropdownMenu.classList.remove('active');
        // Removed body.style.overflow and paddingRight since we're not blocking scroll anymore
    }
    
    function getScrollbarWidth() {
        const outer = document.createElement('div');
        outer.style.visibility = 'hidden';
        outer.style.overflow = 'scroll';
        outer.style.msOverflowStyle = 'scrollbar';
        document.body.appendChild(outer);
        
        const inner = document.createElement('div');
        outer.appendChild(inner);
        
        const scrollbarWidth = (outer.offsetWidth - inner.offsetWidth);
        outer.parentNode.removeChild(outer);
        
        return scrollbarWidth;
    }
}

// WhatsApp Integration
function openWhatsApp(message) {
    const phoneNumber = '5541995698089'; // Maori's WhatsApp number
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
}

// Scroll to form function
function scrollToForm() {
    const formSection = document.querySelector('.contact-form-section');
    if (formSection) {
        formSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Newsletter form functionality
document.addEventListener('DOMContentLoaded', function() {
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('.newsletter-input').value;
            
            if (email && isValidEmail(email)) {
                // Simulate newsletter subscription
                this.querySelector('.newsletter-input').value = '';
                
                // Show success feedback
                const button = this.querySelector('.newsletter-button');
                const originalHTML = button.innerHTML;
                button.innerHTML = '<i class="fas fa-check"></i>';
                button.style.background = '#51cf66';
                
                setTimeout(() => {
                    button.innerHTML = originalHTML;
                    button.style.background = '';
                }, 2000);
            }
        });
    }
});

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    .animate-on-scroll {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }
    
    .animate-on-scroll.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .toast-content {
        display: flex;
        align-items: center;
        gap: 15px;
    }
    
    .toast-content i {
        font-size: 24px;
    }
    
    .toast-text strong {
        display: block;
        margin-bottom: 5px;
    }
    
    .toast-text p {
        margin: 0;
        font-size: 14px;
        opacity: 0.9;
    }
    
    body.menu-open {
        overflow: hidden;
    }
    
    .hidden {
        display: none !important;
    }
    
    .loading {
        opacity: 0.7;
        pointer-events: none;
    }
`;

document.head.appendChild(style);
