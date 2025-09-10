document.addEventListener('DOMContentLoaded', function() {
    // Gallery navigation
    const galleryNavBtns = document.querySelectorAll('.gallery-nav-btn');
    const galleryContainers = document.querySelectorAll('.gallery-container');
    
    if (galleryNavBtns.length && galleryContainers.length) {
        galleryNavBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const category = this.getAttribute('data-category');
                
                // Remove active class from all buttons and containers
                galleryNavBtns.forEach(b => b.classList.remove('active'));
                galleryContainers.forEach(c => c.classList.remove('active'));
                
                // Add active class to clicked button and corresponding container
                this.classList.add('active');
                document.getElementById(`${category}-gallery`).classList.add('active');
            });
        });
    }
    
    // Floor plan navigation
    const floorplanNavBtns = document.querySelectorAll('.floorplan-nav-btn');
    const floorplanContainers = document.querySelectorAll('.floorplan-container');
    
    if (floorplanNavBtns.length && floorplanContainers.length) {
        floorplanNavBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const plan = this.getAttribute('data-plan');
                
                // Remove active class from all buttons and containers
                floorplanNavBtns.forEach(b => b.classList.remove('active'));
                floorplanContainers.forEach(c => c.classList.remove('active'));
                
                // Add active class to clicked button and corresponding container
                this.classList.add('active');
                document.getElementById(`${plan}-plan`).classList.add('active');
            });
        });
    }
    
    // Smooth scroll for anchor links
    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    
    scrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href !== '#') {
                e.preventDefault();
                const targetElement = document.querySelector(href);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80, // Offset for header
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Form validation
    const contactForm = document.querySelector('.contact-form form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic form validation
            let isValid = true;
            const formInputs = this.querySelectorAll('input[required], select[required], textarea[required]');
            
            formInputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.classList.add('error');
                } else {
                    input.classList.remove('error');
                }
            });
            
            if (isValid) {
                // Form submission logic would go here
                // For now, just show a success message
                const formElements = this.querySelectorAll('input, select, textarea, button');
                formElements.forEach(el => el.disabled = true);
                
                const successMessage = document.createElement('div');
                successMessage.className = 'form-success';
                successMessage.textContent = 'Mensagem enviada com sucesso! Entraremos em contato em breve.';
                
                this.appendChild(successMessage);
            }
        });
    }
    
    // Lightbox for gallery images
    const galleryItems = document.querySelectorAll('.gallery-item img');
    
    if (galleryItems.length) {
        galleryItems.forEach(item => {
            item.addEventListener('click', function() {
                const lightbox = document.createElement('div');
                lightbox.className = 'lightbox';
                
                const lightboxContent = document.createElement('div');
                lightboxContent.className = 'lightbox-content';
                
                const lightboxImg = document.createElement('img');
                lightboxImg.src = this.src;
                
                const closeBtn = document.createElement('span');
                closeBtn.className = 'lightbox-close';
                closeBtn.innerHTML = '&times;';
                
                const caption = document.createElement('div');
                caption.className = 'lightbox-caption';
                caption.textContent = this.parentElement.querySelector('.gallery-caption').textContent;
                
                lightboxContent.appendChild(lightboxImg);
                lightboxContent.appendChild(caption);
                lightbox.appendChild(closeBtn);
                lightbox.appendChild(lightboxContent);
                
                document.body.appendChild(lightbox);
                document.body.classList.add('no-scroll');
                
                closeBtn.addEventListener('click', function() {
                    document.body.removeChild(lightbox);
                    document.body.classList.remove('no-scroll');
                });
                
                lightbox.addEventListener('click', function(e) {
                    if (e.target === lightbox) {
                        document.body.removeChild(lightbox);
                        document.body.classList.remove('no-scroll');
                    }
                });
            });
        });
    }
}); 