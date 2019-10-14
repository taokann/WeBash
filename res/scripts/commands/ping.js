/*
 *
 * File name: ping.js
 * Description: ping command
 * Authors: taokann.one and colivier74
 * If you're a new WeBash contributor and worked on this file, please add your name here.
 *
 * This file is part of the WeBash project with is released under the terms of GNU Affero General Public License V3.0.
 * You should have received a copy of the GNU Affero General Public License along with WeBash. If not, see <https://www.gnu.org/licenses/>.
 *
 */

var exec = require('child_process').exec

exports.run = (query) => {
    let jsonRes
    
    let count = ""
    let host = ""
    let interval = ""
    let size = ""
    let timeout = ""

    return new Promise((resolve, reject) => {
        query.shift()
        for(i = 0; i < query.length; i++) {
            switch(query[i]) {
                case "-c":
                    cnt = parseFloat(query[i + 1])
                    if(!isNaN(cnt)) {
                        count = cnt
                    }
                    else {
                        jsonRes = {
                            status: "error",
                            error: "0001",
                            output: "Bad value for -c !"
                        }
                        resolve(jsonRes)
                    }
                    i += 1
                    break
                case "-i":
                    intl = parseFloat(query[i + 1])
                    
                    if(!isNaN(intl)) {
                        interval = intl
                    }
                    else {
                        jsonRes = {
                            status: "error",
                            error: "0001",
                            output: "Bad value for -c !"
                        }
                        resolve(jsonRes)
                    }
                    i += 1
                    break
                case "-s":
                    sze = parseFloat(query[i + 1])
                    if(!isNaN(sze)) {
                        size = sze
                    }
                    else {
                        jsonRes = {
                            status: "error",
                            error: "0001",
                            output: "Bad value for -s !"
                        }
                        resolve(jsonRes)
                    }
                    i += 1
                    break
                case "-w":
                    tmt = parseFloat(query[i + 1])
                    if(!isNaN(tmt)) {
                        timeout = tmt
                    }
                    else {
                        jsonRes = {
                            status: "error",
                            error: "0001",
                            output: "Bad value for -w !"
                        }
                        resolve(jsonRes)
                    }
                    i += 1
                    break
                case "-f":
                    jsonRes = {
                        status: "error",
                        error: "0001",
                        output: "Flood is not available !"
                    }
                    resolve(jsonRes)
                    i += 1
                    break
                case "-a":
                    jsonRes = {
                        status: "error",
                        error: "0001",
                        output: "Sound is not available !"
                    }
                    resolve(jsonRes)
                    i += 1
                    break
                default:
                    host = query[i]
                    break
            }
        }

        if(host == "") {
            jsonRes = {
                status: "error",
                error: "0001",
                output: "Please specify a host !"
            }
            resolve(jsonRes)
        }

        //CREATE COMMAND
        cmd = "ping " + host

        //TIMEOUT + COUNT
        if(timeout == "") {
            if(count == "") {
                cmd += ' -c 3'
            }
            else {
                cmd += ' -c ' + count
            }
        }
        else {
            if(count == "") {
                cmd += " -w " + timeout
            }
            else {
                cmd += ' -w ' + timeout + ' -c ' + count
            }
        }

        //INTERVAL
        if(interval != "") {
            cmd += " -i " + interval
        }

        //SIZE
        if(size != "") {
            cmd += " -s " + size
        }

        exec(cmd, function(error, stdout, stderr) {
            if (error) {
                jsonRes = {
                    status: "error",
                    error: "9999",
                    output: error
                }
                resolve(jsonRes)
            }
            else {
                jsonRes = {
                    status: "sucess",
                    output: cmd + "\n" + stdout
                }
                resolve(jsonRes)
            }
        })
    })
    
}
