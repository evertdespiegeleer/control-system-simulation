# PID Simulator

A basic first order PID controlled system simulation.
I'm trying to model the angular rate control of UAV I'm building to be able to build and tune control systems for it (without destroying the hardware I built in the process).

## Installation
```sh
npm ci
```

## Usage
Run the simulation with the following command. This will output a CSV file with the time, setpoint and output.
```sh
npm run --silent dev > simulation.csv
```