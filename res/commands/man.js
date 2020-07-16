/*
 *
 * File name: man.js
 * Description: man command
 * Authors: taokann.one and cestoliv
 * If you're a new WeBash contributor and worked on this file, please add your name here.
 *
 * This file is part of the WeBash project with is released under the terms of GNU Affero General Public License V3.0.
 * You should have received a copy of the GNU Affero General Public License along with WeBash. If not, see <https://www.gnu.org/licenses/>.
 *
 */

var exec = require('child_process').exec

var formatBash = require("../utilities/formatBash")

exports.run = (query) => {
    return new Promise((resolve, reject) => {
        let jsonRes

        let cmd = query[0] + " " + query[1]

        exec(cmd, function(error, stdout, stderr) {
            if (error) {
                jsonRes = {
                    status: "error",
                    output: formatBash.formatBash(stderr, "red")
                }
                resolve(jsonRes)
            }
            else {
                jsonRes = {
                    status: "sucess",
                    output: stdout
                }
                resolve(jsonRes)
            }
        })
    })
}

exports.help = () => {
    return("man : man <command>\n" +
    "show man page of <command>")
}

exports.short_help = () => {
    return("man <command>")
}
