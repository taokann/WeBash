var exec = require('child_process').exec

exports.run = (query) => {
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
                        resolve("Bad value for -c !")
                    }
                    i += 1
                    break
                case "-i":
                    intl = parseFloat(query[i + 1])
                    
                    if(!isNaN(intl)) {
                        interval = intl
                    }
                    else {
                        resolve("Bad value for -i !")
                    }
                    i += 1
                    break
                case "-s":
                    sze = parseFloat(query[i + 1])
                    if(!isNaN(sze)) {
                        size = sze
                    }
                    else {
                        resolve("Bad value for -s !")
                    }
                    i += 1
                    break
                case "-w":
                    tmt = parseFloat(query[i + 1])
                    if(!isNaN(tmt)) {
                        timeout = tmt
                    }
                    else {
                        resolve("Bad value for -w !")
                    }
                    i += 1
                    break
                case "-f":
                    resolve("Flood is not available !")
                    i += 1
                    break
                case "-a":
                    resolve("Sound is not available !")
                    i += 1
                    break
                default:
                    host = query[i]
                    break
            }
        }

        if(host == "") {
            resolve("Please specify a host !")
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
                resolve(error)
            }
            else {
                resolve(cmd + "\n" + stdout)
            }
        })
    })
    
}
