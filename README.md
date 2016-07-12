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
```javascript
write.setPage(0);
```
#### write.setText
Changer le texte d'un composant
```javascript
write.setText('t0', "Hello world!");
```
#### write.setVis
Rendre un composant invisible
```javascript
write.setVis('t0', false);
```
#### write.setColor
Changer la couleur background d'un composant
```javascript
write.setColor('t0', '01234');
```
#### write.getPage
L'écran renverra le numéro de page quand l'utilisateur change de page
```javascript
write.getPage();
```

Pour écrire des données brutes il suffit d'utiliser ```write.uart(commande);```
## Python
```bash
sudo python client.py commande
```

### How to


