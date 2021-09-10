FROM php:8-cli
COPY ./*.php /usr/src/myapp/
WORKDIR /usr/src/myapp
RUN apt-get update -y \
  && apt-get install -y \
     libxml2-dev \
  && apt-get clean -y \
  && docker-php-ext-install soap  
ENTRYPOINT ["/usr/local/bin/php", "hello-client.php"]
