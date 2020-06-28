# #!/bin/bash
cd /home/ubuntu/webapp/webapp/frontend
ls -al
npm run ng build
cd /dist/frontend
mv /dist/frontend/* /var/www/html/
