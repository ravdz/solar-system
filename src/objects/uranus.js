import * as THREE from "three";
import gui from "../debug";

// Texture
const textureLoader = new THREE.TextureLoader();
const uranusColorTexture = textureLoader.load(
  "textures/uranus/uranus-color.jpeg"
);

// Object
const uranusMaterial = new THREE.MeshStandardMaterial();
uranusMaterial.map = uranusColorTexture;
const uranus = new THREE.Mesh(
  new THREE.SphereGeometry(2, 64, 64),
  uranusMaterial
);
uranus.position.x = -42.66;

// Debug
const uranusFolder = gui.addFolder("Uranus");
uranusFolder
  .add(uranus.rotation, "x")
  .name("rorate x")
  .min(0)
  .max(3.6)
  .step(0.1);
uranusFolder
  .add(uranus.rotation, "y")
  .name("rorate y")
  .min(0)
  .max(3.6)
  .step(0.1);

export default uranus;
