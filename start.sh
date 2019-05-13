#!/bin/bash
DIRECTORY=$(cd `dirname $0` && pwd)
GIT=$(type -p git)
DOCKER_COMPOSE=$(type -p docker-compose)
DOCKER=$(type -p docker) 

if [ -z $GIT ]; then
    echo "WeBash needs git to work, please install it."
else
    if [ -z $DOCKER ]; then
        echo "WeBash needs docker to work, please install it."
    else
        if [ -z $DOCKER_COMPOSE ]; then
            echo "WeBash needs docker-compose to work, please install it."
        else
            $GIT -C $DIRECTORY pull
            $DOCKER_COMPOSE -f $DIRECTORY/docker-compose.yml up --build -d
        fi
    fi
fi

#You can add a crontab for this script for update your server automatically (change the path with your's)
#* * * * * /bin/sh /home/chevro/WeBash/start.sh