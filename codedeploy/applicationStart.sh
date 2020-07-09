#!/bin/bash
cd /home/ubuntu/webapp/webapp
sudo npm install
cd /home/ubuntu/webapp/webapp/webapp/frontend/
npm install
ng build
cd dist/frontend/
sudo cp * /var/www/html/
cd /home/ubuntu/webapp/webapp/webapp


sudo /opt/aws/amazon-cloudwatch-agent/bin/amazon-cloudwatch-agent-ctl -m ec2 -a stop

sudo mv cloudwatchagent-config.json /opt/


sudo /opt/aws/amazon-cloudwatch-agent/bin/amazon-cloudwatch-agent-ctl \
    -a fetch-config \
    -m ec2 \
    -c file:/opt/cloudwatchagent-config.json \
    -s

systemctl daemon-reload
systemctl restart application.service
sudo mv application.service /lib/systemd/system
chmod +x app.js
sudo systemctl start application.service
sudo systemctl enable application.service




