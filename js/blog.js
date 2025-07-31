document.addEventListener('DOMContentLoaded', function() {
    // Sample blog posts data
    const blogPosts = [
        {
            id: 1,
            title: "Como Escolher o Gerador Ideal para Seu Negócio",
            category: "comercial",
            excerpt: "Guia completo com os 5 fatores decisivos na escolha do gerador perfeito para sua empresa.",
            image: "img/gerador-comercial.jpg",
            date: "15 Maio 2023",
            views: 2543
        },
        {
            id: 2,
            title: "Manutenção Preventiva vs. Corretiva: Qual Vale Mais a Pena?",
            category: "industrial",
            excerpt: "Análise de custo-benefício entre os dois tipos de manutenção para sistemas energéticos.",
            image: "img/manutencao-gerador.jpg",
            date: "10 Maio 2023",
            views: 1876
        },
        {
            id: 3,
            title: "Nova Lei de Eficiência Energética 2024: O que Mudou?",
            category: "tecnologia",
            excerpt: "Tudo sobre as novas regulamentações e como se adequar sem custos extras.",
            image: "img/lei-energia.jpg",
            date: "5 Maio 2023",
            views: 1542
        },
        {
            id: 4,
            title: "Caso Real: Como um Shopping Evitou 3 Dias Sem Energia",
            category: "comercial",
            excerpt: "Estudo de caso mostrando como o monitoramento contínuo evitou um desastre.",
            image: "img/shopping-gerador.jpg",
            date: "28 Abril 2023",
            views: 1321
        },
        {
            id: 5,
            title: "Os 5 Maiores Mitos Sobre Geradores a Diesel",
            category: "residencial",
            excerpt: "Desvendamos as crenças mais comuns que podem estar te custando caro.",
            image: "img/gerador-diesel.jpg",
            date: "20 Abril 2023",
            views: 1187
        },
        {
            id: 6,
            title: "Webinar: Energia Solar Híbrida para Empresas",
            category: "tecnologia",
            excerpt: "Como combinar energia solar com geradores tradicionais para máxima eficiência.",
            image: "img/energia-solar.jpg",
            date: "12 Abril 2023",
            views: 987
        },
        {
            id: 7,
            title: "Protocolos ANVISA para Geradores Hospitalares",
            category: "hospitalar",
            excerpt: "Tudo o que sua instituição de saúde precisa saber sobre as normas vigentes.",
            image: "img/hospital-normas.jpg",
            date: "5 Abril 2023",
            views: 876
        },
        {
            id: 8,
            title: "Como Dimensionar um Gerador para Sua Casa",
            category: "residencial",
            excerpt: "Calculadora interativa e dicas para acertar na potência do seu gerador residencial.",
            image: "img/gerador-residencial.jpg",
            date: "28 Março 2023",
            views: 765
        }
    ];

    // DOM Elements
    const postsContainer = document.getElementById('postsContainer');
    const categorySelect = document.getElementById('categorySelect');

    // Display all posts initially
    displayPosts(blogPosts);

    // Category filter functionality
    categorySelect.addEventListener('change', function() {
        const selectedCategory = this.value;
        
        if (selectedCategory === 'all') {
            displayPosts(blogPosts);
        } else {
            const filteredPosts = blogPosts.filter(post => post.category === selectedCategory);
            displayPosts(filteredPosts);
        }
    });

    // Function to display posts
    function displayPosts(posts) {
        postsContainer.innerHTML = '';
        
        if (posts.length === 0) {
            postsContainer.innerHTML = '<p class="no-posts">Nenhum artigo encontrado nesta categoria.</p>';
            return;
        }
        
        posts.forEach(post => {
            const categoryName = getCategoryName(post.category);
            const postElement = document.createElement('article');
            postElement.className = 'post-card';
            postElement.innerHTML = `
                <div class="post-image" style="background-image: url('${post.image}');"></div>
                <div class="post-content">
                    <span class="post-category">${categoryName}</span>
                    <h3>${post.title}</h3>
                    <p>${post.excerpt}</p>
                    <div class="post-meta">
                        <span class="post-date"><i class="far fa-calendar-alt"></i> ${post.date}</span>
                        <span class="post-views"><i class="far fa-eye"></i> ${post.views.toLocaleString()}</span>
                    </div>
                    <a href="post.html?id=${post.id}" class="btn-read-more">Ler Mais <i class="fas fa-arrow-right"></i></a>
                </div>
            `;
            postsContainer.appendChild(postElement);
        });
    }

    // Helper function to get category display name
    function getCategoryName(category) {
        const categories = {
            'residencial': 'Residencial',
            'comercial': 'Comercial',
            'industrial': 'Industrial',
            'hospitalar': 'Hospitalar',
            'tecnologia': 'Tecnologia & IA'
        };
        return categories[category] || category;
    }

    // Mobile menu toggle functionality
    const mobileMenuToggle = document.createElement('div');
    mobileMenuToggle.className = 'mobile-menu-toggle';
    mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    document.querySelector('.main-header .container').prepend(mobileMenuToggle);
    
    const mainNav = document.querySelector('.main-nav');
    
    mobileMenuToggle.addEventListener('click', function() {
        mainNav.classList.toggle('active');
        this.querySelector('i').classList.toggle('fa-times');
        this.querySelector('i').classList.toggle('fa-bars');
    });

    // Smooth scrolling for anchor links
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

    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            
            // Simple validation
            if (emailInput.value && emailInput.value.includes('@')) {
                alert('Obrigado por assinar nossa newsletter! Em breve você receberá nossos conteúdos exclusivos.');
                emailInput.value = '';
            } else {
                alert('Por favor, insira um endereço de e-mail válido.');
            }
        });
    }
});