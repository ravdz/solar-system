import * as THREE from "three";
import gui from "../debug";

/**
 * Texture
 */
const textureLoader = new THREE.TextureLoader();
const uranusColorTexture = textureLoader.load(
  "textures/uranus/uranus-color.jpeg"
);

/**
 * Params
 */
const loopTime = 1;
const speed = 0.0000002;
const orbitCurveParams = {
  xRadius: 42.66,
  yRadius: 42.66,
};

/**
 * Objects
 */

// Orbit
const orbitCurve = new THREE.EllipseCurve(
  0,
  0,
  orbitCurveParams.xRadius,
  orbitCurveParams.yRadius,
  0,
  2 * Math.PI
);
const orbitPoints = orbitCurve.getSpacedPoints(200);
const orbitGeometry = new THREE.BufferGeometry().setFromPoints(orbitPoints);

const orbitMaterial = new THREE.LineBasicMaterial({
  transparent: false,
  opacity: 0,
});

const orbit = new THREE.Line(orbitGeometry, orbitMaterial);
orbit.rotateX(-Math.PI / 2);
orbit.name = "orbit";

// Planet
const uranusMaterial = new THREE.MeshStandardMaterial();
uranusMaterial.map = uranusColorTexture;
const planetUranus = new THREE.Mesh(
  new THREE.SphereGeometry(2, 64, 64),
  uranusMaterial
);
planetUranus.name = "planet";

const uranusSystem = new THREE.Group();
uranusSystem.add(planetUranus);
uranusSystem.add(orbit);

/**
 * Debug
 */
const uranusFolder = gui.addFolder("Uranus");
uranusFolder
  .add(planetUranus.rotation, "x")
  .name("rotate x")
  .min(0)
  .max(3.6)
  .step(0.1);
uranusFolder
  .add(orbitMaterial, "transparent")
  .name("hide orbit")
  .onChange((value) => {
    const newMaterial = new THREE.LineBasicMaterial({
      transparent: value,
      opacity: 0,
    });
    orbit.material = newMaterial;
  });

export default {
  system: uranusSystem,
  orbitCurve,
  loopTime,
  speed,
};
