const fs = require('fs')
fs.readFile(__dirname+ '/43_Secure Storage Service on Cloud using Hybrid Cryptography approach (1).pdf', (err,data) => {
    if (err) return err.message
    else{
        split(data)
    }
})

const split = buffer => {
    let file1;
    let file2;
    let file3;
    console.log(buffer);
    debugger
    console.log(buffer.length);
    const splitSize = Math.floor(buffer.length/3);
    const remaining = Math.ceil(buffer.length % 3);
    console.log(splitSize, remaining);
    file1 = Buffer.from(buffer.slice(0, splitSize + 1))
    console.log(file1);
    file2 = Buffer.from(buffer.slice(splitSize + 1 , buffer.length - remaining ))
    console.log(file2);
    file3 = Buffer.from(buffer.slice(buffer.length-remaining, buffer.length));
    merge([file1, file2, file3])
    return [file1, file2, file3];
}

const merge = (file) => {
    // const buffer = Buffer.concat(file)
    // fs.writeFileSync(__dirname+ '/index1.pdf', buffer);

    fs.writeFile(__dirname+ '/index1.pdf', file1, (err) => {
        if(err) console.log(err.message);
        else{
            fs.appendFile(__dirname+ '/index1.pdf', file2, err => {
                if(err) console.log(err.message);
                else{
                    fs.appendFile(__dirname+ '/index1.pdf', file3, err => {
                        if(err) console.log(err.message);
                        else{
                            console.log("file writter");
                        }
                    })
                }
            })
        }
    })
}

module.exports = {
    split,
    merge
}