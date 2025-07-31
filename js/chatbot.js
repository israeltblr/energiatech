// Função para destacar o item ativo no menu
document.addEventListener('DOMContentLoaded', function() {
    // Verifica a página atual e destaca o item correspondente no menu
    const currentPage = window.location.pathname.split('/').pop();
    const menuItems = document.querySelectorAll('nav ul li a');
    
    menuItems.forEach(item => {
        const itemHref = item.getAttribute('href');
        if (currentPage === itemHref) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
    
    // Validação do formulário de contato
    const contactForm = document.querySelector('.contato-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nome = document.getElementById('nome').value;
            const email = document.getElementById('email').value;
            const mensagem = document.getElementById('mensagem').value;
            
            if (nome && email && mensagem) {
                alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
                contactForm.reset();
            } else {
                alert('Por favor, preencha todos os campos.');
            }
        });
    }
    
    // Efeitos de hover nos planos
    const planos = document.querySelectorAll('.plano-item');
    planos.forEach(plano => {
        plano.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.2)';
        });
        
        plano.addEventListener('mouseleave', function() {
            this.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        });
    });
});