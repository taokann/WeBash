/*
 *
 * File name: echo.js
 * Description: echo command
 * Authors: taokann.one and colivier74
 * If you're a new WeBash contributor and worked on this file, please add you name here.
 *
 * This file is part of the WeBash project with is released under the terms of GNU General Public License V3.0.
 * You should have recieved a copy of it along with this file, if not, please write to :
 * Free Software Foundation, Inc., 51 Franklin Street, Fifth floor, Boston, MA 02110-1301 USA.
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
