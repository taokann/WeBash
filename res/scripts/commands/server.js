/*
 *
 * File name: server.js
 * Description: infos about server
 * Authors: cestoliv
 * If you're a new WeBash contributor and worked on this file, please add your name here.
 *
 * This file is part of the WeBash project with is released under the terms of GNU Affero General Public License V3.0.
 * You should have received a copy of the GNU Affero General Public License along with WeBash. If not, see <https://www.gnu.org/licenses/>.
 *
 */
var osU = require('os-utils')
var disk = require('diskusage')
var os = require('os')
var uname = require('node-uname')

var time = require('../tools/time')
var converter = require('../tools/converter')

exports.run = (query, host) => {
    return new Promise((resolve, reject) => {
        osU.cpuUsage(function(v){

            /*HOST*/
            let hostStrFin = "Host : " + host

            /*DATE*/
            let dateStrFin = "Date : " + new Date().toUTCString()

            /*CPU*/
            cpuStr = v*100+""
            cpuStr = cpuStr.substr(0, 3)
            if(cpuStr.endsWith(".")) {
                cpuStr = cpuStr.substr(0, 2)
            }
            let cpuStrFin = 'CPU Usage : ' + cpuStr + "%"

            /*PLATEFORM*/
            let unameObj = uname.uname()
            let platformStrFin = "OS : " + unameObj.nodename + " " + unameObj.sysname + " " + unameObj.machine + " " + unameObj.release

            /*MEMORY*/
            memStr = osU.freememPercentage()*100 + ""
            memStr = memStr.substr(0, 3)
            if(memStr.endsWith(".")) {
                memStr = memStr.substr(0, 2)
            }

            totalMemStr = osU.totalmem()+""
            totalMemStr = totalMemStr.split(".")[0]

            let memStrFin = "RAM : " + totalMemStr + "mo (free : " + memStr  + "%)"

            /*UPTIME*/
            let uptimeStrFin = "Uptime : " + time.sToTime(os.uptime())


            /*DISK USAGE*/
            let path = os.platform() === 'win32' ? 'c:' : '/'
            disk.check(path, function(err, info) {
                if (err) {
                    console.error(err)
                }

                let free = converter.bytesTo(info.free, "gb")
                let total = converter.bytesTo(info.total, "gb")
                let used = total - free
                let percent = Math.round(used / total * 100)

                let diskStringFin = "Disk : " + used + "G / " + total + "G (" + percent + "%)"
                
                let serverString = "" +
                    "   _______________________________\n" +
                    "  /._____________________. ._. ._.\\\n" +
                    " / |_____________________| |_| |_| \\    SERVER INFO\n" +
                    "/___________________________________\\   (the api host)\n" +
                    "|                                   |\n" +
                    "|               _____     _____     |   " + hostStrFin + "\n" +
                    "|              /    /    /    /     |   " + dateStrFin + "\n" +
                    "|        _____/    /____/    /____  |   " + platformStrFin + "\n" +
                    "|       /                        /  |   " + cpuStrFin + "\n" +
                    "|      /____     _____     _____/   |   " + memStrFin + "\n" +
                    "|          /    /    /    /         |   " + diskStringFin + "\n" +
                    "|    _____/    /____/    /____      |   " + uptimeStrFin + "\n" +
                    "|   /                        /      |\n" +
                    "|  /____     _____     _____/       |\n" +
                    "|      /    /    /    /             |\n" +
                    "|     /____/    /____/              |\n" +
                    "\\                                   /\n" +
                    " \\_________________________________/"


                let jsonRes = {
                    status: "sucess",
                    output: serverString
                }
                resolve(jsonRes)
            })
        })
    })
}
