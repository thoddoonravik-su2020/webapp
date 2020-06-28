#!/bin/bash
mv /home/ubuntu/webapp-UI/* /var/www/html/
ls -al
cd /home/ubuntu/webapp/webapp
npm install
node app.js > /dev/null 2> /dev/null < /dev/null &


