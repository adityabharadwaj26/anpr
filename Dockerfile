# Stage 1
FROM node:10-alpine as build-step
RUN mkdir -p /app
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
RUN npm run build
# Stage 2
# FROM nginx:1.17.1-alpine
FROM nginx:alpine
# RUN apk add python3 python3-dev py3-pip build-base libressl-dev musl-dev libffi-dev
# RUN pip3 install pip --upgrade
# RUN apk add certbot certbot-nginx
# RUN mkdir /etc/letsencrypt
# COPY default.conf /etc/nginx/conf.d/default.conf
# COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build-step /app/dist/annotate-app /usr/share/nginx/html
# RUN certbot --nginx -d text-revelio.neurix.in --agree-tos -m "neurix.in@gmail.com"  -n