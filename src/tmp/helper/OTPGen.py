
import random
import string

def generateOTP(length):
  characters = string.digits
  otp = ''.join(random.choice(characters) for _ in range(length))
  return otp