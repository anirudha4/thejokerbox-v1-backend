var fs = require('fs');
const path = require('path')
// const {
//     scrypt,
//     randomFill,
//     createCipheriv,
//     createDecipheriv,
//     createHash
//   } = require('crypto');
const crypto = require('crypto')
  
//   const algorithm = 'aes-256-cbc';
//   const password = 'dhajkfadfnalkdsjfdnjkafnjkcldnfjkafdnfcjkadfcafdanjfcdabj';
//   fs.readFile(__dirname + '\\43_Secure Storage Service on Cloud using Hybrid Cryptography approach (1).pdf', (err, data) => {
//       encrypt(data, algorithm, password)
//       .then(({key, iv}) => {
//           console.log(key, iv);
//           fs.readFile(__dirname + '\\decrypted.dat', (err, data) => {
//             decrypt(data, 'aes-256-cbc', key, iv)
//             .then(res => {
//                 console.log(res);
//             })
//             .catch(err => console.log(err))
//           }) 
//       })
//       .catch(err => console.log(err))
//   })
// const encrypt = (buffer, algorithm, password) => {
// return new Promise((resolve, reject) => {
//     // First, we'll generate the key. The key length is dependent on the algorithm.
//     // In this case for aes192, it is 32 bytes (256 bits).
//     scrypt(password, 'salt', 32, (err, key) => {
//         if (err) throw err;
//         // Then, we'll generate a random initialization vector
//         randomFill(new Uint8Array(16), (err, iv) => {
//             if (err) throw err;
//             const cipher = createCipheriv(algorithm, key, iv);
//             let encrypted = cipher.update(buffer);
//             fs.writeFile(__dirname + '\\decrypted.dat', encrypted, (err) => {
//                 resolve({ key, iv })
//             })
//         });
//     });
// })
// }

// const decrypt = (buffer, algorithm, key, iv) => {
//     return new Promise((resolve, reject) => {
//     const decipher = createDecipheriv(algorithm, key, iv);
//     // Encrypted using same algorithm, key and iv.
//     let decrypted = decipher.update(buffer);
//     console.log(decrypted);
//     fs.writeFile(__dirname + '\\decrypted.pdf', decrypted, (err) => {
//         if(err) reject(err)
//         else{
//             resolve("decrypted")
//         }
//     })
//     })
// }


// RC4
// const encrypt_RC4 = (data, keyname) => {
//     return new Promise((resolve, reject) => {
//         var key = createHash('sha256').update(keyname).digest();
//         var encryptor = createCipheriv('rc4', key,'');
//         var encrypted = encryptor.update( data);
//         fs.writeFileSync(__dirname + '\\encrypted.dat', encrypted);
//         console.log("file encrypted");
//         resolve(key)
//     })
// }

// const decrypt_RC4 = (data, key) => {
//     return new Promise((resolve, reject) => {
//         console.log("in promise");
//         var decryptor = createDecipheriv('rc4', key,'');
//         console.log("decryptor set");
//         var decrypted = decryptor.update(data);
//         console.log("decrypted set");
//         console.log(decrypted);
//         fs.writeFileSync(__dirname + '\\decrypted-rc4.pdf', decrypted)
//         resolve(decrypted)
//     })
// }

// fs.readFile(__dirname + '\\43_Secure Storage Service on Cloud using Hybrid Cryptography approach (1).pdf', (err, fileData) => {
//     const data = fileData
//     encrypt_RC4(data, "anirudha")
//     .then(key => {
//         fs.readFile(__dirname + '\\encrypted.dat', (err, data) => {
//             decrypt_RC4(data, key)
//             .then(resp => {
//                 console.log("DONE");
//             })
//         })
//     })
//     .catch(err => {
//         console.log(err);
//     })

// })

// BLOWFISH

var algorithm = "bf-ecb";

fs.readFile(__dirname + '\\index.html', (err, data) => {
    encrypt_blowfish(data, "anirudha")
    .then(res => {
        fs.readFile(__dirname + '\\encrypted.dat', (err, encData) => {
            decrypt_blowfish(encData, res.key)
            .then(resp => {
                console.log(resp);
            })
        })
    })
})

function encrypt_blowfish(data, password) {
    return new Promise((resolve, reject) => {
        const key = new Buffer.from(password)
        const encryptor = crypto.createCipheriv(algorithm, key, '');
        const encrypted  = encryptor.update(data)
        fs.writeFileSync(__dirname + '\\encrypted.dat', encrypted)
        resolve({encrypted, key})
    })
}

function decrypt_blowfish(data, key) {
    return new Promise((resolve, reject) => {
        const decryptor = crypto.createDecipheriv(algorithm, key, '')
        const decrypted = decryptor.update(data)
        fs.writeFileSync(__dirname + '\\decrypted.html', decrypted)
        console.log("done");
        resolve(decrypted)
    })
}


    
//   self.decrypt = function(data, key) {
//     var decipher = crypto.createDecipheriv(algorithm, new Buffer(key), '');
//     decipher.setAutoPadding(false);
//     try {
//       return (decipher.update(new Buffer(data, 'base64').toString('binary'), 'binary', 'utf8')+ decipher.final('utf8')).replace(/\x00+$/g, '');
//     } catch (e) {
//       return null;
//     }
//   }