import { ControlLoop } from "./generic-model/control-loop.ts";
import { PlantOutputMeasurement } from "./generic-model/output-measurement.ts";
import { FirstOrderPlant } from "./generic-model/plant.ts";

// 8.09325N max thrust per motor
// Moment arm = 0.1608m
// Motor count = 4
// Roll moment of inertia ≈ 0.0036 kg*m^2 // https://www.researchgate.net/figure/DJI-F450-quadcopter-parameters-and-observer-design-values_tbl1_344008865

// ω = a * t
// a = T/I = r * F / I = 0.1608m * 8.09325N * 4 / 0.0036kg*m^2
const a = 0.1608 * 8.09325 * 4 / 0.0036;

export const rollRatePlant = new FirstOrderPlant({
    lagTimeConstant: 0.001,
    noiseFactor: 0.001,
    gain: a,
})

export const rollRateMeasurement = new PlantOutputMeasurement({
    // 0.15s delay between actual roll rate and measurement
    delay: 0.05,
    // 2 deg/s error
    noiseFactor: 4,
})

export const controlLoop = new ControlLoop({
    integralLimit: 25,
    kp: 0.01 * 0.25,
    ki: 0.01 * 0,
    kd: 0.01 * 0.0002,
})
