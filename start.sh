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

#UPDATE
$GIT -C $DIRECTORY pull > /dev/null 2>&1

if [ -z $1 ]; then
    echo "Please specify a way to start Webash"
    echo "Usage : bash start.sh <way> [args ...]"
    echo "ways : docker"
    echo "args : -p <port>"
    echo "       -i <ip>"
    echo "       -n <name>"
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
            -i|--ip) IP=$2; shift;;
        esac
        shift
    done

    if [ -z $PORT ]; then
        PORT="8085"
    fi

    if [ -z $NAME ]; then
        NAME="webash"
    fi

    if [ -z $IP ]; then
        IP="172.22.0.100"
    fi

    SPLIT_IP=($(echo $IP | tr '.' "\n"))
    SUBNET=${SPLIT_IP[0]}.${SPLIT_IP[1]}.${SPLIT_IP[2]}."0/24"

    touch $DIRECTORY/.env
    echo "PORT=$PORT" >> $DIRECTORY/.env
    echo "NAME=$NAME" >> $DIRECTORY/.env

    echo "IP=$IP" >> $DIRECTORY/.env
    echo "SUBNET=$SUBNET" >> $DIRECTORY/.env

    #run container
    $DOCKER_COMPOSE -f $DIRECTORY/docker-compose.yml up --build -d > /dev/null 2>&1

    echo "------------"
    echo "WeBash was successfully started with docker and the following parameters:"
    echo "port :" $PORT
    echo "container name:" $NAME
    echo "local ip:" $IP
    echo "------------"

else
    echo "Unknown way"
    echo "Here are the means available :"
    echo "docker"
fi

#You can add a crontab for this script for update your server automatically (change the path with your's)
#* * * * * /bin/sh /home/chevro/WeBash/start.sh