/*
 *
 * File name: server.js
 * Description: infos about server
 * Authors: colivier74
 * If you're a new WeBash contributor and worked on this file, please add your name here.
 *
 * This file is part of the WeBash project with is released under the terms of GNU Affero General Public License V3.0.
 * You should have received a copy of the GNU Affero General Public License along with WeBash. If not, see <https://www.gnu.org/licenses/>.
 *
 */
var osU = require('os-utils')
var os = require('os')

var time = require('../tools/time')

exports.run = (query) => {
    return new Promise((resolve, reject) => {
        let serverString = "" +
"    ________________________________________________________\n"+
"  /.______________________________________________. ._. ._.\\ \n"+
" / |______________________________________________| |_| |_| \\ \n"+
"/____________________________________________________________\\ \n"+
"|                                                            |\n"+
"|                            ________        ________        |\n"+
"|                           /       /       /       /        |\n"+
"|                          /       /       /       /         |\n"+
"|                         /       /       /       /          |\n"+
"|                ________/       /_______/       /_______    |\n"+
"|               /                                       /    |\n"+
"|              /                                       /     |\n"+
"|             /                                       /      |\n"+
"|            /_______        ________        ________/       |\n"+
"|                   /       /       /       /                |\n"+
"|                  /       /       /       /                 |\n"+
"|                 /       /       /       /                  |\n"+
"|        ________/       /_______/       /_______            |\n"+
"|       /                                       /            |\n"+
"|      /                                       /             |\n"+
"|     /                                       /              |\n"+
"|    /_______        ________        ________/               |\n"+
"|           /       /       /       /                        |\n"+
"|          /       /       /       /                         |\n"+
"|         /       /       /       /                          |\n"+
"|        /_______/       /_______/                           |\n"+
"|                                                            |\n"+
"\\                                                            /\n"+
" \\                                                          /\n"+
"  \\________________________________________________________/\n"+
"        By Alnotz ;-)\n"

        osU.cpuUsage(function(v){
            /*CPU*/
            cpuStr = v*100+""
            cpuStr = cpuStr.substr(0, 3)
            if(cpuStr.endsWith(".")) {
                cpuStr = cpuStr.substr(0, 2)
            }
            serverString += 'CPU Usage : ' + cpuStr + "%"

            /*PLATEFORM*/
            serverString += "\nPlateform : " + osU.platform()

            /*MEMORY*/
            memStr = osU.freememPercentage()*100 + ""
            memStr = memStr.substr(0, 3)
            if(memStr.endsWith(".")) {
                memStr = memStr.substr(0, 2)
            }

            totalMemStr = osU.totalmem()+""
            totalMemStr = totalMemStr.split(".")[0]

            serverString += "\nMemory : " + totalMemStr + "mo (free : " + memStr  + "%)"

            /*UPTIME*/
            serverString += "\nUptime : " + time.sToTime(os.uptime())

            let jsonRes = {
                status: "sucess",
                output: serverString
            }
            resolve(jsonRes)
        })
    })
}
