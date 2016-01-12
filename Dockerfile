FROM alpine:3.3

#### nginx
# RUN apk add --update nginx && rm -rf /var/cache/apk/*

# add nginx config

# Expose the ports for nginx
# EXPOSE 80 443

#### nodejs
ENV NODE_VERSION=v0.12.9 NPM_VERSION=2.14.9

RUN apk add --update curl make gcc g++ binutils-gold python linux-headers paxctl libgcc libstdc++ && \
  curl -sSL https://nodejs.org/dist/${NODE_VERSION}/node-${NODE_VERSION}.tar.gz | tar -xz && \
  cd /node-${NODE_VERSION} && \
  ./configure --prefix=/usr ${NODE_CONFIG_FLAGS} && \
  make -j$(grep -c ^processor /proc/cpuinfo 2>/dev/null || 1) && \
  make install && \
  paxctl -cm /usr/bin/node && \
  cd / && \
  if [ -x /usr/bin/npm ]; then \
    npm install -g npm@${NPM_VERSION} && \
    find /usr/lib/node_modules/npm -name test -o -name .bin -type d | xargs rm -rf; \
  fi && \
  apk del curl make gcc g++ binutils-gold python linux-headers paxctl ${DEL_PKGS} && \
  rm -rf /etc/ssl /node-${NODE_VERSION} ${NODE_RM_DIRS} \
    /usr/share/man /tmp/* /var/cache/apk/* /root/.npm /root/.node-gyp \
    /usr/lib/node_modules/npm/man /usr/lib/node_modules/npm/doc /usr/lib/node_modules/npm/html

#### app
RUN apk add --update g++ make python

RUN adduser -Dh /app app
RUN mkdir -p /public
RUN chown app:app /public

WORKDIR /app

USER app
COPY . /app

USER root
RUN rm -rf node_modules public documentation
RUN chown -R app:app .

USER app
RUN npm install

USER root
RUN apk del g++ make python
RUN rm -rf /tmp/*

USER app
RUN npm run hof-transpile

USER root
EXPOSE 8080
CMD ./run.sh
