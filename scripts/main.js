// scripts/main.js

import { initHero3D } from './hero3D.js';
import { initScrollAnimations } from './animations.js';
import { initUIElements } from './ui.js'; // <-- 1. Importas el nuevo módulo

document.addEventListener('DOMContentLoaded', () => {
    
    // Inicializar fondo 3D
    initHero3D('hero-canvas-container');

    // Inicializar animaciones de scroll
    initScrollAnimations();

    // Inicializar elementos de UI (Botón volver arriba)
    initUIElements(); // <-- 2. Lo ejecutas

    console.log("Happy Print - Módulos cargados correctamente.");
});