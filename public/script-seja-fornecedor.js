// Seja um Fornecedor Maori - JavaScript Functionality
// Maori Incorporadora

document.addEventListener('DOMContentLoaded', function() {
    initializeFormFunctionality();
    initializeFileUpload();
    initializeFormValidation();
    initializePhoneMasks();
    initializeScrollAnimations();
    initializeHeaderScroll();
    initializeSmoothScroll();
    initializeMenuToggle();
});

// Form Functionality
function initializeFormFunctionality() {
    const form = document.getElementById('supplierForm');
    
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    }

    // Handle tipo de fornecimento field options
    const tipoFornecimentoSelect = document.getElementById('tipoFornecimento');
    const categorizacaoSelect = document.getElementById('categorizacao');
    
    if (tipoFornecimentoSelect && categorizacaoSelect) {
        tipoFornecimentoSelect.addEventListener('change', function() {
            updateCategorizacaoOptions(this.value);
        });
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
}

// Update categorização options based on tipo de fornecimento
function updateCategorizacaoOptions(tipo) {
    const categorizacaoSelect = document.getElementById('categorizacao');
    const materialOptions = document.getElementById('materialOptions');
    const servicoOptions = document.getElementById('servicoOptions');
    
    // Reset select
    categorizacaoSelect.innerHTML = '<option value="">Selecione</option>';
    
    if (tipo === 'material') {
        // Show material options
        materialOptions.style.display = 'block';
        servicoOptions.style.display = 'none';
        categorizacaoSelect.appendChild(materialOptions);
    } else if (tipo === 'servico') {
        // Show service options
        materialOptions.style.display = 'none';
        servicoOptions.style.display = 'block';
        categorizacaoSelect.appendChild(servicoOptions);
    } else {
        // Hide both
        materialOptions.style.display = 'none';
        servicoOptions.style.display = 'none';
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
    const supplierData = {};
    for (let [key, value] of formData.entries()) {
        supplierData[key] = value;
    }
    
    // Handle multiple files
    const files = form.querySelector('#documentos').files;
    if (files.length > 0) {
        supplierData.documentos = Array.from(files).map(file => file.name).join(', ');
    }
    
    // Send email with form data
    sendSupplierEmail(supplierData)
        .then(() => {
            // Reset loading state
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
            
            // Show success message
            showSuccessMessage();
            
            // Reset form
            form.reset();
            updateFileName('Nenhum arquivo selecionado');
            
            // Reset categorização
            updateCategorizacaoOptions('');
        })
        .catch((error) => {
            console.error('Error sending supplier registration:', error);
            
            // Reset loading state
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
            
            // Show error message
            showErrorMessage();
        });
}

// Send supplier registration email
async function sendSupplierEmail(data) {
    // Create email content
    const tipoText = data.tipoFornecimento === 'material' ? 'Material' : 'Serviço';
    
    const emailContent = `
Novo Cadastro de Fornecedor - Maori Incorporadora

=== DADOS DA EMPRESA ===
Nome da Empresa: ${data.nomeEmpresa || 'Não informado'}
Nome do Responsável: ${data.nomeResponsavel || 'Não informado'}
E-mail: ${data.email || 'Não informado'}
Celular: ${data.celular || 'Não informado'}
Telefone: ${data.telefone || 'Não informado'}
Cidade: ${data.cidade || 'Não informado'}

=== TIPO DE FORNECIMENTO ===
Tipo: ${tipoText}
Categorização: ${data.categorizacao || 'Não informado'}

=== MENSAGEM ===
${data.mensagem || 'Nenhuma mensagem enviada'}

=== DOCUMENTOS ===
${data.documentos ? 'Documentos anexados: ' + data.documentos : 'Nenhum documento anexado'}

Data do Cadastro: ${new Date().toLocaleString('pt-BR')}
    `.trim();
    
    // For now, this will create a mailto link since we can't send emails directly from frontend
    // In a real implementation, you would send this to a backend API
    const mailtoLink = `mailto:thales@nukard.com.br?subject=Novo Cadastro de Fornecedor - ${data.nomeEmpresa || 'Fornecedor'}&body=${encodeURIComponent(emailContent)}`;
    
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
    modal.style.cssText = `
        display: block;
        position: fixed;
        z-index: 2000;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.8);
        backdrop-filter: blur(5px);
    `;
    
    modal.innerHTML = `
        <div style="
            background-color: white;
            margin: 10% auto;
            padding: 0;
            border-radius: 16px;
            width: 90%;
            max-width: 500px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            overflow: hidden;
            animation: modalSlideIn 0.3s ease-out;
        ">
            <div style="
                background: linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%);
                color: white;
                padding: 30px;
                position: relative;
                display: flex;
                justify-content: space-between;
                align-items: center;
            ">
                <h3 style="font-size: 1.3rem; font-weight: 600; margin: 0; flex: 1;">
                    <i class="fas fa-exclamation-triangle"></i> Erro no Envio
                </h3>
                <span onclick="this.closest('.modal').style.display='none'" style="
                    color: white;
                    font-size: 28px;
                    font-weight: bold;
                    cursor: pointer;
                    width: 35px;
                    height: 35px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 50%;
                    transition: all 0.3s ease;
                ">&times;</span>
            </div>
            <div style="padding: 30px; text-align: center;">
                <p style="margin-bottom: 30px; color: #666; line-height: 1.6;">
                    Ocorreu um erro ao enviar seu cadastro. Por favor, tente novamente ou entre em contato diretamente pelo WhatsApp.
                </p>
                <div style="margin-top: 20px;">
                    <button onclick="openWhatsApp('Olá! Gostaria de me cadastrar como fornecedor da Maori.'); this.closest('.modal').style.display='none'" style="
                        background-color: #008d93;
                        color: white;
                        border: none;
                        padding: 12px 24px;
                        border-radius: 25px;
                        font-weight: 600;
                        cursor: pointer;
                        transition: all 0.3s ease;
                        display: inline-flex;
                        align-items: center;
                        gap: 8px;
                        font-family: 'Montserrat', sans-serif;
                    ">
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
    modal.style.cssText = `
        display: block;
        position: fixed;
        z-index: 2000;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.8);
        backdrop-filter: blur(5px);
    `;
    
    modal.innerHTML = `
        <div style="
            background-color: white;
            margin: 10% auto;
            padding: 0;
            border-radius: 16px;
            width: 90%;
            max-width: 500px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            overflow: hidden;
            animation: modalSlideIn 0.3s ease-out;
        ">
            <div style="
                background: linear-gradient(135deg, #51cf66 0%, #40c057 100%);
                color: white;
                padding: 30px;
                position: relative;
                display: flex;
                justify-content: space-between;
                align-items: center;
            ">
                <h3 style="font-size: 1.3rem; font-weight: 600; margin: 0; flex: 1;">
                    <i class="fas fa-check-circle"></i> Cadastro Enviado!
                </h3>
                <span onclick="this.closest('.modal').style.display='none'" style="
                    color: white;
                    font-size: 28px;
                    font-weight: bold;
                    cursor: pointer;
                    width: 35px;
                    height: 35px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 50%;
                    transition: all 0.3s ease;
                ">&times;</span>
            </div>
            <div style="padding: 30px; text-align: center;">
                <p style="margin-bottom: 20px; color: #666; line-height: 1.6;">
                    Seu cadastro foi enviado com sucesso! Nossa equipe de compras analisará suas informações e retornará em breve.
                </p>
                <p style="color: #666; line-height: 1.6;">
                    Você também pode entrar em contato diretamente através do e-mail <strong>compras@maoriincorporadora.com</strong>
                </p>
            </div>
        </div>
    `;
    return modal;
}

// File Upload Functionality
function initializeFileUpload() {
    const fileInput = document.getElementById('documentos');
    const fileName = document.querySelector('.file-name');
    
    if (fileInput && fileName) {
        fileInput.addEventListener('change', function(e) {
            const files = e.target.files;
            
            if (files.length > 0) {
                let totalSize = 0;
                let fileNames = [];
                let invalidFiles = [];
                
                for (let i = 0; i < files.length; i++) {
                    const file = files[i];
                    
                    // Validate file size (10MB max per file)
                    if (file.size > 10 * 1024 * 1024) {
                        invalidFiles.push(`${file.name} (muito grande - máx 10MB)`);
                        continue;
                    }
                    
                    // Validate file type
                    const allowedTypes = ['.pdf', '.doc', '.docx', '.jpg', '.jpeg', '.png'];
                    const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
                    
                    if (!allowedTypes.includes(fileExtension)) {
                        invalidFiles.push(`${file.name} (tipo não permitido)`);
                        continue;
                    }
                    
                    totalSize += file.size;
                    fileNames.push(file.name);
                }
                
                if (invalidFiles.length > 0) {
                    alert(`Arquivos inválidos:\n${invalidFiles.join('\n')}\n\nApenas arquivos PDF, DOC, DOCX, JPG, JPEG ou PNG até 10MB são permitidos.`);
                }
                
                if (fileNames.length > 0) {
                    updateFileName(`${fileNames.length} arquivo(s) selecionado(s): ${fileNames.join(', ')}`);
                } else {
                    fileInput.value = '';
                    updateFileName('Nenhum arquivo selecionado');
                }
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
    const form = document.getElementById('supplierForm');
    
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
    const phoneInputs = document.querySelectorAll('#telefone, #celular');
    
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

// Scroll to form
function scrollToForm() {
    const formSection = document.querySelector('.registration-section');
    
    if (formSection) {
        formSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
        
        // Focus on first form field
        setTimeout(() => {
            const firstInput = document.getElementById('nomeEmpresa');
            if (firstInput) {
                firstInput.focus();
            }
        }, 1000);
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

    // Observe benefit cards
    const benefitCards = document.querySelectorAll('.benefit-card');
    benefitCards.forEach(card => {
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
function openWhatsApp(message = 'Olá! Gostaria de mais informações sobre como ser um fornecedor da Maori.') {
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

// Prevent form submission if there are validation errors
function validateFormBeforeSubmit() {
    const form = document.getElementById('supplierForm');
    const requiredFields = form.querySelectorAll('input[required], select[required]');
    let hasErrors = false;
    
    requiredFields.forEach(field => {
        // Only validate visible required fields
        if (field.offsetParent !== null && field.hasAttribute('required')) {
            if (!field.value.trim()) {
                showFieldError(field, 'Este campo é obrigatório');
                hasErrors = true;
            }
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
    const form = document.getElementById('supplierForm');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateFormBeforeSubmit()) {
                handleFormSubmit(e);
            }
        });
    }
});
