/*
 *
 * File name: server.js
 * Description: main node.js script file
 * Authors: taokann.one and colivier74
 * If you're a new WeBash contributor and worked on this file, please add your name here.
 *
 * This file is part of the WeBash project with is released under the terms of GNU General Public License V3.0.
 * You should have received a copy of the GNU General Public License along with WeBash. If not, see <https://www.gnu.org/licenses/>.
 */

var express = require("express")
var headers = require("headersfromextensions")
var fs = require("fs")

/*SCRIPTS IMPORTS*/
readFile = require("./res/scripts/readFile")
echo = require("./res/scripts/echo")
help = require("./res/scripts/help")
ping = require("./res/scripts/ping")
/*END SCRIPTS IMPORTS*/

app = express()

app.get("/api/v1/:query", (req, res) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Content-Type', headers.get("json"))

    let jsonRes
    query = req.params.query
    query = query.split(" ")

    /*
    JSON TO RETURN :

    Sucess :
        let jsonRes = {
            status: "sucess",
            output: "an output"
        }
    
    Error : 
        let jsonRes = {
            status: "error",
            error: "error code",
            output: "an output"
        }

    ERRORS CODES : 
    0000 : nonexistent command
    0001 : arg(s) error
    0002 : a required file don't exist

    9999 : undefined error
    */

    switch(query[0]) {
        case "readme":
            readFile.run("README.md", false).then((response) => {
                res.send(response)
            })
            break
        case "echo":
            echo.run(query).then((response) => {
                res.send(response)
            })
            break
        case 'help':
            help.run(query).then((response) => {
                res.send(response)
            })
            break
        case 'ping':
            ping.run(query).then((response) => {
                res.send(response)
            })
            break
        case "info":
            jsonRes = {
                status: "sucess",
                output: "This is WeBash, a web-based terminal emulator.\n\rYou can get the list of commands by typing 'help'.\n\rFor more info type 'readme' or visit our repository on http://github.com/taokann/WeBash"
            }
            res.send(jsonRes)
            break
        default:
            jsonRes = {
                status: "sucess",
                output: "Command not found - type 'help' to get the list of commands"
            }
            res.send(jsonRes)
            break
    }
})
.use((req, res, next) => {
    res.status(404)
    res.send()
})

app.listen(80)
