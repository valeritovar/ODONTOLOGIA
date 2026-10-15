// ===== DOM CONTENT LOADED =====
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar AOS (Animate On Scroll)
    AOS.init({
        duration: 1200,
        once: true,
        offset: 100,
        easing: 'ease-out-cubic'
    });

    // Inicializar todas las funcionalidades
    initPreloader();
    initNavigation();
    initScrollEffects();
    initAnimations();
    initFormValidation();
    initSmoothScroll();
    initMobileMenu();
    initServicesTabs();
    initMembershipCards();
    initAppointmentForm();
    initParallax();
    initLazyLoading();
    initIntersectionObserver();
    initBackToTop();
    initLuxuryEffects();
});

// ===== PRELOADER ELEGANTE =====
function initPreloader() {
    const preloader = document.querySelector('.preloader');
    const preloaderLine = document.querySelector('.preloader-line');
    
    if (preloader && preloaderLine) {
        // Simular carga elegante
        setTimeout(() => {
            preloader.classList.add('hidden');
            document.body.style.overflow = '';
        }, 2500);
        
        document.body.style.overflow = 'hidden';
    }
}

// ===== NAVIGATION =====
function initNavigation() {
    const header = document.querySelector('.header');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Efecto de scroll en header
    window.addEventListener('scroll', throttle(() => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }, 100));
    
    // Active nav link basado en scroll position
    window.addEventListener('scroll', throttle(() => {
        let current = '';
        const sections = document.querySelectorAll('section[id]');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    }, 100));
}

// ===== MOBILE MENU =====
function initMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', () => {
            mobileMenuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });
        
        // Cerrar menú al hacer click en enlace
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
        
        // Cerrar menú con escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                mobileMenuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
}

// ===== SMOOTH SCROLL =====
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').slice(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== SERVICES TABS =====
function initServicesTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    if (tabBtns.length > 0 && tabContents.length > 0) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const targetTab = btn.getAttribute('data-tab');
                
                // Actualizar botones activos
                tabBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                // Actualizar contenido activo
                tabContents.forEach(content => {
                    content.classList.remove('active');
                    if (content.id === targetTab) {
                        content.classList.add('active');
                    }
                });
            });
        });
    }
}

// ===== MEMBERSHIP CARDS =====
function initMembershipCards() {
    const membershipBtns = document.querySelectorAll('.membership-btn');
    
    membershipBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const card = btn.closest('.membership-card');
            const membershipName = card.querySelector('.membership-name').textContent;
            
            showNotification(`Has seleccionado la membresía ${membershipName}`, 'success');
            
            // Simular proceso de selección
            btn.textContent = 'Procesando...';
            btn.disabled = true;
            
            setTimeout(() => {
                btn.textContent = 'Seleccionado ✓';
                btn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
                
                // Redirigir al formulario de citas
                setTimeout(() => {
                    document.getElementById('contacto').scrollIntoView({ behavior: 'smooth' });
                }, 1500);
            }, 2000);
        });
    });
}

// ===== APPOINTMENT FORM =====
function initAppointmentForm() {
    const form = document.getElementById('appointmentForm');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateAppointmentForm(form)) {
                submitAppointmentForm(form);
            }
        });
        
        // Validación en tiempo real
        const inputs = form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => validateField(input));
            input.addEventListener('input', () => {
                input.classList.remove('error');
                const errorMsg = input.parentNode.querySelector('.error-message');
                if (errorMsg) errorMsg.remove();
            });
        });
        
        // Establecer fecha mínima (hoy)
        const dateInput = document.getElementById('date');
        if (dateInput) {
            const today = new Date().toISOString().split('T')[0];
            dateInput.min = today;
        }
    }
}

function validateAppointmentForm(form) {
    let isValid = true;
    const requiredFields = form.querySelectorAll('[required]');
    
    requiredFields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });
    
    return isValid;
}

function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';
    
    // Remover error anterior
    field.classList.remove('error');
    const existingError = field.parentNode.querySelector('.error-message');
    if (existingError) existingError.remove();
    
    // Validaciones
    if (field.hasAttribute('required') && !value) {
        errorMessage = 'Este campo es obligatorio';
        isValid = false;
    } else if (field.type === 'email' && value && !isValidEmail(value)) {
        errorMessage = 'Por favor, ingresa un email válido';
        isValid = false;
    } else if (field.type === 'tel' && value && !isValidPhone(value)) {
        errorMessage = 'Por favor, ingresa un teléfono válido';
        isValid = false;
    } else if (field.id === 'firstName' && value && value.length < 2) {
        errorMessage = 'El nombre debe tener al menos 2 caracteres';
        isValid = false;
    } else if (field.id === 'lastName' && value && value.length < 2) {
        errorMessage = 'El apellido debe tener al menos 2 caracteres';
        isValid = false;
    } else if (field.id === 'message' && value && value.length < 10) {
        errorMessage = 'El mensaje debe tener al menos 10 caracteres';
        isValid = false;
    } else if (field.id === 'date' && value) {
        const selectedDate = new Date(value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (selectedDate < today) {
            errorMessage = 'La fecha no puede ser anterior a hoy';
            isValid = false;
        }
    }
    
    if (!isValid) {
        field.classList.add('error');
        const errorElement = document.createElement('span');
        errorElement.className = 'error-message';
        errorElement.textContent = errorMessage;
        errorElement.style.cssText = `
            color: #e8b4b8;
            font-size: 0.875rem;
            margin-top: 0.25rem;
            display: block;
        `;
        field.parentNode.appendChild(errorElement);
    }
    
    return isValid;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
}

function submitAppointmentForm(form) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Mostrar loading
    const submitBtn = form.querySelector('.submit-btn');
    const originalContent = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Procesando...';
    submitBtn.disabled = true;
    
    // Construir mensaje para WhatsApp
    const whatsappMessage = encodeURIComponent(
        `✨ *NUEVA CONSULTA VIP - DENTAL ELITE* ✨\n\n` +
        `👤 *Nombre:* ${data.firstName || 'No proporcionado'} ${data.lastName || ''}\n` +
        `📧 *Email:* ${data.email || 'No proporcionado'}\n` +
        `📞 *Teléfono:* ${data.phone || 'No proporcionado'}\n` +
        `🦷 *Servicio:* ${data.service ? getServiceName(data.service) : 'No seleccionado'}\n` +
        `📅 *Fecha Preferida:* ${data.date || 'No especificada'}\n` +
        `⏰ *Hora Preferida:* ${data.time || 'No especificada'}\n` +
        `💬 *Comentarios:* ${data.message || 'No proporcionados'}\n\n` +
        `📅 *Fecha de envío:* ${new Date().toLocaleString('es-CO')}\n` +
        `🏥 *Clínica:* Dental Elite - Odontología de Lujo`
    );
    
    // Número de WhatsApp
    const whatsappNumber = '3112617515';
    
    // Abrir WhatsApp con el mensaje
    setTimeout(() => {
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;
        window.open(whatsappUrl, '_blank');
        
        // Mostrar mensaje de éxito
        showNotification('¡Redirigiendo a WhatsApp para confirmar tu consulta VIP...', 'success');
        
        // Resetear formulario
        form.reset();
        submitBtn.innerHTML = originalContent;
        submitBtn.disabled = false;
        
        // Limpiar errores
        form.querySelectorAll('.error').forEach(field => {
            field.classList.remove('error');
        });
        form.querySelectorAll('.error-message').forEach(msg => {
            msg.remove();
        });
        
        // Mostrar confirmación
        setTimeout(() => {
            showConfirmationMessage();
        }, 1500);
    }, 1000);
}

// Función para obtener el nombre del servicio
function getServiceName(serviceValue) {
    const services = {
        'cosmetic': 'Cosmética Dental',
        'implants': 'Implantes',
        'orthodontics': 'Ortodoncia',
        'whitening': 'Blanqueamiento',
        'general': 'Consulta General',
        'vip': 'Experience VIP'
    };
    return services[serviceValue] || serviceValue;
}

function showConfirmationMessage() {
    const confirmation = document.createElement('div');
    confirmation.className = 'confirmation-message';
    confirmation.innerHTML = `
        <div class="confirmation-content">
            <div class="confirmation-icon">
                <i class="fas fa-check-circle"></i>
            </div>
            <h3>Consulta Reservada</h3>
            <p>Gracias por confiar en Dental Elite. Nuestro equipo se pondrá en contacto contigo en las próximas 24 horas para confirmar los detalles de tu consulta exclusiva.</p>
            <button class="confirmation-close">
                <span>Cerrar</span>
            </button>
        </div>
    `;
    
    // Añadir estilos si no existen
    if (!document.querySelector('#confirmation-styles')) {
        const styles = document.createElement('style');
        styles.id = 'confirmation-styles';
        styles.textContent = `
            .confirmation-message {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0,0,0,0.8);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s ease;
            }
            
            .confirmation-message.show {
                opacity: 1;
                visibility: visible;
            }
            
            .confirmation-content {
                background: white;
                padding: 3rem;
                border-radius: 1.5rem;
                max-width: 500px;
                text-align: center;
                box-shadow: 0 20px 48px rgba(0,0,0,0.2);
            }
            
            .confirmation-icon {
                width: 80px;
                height: 80px;
                background: linear-gradient(135deg, #d4af37 0%, #f0d878 100%);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-size: 2rem;
                margin: 0 auto 1.5rem;
            }
            
            .confirmation-content h3 {
                font-family: 'Playfair Display', serif;
                font-size: 2rem;
                font-weight: bold;
                color: #2c2c2c;
                margin-bottom: 1rem;
            }
            
            .confirmation-content p {
                color: #404040;
                line-height: 1.8;
                margin-bottom: 2rem;
            }
            
            .confirmation-close {
                background: linear-gradient(135deg, #d4af37 0%, #f0d878 100%);
                color: #2c2c2c;
                border: none;
                padding: 1rem 2rem;
                border-radius: 0.75rem;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
            }
            
            .confirmation-close:hover {
                transform: translateY(-2px);
                box-shadow: 0 8px 24px rgba(0,0,0,0.15);
            }
        `;
        document.head.appendChild(styles);
    }
    
    document.body.appendChild(confirmation);
    
    setTimeout(() => {
        confirmation.classList.add('show');
    }, 100);
    
    const closeBtn = confirmation.querySelector('.confirmation-close');
    closeBtn.addEventListener('click', () => {
        confirmation.classList.remove('show');
        setTimeout(() => {
            confirmation.remove();
        }, 300);
    });
    
    // Cerrar automáticamente después de 10 segundos
    setTimeout(() => {
        if (confirmation.parentNode) {
            confirmation.classList.remove('show');
            setTimeout(() => {
                confirmation.remove();
            }, 300);
        }
    }, 10000);
}

// ===== FORM VALIDATION =====
function initFormValidation() {
    // Validación adicional para otros formularios si existen
    const forms = document.querySelectorAll('form:not(#appointmentForm)');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm(form)) {
                showNotification('Formulario enviado con éxito', 'success');
                form.reset();
            }
        });
    });
}

function validateForm(form) {
    let isValid = true;
    const requiredFields = form.querySelectorAll('[required]');
    
    requiredFields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });
    
    return isValid;
}

// ===== NOTIFICATIONS =====
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Añadir estilos si no existen
    if (!document.querySelector('#notification-styles')) {
        const styles = document.createElement('style');
        styles.id = 'notification-styles';
        styles.textContent = `
            .notification {
                position: fixed;
                top: 100px;
                right: 20px;
                background: white;
                padding: 16px 20px;
                border-radius: 12px;
                box-shadow: 0 20px 48px rgba(0,0,0,0.15);
                z-index: 10000;
                max-width: 400px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                transform: translateX(400px);
                transition: transform 0.3s ease;
                border-left: 4px solid #d4af37;
            }
            
            .notification.show {
                transform: translateX(0);
            }
            
            .notification-success {
                border-left-color: #10b981;
            }
            
            .notification-success .notification-content i {
                color: #10b981;
            }
            
            .notification-content {
                display: flex;
                align-items: center;
                gap: 12px;
            }
            
            .notification-close {
                background: none;
                border: none;
                color: #6b7280;
                cursor: pointer;
                padding: 4px;
                border-radius: 4px;
                transition: background 0.2s;
            }
            
            .notification-close:hover {
                background: #f3f4f6;
            }
            
            @media (max-width: 768px) {
                .notification {
                    right: 10px;
                    left: 10px;
                    max-width: none;
                }
            }
        `;
        document.head.appendChild(styles);
    }
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    const autoClose = setTimeout(() => {
        closeNotification(notification);
    }, 5000);
    
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        clearTimeout(autoClose);
        closeNotification(notification);
    });
}

function closeNotification(notification) {
    notification.classList.remove('show');
    setTimeout(() => {
        notification.remove();
    }, 300);
}

// ===== BACK TO TOP =====
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', throttle(() => {
            if (window.scrollY > 500) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        }, 100));
        
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// ===== PARALLAX =====
function initParallax() {
    const parallaxElements = document.querySelectorAll('.hero-pattern');
    
    window.addEventListener('scroll', throttle(() => {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    }, 100));
}

// ===== LAZY LOADING =====
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        img.classList.add('lazy');
        imageObserver.observe(img);
    });
}

// ===== INTERSECTION OBSERVER =====
function initIntersectionObserver() {
    const animatedElements = document.querySelectorAll('.experience-card, .service-premium, .membership-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// ===== LUXURY EFFECTS =====
function initLuxuryEffects() {
    // Efecto de brillo dorado en hover
    const luxuryElements = document.querySelectorAll('.btn-vip, .service-visual, .membership-card.featured');
    
    luxuryElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            element.style.boxShadow = '0 0 30px rgba(212, 175, 55, 0.4)';
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.boxShadow = '';
        });
    });
    
    // Efecto de typing sutil en el título principal
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        heroTitle.style.opacity = '1';
        
        let index = 0;
        function typeText() {
            if (index < text.length) {
                heroTitle.textContent += text.charAt(index);
                index++;
                setTimeout(typeText, 50);
            }
        }
        
        setTimeout(typeText, 1500);
    }
    
    // Animación suave de números en estadísticas
    const numbers = document.querySelectorAll('.price-amount');
    numbers.forEach(number => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateNumber(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(number);
    });
}

function animateNumber(element) {
    const target = parseInt(element.textContent.replace(/[^0-9]/g, ''));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    function updateNumber() {
        current += increment;
        if (current < target) {
            element.textContent = Math.ceil(current);
            requestAnimationFrame(updateNumber);
        } else {
            element.textContent = target;
        }
    }
    
    updateNumber();
}

// ===== ANIMATIONS =====
function initAnimations() {
    // Animaciones sutiles adicionales
    const fadeElements = document.querySelectorAll('.hero-badge, .hero-actions, .hero-features');
    
    fadeElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 1000 + (index * 200));
    });
}

// ===== SCROLL EFFECTS =====
function initScrollEffects() {
    // Efecto de elegancia al hacer scroll
    let lastScrollY = 0;
    
    window.addEventListener('scroll', throttle(() => {
        const currentScrollY = window.scrollY;
        
        // Efecto de parallax sutil en elementos
        const parallaxElements = document.querySelectorAll('.experience-card, .service-premium');
        parallaxElements.forEach((element, index) => {
            const rect = element.getBoundingClientRect();
            const speed = 0.5 + (index * 0.1);
            
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const yPos = (currentScrollY * speed) * 0.1;
                element.style.transform = `translateY(${yPos}px)`;
            }
        });
        
        lastScrollY = currentScrollY;
    }, 100));
}

// ===== UTILITIES =====
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ===== ACCESSIBILITY =====
function initAccessibility() {
    // Focus management
    const focusableElements = document.querySelectorAll('a, button, input, textarea, select');
    
    focusableElements.forEach(element => {
        element.addEventListener('focus', () => {
            element.style.outline = '2px solid #d4af37';
            element.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', () => {
            element.style.outline = '';
            element.style.outlineOffset = '';
        });
    });
    
    // Skip to main content link
    const skipLink = document.createElement('a');
    skipLink.href = '#main';
    skipLink.textContent = 'Saltar al contenido principal';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: #d4af37;
        color: #2c2c2c;
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 10000;
        transition: top 0.3s;
        font-weight: 600;
    `;
    
    skipLink.addEventListener('focus', () => {
        skipLink.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', () => {
        skipLink.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
}

// Inicializar accesibilidad
initAccessibility();

// ===== ERROR HANDLING =====
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
});

// ===== SERVICE WORKER (PWA) =====
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// ===== CONSOLE MESSAGE =====
console.log('%c✨ Dental Elite - Odontología de Lujo', 'color: #d4af37; font-size: 20px; font-weight: bold;');
console.log('%cDonde la excelencia se encuentra con la elegancia', 'color: #2c2c2c; font-size: 14px;');
