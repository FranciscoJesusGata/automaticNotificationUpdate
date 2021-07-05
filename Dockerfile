FROM nginx:latest
ADD ./code /app
ADD ./default.conf /etc/nginx/conf.d/default.conf
