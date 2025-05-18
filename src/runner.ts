import type { ControlLoop } from "./generic-model/control-loop.ts";
import type { PlantOutputMeasurement } from "./generic-model/output-measurement.ts";
import type { FirstOrderPlant } from "./generic-model/plant.ts";
import { clamp } from "./util.ts";

const dt = 0.001;
const simulationTime = 10;

const makeSetPoint = (time: number) => {
    return clamp(Math.sign(Math.sin(time * Math.PI / 4)), 0, 1) * 30;
}

export const runSimulation = (plant: InstanceType<typeof FirstOrderPlant>, measurement: InstanceType<typeof PlantOutputMeasurement>, controller: InstanceType<typeof ControlLoop>) => {
    console.log(`Time(s),Set Point,Error,Control,Output`);
    let previousPlantInput = 0;
    for (let t = 0; t < simulationTime; t += dt) {
        const setPoint = makeSetPoint(t);
        const plantOutput = plant.getNewState(t, previousPlantInput);
        measurement.setOutput(t, plantOutput.output);
        const measurementOutput = measurement.getMeasurement(t);
        const error = setPoint - measurementOutput.output;
        const control = controller.calculatePIDControl(error, t);
        previousPlantInput = control.control;
        console.log(`${t},${setPoint},${error},${control.control},${plantOutput.output}`);
    }
}
