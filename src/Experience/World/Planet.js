import Experience from "../Experience.js";
import * as THREE from "three";

export default class Planet {
  constructor() {
    this.experience = new Experience();
    this.time = this.experience.time;
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.debug = this.experience.debug;

    this.setGeometry();
    this.setMaterial();
    this.setMesh();
  }

  setGeometry() {
    this.planetGeometry = new THREE.SphereGeometry(1, 64, 64);
  }

  setMaterial() {
    this.planetMaterial = new THREE.MeshBasicMaterial();
  }

  setMesh() {
    this.planetMesh = new THREE.Mesh(this.planetGeometry, this.planetMaterial);
  }

  updatePosition(orbit, curve, rotation) {
    const orbitTimeInSec = orbit * 24 * 60 * 60;
    const orbitPoint = (this.time.elapsed % orbitTimeInSec) / orbitTimeInSec;
    const { x, y } = curve.getPoint(orbitPoint);
    this.planetMesh.position.set(x, 0, y);

    const rotationInSec = rotation * 24 * 60 * 60;
    const rotationSpeed = (Math.PI * 2) / rotationInSec;

    this.planetMesh.rotateY(rotationSpeed * this.time.delta);
  }
}
