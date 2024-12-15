import Sun from "./Sun.js";
import Mercury from "./Planets/Mercury.js";
import Venus from "./Planets/Venus.js";
import Earth from "./Planets/Earth.js";
import Mars from "./Planets/Mars.js";
import Jupiter from "./Planets/Jupiter.js";
import Saturn from "./Planets/Saturn.js";
import Uranus from "./Planets/Uranus.js";
import Neptune from "./Planets/Neptune.js";

let instance = null;

export default class SolarSystem {
  constructor() {
    if (instance) return instance;
    instance = this;

    this.sun = new Sun();
    this.mercury = new Mercury();
    this.venus = new Venus();
    this.earth = new Earth();
    this.mars = new Mars();
    this.jupiter = new Jupiter();
    this.saturn = new Saturn();
    this.uranus = new Uranus();
    this.neptune = new Neptune();
  }

  update() {
    this.mercury.update();
    this.venus.update();
    this.earth.update();
    this.mars.update();
    this.jupiter.update();
    this.saturn.update();
    this.uranus.update();
    this.neptune.update();
  }
}
