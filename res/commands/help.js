/*
 *
 * File name: help.js
 * Description: help command
 * Authors: taokann.one and cestoliv
 * If you're a new WeBash contributor and worked on this file, please add your name here.
 *
 * This file is part of the WeBash project with is released under the terms of GNU Affero General Public License V3.0.
 * You should have received a copy of the GNU Affero General Public License along with WeBash. If not, see <https://www.gnu.org/licenses/>.
 *
 */

var formatBash = require("../utilities/formatBash")
var fs = require("fs")

exports.run = (query) => {
    return new Promise((resolve, reject) => {

        if(!query[1]) {
            jsonRes = {
                status: "sucess",
                output: "WeBash, version 1\n" +
                "Show help for every available commands.\n" +
                "Type " + formatBash.formatBash("help --list", "cyan") + " to see a list of the commands"
            }
            resolve(jsonRes)
        }
        else if(query[1] == "--list" || query[1] == "-l") {
            fs.readdir("./res/commands", function (err, files) {
                if (err) {
                    return console.log('Unable to scan directory: ' + err)
                }

                let short_helps = ""
                files.forEach(function (file) {
                    short_helps += "    " + require("./" + file).short_help() + "\n"
                })                    

                jsonRes = {
                    status: "sucess",
                    output: "WeBash, version 1\n" +
                    "Here is a list of the commands.\n" +
                    "Type help <command> to see the help of this command\n\n" +
                    "COMMANDS :\n" + short_helps 
                }
                resolve(jsonRes)
            })
        }
        else {
            try {
                require("./" + query[1])
            }
            catch (err) {
                jsonRes = {
                    status: "sucess",
                    output: formatBash.formatBash("Command not found - type 'help' to get the list of commands", "red")
                }
                resolve(jsonRes)
            }

            console.log(require("./" + query[1]).help())


            jsonRes = {
                status: "sucess",
                output: require("./" + query[1]).help()
            }
            resolve(jsonRes)
        }
    })
}

exports.help = () => {
    return("help : help <command>\n" +
    "show help for <command>")
}

exports.short_help = () => {
    return("help <command>")
}