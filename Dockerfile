# Choose the Image which has Node installed already
FROM node:lts-alpine

# install simple http server for serving static content
RUN apk update
RUN apk add git

# make the 'app' folder the current working directory
WORKDIR /code

# add `/app/node_modules/.bin` to $PATH
ENV PATH /code/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /code/package.json
COPY package-lock.json /code/package-lock.json

RUN npm install
RUN npm install @vue/cli@latest -g


# build app for production with minification
#RUN npm run dev
CMD ["npm","run", "dev"]