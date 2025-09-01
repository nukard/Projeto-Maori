document.addEventListener('DOMContentLoaded', function() {
    // Variáveis do slider
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-slide');
    const nextBtn = document.querySelector('.next-slide');
    let currentSlide = 0;
    let slideInterval;
    const slideTime = 6000; // Tempo entre troca de slides (6 segundos)
    
    // Iniciar o slider automático
    function startSlider() {
        slideInterval = setInterval(nextSlide, slideTime);
    }
    
    // Parar o slider automático
    function stopSlider() {
        clearInterval(slideInterval);
    }
    
    // Navegar para o slide anterior
    function prevSlide() {
        goToSlide(currentSlide - 1);
    }
    
    // Navegar para o próximo slide
    function nextSlide() {
        goToSlide(currentSlide + 1);
    }
    
    // Navegar para um slide específico
    function goToSlide(n) {
        // Remover classe ativa do slide atual
        slides[currentSlide].classList.remove('active');
        dots[currentSlide].classList.remove('active');
        
        // Calcular o novo slide (loop)
        currentSlide = (n + slides.length) % slides.length;
        
        // Adicionar classe ativa ao novo slide
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }
    
    // Event listeners para navegação do slider
    prevBtn.addEventListener('click', function() {
        stopSlider();
        prevSlide();
        startSlider();
    });
    
    nextBtn.addEventListener('click', function() {
        stopSlider();
        nextSlide();
        startSlider();
    });
    
    // Event listeners para dots do slider
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            if (currentSlide !== index) {
                stopSlider();
                goToSlide(index);
                startSlider();
            }
        });
    });
    
    // Projects Slider
    const projectsSlides = document.querySelectorAll('.projects-slide');
    const projectsDots = document.querySelectorAll('.projects-dot');
    const nextProjectsBtn = document.querySelector('.next-projects');
    let currentProjectsSlide = 0;
    
    // Navegar para um slide específico de projetos
    function goToProjectsSlide(n) {
        // Remover classe ativa do slide atual
        projectsSlides[currentProjectsSlide].classList.remove('active');
        projectsDots[currentProjectsSlide].classList.remove('active');
        
        // Calcular o novo slide (loop)
        currentProjectsSlide = (n + projectsSlides.length) % projectsSlides.length;
        
        // Adicionar classe ativa ao novo slide
        projectsSlides[currentProjectsSlide].classList.add('active');
        projectsDots[currentProjectsSlide].classList.add('active');
    }
    
    // Event listeners para navegação do slider de projetos
    nextProjectsBtn.addEventListener('click', function() {
        goToProjectsSlide(currentProjectsSlide + 1);
    });
    
    // Event listeners para dots do slider de projetos
    projectsDots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            if (currentProjectsSlide !== index) {
                goToProjectsSlide(index);
            }
        });
    });
    
    // Slider de depoimentos
    const testimonials = document.querySelectorAll('.testimonial');
    const testimonialDots = document.querySelectorAll('.testimonial-dot');
    let currentTestimonial = 0;
    let testimonialInterval;
    const testimonialTime = 8000; // Tempo entre troca de depoimentos (8 segundos)
    
    // Navegar para um depoimento específico
    function goToTestimonial(n) {
        // Remover classe ativa do depoimento atual
        testimonials[currentTestimonial].classList.remove('active');
        testimonialDots[currentTestimonial].classList.remove('active');
        
        // Calcular o novo depoimento (loop)
        currentTestimonial = (n + testimonials.length) % testimonials.length;
        
        // Adicionar classe ativa ao novo depoimento
        testimonials[currentTestimonial].classList.add('active');
        testimonialDots[currentTestimonial].classList.add('active');
    }
    
    // Iniciar o slider de depoimentos automático
    function startTestimonialSlider() {
        testimonialInterval = setInterval(function() {
            goToTestimonial(currentTestimonial + 1);
        }, testimonialTime);
    }
    
    // Parar o slider de depoimentos automático
    function stopTestimonialSlider() {
        clearInterval(testimonialInterval);
    }
    
    // Event listeners para dots do slider de depoimentos
    testimonialDots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            if (currentTestimonial !== index) {
                stopTestimonialSlider();
                goToTestimonial(index);
                startTestimonialSlider();
            }
        });
    });
    
    // Animações ao scroll
    const animateElements = document.querySelectorAll('.about-content, .about-image, .promo-content, .featured-projects .section-header, .project-card, .testimonial-content, .differential-item, .contact-card');
    
    function checkInView() {
        animateElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('fadeIn');
            }
        });
    }
    
    // Adicionar CSS dinamicamente para animações
    const style = document.createElement('style');
    style.innerHTML = `
        .about-content, .about-image, .promo-content, .featured-projects .section-header, .project-card, .testimonial-content, .differential-item, .contact-card {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.8s ease, transform 0.8s ease;
        }
        
        .fadeIn {
            opacity: 1;
            transform: translateY(0);
        }
        
        .project-card:nth-child(2) {
            transition-delay: 0.2s;
        }
        
        .project-card:nth-child(3) {
            transition-delay: 0.4s;
        }
        
        .differential-item:nth-child(2) {
            transition-delay: 0.15s;
        }
        
        .differential-item:nth-child(3) {
            transition-delay: 0.3s;
        }
        
        .differential-item:nth-child(4) {
            transition-delay: 0.45s;
        }
    `;
    document.head.appendChild(style);
    
    // Verificar elementos em vista na carga da página e ao rolar
    window.addEventListener('scroll', checkInView);
    window.addEventListener('resize', checkInView);
    
    // Botões de vídeo
    const videoButtons = document.querySelectorAll('.btn-video');
    
    videoButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Simular abertura de modal de vídeo
            const slideTitle = this.closest('.slide-content').querySelector('.slide-title').textContent;
            alert(`Vídeo de ${slideTitle} será exibido em um modal (implementação pendente).`);
        });
    });
    
    // Iniciar os sliders ao carregar a página
    startSlider();
    startTestimonialSlider();
    
    // Verificar elementos visíveis na carga inicial
    checkInView();
});

// Função para abrir WhatsApp
function openWhatsApp(message = 'Olá! Gostaria de mais informações.') {
    const phoneNumber = '5541995698089'; // Número no formato internacional (sem + e sem espaços)
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    // Abrir em nova aba
    window.open(whatsappURL, '_blank');
}

// Funcionalidade do filtro de status (apenas visual por enquanto)
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active de todos os botões
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Adiciona active no botão clicado
            this.classList.add('active');
            
            // Futuramente aqui será implementada a navegação para as seções
            const status = this.getAttribute('data-status');
            console.log(`Filtro selecionado: ${status}`);
            
            // TODO: Implementar navegação para seções específicas
            // Exemplo: document.querySelector(`#section-${status}`).scrollIntoView();
        });
    });

    // Menu dropdown functionality
    const menuToggle = document.querySelector('.menu-toggle');
    const dropdownMenu = document.querySelector('.dropdown-menu');
    
    if (menuToggle && dropdownMenu) {
        // Toggle dropdown on click
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            dropdownMenu.classList.toggle('show');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', function(event) {
            if (!menuToggle.contains(event.target) && !dropdownMenu.contains(event.target)) {
                dropdownMenu.classList.remove('show');
            }
        });

        // Close dropdown on escape key
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape') {
                dropdownMenu.classList.remove('show');
            }
        });
    }
}); 