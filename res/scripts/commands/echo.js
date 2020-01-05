/*
 *
 * File name: echo.js
 * Description: echo command
 * Authors: taokann.one and cestoliv
 * If you're a new WeBash contributor and worked on this file, please add your name here.
 *
 * This file is part of the WeBash project with is released under the terms of GNU Affero General Public License V3.0.
 * You should have received a copy of the GNU Affero General Public License along with WeBash. If not, see <https://www.gnu.org/licenses/>.
 *
 */

exports.run = (query) => {
    return new Promise((resolve, reject) => {
        query.shift()
        let toEcho = query.join(" ")

        let jsonRes = {
            status: "sucess",
            output: toEcho
        }
        resolve(jsonRes)
    })
}
