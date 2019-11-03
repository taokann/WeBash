/*
 *
 * File name: server.js
 * Description: infos about server
 * Authors: colivier74
 * If you're a new WeBash contributor and worked on this file, please add your name here.
 *
 * This file is part of the WeBash project with is released under the terms of GNU Affero General Public License V3.0.
 * You should have received a copy of the GNU Affero General Public License along with WeBash. If not, see <https://www.gnu.org/licenses/>.
 *
 */

exports.run = (query) => {
    return new Promise((resolve, reject) => {
        let serverString = "" +
"    ________________________________________________________\n"+
"  /.______________________________________________. ._. ._.\\ \n"+
" / |______________________________________________| |_| |_| \\ \n"+
"/____________________________________________________________\\ \n"+
"|                                                            |\n"+
"|                            ________        ________        |\n"+
"|                           /       /       /       /        |\n"+
"|                          /       /       /       /         |\n"+
"|                         /       /       /       /          |\n"+
"|                ________/       /_______/       /_______    |\n"+
"|               /                                       /    |\n"+
"|              /                                       /     |\n"+
"|             /                                       /      |\n"+
"|            /_______        ________        ________/       |\n"+
"|                   /       /       /       /                |\n"+
"|                  /       /       /       /                 |\n"+
"|                 /       /       /       /                  |\n"+
"|        ________/       /_______/       /_______            |\n"+
"|       /                                       /            |\n"+
"|      /                                       /             |\n"+
"|     /                                       /              |\n"+
"|    /_______        ________        ________/               |\n"+
"|           /       /       /       /                        |\n"+
"|          /       /       /       /                         |\n"+
"|         /       /       /       /                          |\n"+
"|        /_______/       /_______/                           |\n"+
"|                                                            |\n"+
"\\                                                            /\n"+
" \\                                                          /\n"+
"  \\________________________________________________________/\n"+
"        By Alnotz ;-)"

        let jsonRes = {
            status: "sucess",
            output: serverString
        }
        resolve(jsonRes)
    })
}
