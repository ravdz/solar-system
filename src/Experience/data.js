/*
 * Planet data
 *
 * radius - AU
 * peryhelium - AU
 * aphelion - AU
 * orbit - earth's days
 * rotation - earth's days
 */

export default {
  planetOrbitScale: 0.00001,
  planetRotationScale: 0.01,
  sun: {
    radius: 0.004654,
    radiusScale: 50,
  },
  planets: {
    mercury: {
      radius: 0.000016,
      radiusScale: 800,
      peryhelium: 0.307,
      aphelium: 0.467,
      orbit: 88,
      rotation: 59,
    },
    venus: {
      radius: 0.00004,
      radiusScale: 600,
      peryhelium: 0.718,
      aphelium: 0.728,
      orbit: 225,
      rotation: 243,
    },
    earth: {
      radius: 0.000042,
      radiusScale: 600,
      peryhelium: 0.983,
      aphelium: 1.017,
      orbit: 365,
      rotation: 1,
    },
    mars: {
      radius: 0.000022,
      radiusScale: 700,
      peryhelium: 1.381,
      aphelium: 1.666,
      orbit: 687,
      rotation: 1.03,
    },
    jupiter: {
      radius: 0.000477,
      radiusScale: 200,
      peryhelium: 4.95,
      aphelium: 5.455,
      orbit: 4333,
      rotation: 0.41,
    },
    saturn: {
      radius: 0.0004023,
      radiusScale: 200,
      peryhelium: 9.024,
      aphelium: 10.086,
      orbit: 10759,
      rotation: 0.45,
    },
    uranus: {
      radius: 0.000169,
      radiusScale: 500,
      peryhelium: 18.286,
      aphelium: 20.097,
      orbit: 30687,
      rotation: 0.72,
    },
    neptune: {
      radius: 0.000164,
      radiusScale: 500,
      peryhelium: 29.81,
      aphelium: 30.33,
      orbit: 60190,
      rotation: 0.67,
    },
  },
};
