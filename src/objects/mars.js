import * as THREE from "three";
import gui from "../debug";

/**
 * Texture
 */
const textureLoader = new THREE.TextureLoader();
const marsColorTexture = textureLoader.load("textures/mars/mars-color.jpeg");

/**
 * Params
 */
const loopTime = 1;
const speed = 0.000005;
const orbitCurveParams = {
  xRadius: 19.16,
  yRadius: 19.16,
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
const marsMaterial = new THREE.MeshStandardMaterial();
marsMaterial.map = marsColorTexture;
const planetMars = new THREE.Mesh(
  new THREE.SphereGeometry(0.5, 64, 64),
  marsMaterial
);
planetMars.name = "planet";

const marsSystem = new THREE.Group();
marsSystem.add(planetMars);
marsSystem.add(orbit);

/**
 * Debug
 */
const marsFolder = gui.addFolder("Mars");
marsFolder
  .add(planetMars.rotation, "x")
  .name("rotate x")
  .min(0)
  .max(3.6)
  .step(0.1);
marsFolder
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
  system: marsSystem,
  orbitCurve,
  loopTime,
  speed,
};
