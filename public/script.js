// Adicionar interatividade para os botões de filtro
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-button');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remover classe ativa de todos os botões
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Adicionar classe ativa ao botão clicado
            this.classList.add('active');
            
            // Filtrar os projetos com base na categoria selecionada
            const filter = this.textContent.trim().toLowerCase();
            const featuredProjects = document.querySelectorAll('.featured-project');
            
            featuredProjects.forEach(project => {
                const badge = project.querySelector('.featured-badge').textContent.trim().toLowerCase();
                const location = project.querySelector('.info-value').textContent.trim().toLowerCase();
                
                if (filter === 'todos') {
                    project.style.display = 'block';
                } else if (filter === 'litoral' && location.includes('litoral')) {
                    project.style.display = 'block';
                } else if (filter === 'capital' && !location.includes('litoral')) {
                    project.style.display = 'block';
                } else if (badge.includes(filter)) {
                    project.style.display = 'block';
                } else {
                    project.style.display = 'none';
                }
            });
        });
    });
    
    // Adicionar efeito de hover aos featured projects para destacar
    const featuredProjects = document.querySelectorAll('.featured-project');
    
    featuredProjects.forEach(project => {
        project.addEventListener('mouseenter', function() {
            const image = this.querySelector('.featured-image img');
            image.style.transform = 'scale(1.05)';
        });
        
        project.addEventListener('mouseleave', function() {
            const image = this.querySelector('.featured-image img');
            image.style.transform = 'scale(1)';
        });
    });
    
    // Header fixo com mudança de estilo ao rolar
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.padding = '10px 5%';
            header.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
        } else {
            header.style.padding = '15px 5%';
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)';
        }
    });
    
    // Scrolling suave para links internos
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
    
    // Adicionar modal para vídeos quando clicar no botão de vídeo
    const videoButtons = document.querySelectorAll('.btn-video');
    
    videoButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Aqui você pode adicionar a lógica para abrir um modal de vídeo
            // Por exemplo:
            const projectTitle = this.closest('.featured-content').querySelector('.featured-title').textContent;
            alert(`Vídeo de ${projectTitle} será exibido em um modal (implementação pendente).`);
        });
    });
});

// Otimização avançada de performance de scroll
let scrollTimer = null;
let isScrolling = false;
let lastScrollTop = 0;
let scrollVelocity = 0;

function handleScrollOptimization() {
    const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
    scrollVelocity = Math.abs(currentScrollTop - lastScrollTop);
    lastScrollTop = currentScrollTop;
    
    // Se a velocidade de scroll for alta, desabilitar efeitos
    const isHighVelocityScroll = scrollVelocity > 5;
    
    if (!isScrolling || isHighVelocityScroll) {
        isScrolling = true;
        document.body.classList.add('scrolling');
    }
    
    // Limpar o timer anterior
    clearTimeout(scrollTimer);
    
    // Tempo de espera baseado na velocidade do scroll
    const waitTime = isHighVelocityScroll ? 200 : 100;
    
    // Definir novo timer para detectar fim do scroll
    scrollTimer = setTimeout(function() {
        isScrolling = false;
        document.body.classList.remove('scrolling');
        scrollVelocity = 0;
    }, waitTime);
}

// Listener de scroll otimizado com throttling
let ticking = false;
window.addEventListener('scroll', function() {
    if (!ticking) {
        requestAnimationFrame(function() {
            handleScrollOptimization();
            ticking = false;
        });
        ticking = true;
    }
}, { passive: true });

// Também detectar quando o usuário para de interagir
let interactionTimer = null;
['mouseenter', 'mouseleave', 'touchstart', 'touchend'].forEach(event => {
    document.addEventListener(event, function() {
        clearTimeout(interactionTimer);
        interactionTimer = setTimeout(function() {
            if (isScrolling) {
                document.body.classList.remove('scrolling');
                isScrolling = false;
            }
        }, 50);
    }, { passive: true });
});

// Função para abrir WhatsApp
function openWhatsApp(message = 'Olá! Gostaria de mais informações.') {
    const phoneNumber = '5541995698089'; // Número no formato internacional (sem + e sem espaços)
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    // Abrir em nova aba
    window.open(whatsappURL, '_blank');
} 