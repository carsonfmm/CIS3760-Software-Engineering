#!/bin/sh

echo "creating react build for nginx"
npm run build
mkdir ~/app-deploy
cp -R build ~/app-deploy

echo "copying nginx files onto system"
cd nginxconfig
sudo cp nginx.conf /etc/nginx/nginx.conf
sudo cp default /etc/nginx/sites-enabled/default
sudo cp self-signed.conf /etc/nginx/snippets/self-signed.conf
sudo cp ssl-params.conf /etc/nginx/snippets/ssl-params.conf
sudo cp project.service /etc/systemd/system/project.service

echo "generating ssl keys"
sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /etc/ssl/private/nginx-selfsigned.key -out /etc/ssl/certs/nginx-selfsigned.crt

echo "reloading nginx"
sudo nginx -t
sudo service nginx reload

