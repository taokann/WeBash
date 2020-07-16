/*
 *
 * File name: readFile.js
 * Description: node.js script for readme command
 * Authors: taokann.one and cestoliv
 * If you're a new WeBash contributor and worked on this file, please add your name here.
 *
 * This file is part of the WeBash project with is released under the terms of GNU Affero General Public License V3.0.
 * You should have received a copy of the GNU Affero General Public License along with WeBash. If not, see <https://www.gnu.org/licenses/>.
 *
 */

var fs = require("fs")
const fetch = require("node-fetch")
const { report } = require("process")

exports.run = (path, fromInternet) => {
    return new Promise((resolve, reject) => {
        if(fromInternet) {
            fetch(path).then((response) => { 
                console.log(response.headers.raw())
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
                        reject(jsonRes)
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
