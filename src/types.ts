export interface ProcessModel {
    getNewState(newTime: number, newSetPoint: number): { time: number; output: number };
}