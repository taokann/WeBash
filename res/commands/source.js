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

exports.run = (query) => {
    return new Promise((resolve, reject) => {
        let jsonRes = {
            status: "sucess",
            output: "According to the GNU Affero General Public License, you will find the source code of this program at https://github.com/taokann/WeBash/"
        }
        resolve(jsonRes)
    })
}

exports.help = () => {
    return("source : source\n" +
        "Displays sources of the WeBash project.")
}

exports.short_help = () => {
    return("source")
}
