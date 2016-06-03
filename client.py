import sys
import time
import serial

ser = serial.Serial(
  port='/dev/ttyAMA0',
  baudrate = 9600,
  parity=serial.PARITY_NONE,
  stopbits=serial.STOPBITS_ONE,
  bytesize=serial.EIGHTBITS,
  timeout=1
)

EndCom = "\xff\xff\xff"
ser.write(sys.argv[1]+EndCom)
