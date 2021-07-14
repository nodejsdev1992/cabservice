FROM node
WORKDIR /home/node/cabservice
COPY . .
CMD ["/home/node/cabservice/start.sh"]
