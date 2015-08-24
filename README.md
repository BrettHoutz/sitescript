sitescript
==========

Sitescript (sylized like an improper noun) is a language for generating webpages. It is an ambitious attempt at unifying the job done by HTML, CSS, Javascript, and any server-side page generation (e.g. CGI, PHP, erb) into a single language. Sitescript aims to work as both a scripting and a markup language.

Sitescript is a syntactic expansion of Javascript. It is best to know Javascript before using sitescript.

Principles
----------

* **Single Language**: The raison d'être of sitescript is to allow the creation of websites without typing a single character of a markup or programming language other than sitescript.These websites may have styling, interactivity, and dynamic generation --- anything a website could possibly have.
* **Server-Side in Practice, Client-Side in Theory**: Due to the reality of web technology, sitescript works by being interpreted on the server and delivering HTML, CSS, and Javascript to the client. However, it is important that sitescript be designed in such a way that it could theoretically be interpreted by the browser This reinforces sitescript's hyporthetical role as a replacement of the current web standards.
* **Built-In Search Engine Optimization**: Sitescript aims to follow best practices for the HTML it generates.
* **Cutting-Edge**: Sitescript supports the latest Ecmascript specifications.

Implementation
--------------

Sitescript is implemented as a node module. A node server forwards requests with arguments to a sitescript file, which is interpreted to produce HTML.

Note: sitescript is in early development, so it does not yet do much of anything.

--------------------------
Copyright 2015 Brett Houtz
