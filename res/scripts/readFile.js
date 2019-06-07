/*
 *
 * File name: readFile.js
 * Description: node.js script for readme command
 * Authors: taokann.one and colivier74
 * If you're a new WeBash contributor and worked on this file, please add you name here.
 *
 * This file is part of the WeBash project with is released under the terms of GNU General Public License V3.0.
 * You should have recieved a copy of it along with this file, if not, please write to :
 * Free Software Foundation, Inc., 51 Franklin Street, Fifth floor, Boston, MA 02110-1301 USA.
 */

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
