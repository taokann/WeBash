#!/bin/bash

#
# File name: weba.sh
# Description: Bash script to easily manage the WeBash server
# Authors: colivier74
# If you're a new WeBash contributor and worked on this file, please add your name here.
#
# This file is part of the WeBash project with is released under the terms of GNU Affero General Public License V3.0.
# You should have received a copy of the GNU Affero General Public License along with WeBash. If not, see <https://www.gnu.org/licenses/>.
#


echo "   ________________________________________________________"
echo "  /.______________________________________________. ._. ._.\\"
echo " / |______________________________________________| |_| |_| \\"
echo "/____________________________________________________________\\"
echo "|                                                            |"
echo "|                            ________        ________        |"
echo "|                           /       /       /       /        |"
echo "|                          /       /       /       /         |"
echo "|                         /       /       /       /          |"
echo "|                ________/       /_______/       /_______    |"
echo "|               /                                       /    |"
echo "|              /                                       /     |"
echo "|             /                                       /      |"
echo "|            /_______        ________        ________/       |"
echo "|                   /       /       /       /                |"
echo "|                  /       /       /       /                 |"
echo "|                 /       /       /       /                  |"
echo "|        ________/       /_______/       /_______            |"
echo "|       /                                       /            |"
echo "|      /                                       /             |"
echo "|     /                                       /              |"
echo "|    /_______        ________        ________/               |"
echo "|           /       /       /       /                        |"
echo "|          /       /       /       /                         |"
echo "|         /       /       /       /                          |"
echo "|        /_______/       /_______/                           |"
echo "|                                                            |"
echo "\                                                            /"
echo " \                                                          /"
echo "  \________________________________________________________/"
echo "        By Alnotz ;-)"
echo ""


DIRECTORY=$(cd `dirname $0` && pwd)
GIT=$(type -p git)

if [ -z $GIT ]; then
    echo "WeBash needs git to work, please install it."
    exit 1 
fi

START=true
if [ -z $1 ]; then
    echo "Do you want to start or stop yout server ?"
    echo "Please specify it with : bash webash.sh <start/stop>"
    exit 1
elif [ $1 = start ]; then
    START=true
elif [ $1 = stop ]; then
    START=false
else
    echo "Unknown action"
    echo "Here are the means available :"
    echo "  start"
    echo "  stop"
    exit 1
fi

if [ $START = true ]; then
        #UPDATE
    $GIT -C $DIRECTORY pull
        # MAN-DB-TXT
    $GIT clone https://github.com/colivier74/man-db-txt.git res/git-libs/man-db-txt
    $GIT -C res/git-libs/man-db-txt pull
fi

if [ -z $2 ]; then
    echo "Please specify a way to start/stop Webash"
    echo "Usage : bash webash.sh <start/stop> <way> [args ...]"
    echo "(no args with stop)"
    echo ""
    echo "way : docker"
    echo "  args : -p <port>"
    echo "         -n <name>"
    echo ""
    echo "  way : node"
    echo "    args : -p <port>"
    exit 1
#DOCKER
elif [ $2 = docker ]; then 
    #check for dependencies
    DOCKER_COMPOSE=$(type -p docker-compose)
    DOCKER=$(type -p docker) 
    if [ -z $DOCKER ]; then
        echo "WeBash needs docker to work, please install it."
        exit 1
    fi

    if [ -z $DOCKER_COMPOSE ]; then
        echo "WeBash needs docker-compose to work, please install it."
        exit 1
    fi

    if [ $START = true ]; then
        #copy files
        cp $DIRECTORY/deployment/docker/docker-compose_pattern.yml $DIRECTORY/docker-compose.yml > /dev/null 2>&1
        cp $DIRECTORY/deployment/docker/Dockerfile_pattern $DIRECTORY/Dockerfile > /dev/null 2>&1

        while [ -n "$1" ]; do
            case $1 in
                -p|--port) PORT=$2; shift;;
                -n|--name) NAME=$2; shift;;
            esac
            shift
        done

        if [ -z $PORT ]; then
            PORT="8085"
        fi

        if [ -z $NAME ]; then
            NAME="webash"
        fi

        touch $DIRECTORY/.env
        echo "PORT=$PORT" >> $DIRECTORY/.env
        echo "CHANGEINFILES=false" >> $DIRECTORY/.env
        echo "NAME=$NAME" >> $DIRECTORY/.env

        #run container
        $DOCKER_COMPOSE -f $DIRECTORY/docker-compose.yml up --build -d

        echo "------------"
        echo "WeBash was successfully started with docker and the following parameters:"
        echo "port :" $PORT
        echo "container name:" $NAME
        echo "------------"
        #END
    else
        #stop container
        if [ ! -f $DIRECTORY/docker-compose.yml ]; then
            echo "Container already stopped !"
            exit 1
        else 
            $DOCKER_COMPOSE -f $DIRECTORY/docker-compose.yml down --remove-orphans
        fi

        #removes files
        rm $DIRECTORY/docker-compose.yml > /dev/null 2>&1
        rm $DIRECTORY/Dockerfile > /dev/null 2>&1  
        rm $DIRECTORY/.env > /dev/null 2>&1
        echo "Webash container stopped"
        #END
    fi

#NODE
elif [ $2 = node ]; then 
    #check for dependencies
    NODE=$(type -p node)
    NPM=$(type -p npm) 
    if [ -z $NODE ]; then
        echo "WeBash needs node.js to work, please install it."
        exit 1
    fi

    if [ -z $NPM ]; then
        echo "WeBash needs npm to work, please install it."
        exit 1
    fi

    if [ $START = true ]; then
        #Install dependencies npm
        $NPM install

        while [ -n "$1" ]; do
            case $1 in
                -p|--port) PORT=$2; shift;;
            esac
            shift
        done

        if [ -z $PORT ]; then
            PORT="8085"
        fi

        touch $DIRECTORY/.env
        echo "PORT=$PORT" >> $DIRECTORY/.env

        #run container
        $NPM start > $DIRECTORY/npmout.txt 2> $DIRECTORY/npmerr.txt &

        echo "------------"
        echo "WeBash was successfully started with node.js and the following parameters:"
        echo "port :" $PORT
        echo "------------"
        #END
    else
        #stop npm
        if [ ! -f $DIRECTORY/npmout.txt ]; then
            echo "Node already stopped !"
            exit 1
        else 
            killall -SIGINT WeBash
        fi

        #removes files
        rm $DIRECTORY/npmout.txt > /dev/null 2>&1
        rm $DIRECTORY/npmerr.txt > /dev/null 2>&1 
        rm $DIRECTORY/.env > /dev/null 2>&1
        echo "Node server(s) stopped"
        #END
    fi
#else
else
    echo "Unknown way"
    echo "Here are the means available :"
    echo "docker"
    echo "node"
fi