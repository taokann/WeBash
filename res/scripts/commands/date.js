/*
 *
 * File name: date.js
 * Description: date unix command
 * Authors: taokann.one
 * If you're a new WeBash contributor and worked on this file, please add your name here.
 *
 * This file is part of the WeBash project with is released under the terms of GNU Affero General Public License V3.0.
 * You should have received a copy of the GNU Affero General Public License along with WeBash. If not, see <https://www.gnu.org/licenses/>.
 *
 */

exports.run = (query) => {
    return new Promise((resolve, reject) => {
        query.shift()
        let date = new Date();
        let dateString = date.toString();
        let jsonRes = {
            status: "sucess",
            output: dateString
        }
        resolve(jsonRes)
    })
}
