/*
 *
 * File name: res/commands/echo.js
 * Description: the echo command
 * Authors: cestoliv
 * If you're a new WeBash contributor and worked on this file, please add your name here.
 *
 * This file is part of the WeBash project with is released under the terms of GNU Affero General Public License V3.0.
 * You should have received a copy of the GNU Affero General Public License along with WeBash. If not, see <https://www.gnu.org/licenses/>.
 *
 */

exports.run = (command_args, socket) => {
    return new Promise((resolve, reject) => {
        let toEcho = command_args.parsed_command.args.join(" ") + "\n"

        socket.emit("command_answer", {
            ended: true,
            command_id: command_args.command_id,
            text: toEcho,
            order: 0
        })

        resolve()
    })
}

exports.help = () => {
    return("echo : echo [arg ...]\n" +
    "Display the args, separate by a space character.")
}

exports.short_help = () => {
    return("echo [arg ...]")
}