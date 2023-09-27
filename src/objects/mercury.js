import * as THREE from "three";
import gui from "../debug";

// Texture
const textureLoader = new THREE.TextureLoader();
const mercuryColorTexture = textureLoader.load(
  "textures/mercury/mercury-color.jpg"
);

// Object
const mercuryMaterial = new THREE.MeshStandardMaterial();
mercuryMaterial.map = mercuryColorTexture;
const mercury = new THREE.Mesh(
  new THREE.SphereGeometry(0.33, 64, 64),
  mercuryMaterial
);
mercury.position.x = -11.33;

// Debug
const mercuryFolder = gui.addFolder("Mercury");
mercuryFolder
  .add(mercury.rotation, "x")
  .name("rorate x")
  .min(0)
  .max(3.6)
  .step(0.1);
mercuryFolder
  .add(mercury.rotation, "y")
  .name("rorate y")
  .min(0)
  .max(3.6)
  .step(0.1);

export default mercury;
