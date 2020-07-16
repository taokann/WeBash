/*
 *
 * File name: readme.js
 * Description: readme command
 * Authors: cestoliv
 * If you're a new WeBash contributor and worked on this file, please add your name here.
 *
 * This file is part of the WeBash project with is released under the terms of GNU Affero General Public License V3.0.
 * You should have received a copy of the GNU Affero General Public License along with WeBash. If not, see <https://www.gnu.org/licenses/>.
 *
 */

let readFile = require("../utilities/readFile")

exports.run = (query) => {
    return new Promise((resolve, reject) => {
        readFile.run("./README.md", false).then((response) => {
            resolve(response)
        }).catch((response) => {
            resolve(response)
        })
    })
}

exports.help = () => {
    return("readme : readme\n" + 
    "Display the README.md of the WeBash project.")
}

exports.short_help = () => {
    return("readme")
}