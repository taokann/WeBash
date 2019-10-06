#
# File name: start.sh 
# Description: Bash script to easily start the docker container
# Authors: colivier74
# If you're a new WeBash contributor and worked on this file, please add your name here.
#
# This file is part of the WeBash project with is released under the terms of GNU Affero General Public License V3.0.
# You should have received a copy of the GNU Affero General Public License along with WeBash. If not, see <https://www.gnu.org/licenses/>.
#

#!/bin/bash
DIRECTORY=$(cd `dirname $0` && pwd)
GIT=$(type -p git)

if [ -z $GIT ]; then
    echo "WeBash needs git to work, please install it."
    exit 1 
fi

#REMOVE OLDS FILES
    #docker
rm $DIRECTORY/docker-compose.yml > /dev/null 2>&1
rm $DIRECTORY/Dockerfile > /dev/null 2>&1
rm $DIRECTORY/.env > /dev/null 2>&1
    #node
rm $DIRECTORY/npmout.txt > /dev/null 2>&1
rm $DIRECTORY/npmerr.txt > /dev/null 2>&1 

#UPDATE
$GIT -C $DIRECTORY pull
    # MAN-DB-TXT
$GIT clone https://github.com/colivier74/man-db-txt.git res/git-libs/man-db-txt
$GIT -C res/git-libs/man-db-txt pull

if [ -z $1 ]; then
    echo "Please specify a way to start Webash"
    echo "Usage : bash start.sh <way> [args ...]"
    echo ""
    echo "way : docker"
    echo "args : -p <port>"
    echo "       -n <name>"
    echo ""
    echo "way : node"
    echo "args : -p <port>"
#DOCKER
elif [ $1 = docker ]; then 
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
    echo "NAME=$NAME" >> $DIRECTORY/.env

    #run container
    $DOCKER_COMPOSE -f $DIRECTORY/docker-compose.yml up --build -d > /dev/null 2>&1

    echo "------------"
    echo "WeBash was successfully started with docker and the following parameters:"
    echo "port :" $PORT
    echo "container name:" $NAME
    echo "------------"
elif [ $1 = node ]; then 
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
else
    echo "Unknown way"
    echo "Here are the means available :"
    echo "docker"
    echo "node"
fi

#You can add a crontab for this script for update your server automatically (change the path with your's)
#* * * * * /bin/sh /home/chevro/WeBash/start.sh
