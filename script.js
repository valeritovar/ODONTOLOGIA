// JavaScript para la página web odontológica

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar todas las funcionalidades
    initNavigation();
    initTestimonialSlider();
    initFormHandling();
    initScrollAnimations();
    initNewsletterForm();
    initSmoothScrolling();
});

// Función para la navegación móvil
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle del menú hamburguesa
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Cerrar menú al hacer clic en un enlace
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Cambiar estilo del header al hacer scroll
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.15)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        }
    });
}

// Función para el slider de testimonios
function initTestimonialSlider() {
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;

    function showSlide(index) {
        // Ocultar todas las tarjetas
        testimonialCards.forEach(card => card.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        // Mostrar la tarjeta actual
        testimonialCards[index].classList.add('active');
        dots[index].classList.add('active');
    }

    // Event listeners para los dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            currentSlide = index;
            showSlide(currentSlide);
        });
    });

    // Auto-avanzar el slider cada 5 segundos
    setInterval(function() {
        currentSlide = (currentSlide + 1) % testimonialCards.length;
        showSlide(currentSlide);
    }, 5000);
}

// Función para manejar el formulario de contacto
function initFormHandling() {
    const form = document.getElementById('appointmentForm');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Obtener los datos del formulario
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            
            // Validación básica
            if (!validateForm(data)) {
                return;
            }
            
            // Mostrar mensaje de carga
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.innerHTML = '<span class="loading"></span> Enviando...';
            submitBtn.disabled = true;
            
            // Construir mensaje para WhatsApp
            const whatsappMessage = buildWhatsAppMessage(data);
            
            // Número de WhatsApp del usuario
            const whatsappNumber = '3112617515';
            
            // Abrir WhatsApp con el mensaje prellenado
            setTimeout(function() {
                const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
                window.open(whatsappUrl, '_blank');
                
                // Mostrar mensaje de éxito
                showNotification('¡Redirigiendo a WhatsApp para agendar tu cita!', 'success');
                
                // Resetear el formulario
                form.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1000);
        });
    }
}

// Función para construir el mensaje de WhatsApp
function buildWhatsAppMessage(data) {
    const serviceNames = {
        'limpieza': 'Limpieza Dental',
        'blanqueamiento': 'Blanqueamiento Dental',
        'ortodoncia': 'Ortodoncia',
        'implantes': 'Implantes Dentales',
        'endodoncia': 'Endodoncia',
        'odontopediatria': 'Odontopediatría',
        'consulta': 'Consulta general'
    };
    
    const serviceName = serviceNames[data.service] || data.service;
    
    let message = '🦷 *NUEVA SOLICITUD DE CITA - CLÍNICA DENTAL* 🦷\n\n';
    message += '*Datos del Paciente:*\n';
    message += `👤 *Nombre:* ${data.name}\n`;
    message += `📧 *Email:* ${data.email}\n`;
    message += `📱 *Teléfono:* ${data.phone}\n`;
    message += `🦷 *Servicio solicitado:* ${serviceName}\n`;
    message += `📅 *Fecha deseada:* ${data.date}\n`;
    
    if (data.message && data.message.trim()) {
        message += `💬 *Mensaje adicional:* ${data.message}\n`;
    }
    
    message += '\n Por favor contactar al paciente para confirmar la cita. 📞';
    
    return message;
}

// Función de validación del formulario
function validateForm(data) {
    // Validar nombre
    if (data.name.trim().length < 3) {
        showNotification('Por favor, ingresa un nombre válido (mínimo 3 caracteres).', 'error');
        return false;
    }
    
    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        showNotification('Por favor, ingresa un correo electrónico válido.', 'error');
        return false;
    }
    
    // Validar teléfono
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(data.phone.replace(/\s/g, ''))) {
        showNotification('Por favor, ingresa un número de teléfono válido (10 dígitos).', 'error');
        return false;
    }
    
    // Validar que se haya seleccionado un servicio
    if (!data.service) {
        showNotification('Por favor, selecciona un servicio.', 'error');
        return false;
    }
    
    // Validar fecha
    const selectedDate = new Date(data.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate < today) {
        showNotification('Por favor, selecciona una fecha futura.', 'error');
        return false;
    }
    
    return true;
}

// Función para mostrar notificaciones
function showNotification(message, type) {
    // Crear el elemento de notificación
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Añadir estilos CSS si no existen
    if (!document.querySelector('#notification-styles')) {
        const styles = document.createElement('style');
        styles.id = 'notification-styles';
        styles.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                background: white;
                padding: 15px 20px;
                border-radius: 8px;
                box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
                z-index: 10000;
                display: flex;
                align-items: center;
                justify-content: space-between;
                min-width: 300px;
                animation: slideIn 0.3s ease;
            }
            
            .notification.success {
                border-left: 4px solid #28a745;
            }
            
            .notification.error {
                border-left: 4px solid #dc3545;
            }
            
            .notification-content {
                display: flex;
                align-items: center;
                gap: 10px;
            }
            
            .notification.success .notification-content i {
                color: #28a745;
            }
            
            .notification.error .notification-content i {
                color: #dc3545;
            }
            
            .notification-close {
                background: none;
                border: none;
                font-size: 16px;
                cursor: pointer;
                color: #666;
                padding: 0;
                margin-left: 15px;
            }
            
            .notification-close:hover {
                color: #333;
            }
            
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(styles);
    }
    
    // Añadir la notificación al DOM
    document.body.appendChild(notification);
    
    // Función para cerrar la notificación
    function closeNotification() {
        notification.style.animation = 'slideIn 0.3s ease reverse';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }
    
    // Event listener para el botón de cerrar
    notification.querySelector('.notification-close').addEventListener('click', closeNotification);
    
    // Auto-cerrar después de 5 segundos
    setTimeout(closeNotification, 5000);
}

// Función para animaciones al hacer scroll
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observar elementos con clase fade-in
    const fadeElements = document.querySelectorAll('.service-card, .feature, .testimonial-card');
    fadeElements.forEach(element => {
        element.classList.add('fade-in');
        observer.observe(element);
    });
}

// Función para el formulario de newsletter
function initNewsletterForm() {
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = newsletterForm.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            // Validar email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showNotification('Por favor, ingresa un correo electrónico válido.', 'error');
                return;
            }
            
            // Mostrar mensaje de éxito
            showNotification('¡Gracias por suscribirte a nuestro newsletter!', 'success');
            
            // Limpiar el formulario
            emailInput.value = '';
        });
    }
}

// Función para scroll suave
function initSmoothScrolling() {
    // Ya se implementó en CSS con scroll-behavior: smooth
    // Esta función puede ser útil para navegadores que no soportan esa propiedad
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80; // Ajustar por el header fijo
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Función para actualizar el año en el footer
function updateFooterYear() {
    const footerYear = document.querySelector('.footer-bottom p');
    if (footerYear) {
        const currentYear = new Date().getFullYear();
        footerYear.innerHTML = footerYear.innerHTML.replace(/\d{4}/, currentYear);
    }
}

// Función para agregar efectos hover a las tarjetas de servicios
function addServiceCardEffects() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Función para animar números (si se necesita en el futuro)
function animateNumbers() {
    const numbers = document.querySelectorAll('.animate-number');
    
    numbers.forEach(number => {
        const target = parseInt(number.getAttribute('data-target'));
        const duration = 2000; // 2 segundos
        const increment = target / (duration / 16); // 60fps
        let current = 0;
        
        const updateNumber = () => {
            current += increment;
            if (current < target) {
                number.textContent = Math.floor(current);
                requestAnimationFrame(updateNumber);
            } else {
                number.textContent = target;
            }
        };
        
        // Iniciar la animación cuando el elemento sea visible
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateNumber();
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(number);
    });
}

// Función para prevenir el envío múltiple de formularios
function preventMultipleSubmits() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        let isSubmitting = false;
        
        form.addEventListener('submit', function(e) {
            if (isSubmitting) {
                e.preventDefault();
                return false;
            }
            
            isSubmitting = true;
            
            // Resetear el estado después de 5 segundos
            setTimeout(() => {
                isSubmitting = false;
            }, 5000);
        });
    });
}

// Inicializar funciones adicionales
document.addEventListener('DOMContentLoaded', function() {
    updateFooterYear();
    addServiceCardEffects();
    preventMultipleSubmits();
});

// Manejo de errores global
window.addEventListener('error', function(e) {
    console.error('Error en la página:', e.error);
    // En producción, aquí se podría enviar el error a un servicio de monitoreo
});

// Optimización de rendimiento - Lazy loading para imágenes (si se añaden en el futuro)
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Inicializar lazy loading
document.addEventListener('DOMContentLoaded', initLazyLoading);
