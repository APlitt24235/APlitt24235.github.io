import * as THREE from "three";

//Starting position of the images from the top
const STARTY = 20;

//Create a new scene
const scene = new THREE.Scene();

//Create and position the camera;
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.y = STARTY;
camera.position.z = 30;

//Create a new geometry for the planes to use
const geometry = new THREE.PlaneGeometry(30, 20);

//Create a background texture and display it
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

//Create 3 new arrays for images, including textures, materials, and planes
var textureArray = [];
var materialArray = [];
var planeArray = [];


//Create a for loop that loops 4 times, for the 4 images that will be present
for (let i = 0; i < 4; i++) {
    //Create a switch statement that checks for i's value
    switch (i) {
        //If i = 0:
        case 0:
            //Pushes the first texture into the texture array and flips it so it can be viewed appropriately on the page
            textureArray.push(new THREE.TextureLoader().load("me.jpg"));
            textureArray[0].wrapS = THREE.RepeatWrapping;
            textureArray[0].repeat.x = -1;
            //Pushes the first material into the material array, making it have the color white (so it can be viewed with no added hue), double-sided, and giving it the first texture
            materialArray.push(new THREE.MeshBasicMaterial({
                color: 0xffffff, 
                side: THREE.DoubleSide,
                map: textureArray[0]
            }));
            //Pushes the first plane into the plane array and changing it's positions to match the text
            planeArray.push(new THREE.Mesh(new THREE.PlaneGeometry(13.3, 20), materialArray[0]));
            planeArray[0].rotation.y = 9.75;
            planeArray[0].position.x = -15;
            planeArray[0].position.y = 27.5;
            //Adds the first plane to the scene
            scene.add(planeArray[0]);
            break;
        //If i = 1:
        case 1:
            //Pushes the second texture into the texture array and flips it so it can be viewed appropriately on the page
            textureArray.push(new THREE.TextureLoader().load("formbarOAuth.jpg"));
            textureArray[1].wrapS = THREE.RepeatWrapping;
            textureArray[1].repeat.x = -1;
            //Pushes the second material into the material array, making it have the color white (so it can be viewed with no added hue), double-sided, and giving it the second texture
            materialArray.push(new THREE.MeshBasicMaterial({
                color: 0xffffff,
                side: THREE.DoubleSide,
                map: textureArray[1]
            }));
            //Pushes the second plane into the plane array and changing it's positions to match the text
            planeArray.push(new THREE.Mesh(geometry, materialArray[1]));
            planeArray[1].rotation.y = 9.75;
            planeArray[1].position.x = -15;
            planeArray[1].position.y = -5.5;
            //Adds the second plane to the scene
            scene.add(planeArray[1]);
            break;
        //If i = 2:
        case 2:
            //Pushes the third texture into the texture array and flips it so it can be viewed appropriately on the page
            textureArray.push(new THREE.TextureLoader().load("capitol.jpg"));
            textureArray[2].wrapS = THREE.RepeatWrapping;
            textureArray[2].repeat.x = -1;
            //Pushes the third material into the material array, making it have the color white (so it can be viewed with no added hue), double-sided, and giving it the third texture
            materialArray.push(new THREE.MeshBasicMaterial({
                color: 0xffffff,
                side: THREE.DoubleSide,
                map: textureArray[2]
            }));
            //Pushes the third plane into the plane array and changing it's positions to match the text
            planeArray.push(new THREE.Mesh(geometry, materialArray[2]));
            planeArray[2].rotation.y = 9.75;
            planeArray[2].position.x = -15;
            planeArray[2].position.y = -32;
            //Adds the third plane to the scene
            scene.add(planeArray[2]);
            break;
        //If i = 3:
        case 3:
            //Pushes the fourth texture into the texture array and flips it so it can be viewed appropriately on the page
            textureArray.push(new THREE.TextureLoader().load("interview.jpg"));
            textureArray[3].wrapS = THREE.RepeatWrapping;
            textureArray[3].repeat.x = -1;
            //Pushes the fourth material into the material array, making it have the color white (so it can be viewed with no added hue), double-sided, and giving it the fourth texture
            materialArray.push(new THREE.MeshBasicMaterial({
                color: 0xffffff,
                side: THREE.DoubleSide,
                map: textureArray[3]
            }));
            //Pushes the fourth plane into the plane array and changing it's positions to match the text
            planeArray.push(new THREE.Mesh(geometry, materialArray[3]));
            planeArray[3].rotation.y = 9.75;
            planeArray[3].position.x = -15;
            planeArray[3].position.y = -58;
            //Adds the fourth plane to the scene
            scene.add(planeArray[3]);
            break;
    };
};

//const plane = new THREE.Mesh(geometry, material);
//plane.rotation.y = 9.75;
//plane.position.x = -15;
//scene.add(plane);

//This function gets the top of the screen and changes the camera position's y value based on that
function moveCamera() {
    const top = document.body.getBoundingClientRect().top;
    camera.position.y = STARTY + top * 0.05;
    console.log(top);
};

//Assigns the moveCamera function to whenever the body is scrolled through
document.body.onscroll = moveCamera;

//This function accomodates for whenever the window is resized or is viewed through a phone
function resizeWindow() {
    //Changes the aspect of the camera based on the window's width and height, updates the projection based on that, and also changes the size of the renderer based on the window's width and height
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    //This changes the position of the camera and the rotation of the planes if the width of the window is less than or equal to 600
    if (window.innerWidth <= 600) {
        camera.position.x = -15;
        for (const child in scene.children) {
            scene.children[child].rotation.y = 0;
        }
    //If the width of the window is greater than 600, the position and the rotation of the planes is set to normal
    } else {
        camera.position.x = 0;
        for (const child in scene.children) {
            scene.children[child].rotation.y = 9.75;
        }
    }
};

//Adds the resizeWindow function to the page, which runs whenever the page is resized
window.addEventListener("resize", resizeWindow, false);

//Creates the renderer and uses canvas from the HTML page
const renderer = new THREE.WebGLRenderer(
    {canvas: document.querySelector("#bg")}
);

//Sets the size of the renderer based on the window's width and height
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//Animates the page and renders the scene and camera recursively
function animate(time) {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
};

//Calls the animate function
animate();