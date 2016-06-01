/*


Nextion.js for Raspberry Pi / Node.js

Grégory G.

*/

var serialport = require('serialport');
var SerialPort = serialport.SerialPort;

var port = new SerialPort('/dev/ttyAMA0', {
	baudrate: 9600
});

var json = {"interrupteur":{"2-53":{"name":"Tout éteindre","lcd":"salon","groupe":["Général"],"trigger":{"1":{"ip":"192.168.1.176","type":"off","pin":[22]},"2":{"ip":"192.168.1.177","type":"off","pin":[22,23,24,25,26,27,28,29,30,31,32,33]},"3":{"ip":"192.168.1.176","type":"on","tempo":"10","pin":[23,24]}},"temperature":{"temp-dft":12}},"1-53":{"name":"Tout","lcd":"salon","groupe":["Bergerie"],"trigger":{"1":{"ip":"192.168.1.177","type":"prioriteoff","pin":[22,23,24,25,26,27,28,29,30,31,32,33]}}},"1-49":{"name":"Piliers","groupe":["Bergerie"],"parent":"1-53","trigger":{"1":{"ip":"192.168.1.177","type":"toggle","pin":[22,23]}}},"1-48":{"name":"Voutes & Niche","groupe":["Bergerie"],"parent":"1-53","trigger":{"1":{"ip":"192.168.1.177","type":"toggle","pin":[24,25,26,27,28,29]}}},"1-47":{"name":"Leds périmètre","groupe":["Bergerie"],"parent":"1-53","trigger":{"1":{"ip":"192.168.1.177","type":"toggle","pin":[30,31,32]}}},"1-46":{"name":"Leds piliers","groupe":["Bergerie"],"parent":"1-53","trigger":{"1":{"ip":"192.168.1.177","type":"toggle","pin":[33]}}},"1-43":{"name":"Leds piliers","hidden":true,"groupe":["Bergerie"],"parent":"1-53","trigger":{"1":{"ip":"192.168.1.177","type":"toggle","pin":[22,23]}}},"2-49":{"name":"Tempo SAS","groupe":["Couloir"],"trigger":{"1":{"ip":"192.168.1.176","type":"on","tempo":"10","pin":[22]}}},"2-48":{"name":"SAS","temp_disable":"2-49","groupe":["Couloir"],"trigger":{"1":{"ip":"192.168.1.176","type":"toggle","pin":[22]}}},"2-47":{"name":"Jardin","groupe":["Extérieur"],"trigger":{"1":{"ip":"192.168.1.176","type":"toggle","pin":[23,24]}}}},"temperature":{"temp-dft":{"name":"Temp. Bergerie","groupe":["Température","Bergerie"],"trigger":{"sonde":{"ip":"192.168.1.177","addr":"28FFF423011504D0"},"relais":{"ip":"192.168.1.176","pin":[28,29]}}}}};
var lcd = "salon";
var button = {};
var button_len = 0;

function init(){
	port.on('open', function() {
		console.log('Port ouvert sur /dev/ttyAMA0 @ 9600 bds');
		write(1, false, "0");
	});

	port.on('data', function(byte){
		var data = byte.toString('hex').match(/.{1,2}/g);
		readUart(data);
	});

	// parsing du JSON
	for(var i in json["interrupteur"]){
		var cmd = json["interrupteur"][i];
		if(typeof(cmd["lcd"]) != "undefined"){
			var jsonName = cmd["name"];
			var jsonLcd = cmd["lcd"];
			if(lcd == jsonLcd){ // si c'est le bon écran
				button[i] = {
					name: jsonName,
					lcd: jsonLcd
				};
				button_len++;
			}
		}
	}
}

function write(type, cmp, cmd){
	switch(type){
		case 0: // commandes générales
			writeUart(cmd);
			break;
		case 1: // changement de page
			writeUart('page '+cmd)
			break;
		case 2: // changement de texte
			writeUart(cmp+'.txt="'+cmd+'"');
			break;
		case 3: // visibilité
			writeUart('vis '+cmp+','+cmd);
			break;
	}
}

function writeUart(cmd){
	port.write(hex(cmd));
}

function readUart(data){
	switch(data[0]){
		case "65":
			console.log("Touch event : Page " + parseInt(data[1], 16) + " Bouton " + parseInt(data[2], 16));
			if(data[1] == "00" && (data[2] == "00" || data[2] == "01" || data[2] == "02" || data[2] == "03" || data[2] == "04")){ // Si on appuie sur l'un des boutons de la page d'accueil
				if(button_len > 0){ // Si des boutons sont présents
					if(button_len > 10){ // S'il y a plus de 10 boutons, on affiche le bouton de la page suivante
						write(3, "t12", "1");
					}
					var u = 0;
					for(var i in button){
						if(button[i]["name"].length > 10){
							write(2, "t"+u, button[i]["name"]);
							write(3, "t"+u, "1");
							write(0, false, "t"+u+".font=3"); // changement de la police
							write(0, false, "ref t"+u); // rafraichissement de la police

						}
						else {
							write(2, "t"+u, button[i]["name"]);
							write(3, "t"+u, "1");
						}
						u++;
					}
				}
				else { // Si aucun bouton, on affiche une erreur
					write(3, "t0", "1");
					write(2, "t0", "Erreur");
				}
			}
	}
}

function hex(str) {
	var arr = [];
	for (var i = 0, l = str.length; i < l; i ++) {
		var ascii = str.charCodeAt(i);
		arr.push(ascii);
	}
	arr.push(255);
	arr.push(255);
	arr.push(255);
	return new Buffer(arr);
}

init();