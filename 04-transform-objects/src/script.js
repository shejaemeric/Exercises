import * as THREE from "three";
import { degToRad } from "three/src/math/MathUtils";
import gsap from "gsap";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import GUI from "lil-gui";

const gui = new GUI();

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// what is a scene and what it does
const scene = new THREE.Scene();

// what are diff types of object and what is a boxMesh

const boxGeometry = new THREE.BoxGeometry(1, 1, 1, 4, 4, 4);
const sphereGeometry = new THREE.SphereGeometry(0.8, 7, 7);
const material = new THREE.MeshBasicMaterial({
  color: 0x00ff00,
  wireframe: true,
});
const boxMesh = new THREE.Mesh(boxGeometry, material);
const sphereMesh = new THREE.Mesh(sphereGeometry, material);

// creating my own geometry

const customGeometry = new THREE.BufferGeometry();
const count = 25;
const positionArray = new Float32Array(count * 3 * 3);
for (let i = 0; i < count * 3 * 3; i++) {
  positionArray[i] = Math.random();
}

const positionAtrribute = new THREE.BufferAttribute(positionArray, 3);
customGeometry.setAttribute("position", positionAtrribute);

const customMesh = new THREE.Mesh(customGeometry, material);

customMesh.position.x = 2;
customMesh.position.y = -0.5;

// playing with transformations

boxMesh.position.x = -2;
boxMesh.position.y = 0;
boxMesh.position.z = 0;

sphereMesh.position.x = 0.5;
sphereMesh.position.y = 0;
sphereMesh.position.z = 0;
// boxMesh.position.set(1, 1, 1);

boxMesh.scale.x = 1;
boxMesh.scale.y = 1;
boxMesh.scale.z = 1;

sphereMesh.scale.x = 1;
sphereMesh.scale.y = 1;
sphereMesh.scale.z = 1;

// boxMesh.scale.set(5, 2, 3);
// boxMesh.reorder("YZX");
boxMesh.rotation.x = Math.PI * 0;
boxMesh.rotation.y = Math.PI * 0.25;
boxMesh.rotation.z = Math.PI * 0;

const group = new THREE.Group();
group.add(boxMesh);
group.add(customMesh);
group.add(sphereMesh);
scene.add(group);

//boxMesh.position.normalize();
console.log(boxMesh.position.length());

// axes helper what is it and what it is used for

// const axesHelper = new THREE.AxesHelper();
// scene.add(axesHelper);

// what is a camera a fov and aspect ratio

const canvas = document.querySelector(".webgl");

const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  1,
  100
);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.update();

// const camera = new THREE.PerspectiveCamera(1, -1, 1, -1, 1, 100);
camera.position.z = 4.5;
camera.position.y = 0.3;
camera.position.x = 1;
camera.lookAt(group.position);

console.log(boxMesh.position.distanceTo(camera.position));

const renderer = new THREE.WebGLRenderer({
  canvas,
});

renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);

// handle resizing

window.addEventListener("resize", () => {
  // update camera
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // update renderer
  renderer.setSize(sizes.width, sizes.height);

  //handle pixel Ration

  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// handle fullscreen

window.addEventListener("dblclick", () => {
  const fullscreenElement =
    document.fullscreenElement || document.webkitFullscreen;

  if (!fullscreenElement) {
    if (canvas.requestFullscreen) {
      canvas.requestFullscreen();
    } else if (canvas.requestWebkitFullscreen) {
      canvas.requestWebkitFullscreen();
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.exitWebkitFullscreen) {
      document.exitWebkitFullscreen();
    }
  }
});

// amimations

const clock = new THREE.Clock();

// gsap.to(boxMesh.rotation, { duration: 5, delay: 1, y: 2 });

function tick() {
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
}
tick();

// GUI Debugger

const globalFolder = gui.addFolder("Global Controls");
const boxFolder = gui.addFolder("Sphere Controls");
const sphereFolder = gui.addFolder("Box Controls");
const customFolder = gui.addFolder("Custom Geometry Controls");

const customObject = {
  scale: 1,
  animate: () => {
    gsap.to(boxMesh.rotation, {
      duration: 5,
      delay: 1,
      y: boxMesh.rotation.y + 2,
      z: boxMesh.rotation.z + 2,
    });
    gsap.to(sphereMesh.rotation, {
      duration: 5,
      delay: 1,
      y: 2 + sphereMesh.rotation.y,
      z: 2 + sphereMesh.rotation.z,
    });
    gsap.to(customMesh.rotation, {
      duration: 5,
      delay: 1,
      y: 2 + customMesh.rotation.y,
      z: 2 + customMesh.rotation.z,
    });
    camera.lookAt(group.position);
  },
};

// Global Folder
globalFolder
  .add(camera.position, "x")
  .min(-3)
  .max(3)
  .step(0.01)
  .name("position x");
globalFolder
  .add(camera.position, "y")
  .min(-3)
  .max(3)
  .step(0.01)
  .name("position y");
globalFolder
  .add(camera.position, "z")
  .min(-3)
  .max(3)
  .step(0.01)
  .name("position z");

globalFolder.addColor(material, "color").name("material color");
globalFolder
  .add(customObject, "scale")
  .min(0)
  .max(0.2)
  .step(0.001)
  .name("scale Objects")
  .onChange((value) => {
    sphereMesh.scale.x = sphereMesh.scale.x + value;
    sphereMesh.scale.y = sphereMesh.scale.y + value;
    sphereMesh.scale.z = sphereMesh.scale.z + value;

    boxMesh.scale.x = boxMesh.scale.x + value;
    boxMesh.scale.y = boxMesh.scale.y + value;
    boxMesh.scale.z = boxMesh.scale.z + value;

    customMesh.scale.x = customMesh.scale.x + value;
    customMesh.scale.y = customMesh.scale.y + value;
    customMesh.scale.z = customMesh.scale.z + value;
  });
globalFolder.add(customObject, "animate");

// Box Folder

boxFolder
  .add(boxMesh.position, "x")
  .min(-3)
  .max(3)
  .step(0.01)
  .name("position x");
boxFolder
  .add(boxMesh.position, "y")
  .min(-3)
  .max(3)
  .step(0.01)
  .name("position y");
boxFolder
  .add(boxMesh.position, "z")
  .min(-3)
  .max(3)
  .step(0.01)
  .name("position z");

// _______

boxFolder
  .add(boxMesh.rotation, "x")
  .min(-3)
  .max(3)
  .step(0.01)
  .name("rotation x");
boxFolder
  .add(boxMesh.rotation, "y")
  .min(-3)
  .max(3)
  .step(0.01)
  .name("rotation y");
boxFolder
  .add(boxMesh.rotation, "z")
  .min(-3)
  .max(3)
  .step(0.01)
  .name("rotation z");

// Sphere Folder

sphereFolder
  .add(sphereMesh.position, "x")
  .min(-3)
  .max(3)
  .step(0.01)
  .name("position x");
sphereFolder
  .add(sphereMesh.position, "y")
  .min(-3)
  .max(3)
  .step(0.01)
  .name("position y");
sphereFolder
  .add(sphereMesh.position, "z")
  .min(-3)
  .max(3)
  .step(0.01)
  .name("position z");

// _______

sphereFolder
  .add(sphereMesh.rotation, "x")
  .min(-3)
  .max(3)
  .step(0.01)
  .name("rotation x");
sphereFolder
  .add(sphereMesh.rotation, "y")
  .min(-3)
  .max(3)
  .step(0.01)
  .name("rotation y");
sphereFolder
  .add(sphereMesh.rotation, "z")
  .min(-3)
  .max(3)
  .step(0.01)
  .name("rotation z");

// Custom Folder

customFolder
  .add(customMesh.position, "x")
  .min(-3)
  .max(3)
  .step(0.01)
  .name("position x");
customFolder
  .add(customMesh.position, "y")
  .min(-3)
  .max(3)
  .step(0.01)
  .name("position y");
customFolder
  .add(customMesh.position, "z")
  .min(-3)
  .max(3)
  .step(0.01)
  .name("position z");
