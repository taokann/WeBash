var fs = require("fs")
const fetch = require("node-fetch")

exports.run = (path, fromInternet) => {
    return new Promise((resolve, reject) => {
        if(fromInternet) {
            fetch(path).then((response) => { 
                response.text().then((response) => {
                    resolve(response)
                })
            })
        }
        else {
            fs.readFile(path, 'utf-8', (err, data) => {
                if(err) {
                    if(err.code == "ENOENT") {
                        resolve(path + " is not a file")
                    }
                    console.log(err)
                }
                else {
                    resolve(data)
                }
            })
        }
    })
    
}