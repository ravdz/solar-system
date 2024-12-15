import * as THREE from "three";
import data from "../data.js";

export default class Orbit {
  constructor(peryhelium, aphelium) {
    this.peryhelium = peryhelium;
    this.aphelium = aphelium;

    this.setGeometry();
    this.setMaterial();
    this.setInstance();
  }

  setGeometry() {
    const { sun } = data;
    this.xRadius = (this.peryhelium + this.aphelium + sun.radius * 2) / 2;
    this.eccentricity =
      (this.aphelium - this.peryhelium) / (this.aphelium + this.peryhelium);
    this.yRadius = this.xRadius * Math.sqrt(1 - Math.pow(this.eccentricity, 2));
    this.aX = this.xRadius - this.peryhelium - sun.radius;

    this.curve = new THREE.EllipseCurve(this.aX, 0, this.xRadius, this.yRadius);
    const points = this.curve.getPoints(100);
    this.geometry = new THREE.BufferGeometry().setFromPoints(points);
  }

  setMaterial() {
    this.material = new THREE.LineBasicMaterial({ color: 0xffffff });
  }

  setInstance() {
    this.instance = new THREE.Line(this.geometry, this.material);
  }
}
