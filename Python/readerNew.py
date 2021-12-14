#!/usr/bin/env python
import serial
import pyrebase
import RPi.GPIO as GPIO
from time import sleep
from mfrc522 import SimpleMFRC522

reader = SimpleMFRC522()
firebaseConfig = {
    "apiKey": "AIzaSyBjwQUYmH30_UJEZQLmkrDb6nsK7dJyKJc",
    "authDomain": "edd1-768ce.firebaseapp.com",
    "databaseURL": "https://edd1-768ce-default-rtdb.firebaseio.com",
    "projectId": "edd1-768ce",
    "storageBucket": "edd1-768ce.appspot.com",
    "messagingSenderId": "502637728966",
    "appId": "1:502637728966:web:da20eacc4c44111d83b3c7"
}
firebase = pyrebase.initialize_app(firebaseConfig)
db = firebase.database()

totalcount = 0

try:
    while(True):
        print("Place tag.")
        idq, text = reader.read()
        totalcount+=1
        
        value = db.child("cards").child(idq).child("value").get().val()
        if value:
            totalcount-=1
            currCount = db.child("cards").child(idq).child("counter").get().val()
            print("Current count", currCount)
            db.child("cards").child(idq).child("counter").set(0)
        else:
            db.child("cards").child(idq).child("counter").set(totalcount)
        db.child("cards").child(idq).child("value").set(not value)
        sleep(1)

finally:
    GPIO.cleanup()
