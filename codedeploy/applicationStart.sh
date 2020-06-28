#!/bin/bash
cd /home/ubuntu/webapp/webapp/webapp/frontend/
npm install
ng build
cd dist/frontend/
sudo cp * /var/www/html/


