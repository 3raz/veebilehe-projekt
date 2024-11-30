import * as THREE from 'three';

// Seadistus, mis loob stseeni, kaamera, renderdaja ja peidab kerimisriba.
var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(
  75, window.innerWidth / window.innerHeight, 0.1, 1000
);

camera.position.z = 6;

var renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// Loob kassitapeedi
const bgTexture = new THREE.TextureLoader().load(require('../assets/images/kass.jpg'));
scene.background = bgTexture;

// Loob kassikuubiku ja paneb ekraani keskele.
const kassTexture = new THREE.TextureLoader().load(require('../assets/images/kass.jpg'));
const kass = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 3), new THREE.MeshBasicMaterial({ map: kassTexture }));
scene.add(kass);

kass.position.z = 0;
kass.position.x = 0;

// Valgus
var light = new THREE.PointLight( 0xffffff, 1, 0 );
light.position.set(1, 1, 100 );
scene.add(light)

// Keerab kassikuubiku 
function animate() {
requestAnimationFrame( animate );
kass.rotation.y += 0.01;
kass.rotation.z += 0.01;
  renderer.render( scene, camera );
}
animate();