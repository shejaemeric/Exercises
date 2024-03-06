import * as THREE from "three";
import { degToRad } from "three/src/math/MathUtils";

// create a scene
const scene = new THREE.Scene();

// create a mesh
const BoxGeometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x0000ff });
const mesh = new THREE.Mesh(BoxGeometry, material);
scene.add(mesh);

// mesh positioning

// mesh.position.x = 0.7;
// mesh.position.y = -0.2;
// mesh.position.z = -1;

mesh.position.set(1.7, 0, -1);

// scale
// mesh.scale.x = 1;
// mesh.scale.y = 2;
// mesh.scale.z = 0.1;
mesh.scale.set(1, 1.3, 1);

//rotation

// mesh.rotation.reorder("ZXY");
// mesh.rotation.x = degToRad(210);
// mesh.rotation.y = degToRad(450);
// mesh.rotation.z = degToRad(90);

mesh.rotation.reorder("ZXY");
mesh.rotation.set(degToRad(210), degToRad(450), degToRad(90));

// axesHelper
const axesHelper = new THREE.AxesHelper();
scene.add(axesHelper);

// create a camera
const sizes = {
  height: 820,
  width: 1440,
};
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 2;
camera.position.y = 0.2;
camera.position.x = 0.5;
scene.add(camera);
camera.lookAt(mesh.position);

// create renderer
const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer({
  canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);
