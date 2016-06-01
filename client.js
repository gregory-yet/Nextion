/*


Nextion.js for Raspberry Pi / Node.js

Grégory G.

*/

var serialport = require('serialport');
var SerialPort = serialport.SerialPort;

var port = new SerialPort('/dev/ttyAMA0', {
	baudrate: 9600
});

function init(){
	port.on('open', function() {
		console.log('Port ouvert sur /dev/ttyAMA0 @ 9600 bds');
		write(1, false, "0");
	});

	port.on('data', function(byte){
		var data = byte.toString('hex').match(/.{1,2}/g);
		readUart(data);
	});
	
	// write(1, false, "1"); to change the actual page to page 1
	// write(2, "t0", "mytext"); to change the text of t0 cmp
}

function write(type, cmp, cmd){ // type, components (t0, b0...), value
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
		
		// you can add here some useful command
	}
}

function writeUart(cmd){
	port.write(hex(cmd));
}

function readUart(data){
	console.log(data.join(" "));
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
