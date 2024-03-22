# Repository for learnwebservices.com site

This repository contains the source of the http://learnwebservices.com site.

The main purpose of this site to provide a free, public, sample SOAP webservices
for everyone. These webservices are designed to long live, so they can be
used in tutorials, videos, blog posts, Stack Overflow, etc. The site contains
SOAP clients in different programming languages.

Static pages are in the `site` directory, and generated with Jekyll.

There is a Spring Boot server application serves the SOAP webservices in a different
GitHub repository: https://github.com/vicziani/learnwebservices-server/.

This repository contains clients with different technologies:

* `lwsapp-axis2-client` - Java Axis2 client
* `lwsapp-cxf-client` - Java CXF client
* `lwsapp-dotnet-client` - .NET client with C#
* `lwsapp-groovy-client` - Groovy client
* `lwsapp-jaxwsri-client` - Java JAX-RS RI client
* `lwsapp-jmeter-project` - JMeter project file
* `lwsapp-js-client` - Node.js client with SOAP library
* `lwsapp-php-client` - PHP client with SOAP extension
* `lwsapp-postman-collection` - Postman sample request
* `lwsapp-python-client` - Python client with Zeep
* `lwsapp-ruby-client` - Ruby client with [Savon](https://github.com/savonrb/savon)
* `lwsapp-soapui-project` - SoapUI project
* `lwsapp-springws-client` - Java Spring Web Services client
* `lwsapp-vanillajs-client` - Vanilla JS client in pure JavaScript (Node.js)

## About the author

This site was developed by István Viczián, the author of the http://jtechlog.hu blog.

## Licence

The content of the learnwebservices.com site
is licensed under
Creative Commons Attribution-ShareAlike 4.0 International License.

See [LICENCE](LICENCE) files for details,
or the http://creativecommons.org/licenses/by-nc/4.0/ site.
