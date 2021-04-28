# Cleanhands - AI Powered handwashing time estimation system

This system is not isolated. It depends on [Handy AI](https://github.com/ChristoferBerruz/handy-as-a-service)
and the [CleanHands backend](https://github.com/ChristoferBerruz/Flask-Server) for it to run.

Trying to run this without the mentioned components or without the ultrasonic sensor
will break everything.

If are from UB, please refer to the our SeniorProject final report for hardware and software diagrams.

## Description
This is part of a senior project to be presented at the University of Bridgeport.
The system estimates handwashing times using Deep Learning
and delivers statitics through a web application.

## Tech Stack
 - **Hardware**: Raspberry Pi 4 model B + PiCamera V2 + breadboard + hc-sr04 ultrasonic sensor.
 - **Software**: Electron.js, React, TypeScript, Python 2

## For this to run
Please set the ```CH_DEVICE_ID``` environment variable (the Raspberry Pi Device ID in CleanHands DB)
for this to run. Otherwise handwashing records will not be saved in the database.

In the file ```src/cleanhands-utils/sensor-service.ts``` modify the ```scriptPath``` to be the absolute
path of the file ```src/cleanhands-utils/sensor.py```.

### Electron.js
We used [electron-forge](https://www.electronforge.io/) to bootstrap and manage the application.

Notable npm packages we are using:
 - [python-shell](https://www.npmjs.com/package/python-shell) to interact with the ultrasonic sensor.
 - [pi-camera-connect](https://www.npmjs.com/package/pi-camera-connect) to interact with the PiCamera V2.

## Starting this app

Simply run ```npm run start```.