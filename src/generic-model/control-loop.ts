import { clamp } from "../util.ts";

interface Options {
    kp: number;
    ki: number;
    kd: number;
    integralLimit: number;
}

export class ControlLoop {
    private errorIntegral: number = 0;
    private previousError: number = 0;

    private previousTime: number = 0;

    constructor(private options: Options) {}

    calculatePIDControl(
        error: number,
        time: number
    ): { control: number } {
        const dt = time - this.previousTime;

        const { kp, ki, kd, integralLimit } = this.options;

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