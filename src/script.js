import * as THREE from "three";
import GUI from "lil-gui";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

THREE.ColorManagement.enabled = false;

/**
 * Debug
 */
const gui = new GUI();

// Textures
const textureLoader = new THREE.TextureLoader();

const sunColorTexture = textureLoader.load("textures/sun/sun-color.jpeg");
const mercuryColorTexture = textureLoader.load(
  "textures/mercury/mercury-color.jpg"
);
const venusColorTexture = textureLoader.load("textures/venus/venus-color.jpeg");
const earthColorTexture = textureLoader.load("textures/earth/earth-color.jpeg");
const marsColorTexture = textureLoader.load("textures/mars/mars-color.jpeg");
const jupiterColorTexture = textureLoader.load(
  "textures/jupiter/jupiter-color.jpeg"
);
const saturnColorTexture = textureLoader.load(
  "textures/saturn/saturn-color.jpeg"
);
const saturnRingsTexture = textureLoader.load(
  "textures/saturn/saturn-rings.png"
);
const uranusColorTexture = textureLoader.load(
  "textures/uranus/uranus-color.jpeg"
);
const neptuneColorTexture = textureLoader.load(
  "textures/neptune/neptune-color.jpeg"
);

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
const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.x = 0;
pointLight.position.y = 0;
pointLight.position.z = 0;
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

// Sun
const sunMaterial = new THREE.MeshBasicMaterial();
sunMaterial.map = sunColorTexture;
const sun = new THREE.Mesh(new THREE.SphereGeometry(10, 64, 64), sunMaterial);

// Planets
const mercuryMaterial = new THREE.MeshStandardMaterial();
mercuryMaterial.map = mercuryColorTexture;
const mercury = new THREE.Mesh(
  new THREE.SphereGeometry(0.33, 64, 64),
  mercuryMaterial
);
mercury.position.x = -11.33;

const venusMaterial = new THREE.MeshStandardMaterial();
venusMaterial.map = venusColorTexture;
const venus = new THREE.Mesh(
  new THREE.SphereGeometry(1, 64, 64),
  venusMaterial
);
venus.position.x = -13.66;

const earthMaterial = new THREE.MeshStandardMaterial();
earthMaterial.map = earthColorTexture;
const earth = new THREE.Mesh(
  new THREE.SphereGeometry(1, 64, 64),
  earthMaterial
);
earth.position.x = -16.66;

const marsMaterial = new THREE.MeshStandardMaterial();
marsMaterial.map = marsColorTexture;
const mars = new THREE.Mesh(
  new THREE.SphereGeometry(0.5, 64, 64),
  marsMaterial
);
mars.position.x = -19.16;

const jupiterMaterial = new THREE.MeshStandardMaterial();
jupiterMaterial.map = jupiterColorTexture;
const jupiter = new THREE.Mesh(
  new THREE.SphereGeometry(4, 64, 64),
  jupiterMaterial
);
jupiter.position.x = -26.66;

const saturnPlanetMaterial = new THREE.MeshStandardMaterial();
saturnPlanetMaterial.map = saturnColorTexture;
const saturnPlanet = new THREE.Mesh(
  new THREE.SphereGeometry(3, 64, 64),
  saturnPlanetMaterial
);

const saturnRingsMaterial = new THREE.MeshStandardMaterial({
  side: THREE.DoubleSide,
  color: 0xffffff,
  map: saturnRingsTexture,
  transparent: true,
});

const saturnRingsGeometryParams = {
  innerRadius: 3,
  outerRadius: 5,
  thetaSegments: 64,
};
const saturnRingsGeometry = new THREE.RingGeometry(
  saturnRingsGeometryParams.innerRadius,
  saturnRingsGeometryParams.outerRadius,
  saturnRingsGeometryParams.thetaSegments
);
const saturnRingsGeometryPos = saturnRingsGeometry.attributes.position;
const saturnRingsGeometryV3 = new THREE.Vector3();

for (let i = 0; i < saturnRingsGeometryPos.count; i++) {
  saturnRingsGeometryV3.fromBufferAttribute(saturnRingsGeometryPos, i);
  saturnRingsGeometry.attributes.uv.setXY(
    i,
    saturnRingsGeometryV3.length() < 4 ? 0 : 1,
    1
  );
}

const saturnRings = new THREE.Mesh(saturnRingsGeometry, saturnRingsMaterial);
saturnRings.rotation.x = 1.9;

const saturn = new THREE.Group();
saturn.add(saturnPlanet);
saturn.add(saturnRings);
saturn.position.x = -35.66;

const uranusMaterial = new THREE.MeshStandardMaterial();
uranusMaterial.map = uranusColorTexture;
const uranus = new THREE.Mesh(
  new THREE.SphereGeometry(2, 64, 64),
  uranusMaterial
);
uranus.position.x = -42.66;

const neptuneMaterial = new THREE.MeshStandardMaterial();
neptuneMaterial.map = neptuneColorTexture;
const neptune = new THREE.Mesh(
  new THREE.SphereGeometry(2, 64, 64),
  neptuneMaterial
);
neptune.position.x = -48.66;

scene.add(sun, mercury, venus, earth, mars, jupiter, saturn, uranus, neptune);

/**
 * Debug
 */

// Sun
const sunFolder = gui.addFolder("Sun");
sunFolder.add(sun.rotation, "x").name("rorate x").min(0).max(3.6).step(0.1);

// Mercury
const mercuryFolder = gui.addFolder("Mercury");
mercuryFolder
  .add(mercury.rotation, "x")
  .name("rorate x")
  .min(0)
  .max(3.6)
  .step(0.1);
mercuryFolder
  .add(mercury.rotation, "y")
  .name("rorate y")
  .min(0)
  .max(3.6)
  .step(0.1);

// Venus
const venusFolder = gui.addFolder("Venus");
venusFolder.add(venus.rotation, "x").name("rorate x").min(0).max(3.6).step(0.1);
venusFolder.add(venus.rotation, "y").name("rorate y").min(0).max(3.6).step(0.1);

// Earth
const earthFolder = gui.addFolder("Earth");
earthFolder.add(earth.rotation, "x").name("rorate x").min(0).max(3.6).step(0.1);
earthFolder.add(earth.rotation, "y").name("rorate y").min(0).max(3.6).step(0.1);

// Mars
const marsFolder = gui.addFolder("Mars");
marsFolder.add(mars.rotation, "x").name("rorate x").min(0).max(3.6).step(0.1);
marsFolder.add(mars.rotation, "y").name("rorate y").min(0).max(3.6).step(0.1);

// Jupiter
const jupiterFolder = gui.addFolder("Jupiter");
jupiterFolder
  .add(jupiter.rotation, "x")
  .name("rorate x")
  .min(0)
  .max(3.6)
  .step(0.1);
jupiterFolder
  .add(jupiter.rotation, "y")
  .name("rorate y")
  .min(0)
  .max(3.6)
  .step(0.1);

// Sarturn
const saturnFolder = gui.addFolder("Saturn");
saturnFolder
  .add(saturnPlanet.rotation, "x")
  .name("rorate x")
  .min(0)
  .max(3.6)
  .step(0.1);
saturnFolder
  .add(saturnPlanet.rotation, "y")
  .name("rorate y")
  .min(0)
  .max(3.6)
  .step(0.1);

// Saturn rings
const saturnRingsFolder = saturnFolder.addFolder("Rings");
saturnRingsFolder
  .add(saturnRingsGeometryParams, "innerRadius")
  .min(1)
  .max(30)
  .step(0.1)
  .onChange(() => {
    saturnRingsGeometry.dispose();
    saturnRings.geometry = new THREE.RingGeometry(
      saturnRingsGeometryParams.innerRadius,
      saturnRingsGeometryParams.outerRadius,
      saturnRingsGeometryParams.thetaSegments
    );
  });
saturnRingsFolder
  .add(saturnRingsGeometryParams, "outerRadius")
  .min(1)
  .max(30)
  .step(0.1)
  .onChange(() => {
    saturnRingsGeometry.dispose();
    saturnRings.geometry = new THREE.RingGeometry(
      saturnRingsGeometryParams.innerRadius,
      saturnRingsGeometryParams.outerRadius,
      saturnRingsGeometryParams.thetaSegments
    );
  });
saturnRingsFolder
  .add(saturnRingsGeometryParams, "thetaSegments")
  .min(1)
  .max(128)
  .step(1)
  .onChange(() => {
    saturnRingsGeometry.dispose();
    saturnRings.geometry = new THREE.RingGeometry(
      saturnRingsGeometryParams.innerRadius,
      saturnRingsGeometryParams.outerRadius,
      saturnRingsGeometryParams.thetaSegments
    );
  });
saturnRingsFolder
  .add(saturnRings.rotation, "x")
  .name("rorate x")
  .min(0)
  .max(3.6)
  .step(0.1);

// Uranus
const uranusFolder = gui.addFolder("Uranus");
uranusFolder
  .add(uranus.rotation, "x")
  .name("rorate x")
  .min(0)
  .max(3.6)
  .step(0.1);
uranusFolder
  .add(uranus.rotation, "y")
  .name("rorate y")
  .min(0)
  .max(3.6)
  .step(0.1);

// Neptune
const neptuneFolder = gui.addFolder("Neptune");
neptuneFolder
  .add(neptune.rotation, "x")
  .name("rorate x")
  .min(0)
  .max(3.6)
  .step(0.1);
neptuneFolder
  .add(neptune.rotation, "y")
  .name("rorate y")
  .min(0)
  .max(3.6)
  .step(0.1);

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update objects
  sun.rotation.y = -0.1 * elapsedTime;

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
