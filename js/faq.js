document.addEventListener('DOMContentLoaded', function() {
    // Accordion functionality
    const accordionItems = document.querySelectorAll('.accordion-item');
    
    // Open first item by default
    if (accordionItems.length > 0) {
        accordionItems[0].classList.add('active');
    }
    
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        
        header.addEventListener('click', () => {
            const currentlyActive = document.querySelector('.accordion-item.active');
            
            // If this item is already active, close it
            if (item.classList.contains('active')) {
                item.classList.remove('active');
                return;
            }
            
            // Close any open item
            if (currentlyActive) {
                currentlyActive.classList.remove('active');
            }
            
            // Open this item
            item.classList.add('active');
            
            // Scroll to the item if it's not fully visible
            const itemPosition = item.getBoundingClientRect().top;
            const offsetPosition = itemPosition + window.pageYOffset - 100;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        });
    });
    
    // FAQ search functionality
    const faqSearch = document.getElementById('faq-search');
    const faqSearchBtn = document.getElementById('faq-search-btn');
    
    function searchFAQ() {
        const searchTerm = faqSearch.value.toLowerCase().trim();
        
        if (searchTerm.length < 3) {
            resetFAQSearch();
            return;
        }
        
        let foundResults = false;
        
        accordionItems.forEach(item => {
            const question = item.querySelector('.accordion-header h3').textContent.toLowerCase();
            const answer = item.querySelector('.accordion-content').textContent.toLowerCase();
            
            if (question.includes(searchTerm) || answer.includes(searchTerm)) {
                item.style.display = 'block';
                item.classList.add('active');
                foundResults = true;
                
                // Highlight search term
                highlightText(item, searchTerm);
            } else {
                item.style.display = 'none';
                removeHighlights(item);
            }
        });
        
        // Show message if no results found
        const noResultsMsg = document.querySelector('.no-results-message');
        if (!foundResults) {
            if (!noResultsMsg) {
                const msg = document.createElement('div');
                msg.className = 'no-results-message';
                msg.textContent = 'Nenhum resultado encontrado. Tente usar termos diferentes.';
                msg.style.textAlign = 'center';
                msg.style.padding = '20px';
                msg.style.color = 'var(--cinza-escuro)';
                document.querySelector('.faq-accordion').prepend(msg);
            }
        } else if (noResultsMsg) {
            noResultsMsg.remove();
        }
    }
    
    function highlightText(element, term) {
        const content = element.querySelector('.accordion-content');
        if (!content) return;
        
        const text = content.innerHTML;
        const highlighted = text.replace(
            new RegExp(term, 'gi'),
            match => `<span class="highlight">${match}</span>`
        );
        content.innerHTML = highlighted;
    }
    
    function removeHighlights(element) {
        const highlights = element.querySelectorAll('.highlight');
        highlights.forEach(highlight => {
            const parent = highlight.parentNode;
            parent.replaceChild(document.createTextNode(highlight.textContent), highlight);
            parent.normalize();
        });
    }
    
    function resetFAQSearch() {
        const noResultsMsg = document.querySelector('.no-results-message');
        if (noResultsMsg) {
            noResultsMsg.remove();
        }
        
        accordionItems.forEach(item => {
            item.style.display = 'block';
            removeHighlights(item);
            
            // Close all except first item
            if (item !== accordionItems[0]) {
                item.classList.remove('active');
            }
        });
    }
    
    faqSearch.addEventListener('input', function() {
        if (this.value.trim() === '') {
            resetFAQSearch();
        }
    });
    
    faqSearchBtn.addEventListener('click', searchFAQ);
    faqSearch.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchFAQ();
        }
    });
    
    // Chatbot functionality
    const chatbotMessages = document.getElementById('chatbot-messages');
    const chatbotInput = document.getElementById('chatbot-user-input');
    const chatbotSendBtn = document.getElementById('chatbot-send-btn');
    const exampleQuestions = document.querySelectorAll('.chatbot-examples li');
    
    // Bot responses database
    const botResponses = [
        {
            keywords: ['barulho', 'ruído', 'barulhento', 'barulhos'],
            response: "Geradores com ruído excessivo podem indicar: <br><br>1) <strong>Problemas no escapamento</strong> - Vazamentos ou danos no sistema de exaustão<br>2) <strong>Folga mecânica</strong> - Componentes internos desgastados<br>3) <strong>Desbalanceamento do alternador</strong> - Requer ajuste especializado<br><br>Recomendo uma inspeção técnica para diagnóstico preciso."
        },
        {
            keywords: ['não liga', 'não funciona', 'não parte', 'não inicia'],
            response: "Quando um gerador não liga, as causas mais comuns são:<br><br>1) <strong>Bateria descarregada</strong> - Verifique a carga da bateria<br>2) <strong>Problema no sistema de combustível</strong> - Bomba ou injetores defeituosos<br>3) <strong>Falha no motor de partida</strong> - Requer substituição<br><br>Nosso serviço de diagnóstico remoto pode identificar a causa em minutos."
        },
        {
            keywords: ['voltagem', 'tensão', 'instável', 'oscilação'],
            response: "Voltagem instável pode ser causada por:<br><br>1) <strong>Regulador de tensão defeituoso</strong> - Necessita substituição<br>2) <strong>Problemas no alternador</strong> - Enrolamentos danificados<br>3) <strong>Carga desbalanceada</strong> - Distribuição inadequada de equipamentos<br><br>Recomendo um teste de carga para diagnóstico preciso."
        },
        {
            keywords: ['consumo', 'combustível', 'gasolina', 'diesel', 'gastando muito'],
            response: "Consumo excessivo pode indicar:<br><br>1) <strong>Filtros de ar/combustível sujos</strong> - Requer substituição<br>2) <strong>Problemas na injeção</strong> - Bicos injetores desregulados<br>3) <strong>Carga acima da capacidade</strong> - Sobreesforçando o gerador<br><br>Nosso plano de manutenção inclui otimização de consumo."
        },
        {
            keywords: ['manutenção', 'preventiva', 'cuidados', 'manter'],
            response: "Manutenção preventiva essencial inclui:<br><br>• Troca de óleo e filtros a cada 200h<br>• Limpeza do sistema de arrefecimento<br>• Teste do alternador e regulador de tensão<br>• Inspeção do sistema de combustível<br><br>Oferecemos planos mensais para garantir o perfeito funcionamento."
        },
        {
            keywords: ['emergência', 'urgente', 'urgência', 'agora'],
            response: "Para atendimento emergencial:<br><br>• Contate nosso suporte 24h pelo WhatsApp<br>• Desligue o gerador se houver risco<br>• Não tente reparos complexos sem assistência<br><br><a href='https://wa.me/5571999999999' style='color: white; background: #00C897; padding: 8px 15px; border-radius: 4px; text-decoration: none; display: inline-block; margin-top: 10px;'>Chamar Suporte Emergencial</a>"
        },
        {
            keywords: ['default'],
            response: "Entendi sua dúvida. Para ajudar melhor:<br><br>1) Você poderia descrever os sintomas com mais detalhes?<br>2) Qual o modelo e horas de uso do seu gerador?<br>3) Quando o problema começou?<br><br>Enquanto isso, você pode <a href='planos.html' style='color: #005BAA; font-weight: 600;'>conhecer nossos planos de manutenção</a> para evitar problemas futuros."
        }
    ];
    
    // Send message function
    function sendMessage() {
        const userMessage = chatbotInput.value.trim();
        
        if (userMessage === '') return;
        
        // Disable input while processing
        chatbotInput.disabled = true;
        chatbotSendBtn.disabled = true;
        
        // Add user message to chat
        addMessage(userMessage, 'user');
        chatbotInput.value = '';
        
        // Show "typing" indicator
        const typingIndicator = document.createElement('div');
        typingIndicator.className = 'chatbot-message bot';
        typingIndicator.innerHTML = '<div class="typing-indicator"><span></span><span></span><span></span></div>';
        chatbotMessages.appendChild(typingIndicator);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
        
        // Simulate bot thinking
        setTimeout(() => {
            // Remove typing indicator
            typingIndicator.remove();
            
            // Find appropriate response
            let response = '';
            const lowerMessage = userMessage.toLowerCase();
            
            for (const item of botResponses) {
                if (item.keywords.some(keyword => lowerMessage.includes(keyword))) {
                    response = item.response;
                    break;
                }
            }
            
            // Use default response if no match found
            if (!response) {
                response = botResponses.find(item => item.keywords.includes('default')).response;
            }
            
            // Add bot response to chat
            addMessage(response, 'bot');
            
            // Re-enable input
            chatbotInput.disabled = false;
            chatbotSendBtn.disabled = false;
            chatbotInput.focus();
        }, 1500);
    }
    
    // Add message to chat
    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `chatbot-message ${sender}`;
        messageDiv.innerHTML = `<p>${text}</p>`;
        
        // Remove typing indicator if exists
        const typingIndicator = document.querySelector('.typing-indicator');
        if (typingIndicator) typingIndicator.parentElement.remove();
        
        chatbotMessages.appendChild(messageDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }
    
    // Event listeners
    chatbotSendBtn.addEventListener('click', sendMessage);
    chatbotInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    // Example questions click handler
    exampleQuestions.forEach(example => {
        example.addEventListener('click', () => {
            chatbotInput.value = example.textContent;
            chatbotInput.focus();
        });
    });
    
    // Initial bot message
    setTimeout(() => {
        addMessage("Olá! Sou o assistente virtual da EnergiaTech. Posso ajudar com dúvidas técnicas sobre seu gerador. Por exemplo, você pode perguntar sobre:", 'bot');
        setTimeout(() => {
            addMessage("• Problemas de partida<br>• Ruídos anormais<br>• Consumo de combustível<br>• Manutenção preventiva<br><br>Qual é o problema que você está enfrentando?", 'bot');
        }, 500);
    }, 1000);
    
    // Add typing indicator styles
    const style = document.createElement('style');
    style.textContent = `
        .typing-indicator {
            display: flex;
            padding: 10px;
        }
        .typing-indicator span {
            width: 8px;
            height: 8px;
            background-color: #005BAA;
            border-radius: 50%;
            display: inline-block;
            margin: 0 2px;
            opacity: 0.4;
        }
        .typing-indicator span:nth-child(1) {
            animation: typingAnimation 1s infinite;
        }
        .typing-indicator span:nth-child(2) {
            animation: typingAnimation 1s infinite 0.2s;
        }
        .typing-indicator span:nth-child(3) {
            animation: typingAnimation 1s infinite 0.4s;
        }
        @keyframes typingAnimation {
            0% { opacity: 0.4; transform: translateY(0); }
            50% { opacity: 1; transform: translateY(-3px); }
            100% { opacity: 0.4; transform: translateY(0); }
        }
        .highlight {
            background-color: #FFF9C4;
            padding: 0 2px;
            border-radius: 2px;
        }
    `;
    document.head.appendChild(style);
});