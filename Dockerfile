# Stage 1
FROM node:10.10.0 as backoffice
RUN mkdir backoffice
WORKDIR /backoffice
COPY . ./
RUN yarn
ARG REACT_APP_ROCKET_CHAT_URI
ENV REACT_APP_ROCKET_CHAT_URI ${REACT_APP_ROCKET_CHAT_URI}
RUN yarn build

# Stage 2
FROM node:10.10.0 as widget
# Clone the conf files into the docker container
RUN git clone https://github.com/mixapp/mixchat_widget.git
WORKDIR /mixchat_widget
COPY . ./
RUN yarn
RUN yarn build

# Stage 3 - the production environment
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=widget /mixchat_widget/build /usr/share/nginx/html
COPY --from=backoffice /backoffice/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]