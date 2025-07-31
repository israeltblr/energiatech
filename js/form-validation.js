// Validação do Formulário de Lead Magnet
document.addEventListener('DOMContentLoaded', function() {
    const leadForm = document.getElementById('leadForm');
    if (leadForm) {
        leadForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nome = document.getElementById('nome').value.trim();
            const email = document.getElementById('email').value.trim();
            const tipoGerador = document.getElementById('tipo-gerador').value;
            
            if (!nome || !email || !tipoGerador) {
                alert('Por favor, preencha todos os campos obrigatórios.');
                return;
            }
            
            if (!validateEmail(email)) {
                alert('Por favor, insira um e-mail válido.');
                return;
            }
            
            // Simular envio (substituir por AJAX na implementação real)
            console.log('Dados do formulário:', { nome, email, tipoGerador });
            
            // Mostrar mensagem de sucesso
            alert('Obrigado! Seu checklist será enviado para o e-mail: ' + email);
            
            // Redirecionar para página de agradecimento ou fazer download
            // window.location.href = 'obrigado.html';
            
            // Limpar formulário
            leadForm.reset();
            
            // Enviar para o funil de nutrição (simulação)
            iniciarNutricaoLead(nome, email, tipoGerador);
        });
    }
    
    // Validação do Formulário de Orçamento
    const orcamentoForm = document.getElementById('orcamentoForm');
    if (orcamentoForm) {
        orcamentoForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nome = document.getElementById('nome-orcamento').value.trim();
            const telefone = document.getElementById('telefone-orcamento').value.trim();
            const email = document.getElementById('email-orcamento').value.trim();
            const servico = document.getElementById('servico-orcamento').value;
            
            if (!nome || !telefone || !email || !servico) {
                alert('Por favor, preencha todos os campos obrigatórios.');
                return;
            }
            
            if (!validateEmail(email)) {
                alert('Por favor, insira um e-mail válido.');
                return;
            }
            
            // Simular envio (substituir por AJAX na implementação real)
            console.log('Dados do orçamento:', { nome, telefone, email, servico });
            
            // Mostrar mensagem de sucesso
            alert('Solicitação enviada com sucesso! Nossa equipe entrará em contato em breve.');
            
            // Limpar formulário
            orcamentoForm.reset();
        });
    }
    
    // Função para validar e-mail
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // Função para simular nutrição de lead
    function iniciarNutricaoLead(nome, email, tipoGerador) {
        console.log(`Iniciando nutrição para ${nome} (${email}) com gerador ${tipoGerador}`);
        
        // Simular envio de e-mail 1
        setTimeout(() => {
            console.log(`E-mail 1 enviado para ${email} com o checklist prometido`);
        }, 1000);
        
        // Simular envio de e-mail 2 após 24h
        setTimeout(() => {
            console.log(`E-mail 2 enviado para ${email} com caso de sucesso`);
        }, 5000); // 24h seria 86400000 ms
        
        // Simular mensagem no WhatsApp após 48h
        setTimeout(() => {
            console.log(`Mensagem no WhatsApp enviada para lead ${nome}`);
        }, 8000); // 48h seria 172800000 ms
    }
});