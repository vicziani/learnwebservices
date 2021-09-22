FROM postman/newman:5-ubuntu
COPY *.json /etc/newman
ENTRYPOINT ["newman", "run", "LearnWebServices.postman_collection.json"]