import * as THREE from "three";
import saturnRings from "./saturnRings";
import gui from "../debug";

/**
 * Texture
 */
const textureLoader = new THREE.TextureLoader();
const saturnColorTexture = textureLoader.load(
  "textures/saturn/saturn-color.jpeg"
);

/**
 * Params
 */
const loopTime = 1;
const speed = 0.0000006;
const orbitCurveParams = {
  xRadius: 35.66,
  yRadius: 35.66,
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
  color: 0xffffff,
});

const orbit = new THREE.Line(orbitGeometry, orbitMaterial);
orbit.rotateX(-Math.PI / 2);
orbit.name = "orbit";

// Planet
const saturnPlanetMaterial = new THREE.MeshStandardMaterial();
saturnPlanetMaterial.map = saturnColorTexture;
const planetSaturn = new THREE.Mesh(
  new THREE.SphereGeometry(3, 64, 64),
  saturnPlanetMaterial
);
planetSaturn.receiveShadow = true;

const saturnWithRings = new THREE.Group();
saturnWithRings.name = "planet";
saturnWithRings.add(planetSaturn);
saturnWithRings.add(saturnRings);

const saturnSystem = new THREE.Group();
saturnSystem.add(orbit);
saturnSystem.add(saturnWithRings);

/**
 * Debug
 */
const saturnFolder = gui.addFolder("Saturn");
saturnFolder
  .add(planetSaturn.rotation, "x")
  .name("rorate x")
  .min(0)
  .max(3.6)
  .step(0.1);
saturnFolder
  .add(planetSaturn.rotation, "y")
  .name("rorate y")
  .min(0)
  .max(3.6)
  .step(0.1);

export default {
  system: saturnSystem,
  orbitCurve,
  loopTime,
  speed,
};
