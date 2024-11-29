import * as THREE from 'three';
import {TextGeometry} from 'three\\examples\\jsm\\geometries\\TextGeometry.js'
import { FontLoader } from 'three\\examples\\jsm\\loaders\\FontLoader';

// Konstantid ja gloab muutujad
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
camera.rotation.x = -3.1415926535 / 2;
//camera.position.y = 5e-16;

camera.position.y = 5e-1;

// Create a renderer
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//Peida scroll bar
document.body.style.overflow = 'hidden';

var grids = {};
for (let i = 10e-20; i <= 10e63; i = i * 10) {
    i = i.toPrecision(1);
    grids[i] = new THREE.GridHelper(i, 10);
    grids[i].material = new THREE.LineBasicMaterial({
        color: 0xff0000,
        transparent: true,
        opacity: 0
    });
}

console.log(grids)

for (const [key, value] of Object.entries(grids)) {
    scene.add(value);
}

// OBJEKTI OSA //

// Electroni pikkus
const electrong = new THREE.SphereGeometry(5e-20, 32, 16);
const electronm = new THREE.MeshBasicMaterial({ color: 0x22ff55 });
const electron = new THREE.Mesh(electrong, electronm);
scene.add(electron);

const neutrong = new THREE.SphereGeometry(1e-15 / 2, 32, 16);
const neutronm = new THREE.MeshBasicMaterial({ color: 0x808080 });
const neutron = new THREE.Mesh(neutrong, neutronm);
scene.add(neutron);
neutron.position.x = 1e-15

const protong = new THREE.SphereGeometry(1.75e-15 / 2, 32, 16);
const protonm = new THREE.MeshBasicMaterial({ color: 0xE43436 });
const proton = new THREE.Mesh(protong, protonm);
scene.add(proton);
proton.position.x = -1.75e-15

const heliumTexture = new THREE.TextureLoader().load(require('../assets/images/helium.png'));
const helium = new THREE.Mesh(new THREE.BoxGeometry(3.1e-12, 3.1e-12, 3.1e-12), new THREE.MeshBasicMaterial({ map: heliumTexture }));
scene.add(helium);

const franciumTexture = new THREE.TextureLoader().load(require('../assets/images/francium.svg'));
const francium = new THREE.Mesh(new THREE.BoxGeometry(2.7e-11, 2.7e-11, 2.7e-11), new THREE.MeshBasicMaterial({ map: franciumTexture }));
scene.add(francium);

const fluTexture = new THREE.TextureLoader().load(require('../assets/images/flu.png'));
const flu = new THREE.Mesh(new THREE.BoxGeometry(1.2e-10, 1.2e-10, 1.2e-10), new THREE.MeshBasicMaterial({ map: fluTexture }));
scene.add(flu);

const dnaTexture = new THREE.TextureLoader().load(require('../assets/images/dna.png'));
const dna = new THREE.Mesh(new THREE.BoxGeometry(2e-9, 2e-9, 2e-9), new THREE.MeshBasicMaterial({ map: dnaTexture }));
scene.add(dna);

const ecoliTexture = new THREE.TextureLoader().load(require('../assets/images/ecoli.png'));
const ecoli = new THREE.Mesh(new THREE.BoxGeometry(2e-6, 2e-6, 2e-6), new THREE.MeshBasicMaterial({ map: ecoliTexture }));
scene.add(ecoli);
ecoli.position.x = 1e-8;

const transistorTexture = new THREE.TextureLoader().load(require('../assets/images/transistor.png'));
const transistor = new THREE.Mesh(new THREE.BoxGeometry(1.2e-5, 1.2e-5, 1.2e-5), new THREE.MeshBasicMaterial({ map: transistorTexture }));
scene.add(transistor);

const needleTexture = new THREE.TextureLoader().load(require('../assets/images/needle.png'));
const needle = new THREE.Mesh(new THREE.BoxGeometry(3.5e-2, 3.5e-2, 3.5e-2), new THREE.MeshBasicMaterial({ map: needleTexture }));
scene.add(needle);

const catTexture = new THREE.TextureLoader().load(require('../assets/images/cat.png'));
const cat = new THREE.Mesh(new THREE.BoxGeometry(4e-1, 4e-1, 4e-1), new THREE.MeshBasicMaterial({ map: catTexture }));
scene.add(cat);
cat.position.x = -0.45e0;

const plankTexture = new THREE.TextureLoader().load(require('../assets/images/plank.png'));
const plank = new THREE.Mesh(new THREE.BoxGeometry(1.8e0, 1.8e0, 1.8e0), new THREE.MeshBasicMaterial({ map: plankTexture }));
scene.add(plank);
plank.position.x = 1.9e0;


const meterg = new THREE.BoxGeometry(0.03, 0.03, 1);
const meterm = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const meter = new THREE.Mesh(meterg, meterm);
scene.add(meter);
meter.position.x = 1;





let direction = {
    ArrowUp: false,
    ArrowDown: false,
};

function moveCamera() {
    if (direction.ArrowUp && camera.position.y > 5e-16) camera.position.y -= camera.position.y / 16;
    if (direction.ArrowDown) {
        camera.position.y += camera.position.y / 16;
    }
    plank.rotation.z = -Math.atan(camera.position.y / plank.position.x);
    cat.rotation.z = -Math.atan(camera.position.y / cat.position.x);
}

var objects = {
    "-18": "Elektron",
    "-15": "Prooton, neutron",
    "-10": "Gripiviirus",
    "-9": "2018+ transistorid, DNA pikkus",
    "-8": "2000-2018 pärimad transistorid",
    "-7": "1990s pärimad transistorid",
    "-6": "1980s pärimad transistorid",
    "-5": "1970s pärimad transistorid",
    "-1": "Koduloomad",
    "0": "Inimesed, Toomas Plank",
}

function displayGrids() {
    pow = Math.round(getBaseLog(10, camera.position.y))
    document.body.getElementsByClassName("scale")[0].innerText = pow + " " + objects[pow.toString()];

    for (const [key, value] of Object.entries(grids)) {
        grids[key].material.opacity = 1 / (4 * (camera.position.y / key));
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
    
    renderer.render(scene, camera);

}

animate();


window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});