import * as THREE from "./three.module.js";

//import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer(
  {
    canvas: document.querySelector("#bg")
  }
);

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

//LIGHTS
const pointLight = new THREE.PointLight(0xFFFFFF, 1000, 1000);
pointLight.position.set(0, 0, 50);

const ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.1);

scene.add(pointLight);
scene.add(ambientLight);

//HELPERS
/*
const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 50);
const axesHelper = new THREE.AxesHelper(20, 20, 20);
scene.add(lightHelper, gridHelper, axesHelper);
*/

const geoPog = new THREE.CylinderGeometry(7.5, 7.5, 1.5, 32);
const texturePog = new THREE.TextureLoader().load("eevee.png");
const matPog = new THREE.MeshStandardMaterial(
  {
    color: 0xFFFFFF,
    wireframe: false,
    map: texturePog
  }
);
const pog = new THREE.Mesh(geoPog, matPog);
pog.rotation.x = 45;

pog.scale.set(0.5, 0.5, 0.5);

scene.add(pog);

//const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({
    color: 0xFFFFFF
  });
  const star = new THREE.Mesh(geometry, material);
  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
  star.position.set(x, y, z);
  scene.add(star);
};

Array(200).fill().forEach(addStar);

const spaceTexture = new THREE.TextureLoader().load("space.jpg");
scene.background = spaceTexture;

// Avatar
const lukeTexture = new THREE.TextureLoader().load("luke.png");

const luke = new THREE.Mesh(
  new THREE.BoxGeometry(3, 3, 3),
  new THREE.MeshBasicMaterial({map: lukeTexture})
);

scene.add(luke);

//Moon
const moonTexture = new THREE.TextureLoader().load("moon.jpg");
const normalTexture = new THREE.TextureLoader().load("normal.jpg");

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture
  })
);

scene.add(moon);

moon.position.z = 15;
moon.position.setX(-10);
luke.position.z = -5;
pog.position.z = -5;

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;
  luke.rotation.y += 0.01;
  luke.rotation.z += 0.01;
  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.position.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();

function animate(time) {
  requestAnimationFrame(animate);
  pog.rotation.x += 0.01;
  pog.rotation.y += 0.005;
  pog.rotation.z += 0.005;
  //pog.rotation.y += 0.01;
  //controls.update();
  renderer.render(scene, camera);
};

animate();