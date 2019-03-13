# frozen_string_literal: true

require 'savon'

client = Savon.client(wsdl: 'http://www.learnwebservices.com/services/hello?WSDL')
response = client.call(
  :say_hello,
  soap_action: '',
  message: { 'HelloRequest' => { 'Name' => 'John Doe' } }
)
puts response.body[:say_hello_response][:hello_response][:message]
