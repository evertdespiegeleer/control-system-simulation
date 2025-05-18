import type { ProcessModel } from "./types.ts";
import { clamp } from "./util.ts";

const dt = 0.001;
const simulationTime = 10;

const makeSetPoint = (time: number) => {
    return clamp(Math.sign(Math.sin(time * Math.PI / 4)), 0, 1) * 30;
}

export const runSimulation = (model: ProcessModel) => {
    console.log(`Time(s),Set Point,Output`);
    for (let t = 0; t < simulationTime; t += dt) {
        const setPoint = makeSetPoint(t);
        const { time, output } = model.getNewState(t, setPoint);
        console.log(`${time},${setPoint},${output}`);
    }
}
