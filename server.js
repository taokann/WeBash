/*
 *
 * File name: server.js
 * Description: main node.js script file
 * Authors: taokann.one and cestoliv
 * If you're a new WeBash contributor and worked on this file, please add your name here.
 *
 * This file is part of the WeBash project with is released under the terms of GNU Affero General Public License V3.0.
 * You should have received a copy of the GNU Affero General Public License along with WeBash. If not, see <https://www.gnu.org/licenses/>.
 */

var express = require("express")
var mime_ext = require('mimetype-extension')
const dotenv = require('dotenv')
dotenv.config()

var formatBash = require("./res/utilities/formatBash")

app = express()

app.get("/api/v1/:query", (req, res) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Content-Type', mime_ext.get("json"))

    query = req.params.query
    query = query.split(" ")

    try {
        require("./res/commands/" + query[0])
    }
    catch (err) {
        jsonRes = {
            status: "sucess",
            output: formatBash.formatBash("Command not found - type 'help' to get the list of commands", "red")
        }
        res.send(jsonRes)
    }

    require("./res/commands/" + query[0]).run(query).then((response) => {
        res.send(response)
    })
})
.use((req, res, next) => {
    res.status(404)
    res.send()
})

app.listen(process.env.PORT)
console.log("WeBash started on port : " + process.env.PORT)