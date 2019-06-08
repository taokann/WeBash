/*
 *
 * File name: echo.js
 * Description: echo command
 * Authors: taokann.one and colivier74
 * If you're a new WeBash contributor and worked on this file, please add your name here.
 *
 * This file is part of the WeBash project with is released under the terms of GNU General Public License V3.0.
 * You should have received a copy of the GNU General Public License along with WeBash. If not, see <https://www.gnu.org/licenses/>.
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
