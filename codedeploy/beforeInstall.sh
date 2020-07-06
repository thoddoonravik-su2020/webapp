#!/bin/bash
# killall -s KILL node
sudo rm -rf /home/ubuntu/webapp

sudo rm -rf /var/www/html/*
export app_root=/home/ubuntu/webapp-UI
if [ -d "$app_root" ];then
    rm -rf /home/ubuntu/webapp-UI
    mkdir -p /home/ubuntu/webapp-UI
else
    mkdir -p /home/ubuntu/webapp-UI
fi
