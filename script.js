document.addEventListener('DOMContentLoaded', () => {
    const sidebarLinks = document.querySelectorAll('.sidebar a');
    const profileLink = document.getElementById('profile-link');
    const defaultContent = document.querySelector('.default-content');
    const loginSection = document.querySelector('.login-section');
    const loginContainer = document.querySelector('.login-container');
    const registerContainer = document.querySelector('.register-container');
    const showRegisterLink = document.getElementById('show-register');
    const showLoginLink = document.getElementById('show-login');
    const loginForm = document.querySelector('.login-form');
    const registerForm = document.querySelector('.register-form');

    // Credenciais do admin
    const adminCredentials = {
        email: 'admin@admin.com',
        password: 'admin123'
    };

    // Função para verificar se o usuário está logado
    function isLoggedIn() {
        return localStorage.getItem('isLoggedIn') === 'true';
    }

    // Função para atualizar a seleção dos links da sidebar
    function updateSidebarSelection(activeLink) {
        sidebarLinks.forEach(link => {
            link.classList.remove('active');
        });
        activeLink.classList.add('active');
    }

    // Função para mostrar o perfil do admin
    function showAdminProfile() {
        defaultContent.style.display = 'none';
        loginSection.style.display = 'none';
        
        // Criar e mostrar o perfil do admin
        const adminProfile = document.createElement('div');
        adminProfile.className = 'admin-profile';
        adminProfile.innerHTML = `
            <div class="profile-header">
                <div class="avatar">
                    <span class="material-icons-sharp">account_circle</span>
                </div>
                <h2>Admin</h2>
                <p>${adminCredentials.email}</p>
            </div>
            <div class="profile-info">
                <div class="info-item">
                    <span class="material-icons-sharp">email</span>
                    <p>${adminCredentials.email}</p>
                </div>
                <div class="info-item">
                    <span class="material-icons-sharp">security</span>
                    <p>Conta Administrativa</p>
                </div>
                <div class="info-item">
                    <span class="material-icons-sharp">logout</span>
                    <p><a href="#" id="logout-link">Sair</a></p>
                </div>
            </div>
        `;
        
        document.querySelector('.content-panel').appendChild(adminProfile);

        // Adicionar evento para o botão de logout
        const logoutLink = document.getElementById('logout-link');
        logoutLink.addEventListener('click', function(event) {
            event.preventDefault();
            localStorage.removeItem('isLoggedIn');
            showLoginSection();
        });
    }

    // Função para mostrar a seção de login/cadastro
    function showLoginSection() {
        defaultContent.style.display = 'none';
        loginSection.style.display = 'block';
        loginContainer.style.display = 'block';
        registerContainer.style.display = 'none';
        
        // Remover o perfil do admin se existir
        const adminProfile = document.querySelector('.admin-profile');
        if (adminProfile) {
            adminProfile.remove();
        }
    }

    // Função para voltar ao conteúdo padrão
    function showDefaultContent() {
        defaultContent.style.display = 'block';
        loginSection.style.display = 'none';
        
        // Remover o perfil do admin se existir
        const adminProfile = document.querySelector('.admin-profile');
        if (adminProfile) {
            adminProfile.remove();
        }
    }

    // Evento para o formulário de login
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        if (email === adminCredentials.email && password === adminCredentials.password) {
            localStorage.setItem('isLoggedIn', 'true');
            showAdminProfile();
            updateSidebarSelection(profileLink);
        } else {
            alert('Credenciais inválidas!');
        }
    });

    // Evento para o formulário de cadastro (desativado)
    registerForm.addEventListener('submit', function(event) {
        event.preventDefault();
        alert('Cadastro de novas contas não está disponível no momento.');
    });

    // Evento para o link do perfil
    profileLink.addEventListener('click', function(event) {
        event.preventDefault();
        updateSidebarSelection(this);
        if (isLoggedIn()) {
            showAdminProfile();
        } else {
            showLoginSection();
        }
    });

    // Evento para mostrar o formulário de cadastro
    showRegisterLink.addEventListener('click', function(event) {
        event.preventDefault();
        loginContainer.style.display = 'none';
        registerContainer.style.display = 'block';
    });

    // Evento para mostrar o formulário de login
    showLoginLink.addEventListener('click', function(event) {
        event.preventDefault();
        loginContainer.style.display = 'block';
        registerContainer.style.display = 'none';
    });

    // Eventos para os outros links da sidebar
    sidebarLinks.forEach(link => {
        if (link !== profileLink) {
            link.addEventListener('click', function(event) {
                event.preventDefault();
                updateSidebarSelection(this);
                showDefaultContent();
            });
        }
    });

    // Verificar se o usuário já está logado ao carregar a página
    if (isLoggedIn()) {
        showAdminProfile();
        updateSidebarSelection(profileLink);
    }
}); 