import * as THREE from "three";
import gui from "../debug";

// Texture
const textureLoader = new THREE.TextureLoader();
const marsColorTexture = textureLoader.load("textures/mars/mars-color.jpeg");

// Object
const marsMaterial = new THREE.MeshStandardMaterial();
marsMaterial.map = marsColorTexture;
const mars = new THREE.Mesh(
  new THREE.SphereGeometry(0.5, 64, 64),
  marsMaterial
);
mars.position.x = -19.16;

// Debug
const marsFolder = gui.addFolder("Mars");
marsFolder.add(mars.rotation, "x").name("rorate x").min(0).max(3.6).step(0.1);
marsFolder.add(mars.rotation, "y").name("rorate y").min(0).max(3.6).step(0.1);

export default mars;
