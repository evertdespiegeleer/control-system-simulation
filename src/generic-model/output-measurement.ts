interface Options {
    delay: number;
    noiseFactor: number;
}
export class PlantOutputMeasurement {
    constructor(private options: Options) {}

    private inputtedData: { time: number; output: number }[] = [];

    setOutput(newTime: number, newOutput: number) {
        this.inputtedData.push({ time: newTime, output: newOutput });
    }

    getMeasurement(newTime: number) {
        const delayedTime = newTime - this.options.delay;
        let output = this.inputtedData.find((d) => d.time >= delayedTime)?.output ?? 0

        return {
            time: newTime,
            output: output + (Math.random() - 0.5) * this.options.noiseFactor,
        };
    }
}