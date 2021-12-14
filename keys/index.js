// 使用openssl生成证书和密钥
const NodeRSA = require('node-rsa');
// const key = new NodeRSA({ b: 512 });

// const text = 'Hello RSA!';
// const encrypted = key.encrypt(text, 'base64');
// console.log('encrypted: ', encrypted);
// const decrypted = key.decrypt(encrypted, 'utf8');
// console.log('decrypted: ', decrypted);

const key = new NodeRSA({ b: 2048 }); //生成2048位的密钥
let publicDer = key.exportKey('pkcs1-public-pem'); //公钥
let privateDer = key.exportKey('pkcs1-private-pem'); //私钥

console.log('publicDer', publicDer);
console.log('privateDer', privateDer);
