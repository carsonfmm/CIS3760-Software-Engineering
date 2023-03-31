#!/bin/sh

echo "installing package dependencies through apt"
apt-get update
apt-get install nodejs nginx npm
apt-get install python3-pip python3-dev build-essential libssl-dev libffi-dev python3-setuptools python3-venv

echo "running npm stall to build node_modules"
npm install

echo "setting up React App"
npm run build
mkdir ~/app-deploy
cp -R build ~/app-deploy

echo "setting up NGINX" 
cd nginxconfig
sudo cp nginx.conf /etc/nginx/nginx.conf
sudo cp default /etc/nginx/sites-enabled/default
sudo cp self-signed.conf /etc/nginx/snippets/self-signed.conf
sudo cp ssl-params.conf /etc/nginx/snippets/ssl-params.conf
sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /etc/ssl/private/nginx-selfsigned.key -out /etc/ssl/certs/nginx-selfsigned.crt

echo "restarting NGINX server"
sudo nginx -t
sudo service nginx reload
