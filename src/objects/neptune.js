import * as THREE from "three";
import gui from "../debug";

// Texture
const textureLoader = new THREE.TextureLoader();
const neptuneColorTexture = textureLoader.load(
  "textures/neptune/neptune-color.jpeg"
);

// Object
const neptuneMaterial = new THREE.MeshStandardMaterial();
neptuneMaterial.map = neptuneColorTexture;
const neptune = new THREE.Mesh(
  new THREE.SphereGeometry(2, 64, 64),
  neptuneMaterial
);
neptune.position.x = -48.66;

// Debug
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

export default neptune;
