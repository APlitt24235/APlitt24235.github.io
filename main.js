import * as THREE from "three";

const STARTY = 20;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.y = STARTY;
camera.position.z = 30;

const geometry = new THREE.PlaneGeometry(30, 20);

const backgroundTexture = new THREE.TextureLoader().load("background.jfif");
scene.background = backgroundTexture;

//const texture = new THREE.TextureLoader().load("me.jpg");
//texture.wrapS = THREE.RepeatWrapping;
//texture.repeat.x = -1;

/*const material = new THREE.MeshBasicMaterial({
    color: 0xffffff, 
    side: THREE.DoubleSide,
    map: texture
}); */

var textureArray = [];
var materialArray = [];
var planeArray = [];

for (let i = 0; i < 4; i++) {
    switch (i) {
        case 0:
            textureArray.push(new THREE.TextureLoader().load("me.jpg"));
            textureArray[0].wrapS = THREE.RepeatWrapping;
            textureArray[0].repeat.x = -1;
            materialArray.push(new THREE.MeshBasicMaterial({
                color: 0xffffff, 
                side: THREE.DoubleSide,
                map: textureArray[0]
            }));
            planeArray.push(new THREE.Mesh(new THREE.PlaneGeometry(13.3, 20), materialArray[0]));
            planeArray[0].rotation.y = 9.75;
            planeArray[0].position.x = -15;
            planeArray[0].position.y = 27.5;
            scene.add(planeArray[0]);
            break;
        case 1:
            textureArray.push(new THREE.TextureLoader().load("formbarOAuth.PNG"));
            textureArray[1].wrapS = THREE.RepeatWrapping;
            textureArray[1].repeat.x = -1;
            materialArray.push(new THREE.MeshBasicMaterial({
                color: 0xffffff,
                side: THREE.DoubleSide,
                map: textureArray[1]
            }));
            planeArray.push(new THREE.Mesh(geometry, materialArray[1]));
            planeArray[1].rotation.y = 9.75;
            planeArray[1].position.x = -15;
            planeArray[1].position.y = -5.5;
            scene.add(planeArray[1]);
            break;
        case 2:
            textureArray.push(new THREE.TextureLoader().load("capitol.jpg"));
            textureArray[2].wrapS = THREE.RepeatWrapping;
            textureArray[2].repeat.x = -1;
            materialArray.push(new THREE.MeshBasicMaterial({
                color: 0xffffff,
                side: THREE.DoubleSide,
                map: textureArray[2]
            }));
            planeArray.push(new THREE.Mesh(geometry, materialArray[2]));
            planeArray[2].rotation.y = 9.75;
            planeArray[2].position.x = -15;
            planeArray[2].position.y = -32;
            scene.add(planeArray[2]);
            break;
        case 3:
            textureArray.push(new THREE.TextureLoader().load("interview.jpg"));
            textureArray[3].wrapS = THREE.RepeatWrapping;
            textureArray[3].repeat.x = -1;
            materialArray.push(new THREE.MeshBasicMaterial({
                color: 0xffffff,
                side: THREE.DoubleSide,
                map: textureArray[3]
            }));
            planeArray.push(new THREE.Mesh(geometry, materialArray[3]));
            planeArray[3].rotation.y = 9.75;
            planeArray[3].position.x = -15;
            planeArray[3].position.y = -55;
            scene.add(planeArray[3]);
            break;
    };
};

//const plane = new THREE.Mesh(geometry, material);
//plane.rotation.y = 9.75;
//plane.position.x = -15;
//scene.add(plane);

function moveCamera() {
    const top = document.body.getBoundingClientRect().top;
    camera.position.y = STARTY + top * 0.05;
    console.log(top);
};

document.body.onscroll = moveCamera;

const renderer = new THREE.WebGLRenderer(
    {canvas: document.querySelector("#bg")}
);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

function animate(time) {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
};

animate();