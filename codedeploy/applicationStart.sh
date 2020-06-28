#!/bin/bash
cd /home/ubuntu/webapp/webapp/webapp/frontend/
sudo npm install
sudo ng build
cd dist/frontend/
sudo cp * /var/www/html/
cd
cd /home/ubuntu/webapp/webapp/webapp
node app.js > /dev/null 2> /dev/null < /dev/null &

