import RPi.GPIO as GPIO
import threading
import time

GPIO.setmode(GPIO.BOARD)
GPIO.setwarnings(False)

# GPIO füüsilised numbrid on pandnud muutujatele kerge lihtsaks juurdepääsuks
AUTO_PUNANE = 18
AUTO_KOLLANE = 21
AUTO_ROHELINE = 24

VALGE = 36

P_PUNANE = 38
P_ROHELINE = 40

NUPP = 15

# Määrab toimingu kõigidele GPIO-dele
GPIO.setup(AUTO_PUNANE, GPIO.OUT)
GPIO.setup(AUTO_KOLLANE, GPIO.OUT)
GPIO.setup(AUTO_ROHELINE, GPIO.OUT)
GPIO.setup(P_PUNANE, GPIO.OUT)
GPIO.setup(P_ROHELINE, GPIO.OUT)
GPIO.setup(VALGE, GPIO.OUT)
GPIO.setup(NUPP, GPIO.IN, pull_up_down=GPIO.PUD_DOWN)

# Globaalne muutuja, mis aktiveerib jalakäija toimingu, kui see muutuja on tõene.
jalakäija = False

# Katkestuse funksioon, mis seab jalakäija muutuja tõeks ja aktiveerib valge tuli põlema kui füüsiline nupp on vajutatud.
def ped_light():
    global jalakäija
    while True:
        if GPIO.input(15) == GPIO.HIGH:
            GPIO.output(VALGE, GPIO.HIGH)
            jalakäija = True

# Funktsioon ped_light käivitab taustal selle thread'iga
t1 = threading.Thread(target=ped_light)

try:
    # Aktiveerib thread'i
    t1.start()
    
    # Lisa muutuja, mis määrab, et kui keegi vajutab nuppu punase tule ajal, siis nupu olek oleks ikka salvestatud (jalakäija koodi teine osa ei alista valge tule olekut, kui jalakäijate koodi esimene osa ei olnud käivitatud).
    
    jalakäija_trigger = False
    # Aktiveerib jalakäijate tuli
    GPIO.output(P_PUNANE, GPIO.HIGH)

    # Põhiprogramm
    while True:

        # Jalakäija koodi esimene osa
        if jalakäija:
            # Sulgeb inimestele punase foori ja sütib jalakäijatele rohelise foori
            GPIO.output(P_PUNANE, GPIO.LOW)
            GPIO.output(P_ROHELINE, GPIO.HIGH)

            # Teeb muutuja jalakäija_trigger tõeks, nii et jalakäija teise osa koodi käivitatakse
            jalakäija_trigger = True

        # Sütib autodele punase foori ja ootab
        GPIO.output(AUTO_PUNANE, GPIO.HIGH)
        time.sleep(5)

        # Jalakäija koodi teine osa
        if jalakäija and jalakäija_trigger:
            # Sulgeb inimestele valge ja rohelise foori ning sütib jalakäijatele punase foori
            GPIO.output(P_ROHELINE, GPIO.LOW)
            GPIO.output(P_PUNANE, GPIO.HIGH)
            GPIO.output(VALGE, GPIO.LOW)

            # Muudab jalakäija muutujad valeks
            jalakäija = False
            jalakäija_trigger = False

        # Sulgeb autodele punase foori
        GPIO.output(AUTO_PUNANE, GPIO.LOW)

        # Sütib autodele kollase foori ja ootab
        GPIO.output(AUTO_KOLLANE, GPIO.HIGH)
        time.sleep(1)

        # Sulgeb autodele kollase foori
        GPIO.output(AUTO_KOLLANE, GPIO.LOW)

        # Sütib autodele rohelise foori ja ootab
        GPIO.output(AUTO_ROHELINE, GPIO.HIGH)
        time.sleep(5)

        # Sulgeb autodele rohelise foori
        GPIO.output(AUTO_ROHELINE, GPIO.LOW)

        # Sütib ja sulgeb autodele kollase foori kolm korda intervalliga
        for x in range(0, 3):
            GPIO.output(AUTO_KOLLANE, GPIO.HIGH)
            time.sleep(2/6)
            GPIO.output(AUTO_KOLLANE, GPIO.LOW)
            time.sleep(2/6)

except KeyboardInterrupt:
    print("Programm lõpeb...")
finally:
    # Programmi dekonstruktor, mis kustutab thread'i ja lähtestab GPIO-d
    t1.join()
    GPIO.cleanup()



