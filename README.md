# Repository for learnwebservices.com site

This repository contains the source of the http://learnwebservices.com site.

The main purpose of this site to provide a free, public, sample SOAP webservices
for everyone. These webservices are designed to long live, so they can be
used in tutorials, videos, blog posts, Stack Overflow, etc. The site contains
SOAP clients in different programming languages.

Static pages are in the `site` directory, and generated with Jekyll.

There are a Spring Boot server application (`lwsapp`) serves the SOAP webservices.

The repository contains clients with different technologies:

* `lwsapp-jaxwsri-client` - Java JAX-RS RI client
* `lwsapp-js-client` - Node.js client with SOAP library
* `lwsapp-python-client` - Python client with Zeep
* `lwsapp-soapui-project` - SoapUI project
* `lwsapp-vanillajs-client` - Vanilla JS client in pure JavaScript (Node.js)
* `SoapClient` - .NET Core client with C#

## About the author

This site was developed by István Viczián, the author of the http://jtechlog.hu blog.

## Licence

The source codes of the SOAP server example and the client application examples above
are available on the learnwebservices.com site (everything in this repository, except the `site` directory) are licensed under MIT License.

The textual content of the learnwebservices.com site
(the content of the `site` directory) is licensed under
Creative Commons Attribution-ShareAlike 4.0 International License.

See [LICENSE-MIT](LICENSE-MIT) and [LICENCE-CC-BY-SA-4.0](LICENCE-CC-BY-SA-4.0) files for details,
or the https://opensource.org/licenses/MIT and http://creativecommons.org/licenses/by-nc/4.0/ sites.
