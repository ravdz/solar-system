import Experience from "./Experience.js";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export default class Camera {
  constructor() {
    this.experience = new Experience();
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.canvas = this.experience.canvas;
    this.debug = this.experience.debug;

    // Debug
    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder("camera");
    }

    this.setInstance();
    this.setOrbitControls();
  }

  setInstance() {
    this.instance = new THREE.PerspectiveCamera(
      35,
      this.sizes.width / this.sizes.height,
      0.01,
      100,
    );
    this.instance.position.set(3, 2, 5);
    this.scene.add(this.instance);

    // Debug
    if (this.debug.active) {
      this.debugFolder
        .add(this.instance.position, "x")
        .name("position x")
        .min(0.5)
        .max(100)
        .step(0.01);
      this.debugFolder
        .add(this.instance.position, "y")
        .name("position y")
        .min(0.5)
        .max(100)
        .step(0.01);
      this.debugFolder
        .add(this.instance.position, "z")
        .name("position z")
        .min(0.1)
        .max(52)
        .step(0.01);
    }
  }

  setOrbitControls() {
    this.controls = new OrbitControls(this.instance, this.canvas);
    this.controls.enableDamping = true;
    this.controls.minDistance = 2;
    this.controls.maxDistance = 60;
  }

  resize() {
    this.instance.aspect = this.sizes.width / this.sizes.height;
    this.instance.updateProjectionMatrix();
  }

  update() {
    this.controls.update();
  }
}
