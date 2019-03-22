# stage: 1
FROM node:10.10.0 as react-build
WORKDIR /omni_backoffice
COPY . ./
RUN yarn
RUN yarn build

# stage: 2 — the production environment
FROM nginx:alpine
WORKDIR /home/sasha/node_project/omni_backoffice/build
COPY . /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 8000
CMD /usr/sbin/nginx -g "daemon off;"