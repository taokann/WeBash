exports.run = (query) => {
    return new Promise((resolve, reject) => {
        if(!query[1]) {
            resolve(help_help())
        }
        else {
            switch(query[1]) {
                case "readme":
                    resolve(readme_help())
                    break
                case 'echo':
                    resolve(echo_help())
                    break
                case 'info':
                    resolve(info_help())
                    break
                case 'ping':
                    resolve(ping_help())
                    break
                default:
                    resolve(no_help())
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