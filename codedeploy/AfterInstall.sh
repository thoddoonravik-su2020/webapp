#!/bin/bash
ls -al
cd /home/ubuntu/webapp/frontend
npm run ng build
sudo mv Archive.zip /var/www/html
cd /var/www/html/
sudo rm -rf index.html
sudo unzip Archive.zip
sudo rm -rf Archive.zip