import * as THREE from 'three';

var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(
  75, window.innerWidth / window.innerHeight, 0.1, 1000
);

camera.position.z = 6;

var renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );


const bgTexture = new THREE.TextureLoader().load(require('../assets/images/ToomasPlank.png'));
scene.background = bgTexture;



const ToomasPlankTexture = new THREE.TextureLoader().load(require('../assets/images/ToomasPlank.png'));

const ToomasPlank = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 3), new THREE.MeshBasicMaterial({ map: ToomasPlankTexture }));

scene.add(ToomasPlank);

ToomasPlank.position.z = 0;
ToomasPlank.position.x = 0;


/**
* Lights
**/

// Add a point light with #fff color, .7 intensity, and 0 distance
var light = new THREE.PointLight( 0xffffff, 1, 0 );

// Specify the light's position
light.position.set(1, 1, 100 );

// Add the light to the scene
scene.add(light)

/**
* Render!
**/

// The main animation function that re-renders the scene each animation frame
function animate() {
requestAnimationFrame( animate );
ToomasPlank.rotation.y += 0.01;
ToomasPlank.rotation.z += 0.01;
  renderer.render( scene, camera );
}
animate();