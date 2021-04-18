import {EventEmitter} from 'events';
import {Readable} from 'stream';
import {PythonShell} from 'python-shell';

// Because the ultrasonic sensor uses the GPIO
// We will make this a singleton
export class UltrasonicSensor extends EventEmitter{

    private static instance: UltrasonicSensor = new UltrasonicSensor(50);
    private sensorProcess: PythonShell | null;
    private tolerance: number;

    /**
     * 
     * @param tolerance Defines an upper limit in cm that the sensor defines as close
     */
    private constructor(tolerance:number){
        super();
        this.tolerance = tolerance
    }

    public static getInstance(): UltrasonicSensor{
        return UltrasonicSensor.instance;
    }

    private isClose(distance:number){
        return distance <= this.tolerance;
    }

    public startSensing():Promise<void>{
        return new Promise<void>(async (resolve, reject) => {

            let options = {
                pythonPath: '/usr/bin/python',
                pythonOptions: ['-u'], // get print results in real-time
                scriptPath: '/home/pi/SeniorProject/cleanhands-client-app/src/cleanhands-utils/'
            };

            this.sensorProcess = new PythonShell('sensor.py', options);

            // If we get one message, everything is fine so we resolve.
            this.sensorProcess.once('message', () => resolve());

            // If there is an error, we reject
            this.sensorProcess.once('error', () => reject());
            
            // The only print of the script are distances in cm
            this.sensorProcess.on('message', (message) => {

                let distance:number = parseFloat(message);
                
                if(this.isClose(distance)){
                    this.emit('closeness', distance);
                }
            });
            
            this.sensorProcess.on('close', () => console.log("Script finished."));
        });
    }

    public async stopSensing(){
        
        this.sensorProcess.end((err, code, signal) => {
            if (err) throw err;
            console.log('The exit code was: ' + code);
            console.log('The exit signal was: ' + signal);
            console.log('finished');
        });

        this.sensorProcess = null;
    }
}