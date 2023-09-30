import * as THREE from "three";
import gui from "../debug";

/**
 * Texture
 */
const textureLoader = new THREE.TextureLoader();
const jupiterColorTexture = textureLoader.load(
  "textures/jupiter/jupiter-color.jpeg"
);

/**
 * Params
 */
const loopTime = 1;
const speed = 0.000001;
const orbitCurveParams = {
  xRadius: 26.66,
  yRadius: 26.66,
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
const jupiterMaterial = new THREE.MeshStandardMaterial();
jupiterMaterial.map = jupiterColorTexture;
const planetJupiter = new THREE.Mesh(
  new THREE.SphereGeometry(4, 64, 64),
  jupiterMaterial
);
planetJupiter.name = "planet";

const jupiterSystem = new THREE.Group();
jupiterSystem.add(planetJupiter);
jupiterSystem.add(orbit);

/**
 * Debug
 */
const jupiterFolder = gui.addFolder("Jupiter");
jupiterFolder
  .add(planetJupiter.rotation, "x")
  .name("rotate x")
  .min(0)
  .max(3.6)
  .step(0.1);
jupiterFolder
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
  system: jupiterSystem,
  orbitCurve,
  loopTime,
  speed,
};
