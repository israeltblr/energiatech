// Menu Mobile
document.addEventListener('DOMContentLoaded', function() {
    // Menu Mobile
    const mobileMenu = document.querySelector('.mobile-menu');
    const nav = document.querySelector('.nav ul');
    
    mobileMenu.addEventListener('click', function() {
        nav.classList.toggle('show');
    });
    
    // Header scroll effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Fechar menu ao clicar em um link
    const navLinks = document.querySelectorAll('.nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 992) {
                nav.classList.remove('show');
            }
        });
    });
    
    // Scroll suave para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Adicionar classe ativa ao menu conforme scroll
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= (sectionTop - 100)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}` || 
                (current === '' && link.getAttribute('href') === 'index.html')) {
                link.classList.add('active');
            }
        });
    });
    
    // Animação ao scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.diferencial-card, .depoimento-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Definir estado inicial para animação
    const animatedElements = document.querySelectorAll('.diferencial-card, .depoimento-card');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'all 0.6s ease';
    });
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Executar uma vez ao carregar
});

// Contador para oferta especial
function atualizarContador() {
    const agora = new Date();
    const fimOferta = new Date();
    fimOferta.setHours(23, 59, 59, 999); // Fim do dia atual
    
    const diferenca = fimOferta - agora;
    
    const horas = Math.floor((diferenca % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((diferenca % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((diferenca % (1000 * 60)) / 1000);
    
    document.getElementById('horas').textContent = Math.floor(horas).toString().padStart(2, '0');
    document.getElementById('minutos').textContent = Math.floor(minutos).toString().padStart(2, '0');
    document.getElementById('segundos').textContent = Math.floor(segundos).toString().padStart(2, '0');
    
    if (diferenca < 0) {
        clearInterval(contadorInterval);
        document.querySelector('.contador').innerHTML = '<span>Oferta expirada!</span>';
    }
}

// Iniciar contador se a página de planos estiver carregada
if (document.querySelector('.contador')) {
    atualizarContador();
    const contadorInterval = setInterval(atualizarContador, 1000);
}