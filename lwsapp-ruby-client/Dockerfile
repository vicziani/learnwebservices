FROM ruby:3.0.2
WORKDIR /usr/src/app
COPY * .
RUN bundle install
ENTRYPOINT ["ruby", "hello_client.rb"]