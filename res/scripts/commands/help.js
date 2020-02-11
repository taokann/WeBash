/*
 *
 * File name: help.js
 * Description: help command
 * Authors: taokann.one and cestoliv
 * If you're a new WeBash contributor and worked on this file, please add your name here.
 *
 * This file is part of the WeBash project with is released under the terms of GNU Affero General Public License V3.0.
 * You should have received a copy of the GNU Affero General Public License along with WeBash. If not, see <https://www.gnu.org/licenses/>.
 *
 */

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
                case 'source':
                    jsonRes = {
                        status: "sucess",
                        output: source_help()
                    }
                    resolve(jsonRes)
                    break
                case 'man':
                    jsonRes = {
                        status: "sucess",
                        output: man_help()
                    }
                    resolve(jsonRes)
                    break
                case 'license':
                    jsonRes = {
                        status: "sucess",
                        output: license_help()
                    }
                    resolve(jsonRes)
                    break
                case 'server':
                    jsonRes = {
                        status: "sucess",
                        output: server_help()
                    }
                    resolve(jsonRes)
                    break
                default:
                    jsonRes = {
                        status: "error",
                        error: "0001",
                        output: no_help(query[1])
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
    "license\n" +
    "echo [arg ...]\n" +
    "ping <host or ip> [arg ...]\n" +
    "source\n" +
    "server\n" +
    "man <command> [optionnal MANWIDTH (ex: 80)]")
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

source_help = () => {
	return("source : source\nDisplays a link to source code according to the GNU AGPL license");
}

man_help = () => {
    return("man : man <command> [optionnal MANWIDTH (ex: 80)]\n" +
    "Show the man of the specified command")
}

license_help = () => {
    return("Displays the integral text of the GNU Affero General Public License under which WeBash is distributed.");
}

server_help = () => {
    return("Displays information about the server hosting WeBash.");
}
