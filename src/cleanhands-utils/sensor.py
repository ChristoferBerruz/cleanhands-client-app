#!/usr/bin/python

import RPi.GPIO as GPIO
import time
import sys

try:
    GPIO.setmode(GPIO.BOARD)
    PIN_TRIGGER = 7
    PIN_ECHO = 11

    GPIO.setup(PIN_TRIGGER, GPIO.OUT)
    GPIO.setup(PIN_ECHO, GPIO.IN)

    # How often the sensor should sense. In seconds
    interval_time = 2

    time.sleep(interval_time)
    # Loop just runs indefinitely
    while True:
        GPIO.output(PIN_TRIGGER, GPIO.LOW)

        time.sleep(interval_time)

        GPIO.output(PIN_TRIGGER, GPIO.HIGH)

        time.sleep(0.00001) #0.00001 is required duration of signal

        GPIO.output(PIN_TRIGGER, GPIO.LOW)

        while GPIO.input(PIN_ECHO)==0:
            pulse_start_time = time.time()
        while GPIO.input(PIN_ECHO)==1:
            pulse_end_time = time.time()

        pulse_duration = pulse_end_time - pulse_start_time

        # Distance in cm
        distance = round(pulse_duration * 17150, 4)

        # Output to console so NodeJS can read it
        print distance

except Exception as e:
    print "ERR"
    print e
finally:
    GPIO.cleanup()