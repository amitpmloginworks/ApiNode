
//LoginNode:Hello~RunCMD~Continue
//LoginNode:Hello~RunCMD~Continue
//LoginNode:Hello~RunCMD~Continue
//LoginNode:Hello~RunCMD~Continue
//LoginNode:Hello~SaveBatchFile~Continue
//LoginNode:Hello~PortEnable~
//LoginNode:Hello~PortDisable~
//LoginNode:Hello~Auth~
//LoginNode:Hello~ClientVersion~2.0.0.0
//LoginNode:Hello~IIS~
//LoginNode:Hello~IISStart~<WebsiteName>
//LoginNode:Hello~IISStop~
//LoginNode:Hello~IISRestart~
//LoginNode:Hello~StartIISsite~
//LoginNode:Hello~StopIISsite~
//LoginNode:Hello~StartIISAppPoolsite~
//LoginNode:Hello~StopIISAppPoolsite~
//LoginNode:Hello~RecycleIISAppPoolsite~
//LoginNode:Hello~ServerInfo~
//LoginNode:Hello~Message~
//LoginNode:Hello~RunCMD~Stop
//LoginNode:Hello~RunCMD~exit
//LoginNode:Hello~RunCMD~ExitC
//LoginNode:Hello~RunCMD~Continue
//LoginNode:Hello~Restart~
//LoginNode:Hello~GetProcesses~
//LoginNode:Hello~Firewall~
//LoginNode:Hello~FirewallEnable~
//LoginNode:Hello~FirewallDisable~
//LoginNode:Hello~PortEnable~
//LoginNode:Hello~PortDisable~
//LoginNode:Hello~Services~
//LoginNode:Hello~ServicesStart~
//LoginNode:Hello~ServicesStop~
//LoginNode:Hello~BatchFile~
//LoginNode:Hello~ReadBatchFile~

// Donot run this commends

//LoginNode:Hello~SaveBatchFile~
//LoginNode:Hello~DeleteBatchFile~


//var CryptoJS = require('crypto-js');

var crypto = require('crypto');
var net = require('net');
function encrypt(text, key) {
  
  var alg = 'des-ede-cbc';
  var key = new Buffer(key, 'utf-8');
  var iv = new Buffer('QUJDREVGR0g=', 'base64');    //This is from c# cipher iv

  var cipher = crypto.createCipheriv(alg, key, iv);
  var encoded = cipher.update(text, 'ascii', 'base64');
  encoded += cipher.final('base64');

  return encoded;
}

function decrypt(encryptedText, key) {
  var alg = 'des-ede-cbc';
  var key = new Buffer(key, 'utf-8');
  var iv = new Buffer('QUJDREVGR0g=', 'base64');    //This is from c# cipher iv

  var encrypted = new Buffer(encryptedText, 'base64');
  var decipher = crypto.createDecipheriv(alg, key, iv);
  var decoded = decipher.update(encrypted, 'binary', 'ascii');
  decoded += decipher.final('ascii');

  return decoded;
}

var text = 'LoginNode:Hello~ServerInfo~';
var securityKey = '1223345656677889';
var encryptedText = encrypt(text, securityKey);
var decryptedText = decrypt(encryptedText, securityKey);

console.log('encrypted text:', encryptedText);
console.log('decrypted text:', decryptedText);
encryptedText = "Android~"+encryptedText;
//=========================TCP communication==============================//
// var client = net.connect(2345,'127.0.0.1',function(){
//   console.log('connected to server!');
//   client.write("hello");
// }); 

//var net = require('net');

var HOST = '10.0.0.183'; 
var PORT = 8003;

var client = new net.Socket();
client.connect(PORT, HOST, function() {

console.log('CONNECTED TO: ' + HOST + ':' + PORT);
client.write(encryptedText);

client.on('data', function (data) {
  // var buf = Buffer.from(data,'base64').toString('ascii');
  console.log(data);
  // console.log(typeof(data));
  // console.log("Enter to string", data);
   console.log("buff",data.toString('utf8'));
  
  var decryptedText = decrypt(data.toString('utf8'), securityKey);
  console.log(decryptedText);
  client.end();
  });

});













