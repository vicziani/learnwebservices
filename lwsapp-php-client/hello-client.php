<?php

$client = new SoapClient('https://apps.learnwebservices.com/services/hello?wsdl');
echo $client
	->SayHello(
		[			
			'Name' => 'John Doe'
		]
	)
	->Message
;
