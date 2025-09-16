document.addEventListener('DOMContentLoaded', function() {
    
    // ===== INTERSECTION OBSERVER PARA ANIMAÇÕES NO SCROLL =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    // Observer para elementos animados
    const animateObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    // Observar elementos animados gerais (removido pois não há mais elementos dessas seções)
    // const animatedElements = document.querySelectorAll('.destination-card, .mosaic-item');
    // animatedElements.forEach((element, index) => {
    //     element.style.animationDelay = `${index * 0.1}s`;
    //     animateObserver.observe(element);
    // });


    // ===== HERO FIXA SEM PARALLAX =====
    // Removido parallax para manter a hero completamente fixa
    // const heroParallax = document.querySelector('.hero-parallax-bg');
    // const heroSection = document.querySelector('.litoral-hero');

    // window.addEventListener('scroll', () => {
    //     const scrolled = window.pageYOffset;
    //     const heroHeight = heroSection ? heroSection.offsetHeight : window.innerHeight * 2;

    //     // Parallax removido para hero fixa
    //     // if (heroParallax && scrolled < heroHeight) {
    //     //     const rate = scrolled * -0.2;
    //     //     heroParallax.style.transform = `scale(1.0) translateY(${rate}px)`;
    //     // }
    // });

    // ===== SMOOTH SCROLLING PARA INDICADOR =====
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            // Scroll suave para a seção Conheça Matinhos
            const matinhosSection = document.querySelector('.matinhos-section');
            if (matinhosSection) {
                matinhosSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            } else {
                // Fallback para o final da hero se a seção não existir
                window.scrollTo({
                    top: window.innerHeight,
                    behavior: 'smooth'
                });
            }
        });
    }

    // ===== ANIMAÇÃO SUAVE DA SEÇÃO MATINHOS NO SCROLL =====
    const matinhosObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Adiciona um pequeno delay para um efeito mais suave
                setTimeout(() => {
                    // Anima tanto a parte esquerda (texto) quanto a direita (imagem)
                    const matinhosLeft = document.querySelector('.matinhos-left');
                    const matinhosRight = document.querySelector('.matinhos-right');

                    if (matinhosLeft) matinhosLeft.classList.add('animate-in');
                    if (matinhosRight) matinhosRight.classList.add('animate-in');
                }, 200);
                // Para de observar após a primeira vez
                matinhosObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1, // A animação dispara quando 10% da seção estiver visível
        rootMargin: '0px 0px -100px 0px' // Margem para antecipar a animação
    });

    // Observar a seção Matinhos completa
    const matinhosSection = document.querySelector('.matinhos-section');
    if (matinhosSection) {
        matinhosObserver.observe(matinhosSection);
    }

    // ===== EFEITO DE HOVER DINÂMICO PARA CARDS ===== (removido pois não há mais destination cards)
    // const destinationCards = document.querySelectorAll('.destination-card');
    //
    // destinationCards.forEach(card => {
    //     card.addEventListener('mouseenter', function() {
    //         // Adicionar efeito de brilho
    //         this.style.background = 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(240,248,255,0.95) 100%)';
    //     });
    //
    //     card.addEventListener('mouseleave', function() {
    //         this.style.background = 'white';
    //     });
    // });

    // ===== ANIMAÇÃO DE TEXTO TYPEWRITER PARA TÍTULOS =====
    const typewriterElements = document.querySelectorAll('[data-typewriter]');
    
    const typeWriter = (element, text, speed = 50) => {
        let i = 0;
        element.innerHTML = '';
        
        const timer = setInterval(() => {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
            } else {
                clearInterval(timer);
            }
        }, speed);
    };

    // Observer para typewriter
    const typewriterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('typed')) {
                entry.target.classList.add('typed');
                const text = entry.target.getAttribute('data-typewriter');
                typeWriter(entry.target, text);
            }
        });
    }, { threshold: 0.7 });

    typewriterElements.forEach(element => {
        typewriterObserver.observe(element);
    });

    // ===== CURSOR PERSONALIZADO PARA ELEMENTOS INTERATIVOS ===== (removido pois não há mais elementos dessas seções)
    // const interactiveElements = document.querySelectorAll('.mosaic-item, .destination-card, .btn-destination, .btn-experience');
    //
    // interactiveElements.forEach(element => {
    //     element.addEventListener('mouseenter', function() {
    //         document.body.style.cursor = 'pointer';
    //     });
    //
    //     element.addEventListener('mouseleave', function() {
    //         document.body.style.cursor = 'default';
    //     });
    // });

    // ===== EFEITO RIPPLE PARA BOTÕES ===== (removido pois não há mais botões dessas seções)
    // const buttons = document.querySelectorAll('.btn-destination, .btn-experience');
    //
    // buttons.forEach(button => {
    //     button.addEventListener('click', function(e) {
    //         const rect = this.getBoundingClientRect();
    //         const ripple = document.createElement('span');
    //         const size = Math.max(rect.width, rect.height);
    //         const x = e.clientX - rect.left - size / 2;
    //         const y = e.clientY - rect.top - size / 2;
    //
    //         ripple.style.width = ripple.style.height = size + 'px';
    //         ripple.style.left = x + 'px';
    //         ripple.style.top = y + 'px';
    //         ripple.classList.add('ripple');
    //
    //         this.appendChild(ripple);
    //
    //         setTimeout(() => {
    //             ripple.remove();
    //         }, 600);
    //     });
    // });

    // ===== SCROLL PROGRESS INDICATOR =====
    const createScrollProgress = () => {
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        progressBar.innerHTML = '<div class="scroll-progress-bar"></div>';
        
        const progressStyle = `
            .scroll-progress {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 4px;
                background: rgba(0, 141, 147, 0.1);
                z-index: 9999;
            }
            .scroll-progress-bar {
                height: 100%;
                background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
                width: 0%;
                transition: width 0.3s ease;
            }
            .ripple {
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.4);
                transform: scale(0);
                animation: ripple-animation 0.6s linear;
                pointer-events: none;
            }
            @keyframes ripple-animation {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        
        const style = document.createElement('style');
        style.textContent = progressStyle;
        document.head.appendChild(style);
        document.body.appendChild(progressBar);
        
        const progressBarInner = progressBar.querySelector('.scroll-progress-bar');
        
        window.addEventListener('scroll', () => {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            progressBarInner.style.width = scrolled + '%';
        });
    };

    createScrollProgress();

    // ===== LAZY LOADING PARA IMAGENS =====
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));

    // ===== ANIMAÇÃO DE ENTRADA PARA ELEMENTOS DO MOSAICO ===== (removido pois não há mais mosaic items)
    // const mosaicItems = document.querySelectorAll('.mosaic-item');
    //
    // const mosaicObserver = new IntersectionObserver((entries) => {
    //     entries.forEach((entry, index) => {
    //         if (entry.isIntersecting) {
    //             setTimeout(() => {
    //                 entry.target.style.opacity = '1';
    //                 entry.target.style.transform = 'translateY(0) rotate(0deg)';
    //             }, index * 100);
    //         }
    //     });
    // }, { threshold: 0.2 });
    //
    // mosaicItems.forEach((item, index) => {
    //     item.style.opacity = '0';
    //     item.style.transform = 'translateY(50px)';
    //     item.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    //     mosaicObserver.observe(item);
    // });

    // ===== EFEITO DE MOUSE FOLLOW PARA ELEMENTOS ESPECIAIS ===== (removido pois não há mais elementos especiais dessas seções)
    // const specialElements = document.querySelectorAll('.floating-card, .circle-container');
    //
    // specialElements.forEach(element => {
    //     element.addEventListener('mousemove', function(e) {
    //         const rect = this.getBoundingClientRect();
    //         const x = e.clientX - rect.left;
    //         const y = e.clientY - rect.top;
    //
    //         const centerX = rect.width / 2;
    //         const centerY = rect.height / 2;
    //
    //         const deltaX = (x - centerX) / centerX;
    //         const deltaY = (y - centerY) / centerY;
    //
    //         this.style.transform += ` rotateX(${deltaY * 10}deg) rotateY(${deltaX * 10}deg)`;
    //     });
    //
    //     element.addEventListener('mouseleave', function() {
    //         this.style.transform = this.style.transform.replace(/ rotateX\([^)]*\) rotateY\([^)]*\)/g, '');
    //     });
    // });

    // ===== PERFORMANCE OPTIMIZATION =====
    let ticking = false;
    
    const optimizedScroll = () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                // Scroll animations here
                ticking = false;
            });
            ticking = true;
        }
    };

    window.addEventListener('scroll', optimizedScroll, { passive: true });

    // ===== ACCESSIBILITY ENHANCEMENTS =====
    const focusableElements = document.querySelectorAll('button, a, [tabindex]');
    
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '3px solid var(--primary-color)';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });

    // ===== PRELOAD CRÍTICO =====
    const preloadImages = [
        '/images/praya-leisure-12.jpg',
        '/images/praya-leisure-10.jpg',
        '/images/about-maori.jpg',
        '/images/praya-leisure-08.jpg'
    ];

    preloadImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });

    console.log('🌊 Litoral do Paraná - Página carregada com sucesso!');
});

// ===== FUNÇÃO GLOBAL PARA WHATSAPP =====
function openWhatsApp(message = 'Olá! Gostaria de mais informações sobre o Litoral do Paraná.') {
    const phoneNumber = '5541995698089';
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappURL, '_blank');
}

// ===== EASTER EGG - KONAMI CODE =====
let konamiCode = [];
const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // ↑↑↓↓←→←→BA

document.addEventListener('keydown', function(e) {
    konamiCode.push(e.keyCode);
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        // Easter egg: mostrar mensagem especial
        const message = document.createElement('div');
        message.innerHTML = '🌊 Você descobriu o segredo do Litoral do Paraná! 🏖️';
        message.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
            color: white;
            padding: 20px 40px;
            border-radius: 15px;
            font-size: 1.2rem;
            font-weight: 600;
            z-index: 10000;
            animation: bounceIn 0.8s ease;
        `;
        
        document.body.appendChild(message);
        
        setTimeout(() => {
            message.style.animation = 'bounceOut 0.8s ease';
            setTimeout(() => message.remove(), 800);
        }, 3000);
        
        konamiCode = [];
    }
});

// Adicionar keyframes para bounce
const bounceStyle = document.createElement('style');
bounceStyle.textContent = `
    @keyframes bounceIn {
        0% { transform: translate(-50%, -50%) scale(0.3); opacity: 0; }
        50% { transform: translate(-50%, -50%) scale(1.05); }
        70% { transform: translate(-50%, -50%) scale(0.9); }
        100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
    }
    @keyframes bounceOut {
        0% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
        100% { transform: translate(-50%, -50%) scale(0.3); opacity: 0; }
    }
`;
document.head.appendChild(bounceStyle);
