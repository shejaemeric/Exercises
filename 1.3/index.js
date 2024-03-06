// create a scene
const scene = new THREE.Scene();

// create a mesh
const BoxGeometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(BoxGeometry, material);
scene.add(mesh);

// create a camera
const sizes = {
  height: 600,
  width: 800,
};
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 2;
scene.add(camera);

// create renderer

const canvas = document.querySelector(".WEBGL");
const renderer = new THREE.WebGLRenderer({
  canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);
