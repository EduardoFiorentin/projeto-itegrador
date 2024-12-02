#include <Keypad.h>

#define green 10
#define red 11

const byte ROWS = 4; 
const byte COLS = 4; 

char keys[ROWS][COLS] = {
  {'*', '0', '#', 'D'}, // "D" será o botão de enviar (SEND)
  {'7', '8', '9', 'C'},
  {'4', '5', '6', 'B'},
  {'1', '2', '3', 'A'}
};

byte rowPins[ROWS] = {2, 3, 4, 5}; 
byte colPins[COLS] = {6, 7, 8, 9}; 

Keypad keypad = Keypad(makeKeymap(keys), rowPins, colPins, ROWS, COLS);

String code = ""; 

void setup() {
  Serial.begin(9600);
  pinMode(green, OUTPUT);
  pinMode(red, OUTPUT);
}

void loop() {
  char key = keypad.getKey(); 

  if (key) {
    if (key == 'D') { // Botão SEND
      if (code.length() > 0) {
        Serial.println(code); // Envia o código pela serial
        code = "";
      }
    } else if (key == '*') { // Botão para limpar o código
      code = "";
    } else { // Adiciona o número ao código
      code += key;
    }
  }

  if (Serial.available() > 0) {
    char receivedChar = Serial.read();
    if (receivedChar == '0') {
      digitalWrite(red, HIGH);
      digitalWrite(green, LOW);
      delay(2000);
      digitalWrite(red, LOW);
    } else if (receivedChar == '1') {
      digitalWrite(green, HIGH);
      digitalWrite(red, LOW);
      delay(2000);
      digitalWrite(green, LOW);
    }
    Serial.println("OK");
  }

  delay(100);
}