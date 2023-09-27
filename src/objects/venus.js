import * as THREE from "three";
import gui from "../debug";

// Texture
const textureLoader = new THREE.TextureLoader();
const venusColorTexture = textureLoader.load("textures/venus/venus-color.jpeg");

// Object
const venusMaterial = new THREE.MeshStandardMaterial();
venusMaterial.map = venusColorTexture;
const venus = new THREE.Mesh(
  new THREE.SphereGeometry(1, 64, 64),
  venusMaterial
);
venus.position.x = -13.66;

// Debug
const venusFolder = gui.addFolder("Venus");
venusFolder.add(venus.rotation, "x").name("rorate x").min(0).max(3.6).step(0.1);
venusFolder.add(venus.rotation, "y").name("rorate y").min(0).max(3.6).step(0.1);

export default venus;
