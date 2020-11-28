exports.parse = (commands_string) => {
    commands_array = []
  
    commands_parts = commands_string.split("&&")
  
    commands_parts.forEach((command) => {
        commands_array.push(parse_command(command.trim()))
    })
  
    return commands_array
}

parse_command = (command_string) => {
    command_object = {}
    command_parts = command_string.split(" ")

    // reassembly of the strings ( ['"Hello', 'World"' ] => [ '"Hello World"' ] )
    command_parts = concatenate_string_from_command(command_parts)

    for(i = 0; i < command_parts.length; i++) {
        if(i === 0) {
            command_object.program = command_parts[i]
        }
        else {
            // ex: '-n args'
            if(command_parts[i].startsWith("-")) {
                if(!("params" in command_object)) {
                    command_object.params = {}
                }

                // ex: '--test="hey"'
                if(command_parts[i].includes("=")) {
                    let parts = command_parts[i].split("=")

                    // [ '"hey', 'la"' ] => [ '"hey la"' ]
                    args = concatenate_string_from_command(
                        [parts[1]]
                        .concat(command_parts.slice(i+1))
                    )

                    // "hey" => 0 "hay la" => 1
                    args_size = command_parts.slice(i+1).length - args.length + 1
                    i += args_size

                    arg = args[0]
                    command_object.params[parts[0]] = arg
                }
                // ex: 
                else {
                    command_object.params[command_parts[i]] = ""
                }
            }
            else {
                if(!("args" in command_object)) {
                    command_object.args = []
                }
                command_object.args.push(command_parts[i])
            }
        }
    }

    return command_object
}

concatenate_string_from_command = (command_parts) => {
    for(concat_i = 0; concat_i < command_parts.length; concat_i++) {
        if(command_parts[concat_i].startsWith('"')) {
            while(!command_parts[concat_i].endsWith('"')) {
                command_parts[concat_i] += " " + command_parts[concat_i+1]
                command_parts = command_parts.slice(0, concat_i+1)
                    .concat(
                        command_parts.slice(concat_i+2, command_parts.length
                    )
                ) // remove concat_i+1 from array
            }
        }
        else if(command_parts[concat_i].startsWith("'")) {
            while(!command_parts[concat_i].endsWith("'")) {
                command_parts[concat_i] += " " + command_parts[concat_i+1]
                command_parts = command_parts.slice(0, concat_i+1)
                    .concat(
                        command_parts.slice(concat_i+2, command_parts.length
                    )
                ) // remove concat_i+1 from array
            }
        }
    }

    return command_parts
}