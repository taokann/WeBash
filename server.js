var express = require("express")
var headers = require("headersfromextensions")

/*SCRIPTS IMPORTS*/
example = require("./res/scripts/example")
/*END SCRIPTS IMPORTS*/

app = express()

app.get("/api/v1/:query", (req, res) => {
    query = req.params.query
    query = query.split(" ")

    switch(query[0]) {
        case "example":
            example.run(query).then((response) => {
                res.send(response)
            })
    }
})
//NOT SPECIFIED
.use((req, res, next) => {
    res.redirect('/')
})

app.listen(80)