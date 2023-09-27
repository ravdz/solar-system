import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import sun from "./objects/sun";
import mercury from "./objects/mercury";
import venus from "./objects/venus";
import earth from "./objects/earth";
import mars from "./objects/mars";
import jupiter from "./objects/jupiter";
import saturn from "./objects/saturn";
import uranus from "./objects/uranus";
import neptune from "./objects/neptune";

THREE.ColorManagement.enabled = false;

/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Light
 */
let ambientLight = new THREE.AmbientLight(0x222222);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff);
pointLight.castShadow = true;
scene.add(pointLight);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  1,
  1000
);
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 35;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Objects
 */
scene.add(
  sun,
  mercury,
  venus,
  earth.system,
  mars,
  jupiter,
  saturn,
  uranus,
  neptune
);

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  /**
   * Update objects
   */

  //Sun
  sun.rotation.y = -0.1 * elapsedTime;

  //Earth system
  const earthTime = earth.speed * performance.now();
  const earthOrbitPoint = (earthTime % earth.loopTime) / earth.loopTime;
  const earthPosVector = earth.orbitCurve.getPoint(earthOrbitPoint);
  const planetEarth = earth.system.children.find(
    (item) => item.name === "planet"
  );
  planetEarth.position.x = earthPosVector.x;
  planetEarth.position.z = earthPosVector.y;

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
