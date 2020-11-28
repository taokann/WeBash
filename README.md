# WeBash
An API based on Socket.io and NodeJS which emulates a BASH terminal!

## I don't understand...
Always dreamed to have your website feel like a terminal ?
Build it with WeBash ! WeBash is a contraction of 'Web' and 'Bash'.

WeBash is an API based on Socket.io which will allow you to send bash commands and get their outputs.

You can, with WeBash, create a custom web-based terminal!

## How to use
The WeBash API is based on socket.io, here is how to use it with a javascript script. You will find several usage examples in `examples/`

```javascript
var socket = io.connect("https://webash.cestoliv.com")

var command_params = {
    colored: false,
    command_id: Math.random().toString(16).substr(2, 8), // random string
    command: "echo Hello WeBash!"
}
socket.emit("command", command_params) // send the command

socket.on('command_answer', (answer) => {
    console.log(answer.text)
})
```

Here is the structure of the data you need to send.
```javascript
/*
    command_args structure :
    {
        command_id: str | int; a random id for your request,
        command: str; the unix-like command,
        colored: boolean; should the answer be colored ?
    }
*/
```
And the structure of the data that you will receive.
```javascript
/*
    answer structure :
    {
        ended: boolean; is the command return finished ?,
        command_id: str | int; your random id,
        text: str; answer of your command, may be partial,
        order: int; order of the answer (for partial answer)
    }
*/
```

## Self-hosting
The `master` branch is always stable and working, whereas the `testing` branch is where the developers work, so you should not use it. When a new feature is ready, we will merge it into `master`.

To host an instance, start by cloning the repository :

```
git clone https://github.com/taokann/WeBash.git
cd WeBash
npm install
npm start
```

### Systemd
*You can use webash.service to start the bot as a systemd service.*

    sed -i "s?^WorkingDirectory=.*?WorkingDirectory=$(pwd)?g" webash.service

    cp webash.service /etc/systemd/system/webash.service

    sudo systemctl start webash

### .env
Customize your instance by modifying the `.env` file!
- `PORT` : Were your WeBash instance will listen

## Contribute
First of all, thank you for contributing!

### Adding command
To add a command, create a file named after it in `res/commands`

Then you will have to create three functions:

- `run(query)` : Returns a promise, resolved when your command is ended
- `help()` : Returns a string, usage help for your function which will be displayed in `help <command>`
- `short_help()` : Returns a string, the usage help for your function, in a single line which will be displayed in `help --list`

Example with simplified `echo.js` :

```javascript
/*
 *
 * File name: res/commands/echo.js
 * Description: the echo command
 * Authors: cestoliv
 * If you're a new WeBash contributor and worked on this file, please add your name here.
 *
 * This file is part of the WeBash project with is released under the terms of GNU Affero General Public License V3.0.
 * You should have received a copy of the GNU Affero General Public License along with WeBash. If not, see <https://www.gnu.org/licenses/>.
 *
 */

exports.run = (command_args, socket) => {
    return new Promise((resolve, reject) => {
        query.shift()
        let toEcho = query.join(" ")

        socket.emit("command_answer", {
            ended: false,
            command_id: command_args.command_id,
            text: toEcho
        })

        resolve()
    })
}

exports.help = () => {
    return("echo : echo [arg ...]\n" +
    "Display the args, separate by a space character.")
}

exports.short_help = () => {
    return("echo [arg ...]")
}
```

## Free software
All WeBash software and source code is free and open-source software (*free* refers to freedom, not price), you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, version 3.0 of the license.
For more info see 'LICENSE' file in repo.


This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License V3.0 for more details.


You should have received a copy of the GNU Affero General Public License along with this program, in 'LICENSE' file of the repo. If not, see <https://www.gnu.org/licenses/>.

### License note
Please add at the beginning of each new file a large comment containing:
* File name
* Description
* Author
* License note

Here is a template of what you should add:
```
/*
 *
 * File name: path/to/example.js
 * Description: example description
 * Authors: taokann.one and cestoliv
 * If you're a new WeBash contributor and worked on this file, please add your name here.
 *
 * This file is part of the WeBash project with is released under the terms of GNU Affero General Public License V3.0.
 * You should have received a copy of the GNU Affero General Public License along with WeBash. If not, see <https://www.gnu.org/licenses/>.
 */
```

## Contact
WeBash is Copyright © 2019 Tao-Kann MARTIN and Olivier CARTIER


If you have any questions, now or maybe a long time after we published this software, feel free to contact us by email !
[cestoliv](mailto:me@cestoliv.com?subject=[GitHub]%20WeBash)
webash-at-taokann.com (both developers will read your message).

