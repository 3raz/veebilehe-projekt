import * as THREE from 'three';

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
camera.position.y = 5e-15;


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
proton.position.x = -1.75e-15;
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
const helium = new THREE.Mesh(new THREE.BoxGeometry(6.2e-11, 6.2e-11, 6.2e-11), new THREE.MeshBasicMaterial({ map: heliumTexture }));
helium.position.x = 6e-12;
scene.add(helium);

// Frantsiumi aatom
const franciumTexture = new THREE.TextureLoader().load(require('../assets/images/francium.svg'));
const francium = new THREE.Mesh(new THREE.BoxGeometry(5e-10, 5e-10, 5e-10), new THREE.MeshBasicMaterial({ map: franciumTexture }));
scene.add(francium);

// Cesium atom
const cesiumTexture = new THREE.TextureLoader().load(require('../assets/images/cesium.png'));
const cesium = new THREE.Mesh(new THREE.BoxGeometry(5.24e-10, 5.24e-10, 5.24e-10), new THREE.MeshBasicMaterial({ map: cesiumTexture }));
cesium.position.x = -8.24e-10;
scene.add(cesium);

// Griipiviirus
const fluTexture = new THREE.TextureLoader().load(require('../assets/images/flu.png'));
const flu = new THREE.Mesh(new THREE.BoxGeometry(1.2e-7, 1.2e-7, 1.2e-7), new THREE.MeshBasicMaterial({ map: fluTexture }));
scene.add(flu);

// Glükoos
const glucoseTexture = new THREE.TextureLoader().load(require('../assets/images/glucose.png'));
const glucose = new THREE.Mesh(new THREE.BoxGeometry(1e-9, 1e-9, 1e-9), new THREE.MeshBasicMaterial({ map: glucoseTexture }));
glucose.position.z = -2.5e-9;
scene.add(glucose);

// DNA
const dnaTexture = new THREE.TextureLoader().load(require('../assets/images/dna.png'));
const dna = new THREE.Mesh(new THREE.BoxGeometry(2e-9, 2e-9, 2e-9), new THREE.MeshBasicMaterial({ map: dnaTexture }));
dna.position.z = 2.9e-9;
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
const needle = new THREE.Mesh(new THREE.BoxGeometry(2.25e-2, 2.25e-2, 2.25e-2), new THREE.MeshBasicMaterial({ map: needleTexture }));
scene.add(needle);

// Intel 4004. Korrutatakse 1,2-ga, kuna pilt ei veni kuubi servadeni. Selle lahknevuse korvamiseks ja suuruse lehe täpsemaks muutmiseks arvutati 1,2.
const f004Texture = new THREE.TextureLoader().load(require('../assets/images/4004.png'));
const f004 = new THREE.Mesh(
    new THREE.BoxGeometry( 1.2e-2*1.2, 1.2e-2*1.2, 1.2e-2*1.2 ),
    
[   
    new THREE.MeshBasicMaterial( {color: 0x000000,  opacity:0} ),
    new THREE.MeshBasicMaterial( {color: 0x000000,  opacity:0} ),
    new THREE.MeshBasicMaterial( {map: f004Texture} ),
    new THREE.MeshBasicMaterial( {color: 0x000000,  opacity:0} ),
    new THREE.MeshBasicMaterial( {color: 0x000000,  opacity:0} ),
    new THREE.MeshBasicMaterial( {color: 0x000000,  opacity:0} ),
]
);
f004.position.z = 3e-2;
scene.add( f004 );


// Intel 4004. Korrutatakse 1,2-ga, kuna pilt ei veni kuubi servadeni. Selle lahknevuse korvamiseks ja suuruse lehe täpsemaks muutmiseks arvutati 1,2.
const i9Texture = new THREE.TextureLoader().load(require('../assets/images/i9.png'));
const i9 = new THREE.Mesh(
    new THREE.BoxGeometry( 3.55e-2, 3.55e-2, 3.55e-2 ),
    
[   
    new THREE.MeshBasicMaterial( {color: 0x000000,  opacity:0} ),
    new THREE.MeshBasicMaterial( {color: 0x000000,  opacity:0} ),
    new THREE.MeshBasicMaterial( {map: i9Texture} ),
    new THREE.MeshBasicMaterial( {color: 0x000000,  opacity:0} ),
    new THREE.MeshBasicMaterial( {color: 0x000000,  opacity:0} ),
    new THREE.MeshBasicMaterial( {color: 0x000000,  opacity:0} ),
]
);
i9.position.z = -3e-2;
scene.add( i9 );


// Inimene (Toomas Plank)
const plankTexture = new THREE.TextureLoader().load(require('../assets/images/plank.png'));
const plank = new THREE.Mesh(
    new THREE.BoxGeometry( 1.8e0, 1.8e0, 1.8e0 ),
    
[   
    new THREE.MeshBasicMaterial( {color: 0x000000,  opacity:0} ),
    new THREE.MeshBasicMaterial( {color: 0x000000,  opacity:0} ),
    new THREE.MeshBasicMaterial( {map: plankTexture} ),
    new THREE.MeshBasicMaterial( {color: 0x000000,  opacity:0} ),
    new THREE.MeshBasicMaterial( {color: 0x000000,  opacity:0} ),
    new THREE.MeshBasicMaterial( {color: 0x000000,  opacity:0} ),
]
);	
plank.position.x = 1.8e0;
scene.add( plank );


// Kass
const catTexture = new THREE.TextureLoader().load(require('../assets/images/cat.png'));
const cat = new THREE.Mesh(
    new THREE.BoxGeometry(4e-1, 4e-1, 4e-1),
    
[   
    new THREE.MeshBasicMaterial( {color: 0x000000,  opacity:0} ),
    new THREE.MeshBasicMaterial( {color: 0x000000,  opacity:0} ),
    new THREE.MeshBasicMaterial( {map: catTexture} ),
    new THREE.MeshBasicMaterial( {color: 0x000000,  opacity:0} ),
    new THREE.MeshBasicMaterial( {color: 0x000000,  opacity:0} ),
    new THREE.MeshBasicMaterial( {color: 0x000000,  opacity:0} ),
]
);	
cat.position.x = -4e-1;
scene.add( cat );


// Üks meetri suurus
const meterg = new THREE.BoxGeometry(0.03, 0.03, 1);
const meterm = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const meter = new THREE.Mesh(meterg, meterm);
scene.add(meter);
meter.position.x = 1;

// Meie maailm. Korrutatakse 1,1-ga, kuna pilt ei veni kuubi servadeni. Selle lahknevuse korvamiseks ja suuruse lehe täpsemaks muutmiseks arvutati 1,1.
const earthTexture = new THREE.TextureLoader().load(require('../assets/images/earth.png'));
const earth = new THREE.Mesh(new THREE.BoxGeometry(1.27e7*1.1, 1.27e7*1.1, 1.27e7*1.1), new THREE.MeshBasicMaterial({ map: earthTexture }));
scene.add(earth);

// Päike. Korrutatakse 1,2-ga, kuna pilt ei veni kuubi servadeni. Selle lahknevuse korvamiseks ja suuruse lehe täpsemaks muutmiseks arvutati 1,2.
const sunTexture = new THREE.TextureLoader().load(require('../assets/images/sun.png'));
const sun = new THREE.Mesh(new THREE.BoxGeometry(1.39e9*1.2, 1.39e9*1.2, 1.39e9*1.2), new THREE.MeshBasicMaterial({ map: sunTexture }));
scene.add(sun);


// pollux
const polluxTexture = new THREE.TextureLoader().load(require('../assets/images/pollux.png'));
const pollux = new THREE.Mesh(
    new THREE.BoxGeometry(1.22e10, 1.22e10, 1.22e10),
    
[   
    new THREE.MeshBasicMaterial( {color: 0x000000,  opacity:0} ),
    new THREE.MeshBasicMaterial( {color: 0x000000,  opacity:0} ),
    new THREE.MeshBasicMaterial( {map: polluxTexture} ),
    new THREE.MeshBasicMaterial( {color: 0x000000,  opacity:0} ),
    new THREE.MeshBasicMaterial( {color: 0x000000,  opacity:0} ),
    new THREE.MeshBasicMaterial( {color: 0x000000,  opacity:0} ),
]
);	
pollux.position.x = 2.22e10;
scene.add( pollux );

// sagittarius
const sagittariusg = new THREE.SphereGeometry(2.547e10 / 2, 32, 16);
const sagittariusm = new THREE.MeshBasicMaterial({ color: 0x111111 });
const sagittarius = new THREE.Mesh(sagittariusg, sagittariusm);
sagittarius.position.x = -2.4e10
scene.add(sagittarius);

// Pistol täht
const pistolTexture = new THREE.TextureLoader().load(require('../assets/images/pistol.png'));
const pistol = new THREE.Mesh(
    new THREE.BoxGeometry(4.25e11*1.1, 4.25e11*1.1, 4.25e11*1.1),
    
[   
    new THREE.MeshBasicMaterial( {color: 0x000000,  opacity:0} ),
    new THREE.MeshBasicMaterial( {color: 0x000000,  opacity:0} ),
    new THREE.MeshBasicMaterial( {map: pistolTexture} ),
    new THREE.MeshBasicMaterial( {color: 0x000000,  opacity:0} ),
    new THREE.MeshBasicMaterial( {color: 0x000000,  opacity:0} ),
    new THREE.MeshBasicMaterial( {color: 0x000000,  opacity:0} ),
]
);	
pistol.position.z = -5.25e11/1.2;
scene.add( pistol );

// Stephenson 2-18
const stephensonTexture = new THREE.TextureLoader().load(require('../assets/images/stephenson.png'));
const stephenson = new THREE.Mesh(
    new THREE.BoxGeometry(3e12, 3e12, 3e12),
    
[   
    new THREE.MeshBasicMaterial( {color: 0x000000,  opacity:0} ),
    new THREE.MeshBasicMaterial( {color: 0x000000,  opacity:0} ),
    new THREE.MeshBasicMaterial( {map: stephensonTexture} ),
    new THREE.MeshBasicMaterial( {color: 0x000000,  opacity:0} ),
    new THREE.MeshBasicMaterial( {color: 0x000000,  opacity:0} ),
    new THREE.MeshBasicMaterial( {color: 0x000000,  opacity:0} ),
]
);
stephenson.position.z = 4e12/1.5;
scene.add( stephenson );

// ton must auk
const tong = new THREE.SphereGeometry(3.9e14 / 2, 32, 16);
const tonm = new THREE.MeshBasicMaterial({ color: 0x111111 });
const ton = new THREE.Mesh(tong, tonm);
scene.add(ton);


// Milkyway
const milkywayTexture = new THREE.TextureLoader().load(require('../assets/images/milkyway.png'));
const milkyway = new THREE.Mesh(
    new THREE.BoxGeometry(1e21*1.1, 1e21*1.1, 1e21*1.1),
    
[   
    new THREE.MeshBasicMaterial( {color: 0x000000,  opacity:0} ),
    new THREE.MeshBasicMaterial( {color: 0x000000,  opacity:0} ),
    new THREE.MeshBasicMaterial( {map: milkywayTexture} ),
    new THREE.MeshBasicMaterial( {color: 0x000000,  opacity:0} ),
    new THREE.MeshBasicMaterial( {color: 0x000000,  opacity:0} ),
    new THREE.MeshBasicMaterial( {color: 0x000000,  opacity:0} ),
]
);
scene.add( milkyway );

// Observable universe
const helixTexture = new THREE.TextureLoader().load(require('../assets/images/helix.png'));
const helix = new THREE.Mesh(new THREE.BoxGeometry(2.46e16, 2.46e16, 2.46e16), new THREE.MeshBasicMaterial({ map: helixTexture }));
scene.add(helix);

// Observable universe
const universeTexture = new THREE.TextureLoader().load(require('../assets/images/universe.png'));
const universe = new THREE.Mesh(new THREE.BoxGeometry(8.79e26, 8.79e26, 8.79e26), new THREE.MeshBasicMaterial({ map: universeTexture }));
scene.add(universe);


// Klahvid, mis juhatavad keeramist
let direction = {
    ArrowUp: false,
    ArrowDown: false,
};

// Kõike, mis kaamera liigutamiseks nooleklahvide vajutamisel juhtuma peab
function moveCamera() {
    if (direction.ArrowUp && camera.position.y > 5e-15) camera.position.y -= camera.position.y / 16;
    if (direction.ArrowDown && camera.position.y < 9.9e26) {
        camera.position.y += camera.position.y / 16;
    }
    
    
    helium.rotation.z = -Math.atan(camera.position.y / helium.position.x);
    dna.rotation.x = Math.atan(camera.position.y / dna.position.z);
    glucose.rotation.x = Math.atan(camera.position.y / glucose.position.z);
    flu.rotation.z = -Math.atan(camera.position.y / flu.position.x);
    cesium.rotation.z = -Math.atan(camera.position.y / cesium.position.x);
};

// Info
var boundaries = {
    2.25e-2: needle,
    1.40316e7: earth,
    1.668e9: sun,
    1.8e0: plank,
    4e-1: cat,
    1.44e-2: f004,
    3.55e-2: i9,
    1.22e10: pollux,
    4.625e11: pistol,
    3e12: stephenson,
    1.1e21: milkyway
};

// Info, mis tekib ülemisel hallil ribal
var objects = {
    "-15": "Prooton, neutron",
    "-14": "Uraani tuum",
    "-13": "",
    "-12": "Gammakiirgus",
    "-11": "Vesiniku aatom",
    "-10": "Frantsiumi aatom, Cesium aatom",
    "-9": "2018+ transistorid, DNA pikkus, glükoosi suurus",
    "-8": "2000-2018 pärimad transistorid",
    "-7": "1990s pärimad transistorid, Gripiviirus",
    "-6": "1980s pärimad transistorid, Ecolibakteerium",
    "-5": "1970s pärimad transistorid",
    "-4": "",
    "-3": "",
    "-2": "CPU-d, nõelad",
    "-1": "Koduloomad",
    "0": "Inimesed, Toomas Plank",
    "1": "",
    "2": "",
    "3": "",
    "4": "",
    "5": "",
    "6": "",
    "7": "Maakera",
    "8": "",
    "9": "Päike",
    "10": "Pollux, sagittarius A",
    "11": "Pistol täht, Stephenson 2-18",
    "12": "",
    "13": "",
    "14": "Ton 618",
    "15": "",
    "16": "Helix udukogu",
    "17": "",
    "18": "",
    "19": "",
    "20": "",
    "21": "Piimatee",
    "22": "",
    "23": "",
    "24": "",
    "25": "",
    "26": "Vaadeldav universum",
};

// Funktsioon, mis värskendab punaste ruudude läbipaistmatuse
function displayGrids() {
    pow = Math.round(getBaseLog(10, camera.position.y))-1
    document.body.getElementsByClassName("scale")[0].innerText = pow;
    document.body.getElementsByClassName("current_objects")[0].innerText = objects[pow.toString()];
    

    for (const [key, value] of Object.entries(grids)) {
        grids[key].material.opacity = 1 / (4 * (camera.position.y / key));
        if (grids[key].material.opacity > 10) {
            grids[key].material.opacity = 0;
        }
    }
}

function updateVisibility() {
    for (const [key, value] of Object.entries(boundaries)) {
        if (key > camera.position.y*50) {
            boundaries[key].position.y = 0; 
        } else {
            boundaries[key].position.y = -key/2; 
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
    updateVisibility();

    renderer.render(scene, camera);

}

animate();

// Värskendage eraldusvõime muutujaid, et üleminek oleks puhas, kui ekraani suurust muudetakse
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});