import serial
import pyrebase
if __name__ =='__main__':
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
    serial_port = "/dev/ttyUSB0"
    with serial.Serial(serial_port, 9600) as rfid_reader:
        while(True):
            tag = rfid_reader.readline().decode('UTF-8').strip()
            print(tag)
            tag = "".join(e for e in tag if e.isalnum())
            value = db.child("cards").child(tag).child("value").get().val()
            db.child("cards").child(tag).child("value").set(not value)
            ct = db.child("cards").child(tag).child("counter")
            
            if ct.get().val() == 0:
                db.child("cards").child(tag).child("counter").set(1)
            else:
                db.child("cards").child(tag).child("counter").set(0)