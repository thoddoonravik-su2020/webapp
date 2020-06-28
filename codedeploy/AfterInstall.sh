# #!/bin/bash
cd /home/ubuntu/webapp/webapp/frontend
ls -al
npm run ng build
cd /home/ubuntu/webapp/webapp/frontend/dist/frontend
mv /home/ubuntu/webapp/webapp/frontend/dist/frontend/* /var/www/html/