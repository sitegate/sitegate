FROM node:0.10-onbuild

MAINTAINER Zoltan Kochan, zoltan.kochan@gmail.com

WORKDIR /src

# Install Prerequisites
RUN npm install -g bower
RUN npm install -g gulp

# Install packages
ADD package.json /src/package.json
RUN npm install

# Manually trigger bower. Why doesnt this work via npm install?
ADD .bowerrc /src/.bowerrc
ADD bower.json /src/bower.json
RUN bower install --config.interactive=false --allow-root

# Make everything available for start
ADD . /src

# Port 3000 for server
# Port 35729 for livereload
EXPOSE 3000 35729
CMD ["gulp"]
