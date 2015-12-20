FROM node:5.2.0-onbuild

MAINTAINER Zoltan Kochan, zoltan.kochan@gmail.com

WORKDIR /src

# Install packages
COPY package.json /src/package.json
RUN npm install

# Make everything available for start
COPY . /src

EXPOSE 3000
CMD ["npm", "start"]
