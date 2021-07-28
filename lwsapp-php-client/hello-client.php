<?php

$client = new SoapClient('http://www.learnwebservices.com/services/hello?wsdl');
echo $client
	->SayHello(
		[
			'HelloRequest' => 
				['Name' => 'John Doe']
		]
	)
	->HelloResponse
		->Message
;
