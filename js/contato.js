// contato.js - Funcionalidades para a página de Contato

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar mapa
    const mapa = L.map('mapa-contato').setView([-12.9722, -38.5014], 15);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mapa);
    
    // Adicionar marcador -9.399630433749659, -38.22575230793611
    const marcador = L.marker([-9.401073381752456, -38.23862868773293]).addTo(mapa)
        .bindPopup('<b>EnergiaTech Geradores</b><br>Estamos em processo de abertura de nosso espaço físico.<br> Enquanto isso, atendemos via digital em toda a região <br> Paulo Afonso - BA')
        .openPopup();
    
    // Validação do formulário
    const formContato = document.getElementById('formContato');
    
    if (formContato) {
        formContato.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validar campos
            const nome = document.getElementById('nome').value.trim();
            const email = document.getElementById('email').value.trim();
            const assunto = document.getElementById('assunto').value;
            const mensagem = document.getElementById('mensagem').value.trim();
            
            if (!nome || !email || !assunto || !mensagem) {
                alert('Por favor, preencha todos os campos obrigatórios.');
                return;
            }
            
            if (!validateEmail(email)) {
                alert('Por favor, insira um e-mail válido.');
                return;
            }
            
            // Simular envio (substituir por AJAX na implementação real)
            console.log('Formulário enviado:', { nome, email, assunto, mensagem });
            alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
            formContato.reset();
        });
    }
    
    // Máscara para telefone
    const telefoneInput = document.getElementById('telefone');
    if (telefoneInput) {
        telefoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            if (value.length > 11) {
                value = value.substring(0, 11);
            }
            
            // Formatar como (XX) XXXXX-XXXX
            if (value.length <= 10) {
                // Formato para telefone fixo: (XX) XXXX-XXXX
                value = value.replace(/^(\d{0,2})(\d{0,4})(\d{0,4})$/, function(_, ddd, parte1, parte2) {
                    return (ddd ? `(${ddd}` : '') +
                           (parte1 ? `) ${parte1}` : '') +
                           (parte2 ? `-${parte2}` : '');
                });
            } else {
                // Formato para celular: (XX) XXXXX-XXXX
                value = value.replace(/^(\d{0,2})(\d{0,5})(\d{0,4})$/, function(_, ddd, parte1, parte2) {
                    return (ddd ? `(${ddd}` : '') +
                           (parte1 ? `) ${parte1}` : '') +
                           (parte2 ? `-${parte2}` : '');
                });
            }
            
            e.target.value = value;
        });
    }
    
    // Função para validar e-mail
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // Ajustar mapa ao redimensionar a janela
    window.addEventListener('resize', function() {
        setTimeout(() => {
            mapa.invalidateSize();
        }, 200);
    });
});