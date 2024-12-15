import Planet from "../Planet.js";
import data from "../../data.js";
import World from "../World.js";

export default class Sun extends Planet {
  constructor() {
    super();
    this.world = new World();
    this.scaledRadius = data.sun.radius * data.sun.radiusScale;

    this.setInstance();

    // Debug
    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder("sun");
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

  setInstance() {
    this.planetGeometry.scale(
      this.scaledRadius,
      this.scaledRadius,
      this.scaledRadius,
    );
    this.planetMaterial.map = this.resources.items.sunColorTexture;
    this.scene.add(this.planetMesh);
  }
}
