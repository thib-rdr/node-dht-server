#!/bin/bash

VOLUME=~/mongo-volume
mkdir $VOLUME
docker stop mongo
docker rm mongo
docker run -d --name mongo -p 27017:27017 \
    -v $VOLUME:/data/db \
    --restart=always \
    mvertes/alpine-mongo