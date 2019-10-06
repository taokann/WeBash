#
# File name: stop.sh
# Description: Bash script to easily stop the docker container
# Authors: colivier74
# If you're a new WeBash contributor and worked on this file, please add your name here.
#
# This file is part of the WeBash project with is released under the terms of GNU Affero General Public License V3.0.
# You should have received a copy of the GNU Affero General Public License along with WeBash. If not, see <https://www.gnu.org/licenses/>.
#

#!/bin/bash
DIRECTORY=$(cd `dirname $0` && pwd)

if [ -z $1 ]; then
    echo "Please specify how you started Webash"
    echo "Usage : bash stop.sh <way>"
    echo "ways : docker"
    echo "       node"
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
#node
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

######################FILES FOR EVERY WAYS
    #removes files
rm $DIRECTORY/.env > /dev/null 2>&1

else    
    echo "Unknown way"
    echo "Here are the means available :"
    echo "docker"
    echo "node"
fi
