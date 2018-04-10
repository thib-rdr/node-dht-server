#!/bin/bash

docker stop mongo
docker rm mongo
docker run -d --name mongo -p 27017:27017 mvertes/alpine-mongo