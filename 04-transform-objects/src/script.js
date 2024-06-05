import * as THREE from "three";
import { degToRad } from "three/src/math/MathUtils";
import gsap from "gsap";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// what is a scene and what it does
const scene = new THREE.Scene();

// what are diff types of object and what is a boxMesh

const boxGeometry = new THREE.BoxGeometry(1, 1, 1, 7, 7, 7);
const sphereGeometry = new THREE.SphereGeometry(0.8, 7, 7);
const material = new THREE.MeshBasicMaterial({
  color: 0x00ff00,
  wireframe: true,
});
const boxMesh = new THREE.Mesh(boxGeometry, material);
const sphereMesh = new THREE.Mesh(sphereGeometry, material);
scene.add(boxMesh);
scene.add(sphereMesh);

// playing with transformations

boxMesh.position.x = -1;
boxMesh.position.y = 0;
boxMesh.position.z = 0;

sphereMesh.position.x = 1;
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
camera.position.z = 2.5;
camera.position.y = 0.3;

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
