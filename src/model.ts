import type { ProcessModel } from "./types.ts";
import { clamp } from "./util.ts";

const kp = 10;
const ki = 0;
const kd = 0;

const integralLimit = 25

export class FirstOrderProcess implements ProcessModel {
    private errorIntegral: number = 0;
    private previousError: number = 0;

    private previousTime: number = 0;
    private previousOutput: number = 0;

    private laggedControl: number = 0;


    getNewState(newTime: number, newSetPoint: number) {
        const dt = newTime - this.previousTime;
        const pidOutput = this.calculatePIDControl(newSetPoint, newTime).control;
    
        // First-order lag
        const lagTimeConstant = 0; // Adjust this to control the lag severity
        this.laggedControl = pidOutput;
        if (lagTimeConstant > 0) {
            this.laggedControl += (pidOutput - this.laggedControl) * (dt / lagTimeConstant);
        }
    
        const output = this.previousOutput + (this.laggedControl * dt);
    
        this.previousOutput = output;
        this.previousTime = newTime;
    
        return {
            time: newTime,
            output: output,
        };
    }
    

    calculatePIDControl(
        setPoint: number,
        time: number
    ): { control: number } {
        const dt = time - this.previousTime;

        const error = setPoint - this.previousOutput;

        const integral = clamp(this.errorIntegral + error * dt, -integralLimit, integralLimit);
        this.errorIntegral = integral;

        let derivative = 0;
        if (dt > 0) {
            derivative = (error - this.previousError) / dt;
        }

        this.previousError = error;

        const control = kp * error + ki * integral + kd * derivative;

        return { control };
    }
}