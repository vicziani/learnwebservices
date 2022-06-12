# frozen_string_literal: true

require 'savon'

client = Savon.client(wsdl: 'https://apps.learnwebservices.com/services/hello?WSDL')
response = client.call(
  :say_hello,
  soap_action: '',
  message: { 'Name' => 'John Doe' } 
)
puts response.body[:hello_response][:message]
