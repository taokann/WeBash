#
# File name: stop.sh
# Description: Bash script to easily stop the docker container
# Authors: colivier74
# If you're a new WeBash contributor and worked on this file, please add you name here.
#
# This file is part of the WeBash project with is released under the terms of GNU General Public License V3.0.
# You should have recieved a copy of it along with this file, if not, please write to :
# Free Software Foundation, Inc., 51 Franklin Street, Fifth floor, Boston, MA 02110-1301 USA.
#

#!/bin/bash
DIRECTORY=$(cd `dirname $0` && pwd)

if [ -z $1 ]; then
    echo "Please specify how you started Webash"
    echo "Usage : bash stop.sh <way>"
    echo "ways : docker"
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
    if [ ! -f $DIRECTORY/.env ]; then
        echo "Container already stopped !"
        exit 1
    else 
        $DOCKER_COMPOSE -f $DIRECTORY/docker-compose.yml down --remove-orphans
    fi
    

    #removes files
rm $DIRECTORY/docker-compose.yml > /dev/null 2>&1
rm $DIRECTORY/Dockerfile > /dev/null 2>&1
rm $DIRECTORY/.env > /dev/null 2>&1

else    
    echo "Unknown way"
    echo "Here are the means available :"
    echo "docker"
fi
