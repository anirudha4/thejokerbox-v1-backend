const encryptAES = (buffer, algorithm, password) => {
    return new Promise((resolve, reject) => {
        scrypt(password, 'salt', 32, (err, key) => {
            if (err) throw err;
            // Then, we'll generate a random initialization vector
            randomFill(new Uint8Array(16), (err, iv) => {
                if (err) throw err;
                const cipher = createCipheriv(algorithm, key, iv);
                let encrypted = cipher.update(buffer);
                resolve({
                    encrypted, 
                    key,
                    iv
                })
            });
        });
    })
}

const encryptRC4 = (buffer, password) => {     // buffer is the splitted-buffer and password is any secret
    return new Promise((resolve, reject) => {
        const key = createHash('sha256').update(password).digest();
        const encryptor = createCipheriv('rc4', key,'');
        const encrypted = encryptor.update( buffer );
        console.log("file encrypted");
        resolve({ encrypted, key })     //encrypted buffer and the key
    })
}

const encryptBlowfish = (buffer, password) => {
    return new Promise((resolve, reject) => {
        const key = new Buffer.from(password)
        const encryptor = crypto.createCipheriv(algorithm, key, '');
        const encrypted  = encryptor.update(buffer)
        fs.writeFileSync(__dirname + '\\encrypted.dat', encrypted)
        resolve({encrypted, key})
    })
}


module.exports = {
    encryptAES,
    encryptBlowfish,
    encryptRC4
}