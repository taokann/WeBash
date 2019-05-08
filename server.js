var express = require("express")
var headers = require("headersfromextensions")

/*SCRIPTS IMPORTS*/
example = require("./res/scripts/example")
/*END SCRIPTS IMPORTS*/

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}

app = express()

app.use(allowCrossDomain)

app.get("/api/v1/:query", (req, res) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Content-Type', headers.get("txt"))

    query = req.params.query
    query = query.split(" ")

    switch(query[0]) {
        case "example":
            example.run(query).then((response) => {
                res.send(response)
            })
            break
        default:
            res.send("command not found")
            break
    }
})
.use((req, res, next) => {
    res.status(404)
    res.send()
})

app.listen(80)