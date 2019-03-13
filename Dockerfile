FROM nginx:latest
ADD ./code /app
ADD ./app.conf /etc/nginx/conf.d/app.conf
