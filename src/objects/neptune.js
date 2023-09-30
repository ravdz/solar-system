import * as THREE from "three";
import gui from "../debug";

/**
 * Texture
 */
const textureLoader = new THREE.TextureLoader();
const neptuneColorTexture = textureLoader.load(
  "textures/neptune/neptune-color.jpeg"
);

/**
 * Params
 */
const loopTime = 1;
const speed = 0.0000001;
const orbitCurveParams = {
  xRadius: 48.66,
  yRadius: 48.66,
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

//Planet
const neptuneMaterial = new THREE.MeshStandardMaterial();
neptuneMaterial.map = neptuneColorTexture;
const planetNeptune = new THREE.Mesh(
  new THREE.SphereGeometry(2, 64, 64),
  neptuneMaterial
);
planetNeptune.name = "planet";

const neptuneSystem = new THREE.Group();
neptuneSystem.add(planetNeptune);
neptuneSystem.add(orbit);

/**
 * Debug
 */
const neptuneFolder = gui.addFolder("Neptune");
neptuneFolder
  .add(planetNeptune.rotation, "x")
  .name("rotate x")
  .min(0)
  .max(3.6)
  .step(0.1);
neptuneFolder
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
  system: neptuneSystem,
  orbitCurve,
  loopTime,
  speed,
};
