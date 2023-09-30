import * as THREE from "three";
import gui from "../debug";

/**
 * Texture
 */
const textureLoader = new THREE.TextureLoader();
const venusColorTexture = textureLoader.load("textures/venus/venus-color.jpeg");

/**
 * Params
 */
const loopTime = 1;
const speed = 0.000004;
const orbitCurveParams = {
  xRadius: 13.66,
  yRadius: 13.66,
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
const venusMaterial = new THREE.MeshStandardMaterial();
venusMaterial.map = venusColorTexture;
const planetVenus = new THREE.Mesh(
  new THREE.SphereGeometry(1, 64, 64),
  venusMaterial
);
planetVenus.name = "planet";

const venusSystem = new THREE.Group();
venusSystem.add(planetVenus);
venusSystem.add(orbit);

/**
 * Debug
 */
const venusFolder = gui.addFolder("Venus");
venusFolder
  .add(planetVenus.rotation, "x")
  .name("rotate x")
  .min(0)
  .max(3.6)
  .step(0.1);
venusFolder
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
  system: venusSystem,
  orbitCurve,
  loopTime,
  speed,
};
