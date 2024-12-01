#include <SPI.h>
#include <MFRC522.h>

#define RST_PIN 9
#define SS_PIN 10
#define green 2
#define red 3

String uid;

MFRC522 rfid(SS_PIN, RST_PIN);

void setup() {
  Serial.begin(9600);
  SPI.begin();
  rfid.PCD_Init();
  Serial.println("Aproxime uma tag do leitor...");
  pinMode(green, OUTPUT);
  pinMode(red, OUTPUT);
}

void loop() {
  if (rfid.PICC_IsNewCardPresent() && rfid.PICC_ReadCardSerial()) {
    uid = "";
    for (byte i = 0; i < rfid.uid.size; i++) {
      uid += String(rfid.uid.uidByte[i], HEX);
    }
    Serial.println(uid);  
  }


  if (Serial.available() > 0) {
    char receivedChar = Serial.read();  
    if (receivedChar == '0') {
      // Acende o LED vermelho
      digitalWrite(red, HIGH);
      digitalWrite(green, LOW);  
      delay(2000);  
      digitalWrite(red, LOW);  
    } 
    else if (receivedChar == '1') {
      // Acende o LED verde
      digitalWrite(green, HIGH);
      digitalWrite(red, LOW);  
      delay(2000);  
      digitalWrite(green, LOW);  
    }

    Serial.println("OK");  
  }

  delay(100);
}
