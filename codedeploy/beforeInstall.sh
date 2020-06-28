#!/bin/bash
ls -al
cd /home/ubuntu/webapp
ls -al
npm install
ls -al
cd /home/ubuntu/webapp/webapp/frontend
npm run ng build
cd /dist/frontend
mv /dist/frontend/* /var/www/html/
