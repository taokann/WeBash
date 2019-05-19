exports.run = (query) => {
    return new Promise((resolve, reject) => {
        let jsonRes
        
        if(!query[1]) {
            jsonRes = {
                status: "sucess",
                output: help_help()
            }
            resolve(jsonRes)
        }
        else {
            switch(query[1]) {
                case "readme":
                    jsonRes = {
                        status: "sucess",
                        output: readme_help()
                    }
                    resolve(jsonRes)
                    break
                case 'echo':
                    jsonRes = {
                        status: "sucess",
                        output: echo_help()
                    }
                    resolve(jsonRes)
                    break
                case 'info':
                    jsonRes = {
                        status: "sucess",
                        output: info_help()
                    }
                    resolve(jsonRes)
                    break
                case 'ping':
                    jsonRes = {
                        status: "sucess",
                        output: ping_help()
                    }
                    resolve(jsonRes)
                    break
                default:
                    jsonRes = {
                        status: "error",
                        error: "0001",
                        output: no_help()
                    }
                    resolve(jsonRes)
                    break
            }
        }
    })
}

help_help = () => {
    return("WeBash, version 1\n" +
    "Here is a list of the internal orders.\n" +
    "Type help <command> to see the help of this command\n" +
    "info\n" +
    "readme\n" +
    "echo [arg ...]\n" +
    "ping <host> [arg ...]\n")
}

no_help = (command) => {
    return('No help available for "' + command + '".')
}

readme_help = () => {
    return("readme : readme\n" + 
    "Display the README.md of the WeBash project.")
}

echo_help = () => {
    return("echo : echo [arg ...]\n" +
    "Display the args, separate by a space character.")
}

info_help = () => {
    return("info : info\n" +
    "Displays information about the WeBash project.")
}

ping_help = () => {
    return("ping : ping <host or ip> [arg ...]\n" +
    "parameters : [-i interval] [-c count]\n" +
    "             [-s packetsize] [-w deadline]")
}