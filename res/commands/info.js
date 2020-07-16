/*
 *
 * File name: man.js
 * Description: man command
 * Authors: cestoliv
 * If you're a new WeBash contributor and worked on this file, please add your name here.
 *
 * This file is part of the WeBash project with is released under the terms of GNU Affero General Public License V3.0.
 * You should have received a copy of the GNU Affero General Public License along with WeBash. If not, see <https://www.gnu.org/licenses/>.
 *
 */

exports.run = (query) => {
    return new Promise((resolve, reject) => {
        let jsonRes = {
            status: "sucess",
            output: "This is WeBash, a web-based terminal emulator.\n\rYou can get the list of commands by typing 'help'.\n\rFor more info type 'readme' or visit our repository on http://github.com/taokann/WeBash"
        }
        resolve(jsonRes)
    })
}

exports.help = () => {
    return("info : info\n" +
        "Displays information about the WeBash project.")
}

exports.short_help = () => {
    return("info")
}
