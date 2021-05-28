const { v4: uuidv4 } = require('uuid');

const extractExtension = mimetype => {
    const data = mimetype.split('.')
    return data[data.length - 1]
}

const extractType = mimetype => {
    return mimetype.split('/')[0]
}

const genId = () => {
    return uuidv4();
}

const split = buffer => {
    return new Promise((resolve, reject) => {
        let file1;
        let file2;
        let file3;
        console.log("Total Size -> " + buffer.length);
        const splitSize = Math.ceil(buffer.length / 3)
        console.log("Buffer/3  Size -> " + splitSize);
        file1 = Buffer.from(buffer.slice(0, splitSize))
        console.log("File1 size ->" + file1.length);
        file2 = Buffer.from(buffer.slice(splitSize, (buffer.length - splitSize)))
        console.log("File2 size ->" + file2.length);    
        file3 = Buffer.from(buffer.slice((buffer.length - splitSize), buffer.length))
        console.log("File3 size ->" + file3.length);
        resolve([file1, file2, file3])
    })
}

const merge = (file) => {                   // parameter => array of buffers
    return new Promise((resolve, reject) => {
        const buffer = Buffer.concat(file);
        resolve(buffer)  
    })
}


module.exports = {
    extractExtension,
    extractType,
    split,
    merge,
    genId
}



// merge sample
// fs.writeFileSync(__dirname+ '/index1.pdf');
        // fs.writeFile(__dirname+ '/index1.pdf', file1, (err) => {
        //     if(err) console.log(err.message);
        //     else{
        //         fs.appendFile(__dirname+ '/index1.pdf', file2, err => {
        //             if(err) console.log(err.message);
        //             else{
        //                 fs.appendFile(__dirname+ '/index1.pdf', file3, err => {
        //                     if(err) console.log(err.message);
        //                     else{
        //                         console.log("file writter");
        //                     }
        //                 })
        //             }
        //         })
        //     }
        // })