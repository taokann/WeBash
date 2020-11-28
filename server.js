/*
 *
 * File name: server.js
 * Description: main node.js script file
 * Authors: cestoliv
 * If you're a new WeBash contributor and worked on this file, please add your name here.
 *
 * This file is part of the WeBash project with is released under the terms of GNU Affero General Public License V3.0.
 * You should have received a copy of the GNU Affero General Public License along with WeBash. If not, see <https://www.gnu.org/licenses/>.
 *
 */

const express = require("express")
const session = require('express-session')
const sharedsession = require("express-socket.io-session")
const dotenv = require('dotenv')
dotenv.config()

const parser = require("./res/utilities/parser")

const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server, {
    cors: {
        origin: '*'
    }
})

var sessionMiddleware = session({
    secret: 'webash is awesome',
    resave: true,
    saveUninitialized: true
})

app.use(sessionMiddleware)

/*
    we can't use shared session (between express and socket.io)
        express : req.session
        socket.io : socket.handshake.session
*/
io.use(sharedsession(sessionMiddleware, {
    autoSave: true
}))

io.sockets.on('connection', (socket) => {
    socket.on('command', (command_args) => {
        /*
            command_args structure :
            {
                command_id: str | int; a random id for your request,
                command: str; the unix-like command,
                colored: boolean; should the answer be colored ?
            }
        */

        /*
            answer structure :
            {
                ended: boolean; is the command return finished ?,
                command_id: str | int; your random id,
                text: str; answer of your command, may be partial,
                order: int; order of the answer (for partial answer)
            }
        */

        if(typeof(command_args) == "object") { // Is it really an object that is given?
            if("command" in command_args && "command_id" in command_args) { // Minimum attributes
                command_args.parsed_command = parser.parse(command_args.command)

                command_args.parsed_command = command_args.parsed_command[0]
    
                try {
                    // Verifying the existence of the module
                    require("./res/commands/" + command_args.parsed_command.program).run(command_args, socket)
                }
                catch (err) {
                    socket.emit("command_answer", {
                        ended: true,
                        command_id: command_args.command_id,
                        text: "Command not found - type 'help' to get the list of commands"
                    })
                }
            }
            else {
                socket.emit("command_answer", {
                    ended: true,
                    text: "Your WeBash object is incomplete"
                })
            }
        }
        else {
            socket.emit("command_answer", {
                ended: true,
                text: "Bad data structure, you must send an object"
            })
        }
    })
})

server.listen(process.env.PORT, function () {
    console.log(`Server running on port ${process.env.PORT} !`)
})