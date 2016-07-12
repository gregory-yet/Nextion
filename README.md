# Nextion for Raspberry
Little program that let you use a Nextion screen with Node.js or Python.
## Node.js
### Dépendance
**[Serialport](https://www.npmjs.com/package/serialport)**

### Utilisation
#### write.uart
```javascript
write.uart('page 0');
```
#### write.setPage
Changer la page actuelle

*Change actual page*
```javascript
write.setPage(0);
```
#### write.setText
Changer le texte d'un composant

*Update component text*
```javascript
write.setText('t0', "Hello world!");
```
#### write.setVis
Rendre un composant invisible

*Set a component not visible*
```javascript
write.setVis('t0', false);
```
#### write.setColor
Changer la couleur background d'un composant

*Update background color of component*
```javascript
write.setColor('t0', '01234');
```
#### write.getPage
L'écran renverra le numéro de page quand l'utilisateur change de page

*The screen will send page number when user change page*
```javascript
write.getPage();
```

Pour écrire des données brutes il suffit d'utiliser ```write.uart(commande);```

*To write raw data you can use ```write.uart(command);```*
## Python
```bash
sudo python client.py commande
```

# License
```
Copyright (c) 2016 Grégory

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
