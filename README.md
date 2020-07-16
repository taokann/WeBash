# WeBash
A javascript terminal emulator for websites
A nodeJS API that provides output of commands you sent to it

## I don't understand...
Always dreamed to have your website feel like a terminal ?
Build it with WeBash ! WeBash is a contraction of 'Web' and 'Bash'.


The users will be able to navigate throught your website (or just a part of it) using commands provided by WeBash API. If you choose to use WeBash for a entire website, it will be one-page : WeBash will carry informations from other pages to bring them to the user, who does not move from your CLI.
Note that you have to build the command line interface, WeBash only provides output of commands.

## Commands
You can get the commands list by sending 'help --list' to the API.
You can suggest new commands by opening an issue on GitHub.
The project is still under developpement, important commands may be missing because we are working on them.

## How to use it ?
The requests must be sent to `https://webash.taokann.one/api/v1/<your command here>`
  
ex: `https://webash.taokann.one/api/v1/echo Hello World!`
Will return : 
  
```javascript
  {
    "status": "sucess",
    "output": "Hello World!"
  }
```
  
The testing branch is available at : `https://testing.webash.taokann.one/api/v1/`

You will get the output in response.

## Self-hosting
The `master` branch is always stable and working, whereas the `testing` branch is where the developpers work, so you should not use it. When a new feature is ready, we will merge it into `master`

To host an instance, start by cloning the repository :

```
git clone https://github.com/taokann/WeBash.git
cd WeBash
npm install
npm start
```

### .env
Customize your instance by modifying the `.env` file!

### Docker
A `docker-compose.yml` and a `Dockerfile` are available.
You can (and should) use the .env file

## Contribute
First of all, thank you for contributing!

### Adding command
To add a command, create a file named after it in `./res/commands`

Then you will have to create three functions:

`query` is an array of the command
ex: `["echo", "Hello", "World!"]`

- `run(query)` : Returns a promise, the result of your command
- `help()` : Returns a string, usage help for your function which will be displayed in `help <command>`
- `short_help()` : Returns a string, the usage help for your function, in a single line which will be displayed in `help --list`

Example with simplified `echo` :

```javascript
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
Please add at the beginning of each new file a large comment contaning:
* File name
* Description
* Author
* License note

Here is a template of what you should add:
```
/*
 *
 * File name: example.js
 * Description: example decription
 * Authors: taokann.one and cestoliv
 * If you're a new WeBash contributor and worked on this file, please add your name here.
 *
 * This file is part of the WeBash project with is released under the terms of GNU Affero General Public License V3.0.
 * You should have received a copy of the GNU Affero General Public License along with WeBash. If not, see <https://www.gnu.org/licenses/>.
 */
```

## Get involved
You can contribute to WeBash by offering new commands to it.
Clone the repo, then send a pull request with your amazing new command !


Thanks for your interest in WeBash !

## Contact
WeBash is Copyright © 2019 Tao-Kann MARTIN and Olivier CARTIER


If you have any questions, now or maybe a long time after we published this software, feel free to contact us by email : webash-at-taokann.com (both developpers will read your message).

