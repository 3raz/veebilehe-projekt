import * as THREE from 'three';

// Konstantid ja gloab muutujad
const OFFSET = -20;

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
camera.position.y = 5e-19;

// Create a renderer
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
  });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//Peida scroll bar
document.body.style.overflow = 'hidden';

var grids = {};
for (let i = 10e-20; i <= 10e63; i = i*10) {
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

// OBJEKTI OSA //

// Quarki pikkus
const quarkg = new THREE.SphereGeometry( 10e-20/2, 32, 16 ); 
const quarkm = new THREE.MeshBasicMaterial( { color: 0x22ff55 } ); 
const quark = new THREE.Mesh( quarkg, quarkm ); 
scene.add( quark );

let direction = {
    ArrowUp: false,
    ArrowDown: false,
};




// Create a texture loader so we can load our image file
var loader = new THREE.TextureLoader();

// Load an image file into a custom material
var material = new THREE.MeshLambertMaterial({
  map: loader.load('https://s3.amazonaws.com/duhaime/blog/tsne-webgl/assets/cat.jpg')
});

// create a plane geometry for the image with a width of 10
// and a height that preserves the image's aspect ratio
var geometry = new THREE.PlaneGeometry(10, 10*.75);

// combine our image geometry and material into a mesh
var mesh = new THREE.Mesh(geometry, material);
camera.position.y = 100;

// set the position of the image mesh in the x,y,z dimensions
mesh.position.set(0,0,0)
mesh.rotation.x = -3.1415926535/2;

// add the image to the scene
scene.add(mesh);


var light = new THREE.PointLight( 0xffffff, 100, 0 );

// Specify the light's position
light.position.set(1, 1, 100 );

// Add the light to the scene
scene.add(light)



function moveCamera() {
    if (direction.ArrowUp && camera.position.y>5e-19) camera.position.y -= camera.position.y/16;
    if (direction.ArrowDown) {
        camera.position.y += camera.position.y/16;
    }
}

var objects = {
    "-18": "Electron",
    "-9": "2018+ transistorid",
    "-8": "2000-2018 pärimad transistorid",
    "-7": "1990s pärimad transistorid",
    "-6": "1980s pärimad transistorid",
    "-5": "1970s pärimad transistorid",
}

function displayGrids() {
    pow = Math.round(getBaseLog(10,camera.position.y))
    document.body.getElementsByClassName("scale")[0].innerText = pow + " " + objects[pow.toString()];

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

    renderer.render(scene, camera);

}

animate();


window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});