let soap = require('soap');
let url = 'http://www.learnwebservices.com/services/hello?wsdl';
let args = {HelloRequest: {Name: 'John Doe'}};
soap.createClient(url, function(err, client) {
    client.SayHello(args, function(err, result) {
        console.log(result.HelloResponse.Message);
    });
});