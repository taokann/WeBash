# WeBash
A javascript terminal emulator for websites
A nodeJS API that provides output of commands you sent to it

## I don't understand...
Always dreamed to have your website feel like a terminal ?
Build it with WeBash ! WeBash is a contraction of 'Web' and 'Bash'.


The users will be able to navigate throught your website (or just a part of it) using commands provided by WeBash API. If you choose to use WeBash for a entire website, it will be one-page : WeBash will carry informations from other pages to bring them to the user, who does not move from your CLI.
Note that you have to build the command line interface, WeBash only provides output of commands.

## Commands
You can get the commands list by sending 'help' to the API.
You can suggest new commands by opening an issue on GitHub.
The project is still under developpement, important commands may be missing because we are working on them.

## How to use it ?
The requests must be sent to https://webash.colivier.dev/api/v1/<your command here>
You will get the output in response.

## Self-hosting
The `master` branch is always stable and working, whereas the `testing` branch is where the developpers work, so you should not use it. When a new feature is ready, we will merge it into `master`

**You can update your instance by simply stop and rerun your server with the scripts ;)**

To host an instance, start by cloning the repository :

`git clone https://github.com/taokann/WeBash.git`

`cd WeBash`

Now you have to run `start.sh` with the way you want to use in parameter, here are the procedures according to the ways :

### Docker
Run `bash start.sh docker`.
You can specify a **local ip** for the server with `-i` :

`bash start.sh docker -i 172.22.0.100`

A **port** with `-p` :

`bash start.sh docker -p 8085`

A **name** for the container with `-n` :

`bash start.sh docker -n webash`

#### Defaults params :
port : 8085

container name: webash

local ip: 172.22.0.100(:80)

#### Properly stop the container :
`bash stop.sh docker`

## Free software
All WeBash software and source code is free and open-source software (*free* refers to freedom, not price), you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, version 3 of the license.
For more info see 'LICENSE' file in repo.


This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License V3.0 for more details.


You should have received a copy of the GNU General Public License along with this program, in 'LICENSE' file of the repo. If not, see <https://www.gnu.org/licenses/>.

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
 * Authors: taokann.one and colivier74
 * If you're a new WeBash contributor and worked on this file, please add your name here.
 *
 * This file is part of the WeBash project with is released under the terms of GNU General Public License V3.0.
 * You should have received a copy of the GNU General Public License along with WeBash. If not, see <https://www.gnu.org/licenses/>.
 */
```

## Get involved
You can contribute to WeBash by offering new commands to it.
Clone the repo, then send a pull request with your amazing new command !


Thanks for your interest in WeBash !

## Contact
WeBash is Copyright © 2019 Tao-Kann MARTIN and Olivier CARTIER
If you have any questions, now or maybe a long time after we published this software, feel free to contact us by email : webash<at>taokann.com (both developpers will read your message).

