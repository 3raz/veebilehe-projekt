import * as THREE from 'three';
import {TextGeometry} from 'three\\examples\\jsm\\geometries\\TextGeometry.js'
import { FontLoader } from 'three\\examples\\jsm\\loaders\\FontLoader';

// Konstantid ja gloab muutujad
var pow = 0;

// Funktsioonid mis kasutab puhtat javascripti
function getBaseLog(x, y) {
    return Math.log(y) / Math.log(x);
}

// Seadistus, mis loob stseeni, kaamera, renderdaja ja peidab kerimisriba.
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 10e-21, 10e256);
camera.rotation.x = -3.1415926535 / 2;
camera.position.y = 3e-15;

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Peidab keeramisrida
document.body.style.overflow = 'hidden';

// Loob punased ruudud kümne astme võrra
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

// Lisab ruudud ekraanile
for (const [key, value] of Object.entries(grids)) {
    scene.add(value);
}

// OBJEKTI OSA //

// Neutron
const neutrong = new THREE.SphereGeometry(1e-15 / 2, 32, 16);
const neutronm = new THREE.MeshBasicMaterial({ color: 0x808080 });
const neutron = new THREE.Mesh(neutrong, neutronm);
scene.add(neutron);
neutron.position.x = 1e-15

// Protoon
const protong = new THREE.SphereGeometry(1.75e-15 / 2, 32, 16);
const protonm = new THREE.MeshBasicMaterial({ color: 0xE43436 });
const proton = new THREE.Mesh(protong, protonm);
proton.position.x = -1.75e-15
scene.add(proton);

// Uraani tuum
const uraniumTexture = new THREE.TextureLoader().load(require('../assets/images/uranium.png'));
const uranium = new THREE.Mesh(new THREE.BoxGeometry(1.5e-14, 1.5e-14, 1.5e-14), new THREE.MeshBasicMaterial({ map: uraniumTexture }));
scene.add(uranium);

// Gammakiirgus
const gammaTexture = new THREE.TextureLoader().load(require('../assets/images/gamma.png'));
const gamma = new THREE.Mesh(new THREE.BoxGeometry(2e-12, 2e-12, 2e-12), new THREE.MeshBasicMaterial({ map: gammaTexture }));
scene.add(gamma);

// Vesiniku aatom
const heliumTexture = new THREE.TextureLoader().load(require('../assets/images/helium.png'));
const helium = new THREE.Mesh(new THREE.BoxGeometry(3.1e-12, 3.1e-12, 3.1e-12), new THREE.MeshBasicMaterial({ map: heliumTexture }));
helium.position.x = 6e-12;
scene.add(helium);

// Frantsiumi aatom
const franciumTexture = new THREE.TextureLoader().load(require('../assets/images/francium.svg'));
const francium = new THREE.Mesh(new THREE.BoxGeometry(2.7e-11, 2.7e-11, 2.7e-11), new THREE.MeshBasicMaterial({ map: franciumTexture }));
scene.add(francium);

// Griipiviirus
const fluTexture = new THREE.TextureLoader().load(require('../assets/images/flu.png'));
const flu = new THREE.Mesh(new THREE.BoxGeometry(1.2e-10, 1.2e-10, 1.2e-10), new THREE.MeshBasicMaterial({ map: fluTexture }));
scene.add(flu);

// Glükoos
const glucoseTexture = new THREE.TextureLoader().load(require('../assets/images/glucose.png'));
const glucose = new THREE.Mesh(new THREE.BoxGeometry(1e-9, 1e-9, 1e-9), new THREE.MeshBasicMaterial({ map: glucoseTexture }));
glucose.position.z = -1.5e-9;
scene.add(glucose);

// DNA
const dnaTexture = new THREE.TextureLoader().load(require('../assets/images/dna.png'));
const dna = new THREE.Mesh(new THREE.BoxGeometry(2e-9, 2e-9, 2e-9), new THREE.MeshBasicMaterial({ map: dnaTexture }));
dna.position.z = 1.9e-9;
scene.add(dna);

// Ecolibakteerium
const ecoliTexture = new THREE.TextureLoader().load(require('../assets/images/ecoli.png'));
const ecoli = new THREE.Mesh(new THREE.BoxGeometry(2e-6, 2e-6, 2e-6), new THREE.MeshBasicMaterial({ map: ecoliTexture }));
scene.add(ecoli);
ecoli.position.x = 1e-7;

// Vana Transistor (1970)
const transistorTexture = new THREE.TextureLoader().load(require('../assets/images/transistor.png'));
const transistor = new THREE.Mesh(new THREE.BoxGeometry(1.2e-5, 1.2e-5, 1.2e-5), new THREE.MeshBasicMaterial({ map: transistorTexture }));
scene.add(transistor);

// Nõel
const needleTexture = new THREE.TextureLoader().load(require('../assets/images/needle.png'));
const needle = new THREE.Mesh(new THREE.BoxGeometry(3.5e-2, 3.5e-2, 3.5e-2), new THREE.MeshBasicMaterial({ map: needleTexture }));
scene.add(needle);

// Kass
const catTexture = new THREE.TextureLoader().load(require('../assets/images/cat.png'));
const cat = new THREE.Mesh(new THREE.BoxGeometry(4e-1, 4e-1, 4e-1), new THREE.MeshBasicMaterial({ map: catTexture }));
cat.position.x = -0.45e0;
scene.add(cat);

// Inimene (Toomas Plank)
const plankTexture = new THREE.TextureLoader().load(require('../assets/images/plank.png'));
const plank = new THREE.Mesh(new THREE.BoxGeometry(1.8e0, 1.8e0, 1.8e0), new THREE.MeshBasicMaterial({ map: plankTexture }));
plank.position.x = 1.9e0;
scene.add(plank);

// Üks meetri suurus
const meterg = new THREE.BoxGeometry(0.03, 0.03, 1);
const meterm = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const meter = new THREE.Mesh(meterg, meterm);
scene.add(meter);
meter.position.x = 1;

// Klahvid, mis juhatavad keeramist
let direction = {
    ArrowUp: false,
    ArrowDown: false,
};

// Kõike, mis kaamera liigutamiseks nooleklahvide vajutamisel juhtuma peab
function moveCamera() {
    if (direction.ArrowUp && camera.position.y > 3e-15) camera.position.y -= camera.position.y / 16;
    if (direction.ArrowDown) {
        camera.position.y += camera.position.y / 16;
    }
    plank.rotation.z = -Math.atan(camera.position.y / plank.position.x);
    cat.rotation.z = -Math.atan(camera.position.y / cat.position.x);
    helium.rotation.z = -Math.atan(camera.position.y / helium.position.x);
    dna.rotation.x = Math.atan(camera.position.y / dna.position.z);
    glucose.rotation.x = Math.atan(camera.position.y / glucose.position.z);
}

// Info, mis tekib ülemisel hallil ribal
var objects = {
    "-18": "Elektron",
    "-15": "Prooton, neutron",
    "-14": "Uraani tuum",
    "-12": "Vesiniku aatom, gammakiirgus",
    "-11": "Frantsiumi aatom",
    "-10": "Gripiviirus",
    "-9": "2018+ transistorid, DNA pikkus, glükoosi suurus",
    "-8": "2000-2018 pärimad transistorid",
    "-7": "1990s pärimad transistorid",
    "-6": "1980s pärimad transistorid, Ecolibakteerium",
    "-5": "1970s pärimad transistorid",
    "-1": "Koduloomad",
    "0": "Inimesed, Toomas Plank",
}

// Funktsioon, mis värskendab punaste ruudude läbipaistmatuse
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

// Sündmuste kuulajad nooleklahvide jälgimiseks
window.addEventListener('keydown', (event) => {
    direction[event.key] = true;
});

window.addEventListener('keyup', (event) => {
    direction[event.key] = false;
});


// Animatsiooni tsükkel
function animate() {
    requestAnimationFrame(animate);

    moveCamera();
    displayGrids();

    renderer.render(scene, camera);

}

animate();

// Värskendage eraldusvõime muutujaid, et üleminek oleks puhas, kui ekraani suurust muudetakse
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});