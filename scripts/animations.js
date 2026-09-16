// scripts/animations.js

export function initScrollAnimations() {
    // Configuramos el observador
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Si el elemento entra en la pantalla del usuario
            if (entry.isIntersecting) {
                entry.target.classList.add('show-scroll');
                
                // Opcional: dejamos de observarlo para que la animación 
                // solo suceda una vez (da un toque más formal y menos distractor)
                observer.unobserve(entry.target);
            }
        });
    }, {
        // Configuraciones
        threshold: 0.1, // Se activa cuando el 10% de la tarjeta es visible
        rootMargin: "0px 0px -50px 0px" // Ajuste fino para que se active un poco más abajo
    });

    // Seleccionamos todos los elementos ocultos
    const hiddenElements = document.querySelectorAll('.hidden-scroll');
    
    // Le decimos al observador que vigile cada uno de ellos
    hiddenElements.forEach((el) => observer.observe(el));
}