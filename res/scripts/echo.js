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