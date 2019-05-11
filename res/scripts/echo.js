exports.run = (query) => {
    return new Promise((resolve, reject) => {
        query.shift()
        let toEcho = query.join(" ")

        resolve(toEcho)
    })
}