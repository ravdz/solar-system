import Experience from "../Experience.js";

import SolarSystem from "./SorlarSystem/SorlarSystem.js";
import * as THREE from "three";

let instance = null;

export default class World {
  constructor() {
    if (instance) return instance;
    instance = this;

    this.experience = new Experience();
    this.resources = this.experience.resources;
    this.scene = this.experience.scene;

    this.resources.on("ready", () => {
      // Setup
      this.setEnvironmentMap();
      this.solarSystem = new SolarSystem();
    });
  }

  setEnvironmentMap() {
    const environmentMap = this.resources.items.environmentMapTexture;
    environmentMap.mapping = THREE.EquirectangularReflectionMapping;
    environmentMap.colorSpace = THREE.SRGBColorSpace;
    this.scene.environment = environmentMap;
    this.scene.background = environmentMap;
  }

  update() {
    this.solarSystem?.update();
  }
}
