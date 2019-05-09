#!/bin/sh
/usr/bin/git -C /home/chevro/WeBash pull
/usr/local/bin/docker-compose -f /home/chevro/WeBash/docker-compose.yml up --build -d

#You can add a crontab for this script for update your server automatically (change the path with your's)
#* * * * * /bin/sh /home/chevro/WeBash/start.sh