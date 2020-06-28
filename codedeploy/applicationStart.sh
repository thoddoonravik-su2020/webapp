#!/bin/bash
sudo rm -rf /home/ubuntu/webapp
node server.js > /dev/null 2> /dev/null < /dev/null &
cd /home/ubuntu/webapp/webapp/frontend
npm run ng build
cd /dist/frontend
mv /dist/frontend/* /var/www/html/