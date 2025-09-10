/**
 * Sistema de carregamento dinâmico de componentes
 * Carrega header e footer reutilizáveis em todas as páginas
 */

// Função para carregar componentes HTML
async function loadComponent(url, targetSelector) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Erro ao carregar ${url}: ${response.status}`);
        }
        const html = await response.text();
        const targetElement = document.querySelector(targetSelector);
        if (targetElement) {
            targetElement.innerHTML = html;
            return true;
        } else {
            console.error(`Elemento ${targetSelector} não encontrado`);
            return false;
        }
    } catch (error) {
        console.error('Erro ao carregar componente:', error);
        return false;
    }
}

// Função para inicializar os componentes
async function initializeComponents() {
    // Carregar header
    const headerLoaded = await loadComponent('header.html', '#header-placeholder');
    
    // Carregar footer  
    const footerLoaded = await loadComponent('footer.html', '#footer-placeholder');
    
    // Aguardar ambos carregarem antes de inicializar funcionalidades
    if (headerLoaded && footerLoaded) {
        // Inicializar funcionalidades do header após carregamento
        initializeHeaderFunctionality();
        
        // Disparar evento customizado para indicar que os componentes foram carregados
        document.dispatchEvent(new CustomEvent('componentsLoaded'));
        
        console.log('Componentes header e footer carregados com sucesso');
    }
}

// Função para inicializar funcionalidades do header
function initializeHeaderFunctionality() {
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
    
    console.log('Funcionalidades do header inicializadas');
}

// Função global do WhatsApp (necessária para os componentes)
function openWhatsApp(message = 'Olá! Gostaria de mais informações.') {
    const phoneNumber = '5541995698089'; // Número no formato internacional (sem + e sem espaços)
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    // Abrir em nova aba
    window.open(whatsappURL, '_blank');
}

// Inicializar quando o DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeComponents);
} else {
    initializeComponents();
}

// Exportar funções para uso global
window.loadComponent = loadComponent;
window.initializeComponents = initializeComponents;
window.openWhatsApp = openWhatsApp;
