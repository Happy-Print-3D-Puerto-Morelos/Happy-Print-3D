// Importamos Three.js
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.158.0/build/three.module.js';

export function initHero3D(containerId) {
    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`No se encontró el contenedor con ID: ${containerId}`);
        return;
    }

    // 1. Configuración de Escena y Cámara
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 5;

    // 2. Renderizador
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    // 3. Iluminación
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, 1);
    mainLight.position.set(5, 5, 5);
    scene.add(mainLight);

    const uvLight = new THREE.DirectionalLight(0x00F0FF, 2);
    uvLight.position.set(-5, 0, 2);
    scene.add(uvLight);

    // 4. Objeto Base (Llavero estándar corporativo genérico - Placeholder)
    // Más adelante cambiaremos esta geometría por tu archivo .gltf
    const geometry = new THREE.BoxGeometry(2, 0.2, 3); // Proporciones tipo llavero/tarjeta
    const material = new THREE.MeshStandardMaterial({ 
        color: 0x1E293B, 
        roughness: 0.1,  // Muy liso para simular el encapsulado UV
        metalness: 0.3
    });
    const keychainPlaceholder = new THREE.Mesh(geometry, material);
    scene.add(keychainPlaceholder);

    // 5. Ciclo de Animación
    function animate() {
        requestAnimationFrame(animate);

        // Rotación suave
        keychainPlaceholder.rotation.x += 0.005;
        keychainPlaceholder.rotation.y += 0.01;

        renderer.render(scene, camera);
    }

    // 6. Responsividad
    window.addEventListener('resize', () => {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });

    // Arrancamos
    animate();
}