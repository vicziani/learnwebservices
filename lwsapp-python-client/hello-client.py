import zeep

wsdl = 'https://apps.learnwebservices.com/services/hello?wsdl'
client = zeep.Client(wsdl=wsdl)
request = 'John Doe'
response = client.service.SayHello(request)
print(response)
