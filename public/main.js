import * as THREE from 'three';

// Create a scene
const scene = new THREE.Scene();

// Create a camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 5e-324, 10000000000);
camera.rotation.x = -3.1415926535/2;
camera.position.y = 0.01;



// Create a renderer
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
  });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var grids = [];
for (let i = 20e10; i > 20e-10; i = i/10) {
    grids.push(new THREE.GridHelper(i, 50, 0x4A7EB2, 0x4A7EB2));
}

console.log(grids)

for  (let i = 0; i < grids.length; i++) {
    scene.add(grids[i]);
}

for  (let i = 0; i < grids.length; i++) {
    grids[i].material.color.set(0xFF0000);
}

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
    if (direction.ArrowUp) camera.position.y -= camera.position.y/50;
    if (direction.ArrowDown) camera.position.y += camera.position.y/50;
    console.log(camera.position.y)
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