import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'; 

export function initHero3D(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    
    // --- MEJORA DE COLOR (Contraste intenso y negros profundos) ---
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;

    // Insertamos el canvas al fondo
    container.insertBefore(renderer.domElement, container.firstChild);

    // --- CONTROLES DE RATÓN ---
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; 
    controls.dampingFactor = 0.05;
    controls.enableZoom = false; 
    controls.enablePan = false;  

    const dragIndicator = document.getElementById('drag-indicator');
    controls.addEventListener('start', () => {
        if (dragIndicator) dragIndicator.style.opacity = '0';
    });

    // --- SETUP DE ILUMINACIÓN (Valores de estudio real) ---
    const ambientLight = new THREE.AmbientLight(2.1); // Bajamos de 2.0 a 0.7
    scene.add(ambientLight);
    
    const mainLight = new THREE.DirectionalLight(0xffffff, .95); // Luz principal ajustada
    mainLight.position.set(5, 10, 7);
    scene.add(mainLight);
    
    const fillLight = new THREE.DirectionalLight(0xffffff, 0.1); // Sombra lateral sutil
    fillLight.position.set(-5, 0, -5);
    scene.add(fillLight);
    
    const rimLight = new THREE.DirectionalLight(0xF97316, .1); // Acento naranja posterior
    rimLight.position.set(0, 5, -10);
    scene.add(rimLight);

    // --- CARGAR EL ARCHIVO .GLB ---
    const loader = new GLTFLoader();
    let loadedModel;

    loader.load('./data/aguanile.glb?v=' + Date.now(), function (gltf) {
        loadedModel = gltf.scene;

        // --- APLICACIÓN DE MATERIAL Y RESINA ---
        loadedModel.traverse((child) => {
            if (child.isMesh) {
                // Recalculamos la geometría para los rebotes de luz
                child.geometry.computeVertexNormals();

                child.material = new THREE.MeshPhysicalMaterial({ 
                    color: 0xffffff,       
                    vertexColors: child.geometry.hasAttribute('color'), 
                    metalness: 0.0,        
                    roughness: 0.3, 
                    clearcoat: 1.0, // Resina UV encendida
                    clearcoatRoughness: 0.1 
                });
            }
        });

        // AUTO-ESCALAR Y CENTRAR
        const box = new THREE.Box3().setFromObject(loadedModel);
        const size = box.getSize(new THREE.Vector3());
        
        const maxDim = Math.max(size.x, size.y, size.z);
        const tamañoDeseado = 3.5; 
        const scale = tamañoDeseado / maxDim;
        
        loadedModel.scale.set(scale, scale, scale); 
        
        const newBox = new THREE.Box3().setFromObject(loadedModel);
        const center = newBox.getCenter(new THREE.Vector3());
        loadedModel.position.x += (loadedModel.position.x - center.x);
        loadedModel.position.y += (loadedModel.position.y - center.y);
        loadedModel.position.z += (loadedModel.position.z - center.z);

        loadedModel.rotation.x = 0.2;

        scene.add(loadedModel);
    }, undefined, function (error) {
        console.error('Error al cargar el modelo 3D:', error);
    });

    // --- ANIMACIÓN ---
    function animate() {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
    }

    // Responsividad
    window.addEventListener('resize', () => {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });

    animate();
}