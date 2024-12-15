import Planet from "../../Planet.js";
import SolarSystem from "../SorlarSystem.js";
import Orbit from "../../Orbit.js";
import World from "../../World.js";
import Experience from "../../../Experience.js";
import data from "../../../data.js";

export default class Earth extends Planet {
  constructor() {
    super();
    this.experience = new Experience();
    this.time = this.experience.time;
    this.solarSystem = new SolarSystem();
    this.world = new World();

    this.scaledRadius =
      data.planets.earth.radius * data.planets.earth.radiusScale;
    this.scaledOrbit = data.planets.earth.orbit * data.planetOrbitScale;
    this.scaledRotation =
      data.planets.earth.rotation * data.planetRotationScale;

    this.createOrbit();
    this.setInstance();

    // Debug
    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder("earth");
      this.debugFolder
        .add(this.planetMesh.rotation, "x")
        .name("rotate x")
        .min(0)
        .max(Math.PI * 2)
        .step(0.01);
      this.debugFolder
        .add(this.planetMesh.rotation, "y")
        .name("rotate y")
        .min(0)
        .max(Math.PI * 2)
        .step(0.01);
    }
  }

  createOrbit() {
    this.orbit = new Orbit(
      data.planets.earth.peryhelium,
      data.planets.earth.aphelium,
    );
    this.orbit.geometry.rotateX(Math.PI / 2);
    this.scene.add(this.orbit.instance);
  }

  setInstance() {
    this.planetGeometry.scale(
      this.scaledRadius,
      this.scaledRadius,
      this.scaledRadius,
    );
    this.planetMaterial.map = this.resources.items.earthColorTexture;
    this.scene.add(this.planetMesh);
  }

  update() {
    this.updatePosition(
      this.scaledOrbit,
      this.orbit.curve,
      this.scaledRotation,
    );
  }
}
