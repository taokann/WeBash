var fs = require("fs")
const fetch = require("node-fetch")

exports.run = (path, fromInternet) => {
    return new Promise((resolve, reject) => {
        if(fromInternet) {
            fetch(path).then((response) => { 
                response.text().then((response) => {
                    let jsonRes = {
                        status: "sucess",
                        output: response
                    }
                    resolve(jsonRes)
                })
            })
        }
        else {
            fs.readFile(path, 'utf-8', (err, data) => {
                if(err) {
                    if(err.code == "ENOENT") {
                        let jsonRes = {
                            status: "error",
                            error: "0002",
                            output: path + " is not a file"
                        }
                        resolve(jsonRes)
                    }
                    else {
                        console.log(err)
                    }
                }
                else {
                    let jsonRes = {
                        status: "sucess",
                        output: data
                    }
                    resolve(jsonRes)
                }
            })
        }
    })
    
}