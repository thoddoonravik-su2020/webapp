#!/bin/bash
cd /home/ubuntu/webapp/webapp
sudo npm install
cd /home/ubuntu/webapp/webapp/webapp/frontend/
sudo ng build
cd dist/frontend/
sudo cp * /var/www/html/
ls -al
cd /home/ubuntu/webapp/webapp/webapp
node app.js > /dev/null 2> /dev/null < /dev/null &

