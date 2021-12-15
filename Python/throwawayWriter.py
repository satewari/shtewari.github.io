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

try:
    while(True):
        cardName = input("Name?")
        reader.write(cardName)
        print("Written! Place again to read.")
        idq, text = reader.read()
        print("The name of the card is "+idq)
        sleep(1)

finally:
    GPIO.cleanup()
