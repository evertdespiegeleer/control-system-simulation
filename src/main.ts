import { runSimulation } from "./runner.ts";
import { controlLoop, rollRateMeasurement, rollRatePlant } from "./uav.ts";

runSimulation(rollRatePlant, rollRateMeasurement, controlLoop);