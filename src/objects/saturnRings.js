import * as THREE from "three";
import gui from "../debug";

// Texture
const textureLoader = new THREE.TextureLoader();
const saturnRingsTexture = textureLoader.load(
  "textures/saturn/saturn-rings.png"
);

// Object
const saturnRingsMaterial = new THREE.MeshStandardMaterial({
  side: THREE.DoubleSide,
  color: 0xffffff,
  map: saturnRingsTexture,
  transparent: true,
});

const saturnRingsGeometryParams = {
  innerRadius: 3,
  outerRadius: 5,
  thetaSegments: 64,
};

const setSaturnRingsGeometry = (innerRadius, outerRadius, thetaSegments) => {
  const geometry = new THREE.RingGeometry(
    innerRadius,
    outerRadius,
    thetaSegments
  );

  const saturnRingsGeometryPos = geometry.attributes.position;
  const saturnRingsGeometryV3 = new THREE.Vector3();

  for (let i = 0; i < saturnRingsGeometryPos.count; i++) {
    saturnRingsGeometryV3.fromBufferAttribute(saturnRingsGeometryPos, i);
    geometry.attributes.uv.setXY(
      i,
      saturnRingsGeometryV3.length() < 4 ? 0 : 1,
      1
    );
  }
  return geometry;
};

const saturnRingsGeometry = setSaturnRingsGeometry(
  saturnRingsGeometryParams.innerRadius,
  saturnRingsGeometryParams.outerRadius,
  saturnRingsGeometryParams.thetaSegments
);

const saturnRings = new THREE.Mesh(saturnRingsGeometry, saturnRingsMaterial);
saturnRings.rotation.x = Math.PI / 2;

// Debug
const saturnRingsFolder = gui.addFolder("Saturn rings");
saturnRingsFolder
  .add(saturnRingsGeometryParams, "innerRadius")
  .min(1)
  .max(30)
  .step(0.1)
  .onChange(() => {
    saturnRingsGeometry.dispose();
    saturnRings.geometry = setSaturnRingsGeometry(
      saturnRingsGeometryParams.innerRadius,
      saturnRingsGeometryParams.outerRadius,
      saturnRingsGeometryParams.thetaSegments
    );
  });
saturnRingsFolder
  .add(saturnRingsGeometryParams, "outerRadius")
  .min(1)
  .max(30)
  .step(0.1)
  .onChange(() => {
    saturnRingsGeometry.dispose();
    saturnRings.geometry = setSaturnRingsGeometry(
      saturnRingsGeometryParams.innerRadius,
      saturnRingsGeometryParams.outerRadius,
      saturnRingsGeometryParams.thetaSegments
    );
  });
saturnRingsFolder
  .add(saturnRingsGeometryParams, "thetaSegments")
  .min(1)
  .max(128)
  .step(1)
  .onChange(() => {
    saturnRingsGeometry.dispose();
    saturnRings.geometry = setSaturnRingsGeometry(
      saturnRingsGeometryParams.innerRadius,
      saturnRingsGeometryParams.outerRadius,
      saturnRingsGeometryParams.thetaSegments
    );
  });
saturnRingsFolder
  .add(saturnRings.rotation, "x")
  .name("rorate x")
  .min(0)
  .max(3.6)
  .step(0.1);
saturnRingsFolder
  .add(saturnRings.rotation, "y")
  .name("rorate y")
  .min(0)
  .max(3.6)
  .step(0.1);

export default saturnRings;
