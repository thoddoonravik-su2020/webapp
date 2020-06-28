#!/bin/bash
ls -al
cd /home/ubuntu/webapp/webapp
npm install
node app.js > /dev/null 2> /dev/null < /dev/null &