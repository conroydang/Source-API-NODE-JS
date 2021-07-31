#! /bin/bash

# Author : nnvuf
# Copyright (c) nnvuf
# Script rebuild

ApplicationName="mongo-node-api"

tagged="nnvuf/${ApplicationName}:latest"

# docker build . -t nnvuf/mongo-node-api:latest
docker build -t ${tagged} .
# docker stop mongo-node-api
docker stop ${ApplicationName}
# docker rm mongo-node-api
docker rm ${ApplicationName}
# docker run --name "mongo-node-api" -p 8080:3000 "nnvuf/mongo-node-api:latest"
docker run --name ${ApplicationName} -d -p 8080:3000 ${tagged}
# docker push nnvuf/mongo-node-api:latest
docker push ${tagged}
# docker run --name "mongo-node-api" -d -p 8080:8080 "nnvuf/mongo-node-api:latest"
# docker run -it mongo-node-api bash
# docker container rm $(docker container list -aq)
# docker image rm $(docker image list -aq)