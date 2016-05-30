#sample makefile for production
build:
  - rm -r dist/
  mkdir dist
  jspm bundle-sfx out/src/client/main -o dist/app.js
  ./node_modules/.bin/uglifyjs dist.app.js -o dist/app.min.js
  ./node_modules/.bin/html-dist index.html --remove-all --minify --insert app.min.js -o dist/index.html