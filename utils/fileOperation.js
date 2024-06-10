const fs = require('fs');

exports.readFileData = () => {
    const data = fs.readFileSync('./public/userList.json', 'utf8');
    return JSON.parse(data)
}

exports.writeIntoFile = (data) => {

    fs.writeFile('./public/userList.json', JSON.stringify(data), 'utf8', (err) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log('File has been written');
    })
}