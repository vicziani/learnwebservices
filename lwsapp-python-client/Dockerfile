FROM python:3.10.5
WORKDIR /usr/src/app
COPY * .
RUN pip3 install -r requirements.txt
ENTRYPOINT ["python", "hello-client.py"]