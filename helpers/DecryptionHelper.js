const decryptAES = (buffer, algorithm, key, iv) => {
    return new Promise((resolve, reject) => {
        const decipher = createDecipheriv(algorithm, key, iv);
        // Encrypted using same algorithm, key and iv.
        let decrypted = decipher.update(buffer);
        resolve(decrypted)
    })
}

const decryptRC4 = (buffer, key) => {      // buffer is the buffer and key the key used for encryption
    return new Promise((resolve, reject) => {
        const decryptor = createDecipheriv('rc4', key,'');
        const decrypted = decryptor.update(buffer);
        console.log("decrypted");
        resolve(decrypted)
    })
}

const decryptBlowfish = (buffer, key) => {
    return new Promise((resolve, reject) => {
        const decryptor = crypto.createDecipheriv(algorithm, key, '')
        const decrypted = decryptor.update(buffer)
        fs.writeFileSync(__dirname + '\\decrypted.html', decrypted)
        console.log("done");
        resolve(decrypted)
    })
}


module.exports = {
    decryptAES,
    decryptBlowfish,
    decryptRC4
}