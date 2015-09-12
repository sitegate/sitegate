FROM node:0.10-onbuild

MAINTAINER Zoltan Kochan, zoltan.kochan@gmail.com

WORKDIR /src

# Install Prerequisites
RUN npm install -g gulp

# Install packages
ADD package.json /src/package.json
RUN npm install

# Make everything available for start
ADD . /src

# Port 3000 for server
# Port 35729 for livereload
EXPOSE 3000 35729
CMD ["gulp"]
