import * as THREE from "three";
import saturnRings from "./saturnRings";
import gui from "../debug";

// Texture
const textureLoader = new THREE.TextureLoader();
const saturnColorTexture = textureLoader.load(
  "textures/saturn/saturn-color.jpeg"
);

// Object
const saturnPlanetMaterial = new THREE.MeshStandardMaterial();
saturnPlanetMaterial.map = saturnColorTexture;
const saturnPlanet = new THREE.Mesh(
  new THREE.SphereGeometry(3, 64, 64),
  saturnPlanetMaterial
);
saturnPlanet.receiveShadow = true;

const saturn = new THREE.Group();
saturn.add(saturnPlanet);
saturn.add(saturnRings);
saturn.position.x = -35.66;

// Debug
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

export default saturn;
