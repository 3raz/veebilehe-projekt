import * as THREE from 'three';

// Create a scene
const scene = new THREE.Scene();

// Create a camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.001, 100000);
camera.rotation.x = -3.1415926535/2;
camera.position.y = 0.01;



// Create a renderer
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
  });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const gridHelper = new THREE.GridHelper(2000, 50);
scene.add(gridHelper)

const gridHelper2 = new THREE.GridHelper(200, 50);
scene.add(gridHelper2)

const gridHelper3 = new THREE.GridHelper(20, 50);
scene.add(gridHelper3)

const gridHelper4 = new THREE.GridHelper(2, 50);
scene.add(gridHelper4)

// Create a geometry and a material, then combine them into a mesh
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

var t = 1;


let moveSpeed = 0.0000000001;
let direction = {
    ArrowUp: false,
    ArrowDown: false,
};

function moveCamera() {
    if (direction.ArrowUp) camera.position.y -= 10**(-3 + (camera.position.y));
    if (direction.ArrowDown) camera.position.y += 10**(-3 + (camera.position.y));

    if (camera.position.y > 150) {
        scene.remove(gridHelper3);
    }
    if (camera.position.y > 800) {
        scene.remove(gridHelper2);
    }

    console.log(10**(camera.position.y * moveSpeed))
}


window.addEventListener('keydown', (event) => {
    direction[event.key] = true;
});

window.addEventListener('keyup', (event) => {
    direction[event.key] = false;
});




// Animation loop
function animate() {
    requestAnimationFrame(animate);

    moveCamera();

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render(scene, camera);

}

animate();


window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});