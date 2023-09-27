import * as THREE from "three";
import gui from "../debug";

// Texture
const textureLoader = new THREE.TextureLoader();
const sunColorTexture = textureLoader.load("textures/sun/sun-color.jpeg");

// Object
const sunMaterial = new THREE.MeshBasicMaterial();
sunMaterial.map = sunColorTexture;
const sun = new THREE.Mesh(new THREE.SphereGeometry(10, 64, 64), sunMaterial);

// Debug
const sunFolder = gui.addFolder("Sun");
sunFolder.add(sun.rotation, "x").name("rorate x").min(0).max(3.6).step(0.1);

export default sun;
