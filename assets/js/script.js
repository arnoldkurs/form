document.addEventListener('DOMContentLoaded', function() {
    // Автоматически масштабируем на очень маленьких экранах
    // function adjustZoomForMobile() {
    //     const isMobile = window.innerWidth < 768;
    //     const viewportMeta = document.querySelector('meta[name="viewport"]');
        
    //     if (isMobile && viewportMeta) {
    //         // Для мобилок устанавливаем начальный zoom
    //         const scale = Math.min(1, window.innerWidth / 1200);
    //         viewportMeta.content = `width=1200, initial-scale=${scale}, maximum-scale=5.0, user-scalable=yes`;
    //     }
    // }
    
    // // Вызываем при загрузке и изменении размера окна
    // adjustZoomForMobile();
    // window.addEventListener('resize', adjustZoomForMobile);
    
    // Параллакс эффект для фонового изображения
    const header = document.getElementById('header');
    const heroImage = document.querySelector('.author-photo');
    
    if (header && heroImage) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.5;
            
            heroImage.style.transform = `translateY(${rate}px) scale(1.03)`;
        });
    }
    
    // Анимация появления элементов при загрузке
    const textBlock = document.querySelector('.text-block');
    const ctaContainer = document.querySelector('.cta-container');
    
    if (textBlock) {
        textBlock.style.opacity = '0';
        textBlock.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            textBlock.style.transition = 'opacity 1s ease, transform 1s ease';
            textBlock.style.opacity = '1';
            textBlock.style.transform = 'translateY(0)';
        }, 300);
    }
    
    if (ctaContainer) {
        ctaContainer.style.opacity = '0';
        
        setTimeout(() => {
            ctaContainer.style.transition = 'opacity 1s ease 0.5s';
            ctaContainer.style.opacity = '1';
        }, 800);
    }
    
    // Интерактивность для кнопки
    const ctaButton = document.querySelector('.cta-button');
    
    if (ctaButton) {
        ctaButton.addEventListener('click', function(e) {
            // Добавляем эффект "волны" при клике
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.7);
                transform: scale(0);
                animation: ripple-animation 0.6s linear;
                width: ${size}px;
                height: ${size}px;
                top: ${y}px;
                left: ${x}px;
                pointer-events: none;
            `;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
        
        // Добавляем стиль для анимации волны
        const style = document.createElement('style');
        style.textContent = `
            @keyframes ripple-animation {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
});



















// Анимация геометрических элементов
function animateGeoElements() {
    const geoElements = document.querySelectorAll('.geo-element');
    
    geoElements.forEach((el, index) => {
        // Случайная задержка для каждого элемента
        el.style.animationDelay = `${index * 0.2}s`;
        
        // Случайная анимация перемещения
        setInterval(() => {
            if (Math.random() > 0.7) {
                const x = Math.random() * 20 - 10;
                const y = Math.random() * 20 - 10;
                el.style.transform += ` translate(${x}px, ${y}px)`;
            }
        }, 3000);
    });
}

// Анимация появления при скролле
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                
                // Анимация для фото
                const photos = entry.target.querySelectorAll('.photo-container');
                photos.forEach((photo, index) => {
                    photo.style.animationDelay = `${index * 0.1}s`;
                    photo.classList.add('pop-in');
                });
            }
        });
    }, observerOptions);

    const resultsSection = document.querySelector('.results-section');
    if (resultsSection) {
        observer.observe(resultsSection);
    }
}

// Добавляем эти функции в конец DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    // ... существующий код ...
    
    // Инициализируем анимации для новой секции
    animateGeoElements();
    initScrollAnimations();
});











/// Параллакс для секшен ARNOLD
// Параллакс для компактного секшена
document.addEventListener('DOMContentLoaded', function() {
    const parallaxImg = document.querySelector('.parallax-img-compact');
    
    if (parallaxImg) {
        let ticking = false;
        
        function updateParallax() {
            const scrolled = window.pageYOffset;
            const section = document.querySelector('.arnold-section-compact');
            const sectionTop = section.offsetTop;
            const windowHeight = window.innerHeight;
            
            if (scrolled + windowHeight > sectionTop) {
                const parallaxValue = Math.max(0, (scrolled + windowHeight - sectionTop) * 0.25);
                parallaxImg.style.transform = `translateY(-${parallaxValue}px)`;
            }
            
            ticking = false;
        }
        
        window.addEventListener('scroll', function() {
            if (!ticking) {
                window.requestAnimationFrame(updateParallax);
                ticking = true;
            }
        });
        
        // Для производительности
        parallaxImg.style.willChange = 'transform';
        parallaxImg.style.transition = 'transform 0.1s ease-out';
    }
    
    // Плавный скролл для большой кнопки
    const bigButton = document.querySelector('.arnold-button-big');
    if (bigButton) {
        bigButton.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
});























// Модальное окно
// Модальное окно - исправленная версияconst modalOverlay = document.getElementById('modalOverlay');
// ===== ГЛАВНЫЕ ЭЛЕМЕНТЫ =====
document.addEventListener('DOMContentLoaded', () => {

  const modalOverlay = document.getElementById('modalOverlay');
  const registrationForm = document.getElementById('registrationForm');
  const successMessage = document.getElementById('successMessage');

  const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwPj2EccI8ylywRnjo2Zf5QCeQi7Mr0SYZVRFh7lA-3JGnEw8IJLyZ0dgRuk9u_sV0/exec';

  // ===== МОДАЛКА =====
  function openModal() {
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    registrationForm.reset();
    registrationForm.style.display = 'flex';
    successMessage.style.display = 'none';
  }

  function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
  }

  // ===== КНОПКИ ОТКРЫТИЯ =====
  document.querySelectorAll('.form-button, .course-button, .arnold-button-big')
    .forEach(btn => {
      btn.addEventListener('click', e => {
        e.preventDefault();
        openModal();
      });
    });

  // ===== SUBMIT =====
  registrationForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('userName').value.trim();
    const phone = document.getElementById('userPhone').value.trim();
    const username = document.getElementById('userUsername').value.trim();

    if (!name || !phone) {
      alert('Заполните обязательные поля');
      return;
    }

    // Открываем Telegram
    window.open('https://t.me/+79yW9syv80k5NTJi', '_blank');

    const submitButton = registrationForm.querySelector('.submit-button');
    submitButton.disabled = true;

    const url =
      `${GOOGLE_SCRIPT_URL}?name=${encodeURIComponent(name)}&phone=${encodeURIComponent(phone)}&username=${encodeURIComponent(username)}`;

    fetch(url, { method: 'GET', mode: 'no-cors' })
      .finally(() => {
        registrationForm.style.display = 'none';
        successMessage.style.display = 'block';

        setTimeout(() => {
          closeModal();
          registrationForm.reset();
          registrationForm.style.display = 'flex';
          successMessage.style.display = 'none';
          submitButton.disabled = false;
        }, 2000);
      });
  });

  // Закрытие по крестику - проверь что этот код есть
const closeBtn = document.querySelector('.modal-close');
if (closeBtn) {
    closeBtn.addEventListener('click', function(e) {
        e.stopPropagation(); // Важно! Останавливаем всплытие
        console.log('✖️ Клик по крестику');
        closeModal();
    });
}

  // Закрытие по оверлею
  modalOverlay.addEventListener('click', e => {
    if (e.target === modalOverlay) closeModal();
  });

  // Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
      closeModal();
    }
  });

});