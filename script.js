document.addEventListener('DOMContentLoaded', () => {
    const sidebarLinks = document.querySelectorAll('.sidebar a');

    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            // Previne o comportamento padrão do link se necessário (caso use #)
            // event.preventDefault(); 

            // Remove a classe 'active' de todos os links
            sidebarLinks.forEach(l => l.classList.remove('active'));

            // Adiciona a classe 'active' ao link clicado
            this.classList.add('active');
        });
    });
}); 