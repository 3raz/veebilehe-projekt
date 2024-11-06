import * as THREE from 'three';

// Konstantid ja gloab muutujad
const OFFSET = -16;

var pow = 0;

// Funktsioonid mis kasutab puhtat javascripti
function getBaseLog(x, y) {
    return Math.log(y) / Math.log(x);
}

function roundToDecimals(value, decimals) {
    return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
}

// Create a scene
const scene = new THREE.Scene();

// Create a camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 10e-21, 10e256);
camera.rotation.x = -3.1415926535/2;
camera.position.y = 10e-20;

// Create a renderer
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
  });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//Peida scroll bar
document.body.style.overflow = 'hidden';

var grids = {};
for (let i = 10e-21; i <= 10e63; i = i*10) {
    i = i.toPrecision(1);
    grids[i] = new THREE.GridHelper(i, 10);
    grids[i].material = new THREE.LineBasicMaterial({
        color: 0xff0000,
        transparent: true,
        opacity: 0
    });
}

console.log(grids)

for  (const [key, value] of Object.entries(grids)) {
    scene.add(value);
}

// Plancki pikkus
const planckg = new THREE.BoxGeometry(0.00001*(10**OFFSET),0.00001*(10**OFFSET),0.00016*(10**OFFSET));
const planckm = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const planck = new THREE.Mesh(planckg, planckm);
scene.add(planck);

let direction = {
    ArrowUp: false,
    ArrowDown: false,
};

function moveCamera() {
    if (direction.ArrowUp && camera.position.y>10e-20) camera.position.y -= camera.position.y/16;
    if (direction.ArrowDown) {
        camera.position.y += camera.position.y/16;
    }
}

function displayGrids() {
    pow = Math.round(getBaseLog(10,camera.position.y))
    document.body.getElementsByClassName("scale")[0].innerText = pow+OFFSET;

    for (const [key, value] of Object.entries(grids)) {
        grids[key].material.opacity = 1/(4*(camera.position.y/key));
        if (grids[key].material.opacity > 10) {
            grids[key].material.opacity = 0;
        }
    }
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
    displayGrids();

    //planck.rotation.x += 0.01;
    planck.rotation.y += 0.01;

    renderer.render(scene, camera);

}

animate();


window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});