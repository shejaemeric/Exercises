import * as THREE from "three";
import { degToRad } from "three/src/math/MathUtils";
import gsap from "gsap";

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Sizes
const sizes = {
  width: 800,
  height: 600,
};

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
scene.add(camera);

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});

renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);
gsap.to(mesh.position, { duration: 1, delay: 0, x: 3 });
// //animations

// let time = Date.now();
// const tick = () => {
//   let currentTime = Date.now();
//   let deltaTime = currentTime - time;
//   time = currentTime;
//   mesh.rotation.y += 0.001 * deltaTime;
//   renderer.render(scene, camera);
//   window.requestAnimationFrame(tick);
// };

// tick();

// let clock = new THREE.Clock();
// const tick = () => {
//   let elapsedTime = clock.getElapsedTime();
//   //mesh.rotation.y = elapsedTime * degToRad(360);
//   //mesh.position.y = elapsedTime;

//   //   mesh.position.y = Math.sin(elapsedTime);
//   //   mesh.position.x = Math.cos(elapsedTime);

//   camera.position.y = Math.sin(elapsedTime);
//   camera.position.x = Math.cos(elapsedTime);
//   camera.lookAt(mesh.position);
//   renderer.render(scene, camera);
//   window.requestAnimationFrame(tick);
// };

// tick();

const tick = () => {
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};

tick();
