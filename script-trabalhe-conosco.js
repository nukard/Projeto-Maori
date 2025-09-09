// Trabalhe Conosco - JavaScript Functionality
// Maori Incorporadora

document.addEventListener('DOMContentLoaded', function() {
    initializeFormFunctionality();
    initializeModalFunctionality();
    initializeFileUpload();
    initializeFormValidation();
    initializePhoneMasks();
    initializeSalaryMask();
});

// Form Functionality
function initializeFormFunctionality() {
    const form = document.getElementById('applicationForm');
    
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    }

    // Dynamic cargo options based on area
    const areaSelect = document.getElementById('areaInteresse');
    const cargoSelect = document.getElementById('cargo');
    
    if (areaSelect && cargoSelect) {
        areaSelect.addEventListener('change', updateCargoOptions);
    }
    
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
    
    // Handle referral field visibility
    const foiIndicadoSelect = document.getElementById('foiIndicado');
    const nomeIndicadorGroup = document.getElementById('nomeIndicadorGroup');
    const nomeIndicadorInput = document.getElementById('nomeIndicador');
    
    if (foiIndicadoSelect && nomeIndicadorGroup && nomeIndicadorInput) {
        foiIndicadoSelect.addEventListener('change', function() {
            if (this.value === 'sim') {
                nomeIndicadorGroup.style.display = 'block';
                nomeIndicadorInput.required = true;
                // Smooth transition
                setTimeout(() => {
                    nomeIndicadorGroup.style.opacity = '1';
                    nomeIndicadorGroup.style.transform = 'translateY(0)';
                }, 10);
            } else {
                nomeIndicadorGroup.style.opacity = '0';
                nomeIndicadorGroup.style.transform = 'translateY(-10px)';
                nomeIndicadorInput.required = false;
                nomeIndicadorInput.value = '';
                // Hide after transition
                setTimeout(() => {
                    if (nomeIndicadorGroup.style.opacity === '0') {
                        nomeIndicadorGroup.style.display = 'none';
                    }
                }, 300);
            }
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
    
    // Collect form data
    const formData = new FormData(form);
    
    // Convert to regular object for email
    const applicationData = {};
    for (let [key, value] of formData.entries()) {
        applicationData[key] = value;
    }
    
    // Send email with form data
    sendApplicationEmail(applicationData)
        .then(() => {
            // Reset loading state
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
            
            // Show success message
            showSuccessMessage();
            
            // Reset form
            form.reset();
            updateFileName('Nenhum arquivo selecionado');
        })
        .catch((error) => {
            console.error('Error sending application:', error);
            
            // Reset loading state
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
            
            // Show error message
            showErrorMessage();
        });
}

// Send application email
async function sendApplicationEmail(data) {
    // Create email content
    const emailContent = `
Nova Candidatura - Maori Incorporadora

=== DADOS DO CANDIDATO ===
Nome: ${data.fullName || 'Não informado'}
E-mail: ${data.email || 'Não informado'}
Celular: ${data.celular || 'Não informado'}
Cidade: ${data.cidadeResidencia || 'Não informado'}
Estado: ${data.estado || 'Não informado'}

=== DADOS DA VAGA ===
Área de Interesse: ${data.areaInteresse || 'Não informado'}
Cargo: ${data.cargo || 'Não informado'}
Foi Indicado: ${data.foiIndicado || 'Não informado'}
Pretensão Salarial: ${data.pretensaoSalarial || 'Não informado'}

=== CURRÍCULO ===
${data.curriculo ? 'Currículo anexado: ' + data.curriculo.name : 'Nenhum currículo anexado'}

Data da Candidatura: ${new Date().toLocaleString('pt-BR')}
    `.trim();
    
    // For now, this will create a mailto link since we can't send emails directly from frontend
    // In a real implementation, you would send this to a backend API
    const mailtoLink = `mailto:thales@nukard.com.br?subject=Nova Candidatura - ${data.fullName || 'Candidato'}&body=${encodeURIComponent(emailContent)}`;
    
    // Open default email client
    window.open(mailtoLink);
    
    // Return a resolved promise to simulate successful sending
    return Promise.resolve();
}

// Show success message
function showSuccessMessage() {
    const successModal = createSuccessModal();
    document.body.appendChild(successModal);
    successModal.style.display = 'block';
    
    // Auto close after 5 seconds
    setTimeout(() => {
        successModal.style.display = 'none';
        document.body.removeChild(successModal);
    }, 5000);
}

// Show error message
function showErrorMessage() {
    const errorModal = createErrorModal();
    document.body.appendChild(errorModal);
    errorModal.style.display = 'block';
    
    // Auto close after 5 seconds
    setTimeout(() => {
        errorModal.style.display = 'none';
        document.body.removeChild(errorModal);
    }, 5000);
}

// Create error modal
function createErrorModal() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header" style="background: linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%);">
                <h3><i class="fas fa-exclamation-triangle"></i> Erro no Envio</h3>
                <span class="close" onclick="this.closest('.modal').style.display='none'">&times;</span>
            </div>
            <div class="modal-body">
                <p>Ocorreu um erro ao enviar sua candidatura. Por favor, tente novamente ou entre em contato diretamente pelo WhatsApp.</p>
                <div style="margin-top: 20px;">
                    <button class="btn-primary" onclick="openWhatsApp('Olá! Gostaria de enviar minha candidatura para trabalhar na Maori.'); this.closest('.modal').style.display='none'">
                        <i class="fab fa-whatsapp"></i> Enviar via WhatsApp
                    </button>
                </div>
            </div>
        </div>
    `;
    return modal;
}

// Create success modal
function createSuccessModal() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header" style="background: linear-gradient(135deg, #51cf66 0%, #40c057 100%);">
                <h3><i class="fas fa-check-circle"></i> Candidatura Enviada!</h3>
                <span class="close" onclick="this.closest('.modal').style.display='none'">&times;</span>
            </div>
            <div class="modal-body">
                <p>Sua candidatura foi enviada com sucesso! Nossa equipe de RH analisará seu perfil e retornará em breve.</p>
                <p>Você também pode acompanhar o status da sua candidatura através do e-mail <strong>selecao@grupolaguna.com.br</strong></p>
            </div>
        </div>
    `;
    return modal;
}

// Update cargo options based on selected area
function updateCargoOptions(e) {
    const areaValue = e.target.value;
    const cargoSelect = document.getElementById('cargo');
    
    // Clear current options
    cargoSelect.innerHTML = '<option value="">Selecione</option>';
    
    const cargoOptions = {
        'administrativo': [
            { value: 'analista', text: 'Analista' },
            { value: 'assistente', text: 'Assistente' },
            { value: 'coordenador', text: 'Coordenador' },
            { value: 'diretor', text: 'Diretor' },
            { value: 'estagiario', text: 'Estagiário' },
            { value: 'profissional-campo', text: 'Profissional de Campo' },
            { value: 'tecnico', text: 'Técnico' }
        ],
        'operacional': [
            { value: 'analista', text: 'Analista' },
            { value: 'assistente', text: 'Assistente' },
            { value: 'coordenador', text: 'Coordenador' },
            { value: 'diretor', text: 'Diretor' },
            { value: 'estagiario', text: 'Estagiário' },
            { value: 'profissional-campo', text: 'Profissional de Campo' },
            { value: 'tecnico', text: 'Técnico' }
        ],
        'comercial': [
            { value: 'consultor-negocios', text: 'Consultor de Negócios Imobiliários' }
        ],
        'engenharia': [
            { value: 'analista-engenharia', text: 'Analista de Engenharia (Obras)' },
            { value: 'estagiario-engenharia', text: 'Estagiário em Engenharia Civil' }
        ],
        'incorporacao': [
            { value: 'especialista-incorporacao', text: 'Especialista em Incorporação' }
        ]
    };
    
    if (cargoOptions[areaValue]) {
        cargoOptions[areaValue].forEach(option => {
            const optionElement = document.createElement('option');
            optionElement.value = option.value;
            optionElement.textContent = option.text;
            cargoSelect.appendChild(optionElement);
        });
    }
}

// Modal Functionality
function initializeModalFunctionality() {
    const modal = document.getElementById('jobModal');
    
    // Close modal when clicking outside
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeJobModal();
            }
        });
    }
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal && modal.style.display === 'block') {
            closeJobModal();
        }
    });
}

// Open job modal
function openJobModal(jobTitle) {
    const modal = document.getElementById('jobModal');
    const modalTitle = document.getElementById('modalJobTitle');
    
    if (modal && modalTitle) {
        modalTitle.textContent = jobTitle;
        modal.style.display = 'block';
        // Removed document.body.style.overflow = 'hidden' to allow scrolling
    }
}

// Close job modal
function closeJobModal() {
    const modal = document.getElementById('jobModal');
    
    if (modal) {
        modal.style.display = 'none';
        // Removed document.body.style.overflow = 'auto' since we're not blocking scroll anymore
    }
}

// Scroll to form
function scrollToForm() {
    const formSection = document.querySelector('.application-section');
    
    if (formSection) {
        formSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
        
        // Close modal after scrolling
        setTimeout(() => {
            closeJobModal();
        }, 500);
        
        // Focus on first form field
        setTimeout(() => {
            const firstInput = document.getElementById('fullName');
            if (firstInput) {
                firstInput.focus();
            }
        }, 1000);
    }
}

// File Upload Functionality
function initializeFileUpload() {
    const fileInput = document.getElementById('curriculo');
    const fileName = document.querySelector('.file-name');
    
    if (fileInput && fileName) {
        fileInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            
            if (file) {
                // Validate file size (10MB max)
                if (file.size > 10 * 1024 * 1024) {
                    alert('Arquivo muito grande. O tamanho máximo permitido é 10MB.');
                    fileInput.value = '';
                    updateFileName('Nenhum arquivo selecionado');
                    return;
                }
                
                // Validate file type
                const allowedTypes = ['.pdf', '.doc', '.docx', '.jpg', '.jpeg', '.png'];
                const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
                
                if (!allowedTypes.includes(fileExtension)) {
                    alert('Tipo de arquivo não permitido. Use apenas: PDF, DOC, DOCX, JPG, JPEG ou PNG.');
                    fileInput.value = '';
                    updateFileName('Nenhum arquivo selecionado');
                    return;
                }
                
                updateFileName(file.name);
            } else {
                updateFileName('Nenhum arquivo selecionado');
            }
        });
    }
}

// Update file name display
function updateFileName(name) {
    const fileName = document.querySelector('.file-name');
    if (fileName) {
        fileName.textContent = name;
        fileName.style.color = name === 'Nenhum arquivo selecionado' ? '#666' : '#008d93';
    }
}

// Form Validation
function initializeFormValidation() {
    const form = document.getElementById('applicationForm');
    
    if (form) {
        // Real-time validation for email
        const emailInput = document.getElementById('email');
        if (emailInput) {
            emailInput.addEventListener('blur', validateEmail);
        }
        
        // Real-time validation for required fields
        const requiredFields = form.querySelectorAll('input[required], select[required]');
        requiredFields.forEach(field => {
            field.addEventListener('blur', validateField);
        });
    }
}

// Validate email
function validateEmail(e) {
    const email = e.target.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (email && !emailRegex.test(email)) {
        showFieldError(e.target, 'Por favor, insira um e-mail válido');
    } else {
        clearFieldError(e.target);
    }
}

// Validate field
function validateField(e) {
    const field = e.target;
    
    if (field.hasAttribute('required') && !field.value.trim()) {
        showFieldError(field, 'Este campo é obrigatório');
    } else {
        clearFieldError(field);
    }
}

// Show field error
function showFieldError(field, message) {
    clearFieldError(field);
    
    field.style.borderColor = '#ff6b6b';
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.style.color = '#ff6b6b';
    errorDiv.style.fontSize = '0.8rem';
    errorDiv.style.marginTop = '5px';
    errorDiv.textContent = message;
    
    field.parentNode.appendChild(errorDiv);
}

// Clear field error
function clearFieldError(field) {
    field.style.borderColor = '#e9ecef';
    
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
}

// Phone Masks
function initializePhoneMasks() {
    const phoneInputs = document.querySelectorAll('#celular');
    
    phoneInputs.forEach(input => {
        input.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            if (value.length <= 11) {
                if (value.length <= 2) {
                    value = value.replace(/(\d{0,2})/, '($1');
                } else if (value.length <= 6) {
                    value = value.replace(/(\d{2})(\d{0,4})/, '($1) $2');
                } else if (value.length <= 10) {
                    value = value.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
                } else {
                    value = value.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
                }
            }
            
            e.target.value = value;
        });
        
        input.addEventListener('keydown', function(e) {
            // Allow backspace, delete, tab, escape, enter
            if ([8, 9, 27, 13, 46].indexOf(e.keyCode) !== -1 ||
                // Allow Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
                (e.keyCode === 65 && e.ctrlKey === true) ||
                (e.keyCode === 67 && e.ctrlKey === true) ||
                (e.keyCode === 86 && e.ctrlKey === true) ||
                (e.keyCode === 88 && e.ctrlKey === true)) {
                return;
            }
            // Ensure it's a number
            if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
                e.preventDefault();
            }
        });
    });
}

// Salary Mask
function initializeSalaryMask() {
    const salaryInput = document.getElementById('pretensaoSalarial');
    
    if (salaryInput) {
        salaryInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            if (value) {
                value = (parseInt(value) / 100).toFixed(2);
                value = value.replace('.', ',');
                value = value.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
                value = 'R$ ' + value;
            }
            
            e.target.value = value;
        });
        
        salaryInput.addEventListener('keydown', function(e) {
            // Allow backspace, delete, tab, escape, enter
            if ([8, 9, 27, 13, 46].indexOf(e.keyCode) !== -1 ||
                // Allow Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
                (e.keyCode === 65 && e.ctrlKey === true) ||
                (e.keyCode === 67 && e.ctrlKey === true) ||
                (e.keyCode === 86 && e.ctrlKey === true) ||
                (e.keyCode === 88 && e.ctrlKey === true)) {
                return;
            }
            // Ensure it's a number
            if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
                e.preventDefault();
            }
        });
    }
}

// Scroll animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
            }
        });
    }, observerOptions);

    // Observe job cards
    const jobCards = document.querySelectorAll('.job-card');
    jobCards.forEach(card => {
        card.style.opacity = '0';
        observer.observe(card);
    });
}

// Header scroll effect
function initializeHeaderScroll() {
    const header = document.querySelector('header');
    const logo = document.querySelector('.logo img');
    
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 150) {
                header.classList.add('scrolled');
                header.classList.remove('transparent-header');
                if (logo) {
                    logo.src = 'images/logo.png'; // Switch to dark logo
                }
            } else {
                header.classList.remove('scrolled');
                header.classList.add('transparent-header');
                if (logo) {
                    logo.src = 'images/logo-white.png'; // Switch to white logo
                }
            }
        });
    }
}

// Menu toggle functionality
function initializeMenuToggle() {
    const menuToggle = document.querySelector('.menu-toggle');
    const dropdownMenu = document.querySelector('.dropdown-menu');
    const menuClose = document.querySelector('.menu-close');
    const body = document.body;
    
    if (menuToggle && dropdownMenu) {
        menuToggle.addEventListener('click', function() {
            dropdownMenu.classList.add('active');
            // Removed body.style.overflow = 'hidden' to allow scrolling
        });
    }
    
    if (menuClose) {
        menuClose.addEventListener('click', function() {
            dropdownMenu.classList.remove('active');
            // Removed body.style.overflow = 'auto' since we're not blocking scroll anymore
        });
    }
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (dropdownMenu && dropdownMenu.classList.contains('active')) {
            // Check if click is outside the menu and menu toggle button
            if (!dropdownMenu.contains(e.target) && !menuToggle.contains(e.target)) {
                dropdownMenu.classList.remove('active');
            }
        }
    });
    
    // Close menu with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && dropdownMenu && dropdownMenu.classList.contains('active')) {
            dropdownMenu.classList.remove('active');
            // Removed body.style.overflow = 'auto' since we're not blocking scroll anymore
        }
    });
}

// Smooth scrolling for internal links
function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const href = this.getAttribute('href');
            if (href !== '#') {
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}


// WhatsApp function
function openWhatsApp(message = 'Olá! Gostaria de mais informações sobre oportunidades de trabalho na Maori.') {
    const phoneNumber = '5541995698089';
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    window.open(whatsappURL, '_blank');
}

// Form Validation Functions
function validateRequiredFields(form) {
    let isValid = true;
    const requiredFields = form.querySelectorAll('input[required], select[required]');
    
    requiredFields.forEach(field => {
        const formGroup = field.closest('.form-group');
        
        // Check if field is visible and required
        if (field.offsetParent !== null && field.hasAttribute('required')) {
            if (!field.value.trim()) {
                showFieldError(formGroup);
                isValid = false;
            }
        }
    });
    
    return isValid;
}

function showFieldError(formGroup) {
    formGroup.classList.add('error');
}

function clearFormErrors(form) {
    const errorGroups = form.querySelectorAll('.form-group.error');
    errorGroups.forEach(group => {
        group.classList.remove('error');
    });
}

// Search functionality removed as per user request

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeScrollAnimations();
    initializeHeaderScroll();
    initializeSmoothScroll();
    initializeMenuToggle();
});

// Prevent form submission if there are validation errors
function validateFormBeforeSubmit() {
    const form = document.getElementById('applicationForm');
    const requiredFields = form.querySelectorAll('input[required], select[required]');
    let hasErrors = false;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            showFieldError(field, 'Este campo é obrigatório');
            hasErrors = true;
        }
    });
    
    // Validate email specifically
    const emailField = document.getElementById('email');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailField.value && !emailRegex.test(emailField.value)) {
        showFieldError(emailField, 'Por favor, insira um e-mail válido');
        hasErrors = true;
    }
    
    // Validate privacy policy checkbox
    const privacyCheckbox = document.getElementById('privacyPolicy');
    if (!privacyCheckbox.checked) {
        alert('Você deve aceitar a Política de Privacidade para continuar.');
        hasErrors = true;
    }
    
    return !hasErrors;
}

// Update form submit handler to include validation
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('applicationForm');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateFormBeforeSubmit()) {
                handleFormSubmit(e);
            }
        });
    }
});
