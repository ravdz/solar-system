import * as THREE from "three";
import gui from "../debug";

// Texture
const textureLoader = new THREE.TextureLoader();
const jupiterColorTexture = textureLoader.load(
  "textures/jupiter/jupiter-color.jpeg"
);

// Object
const jupiterMaterial = new THREE.MeshStandardMaterial();
jupiterMaterial.map = jupiterColorTexture;
const jupiter = new THREE.Mesh(
  new THREE.SphereGeometry(4, 64, 64),
  jupiterMaterial
);
jupiter.position.x = -26.66;

// Debug
const jupiterFolder = gui.addFolder("Jupiter");
jupiterFolder
  .add(jupiter.rotation, "x")
  .name("rorate x")
  .min(0)
  .max(3.6)
  .step(0.1);
jupiterFolder
  .add(jupiter.rotation, "y")
  .name("rorate y")
  .min(0)
  .max(3.6)
  .step(0.1);

export default jupiter;
