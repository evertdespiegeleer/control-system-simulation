export class FirstOrderPlant {
    private previousTime: number = 0;
    private previousOutput: number = 0;

    constructor(private options: { lagTimeConstant: number, noiseFactor: number, gain: number }) {}

    getNewState(newTime: number, input: number) {
        const dt = newTime - this.previousTime;
        
        let output = this.previousOutput + (input * dt) * this.options.gain;
        if (this.options.lagTimeConstant > 0) {
            output = this.previousOutput + (output - this.previousOutput) * (1 - Math.exp(-dt / this.options.lagTimeConstant));
        }

        if (this.options.noiseFactor > 0) {
            const noise = (Math.random() - 0.5) * this.options.noiseFactor;
            output += noise;
        }

        this.previousOutput = output;
        this.previousTime = newTime;

        return {
            time: newTime,
            output: output,
        };
    }
}