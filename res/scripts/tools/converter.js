exports.bytesTo = (toContert, convertIn = "mb") => {
    switch(convertIn) {
        case "kb":
            return(Math.round(toContert/1000))
        case "mb":
            return(Math.round(toContert/1000000))
        case "gb":
            return(Math.round(toContert/1000000000))
        case "tb":
            return(Math.round(toContert/1000000000000))
    }
}