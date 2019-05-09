var express = require("express")
var headers = require("headersfromextensions")
var fs = require("fs")

/*SCRIPTS IMPORTS*/
readFile = require("./res/scripts/readFile")
/*END SCRIPTS IMPORTS*/

app = express()

app.get("/api/v1/:query", (req, res) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Content-Type', headers.get("txt"))

    query = req.params.query
    query = query.split(" ")

    switch(query[0]) {
        case "readme":
            readFile.run("README.md", false).then((response) => {
                res.send(response)
            })
            break
        case "info":
            res.send("This is WeBash, a web-based terminal emulator.")
            break
        default:
            res.send("Command not found")
            break
    }
})
.use((req, res, next) => {
    res.status(404)
    res.send()
})

app.listen(80)
