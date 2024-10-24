import * as THREE from 'three';

// Funktsioonid mis kasutab puhtat javascripti
function getBaseLog(x, y) {
    return Math.log(y) / Math.log(x);
}

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

var grids = {};
for (let i = 100e10; i > 100e-10; i = i/10) {
    grids[i] = new THREE.GridHelper(i, 10);
}

console.log(grids)

for  (const [key, value] of Object.entries(grids)) {
    scene.add(value);
}

// Create a geometry and a material, then combine them into a mesh
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

let direction = {
    ArrowUp: false,
    ArrowDown: false,
};

function moveCamera() {
    if (direction.ArrowUp) camera.position.y -= camera.position.y/50;
    if (direction.ArrowDown) camera.position.y += camera.position.y/50;
    //console.log(camera.position.y)

    //console.log(grids[2*10**Math.round(Math.log(camera.position.y))]);

}

function displayGrids(power) {
    let index = 10**Math.round(getBaseLog(10,camera.position.y))
    grids[index/10].material.color.set(0x000000);
    grids[index].material.color.set(0xFFFF00);
    grids[index*10].material.color.set(0xFFFF00);
    grids[index*100].material.color.set(0x000000);
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
    displayGrids(1);

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