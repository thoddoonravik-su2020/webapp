#!/bin/bash
cd /home/ubuntu/webapp/webapp
sudo npm install
cd /home/ubuntu/webapp/webapp/webapp/frontend/
npm install
ng build
cd dist/frontend/
sudo cp * /var/www/html/
cd /home/ubuntu/webapp/webapp/webapp
node app.js > /dev/null 2> /dev/null < /dev/null &

