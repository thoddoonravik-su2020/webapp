#!/bin/bash
sudo mkdir hello
sudo rm -rf /home/ubuntu/webapp
node server.js > /dev/null 2> /dev/null < /dev/null &


