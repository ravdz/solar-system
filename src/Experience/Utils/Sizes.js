import EventEmitter from "./EventEmitter.js";

export default class Sizes extends EventEmitter {
  constructor() {
    super();
    this.width = this.getValue().width;
    this.height = this.getValue().height;
    this.pixelRatio = this.getValue().pixelRatio;

    window.addEventListener("resize", () => {
      this.width = this.getValue().width;
      this.height = this.getValue().height;
      this.pixelRatio = this.getValue().pixelRatio;
      this.trigger("resize");
    });
  }

  getValue() {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
      pixelRatio: Math.min(window.devicePixelRatio, 2),
    };
  }
}
