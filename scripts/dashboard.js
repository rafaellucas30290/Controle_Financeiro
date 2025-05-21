document.addEventListener('DOMContentLoaded', () => {
    const sidebarLinks = document.querySelectorAll('.sidebar a');
    const profileLink = document.getElementById('profile-link');
    const defaultContent = document.querySelector('.default-content');

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
        
        // Criar e mostrar o perfil do admin
        const adminProfile = document.createElement('div');
        adminProfile.className = 'admin-profile';
        adminProfile.innerHTML = `
            <div class="profile-header">
                <div class="avatar">
                    <span class="material-icons-sharp">account_circle</span>
                </div>
                <h2>Admin</h2>
                <p>admin@admin.com</p>
            </div>
            <div class="profile-info">
                <div class="info-item">
                    <span class="material-icons-sharp">email</span>
                    <p>admin@admin.com</p>
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
            window.location.href = 'index.html';
        });
    }

    // Função para voltar ao conteúdo padrão
    function showDefaultContent() {
        defaultContent.style.display = 'block';
        
        // Remover o perfil do admin se existir
        const adminProfile = document.querySelector('.admin-profile');
        if (adminProfile) {
            adminProfile.remove();
        }
    }

    // Evento para o link do perfil
    profileLink.addEventListener('click', function(event) {
        event.preventDefault();
        updateSidebarSelection(this);
        showAdminProfile();
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

    // Verificar se o usuário está logado
    if (!isLoggedIn()) {
        window.location.href = 'index.html';
    }
}); 