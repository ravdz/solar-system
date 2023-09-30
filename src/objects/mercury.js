import * as THREE from "three";
import gui from "../debug";

/**
 * Texture
 */
const textureLoader = new THREE.TextureLoader();
const mercuryColorTexture = textureLoader.load(
  "textures/mercury/mercury-color.jpg"
);

/**
 * Params
 */
const loopTime = 1;
const speed = 0.000017;
const orbitCurveParams = {
  xRadius: 11.33,
  yRadius: 11.33,
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
const mercuryMaterial = new THREE.MeshStandardMaterial();
mercuryMaterial.map = mercuryColorTexture;
const planetMercury = new THREE.Mesh(
  new THREE.SphereGeometry(0.33, 64, 64),
  mercuryMaterial
);
planetMercury.name = "planet";

const mercurySystem = new THREE.Group();
mercurySystem.add(planetMercury);
mercurySystem.add(orbit);

/**
 * Debug
 */
const mercuryFolder = gui.addFolder("Mercury");
mercuryFolder
  .add(planetMercury.rotation, "x")
  .name("rotate x")
  .min(0)
  .max(3.6)
  .step(0.1);
mercuryFolder
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
  system: mercurySystem,
  orbitCurve,
  loopTime,
  speed,
};
