# Cleanhands - AI Power handwashing recognition system

## Description
This is part of a senior project to be presented at the University of Bridgeport.
We are seeking to create an IoT capable to recognize handwashing
and deliver statitics through a web application.

## Tech Stack
 - **Hardware**: Raspberry Pi 4 model B + PiCamera V2 + breadboard + hc-sr04 ultrasonic sensor.
 - **Software**: Electron.js

### Electron.js
We used [electron-forge](https://www.electronforge.io/) to bootstrap and manage the application.

Notable npm packages we are using:
 - [python-shell](https://www.npmjs.com/package/python-shell) to interact with the ultrasonic sensor.
 - [pi-camera-connect](https://www.npmjs.com/package/pi-camera-connect) to interact with the PiCamera V2.