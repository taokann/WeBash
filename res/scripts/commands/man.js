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
var readFile = require("../tools/readFile")
var colors = require("../tools/colors")

exports.run = (query) => {
    return new Promise((resolve, reject) => {
        let jsonRes

        if(query[1] && query[1] != "") {
            let cmd = query[0] + " " + query[1]
            if(query[2] && query[2] != "") {
                cmd = "export MANWIDTH=" + query[2] + ";" + cmd
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
                    if(!query[2] || query[2] == "") {
                        stdout += "\n\n" + colors.format("You can specify a MANWIDTH like that :\nman <command> [optionnal MANWIDTH (ex: 80)]", "white", "default", "bold")
                    }
                    jsonRes = {
                        status: "sucess",
                        output: cmd + "\n" + stdout
                    }
                    resolve(jsonRes)
                }
            })
        }
        else {
            jsonRes = {
                status: "error",
                error: "0001",
                output: "Please specify a command for man:\n" +
                "man <command>"
            }
            resolve(jsonRes)
        }
    })
}
