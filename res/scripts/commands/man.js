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

var readFile = require("../tools/readFile")

exports.run = (query) => {
    return new Promise((resolve, reject) => {
        let jsonRes

        if(query[1] && query[1] != "") {
            let cmd = query[0] + " " + query[1]
            readFile.run("./res/git-libs/man-db-txt/man-txt/" + query[1] + ".txt", false).then((response) => {
                jsonRes = {
                    status: "sucess",
                    output: cmd + "\n" + response.output
                }
                resolve(jsonRes)
            }).catch((response) => {
                jsonRes = {
                    status: "error",
                    error: "0001",
                    output: query[1] + " unavailable in man (github.com/cestoliv/man-db-txt)"
                }
                resolve(jsonRes)
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
