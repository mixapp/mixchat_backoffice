# Stage 1
FROM node:10.10.0 as backoffice
RUN mkdir backoffice
WORKDIR /backoffice
COPY . ./
ARG APP_PATH=app
ARG API_URL=mixchat.mixapp.io/api
ARG REGEXP="s/\%\/APP_PATH\%/\/${APP_PATH}/g"
RUN echo "{\"API_URL\": \"${API_URL}\",\"APP_PATH\": \"${APP_PATH}\"}" > src/config.json \
    && sed -i ${REGEXP} package.json \
    && cat package.json \
    && sed -i ${REGEXP} nginx.conf \
    && cat nginx.conf \
    && yarn \
    && yarn build

# Stage 2
FROM node:10.10.0 as widget
# Clone the conf files into the docker container
RUN git clone https://github.com/mixapp/mixchat_widget.git
WORKDIR /mixchat_widget
ARG API_URL=mixchat.mixapp.io/api
RUN echo "{\"API_URL\": \"${API_URL}\"}" > src/config.json \
    && yarn \
    && yarn build

# Stage 3 - the production environment
FROM nginx:alpine
ARG APP_PATH=app
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy backoffice files
ARG COPY_TO_1=/usr/share/nginx/html/${APP_PATH}
COPY --from=backoffice /backoffice/build ${COPY_TO_1}

# Copy widget files
ARG COPY_TO_2=/usr/share/nginx/html/${APP_PATH}/static/js
COPY --from=widget /mixchat_widget/build/ ${COPY_TO_2}

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]