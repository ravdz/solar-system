import * as THREE from "three";
import gui from "../debug";

/**
 * Texture
 */
const textureLoader = new THREE.TextureLoader();
const earthColorTexture = textureLoader.load("textures/earth/earth-color.jpeg");

/**
 * Params
 */
const loopTime = 1;
const speed = 0.00001;
const orbitCurveParams = {
  xRadius: 16.66,
  yRadius: 16.66,
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
const earthMaterial = new THREE.MeshStandardMaterial();
earthMaterial.map = earthColorTexture;
const planetEarth = new THREE.Mesh(
  new THREE.SphereGeometry(1, 64, 64),
  earthMaterial
);
planetEarth.name = "planet";

const earthSystem = new THREE.Group();
earthSystem.add(planetEarth);
earthSystem.add(orbit);

/**
 * Debug
 */
const earthFolder = gui.addFolder("Earth");
earthFolder
  .add(planetEarth.rotation, "x")
  .name("rotate x")
  .min(0)
  .max(3.6)
  .step(0.1);
earthFolder
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
  system: earthSystem,
  orbitCurve,
  loopTime,
  speed,
};
