exports.run = (query) => {
    return new Promise((resolve, reject) => {
        resolve('example passed with command : ' + query)
    })
}