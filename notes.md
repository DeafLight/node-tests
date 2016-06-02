Initialize the project
npm init -y

Declare the folder as a Typescript project by creating a tsconfig.json file
- watch : compiles each time a file changes
- compileOnSave : compiles each time a file changes. Not handled by VSC, only VS and atom. Leaving it here for reference
- declaration : generates typings during compilation. How to avoid duplicate identifiers without having to maintain a tsconfig files list for instance ?

To be able to compile on save, create a basic tasks.json file

Install jspm to manage the packages
According to the doc (http://jspm.io/docs/getting-started.html), better to install jspm locally to be able to lock jspm version
npm install jspm --save-dev

Initialize jspm. Default options, except for the use of a transpiler, not needed here as TS already compiles to ES5
jspm init

Create a .gitignore file to exclude some files from versioning.
Typically, /node_modules, /jspm_packages and maybe the folder holding all generated files

To simply serve static files, just install http-server
npm install http-server -g

whatwg-fetch : polyfill for fetch (available in chrome). Waiting to use it

Install typings for d.ts files
npm install typings -g

Install React
jspm install react react-dom

Some errors due to typings:
https://github.com/blakeembrey/popsicle/issues/39
https://github.com/Microsoft/TypeScript/issues/6427
Wait and see

Install React typings
typings install dt~react dt~react-dom --save --global

Added a sample Makefile (why this instead of gulp or anything else to generate the dist code ?)
Install html-dist and uglifyjs to minify html/js
npm install --save-dev uglifyjs html-dist
typings install --save --global uglify-js

Install Express and typings
npm install --save express
typings install --save --global dt~express

Install body-parser and typings
npm install --save body-parser
typings install --save --global dt~body-parser

To be able to run the server without exposing everything but keeping access to jspm_packages or config.js:
app.use('/jspm_packages', express.static(path.join(__dirname, '../jspm_packages')));
router.get('/config.js', (req, res) => res.sendFile(path.join(__dirname, '../config.js')));
app.use('/', router);
This way, both jspm_packages and config.js can be accessed as if the server was run from the project root.
TODO : disable the access to jspm_packages in production (process.env.NODE_ENV ?)

Install socket.io and typings
jspm install npm:socket.io
npm install --save socket.io
typings install --save --global dt~socket.io dt~socket.io-client
TODO : Is it possible to use socket.io from JSPM on the server ? Why cannot find module ?
TODO : Why the socket.io-client path is not good ? Walkaround :
router.get('/socket.io-client.js', (req, res) => res.sendFile(path.join(__dirname, '../jspm_packages/npm/socket.io-client@1.4.6.js')));

Install agenda and typings
npm install --save agenda
typings install --save --global agenda

Install request
npm install --save request

// unfinished
Install requirements for token authentication
npm install --save socketio-auth
No typings, had to create them
TODO : why
import socketIoAuth = require('socketio-auth');
instead of 
import * as socketIoAuth from 'socketio-auth';
// unfinished

TODO : try to test load balancing (check cookies, sessions and web sockets)
- https://gist.github.com/mkuklis/3985606
- https://mazira.com/blog/introduction-load-balancing-nodejs
- http://sosedoff.com/2012/05/01/dynamic-http-proxy-with-nodejs-and-redis.html

Potential pre-requisites : Redis

TODO (dig deeper) : sessions, security, anti-forgery (with cookie) measures, token auth ?



TODO : try nools (+ other rules engines ?)
TODO : setup tests (mocha, chai, sinon... ?)
TODO : immutable
TODO : redux
TODO : bootstrap
TODO : SASS
TODO : choose a e2e architecture (mocha, nightswatch, jasmine, karma... ?)
TODO : OpenId, SSO... ?
TODO : browser history management (distinct url for each action ?)