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
