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
  mercury.system,
  venus.system,
  earth.system,
  mars.system,
  jupiter.system,
  saturn.system,
  uranus.system,
  neptune.system
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

  //Mercury system
  const mercuryTime = mercury.speed * performance.now();
  const mercuryOrbitPoint = (mercuryTime % mercury.loopTime) / mercury.loopTime;

  const mercuryPosVector = mercury.orbitCurve.getPoint(mercuryOrbitPoint);
  const planetMercury = mercury.system.children.find(
    (item) => item.name === "planet"
  );
  planetMercury.position.x = mercuryPosVector.x;
  planetMercury.position.z = mercuryPosVector.y * -1;
  planetMercury.rotation.y = 0.1 * elapsedTime;

  //Venus system
  const venusTime = venus.speed * performance.now();
  const venusOrbitPoint = (venusTime % venus.loopTime) / venus.loopTime;
  const venusPosVector = venus.orbitCurve.getPoint(venusOrbitPoint);
  const planetVenus = venus.system.children.find(
    (item) => item.name === "planet"
  );
  planetVenus.position.x = venusPosVector.x;
  planetVenus.position.z = venusPosVector.y * -1;
  planetVenus.rotation.y = 0.1 * elapsedTime;

  //Earth system
  const earthTime = earth.speed * performance.now();
  const earthOrbitPoint = (earthTime % earth.loopTime) / earth.loopTime;
  const earthPosVector = earth.orbitCurve.getPoint(earthOrbitPoint);
  const planetEarth = earth.system.children.find(
    (item) => item.name === "planet"
  );
  planetEarth.position.x = earthPosVector.x;
  planetEarth.position.z = earthPosVector.y * -1;
  planetEarth.rotation.y = 0.1 * elapsedTime;

  //Mars system
  const marsTime = mars.speed * performance.now();
  const marsOrbitPoint = (marsTime % mars.loopTime) / mars.loopTime;
  const marsPosVector = mars.orbitCurve.getPoint(marsOrbitPoint);
  const planetMars = mars.system.children.find(
    (item) => item.name === "planet"
  );
  planetMars.position.x = marsPosVector.x;
  planetMars.position.z = marsPosVector.y * -1;
  planetMars.rotation.y = 0.1 * elapsedTime;

  //Jupiter system
  const jupiterTime = jupiter.speed * performance.now();
  const jupiterOrbitPoint = (jupiterTime % jupiter.loopTime) / jupiter.loopTime;
  const jupiterPosVector = jupiter.orbitCurve.getPoint(jupiterOrbitPoint);
  const planetJupiter = jupiter.system.children.find(
    (item) => item.name === "planet"
  );
  planetJupiter.position.x = jupiterPosVector.x;
  planetJupiter.position.z = jupiterPosVector.y * -1;
  planetJupiter.rotation.y = 0.1 * elapsedTime;

  //Saturn system
  const saturnTime = saturn.speed * performance.now();
  const saturnOrbitPoint = (saturnTime % saturn.loopTime) / saturn.loopTime;
  const saturnPosVector = saturn.orbitCurve.getPoint(saturnOrbitPoint);
  const planetSaturn = saturn.system.children.find(
    (item) => item.name === "planet"
  );
  planetSaturn.position.x = saturnPosVector.x;
  planetSaturn.position.z = saturnPosVector.y * -1;
  planetSaturn.rotation.y = 0.1 * elapsedTime;

  //Uranus system
  const uranusTime = uranus.speed * performance.now();
  const uranusOrbitPoint = (uranusTime % uranus.loopTime) / uranus.loopTime;
  const uranusPosVector = uranus.orbitCurve.getPoint(uranusOrbitPoint);
  const planetUranus = uranus.system.children.find(
    (item) => item.name === "planet"
  );
  planetUranus.position.x = uranusPosVector.x;
  planetUranus.position.z = uranusPosVector.y * -1;
  planetUranus.rotation.y = 0.1 * elapsedTime;

  //Neptune system
  const naptuneTime = neptune.speed * performance.now();
  const naptuneOrbitPoint = (naptuneTime % neptune.loopTime) / neptune.loopTime;
  const neptunePosVector = neptune.orbitCurve.getPoint(naptuneOrbitPoint);
  const planetNeptune = neptune.system.children.find(
    (item) => item.name === "planet"
  );
  planetNeptune.position.x = neptunePosVector.x;
  planetNeptune.position.z = neptunePosVector.y * -1;
  planetNeptune.rotation.y = 0.1 * elapsedTime;

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
