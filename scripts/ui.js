// scripts/ui.js

export function initUIElements() {
    const scrollToTopBtn = document.getElementById('scrollToTop');

    if (!scrollToTopBtn) return;

    // Mostrar u ocultar el botón según el scroll
    window.addEventListener('scroll', () => {
        // Si el usuario baja más de 400px, mostramos el botón
        if (window.scrollY > 400) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });

    // Acción al hacer clic: subir suavemente
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}