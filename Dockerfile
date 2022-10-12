FROM hub.lubui.com/nginx-brotli:alpine as app
COPY ./dist /root
COPY ./nginx.conf /etc/nginx/