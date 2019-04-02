# Stage 1
FROM node:10.10.0 as backoffice
RUN mkdir backoffice
WORKDIR /backoffice
COPY . ./
ARG API_PATH=app
ARG API_URL=mixchat.mixapp.io/api
RUN echo "{\"API_URL\": \"${API_URL}\",\"API_PATH\": \"${API_PATH}\"}" > src/config.json
RUN yarn
RUN yarn build

# Stage 2
FROM node:10.10.0 as widget
# Clone the conf files into the docker container
RUN git clone https://github.com/mixapp/mixchat_widget.git
WORKDIR /mixchat_widget
ARG API_PATH=app
ARG API_URL=mixchat.mixapp.io/api
RUN echo "{\"API_URL\": \"${API_URL}\",\"API_PATH\": \"${API_PATH}\"}" > src/config.json
RUN yarn
RUN yarn build

# Stage 3 - the production environment
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy backoffice files
COPY --from=backoffice /backoffice/build /usr/share/nginx/html/app

# Copy widget files
COPY --from=widget /mixchat_widget/build/ /usr/share/nginx/html/app/static/js
COPY --from=widget /mixchat_widget/build/widget.js.map /usr/share/nginx/html/app/static/js

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]