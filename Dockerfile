FROM ukti/alpine-nginx-nodejs:0.12.9

RUN apk add --update g++ make python

WORKDIR /app

USER www-data
COPY . /app

USER root
RUN rm -rf node_modules public documentation .git .npm
RUN chown -R www-data:www-data .

USER www-data
RUN npm install

USER root
RUN apk del g++ make python
RUN rm -rf /tmp/*

USER www-data
RUN npm run hof-transpile
COPY conf/nginx/default.conf /etc/nginx/sites-enabled/default.conf

USER root
CMD ./run.sh
