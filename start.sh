#!/bin/bash

docker run -it -p 127.0.0.1:9099:3000 \
	-v $PWD:/home/app \
	--name getupstandup \
	getupstandup
