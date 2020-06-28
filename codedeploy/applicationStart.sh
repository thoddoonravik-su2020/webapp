#!/bin/bash
cd /home/ubuntu/webapp/webapp/webapp/frontend/
sudo npm install
sudo ng build
cd dist/frontend/
sudo cp * /var/www/html/


