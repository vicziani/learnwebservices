# Repository for learnwebservices.com site

This repository contains the source of the http://learnwebservices.com site.
Static pages ar in the `site` directory, and generated with Jekyll.

There are a Spring Boot server application (`lwsapp`) serves the SOAP webservices.

The repository contains clients with different technologies:

* `lwsapp-jaxwsri-client` - Java JAX-RS RI client
* `lwsapp-python-client` - Python client with Zeep
* `lwsapp-js-client` - Node.js client with SOAP