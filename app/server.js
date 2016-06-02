(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", 'agenda', 'body-parser', 'express', 'path', 'socket.io', 'request', 'socketio-auth'], factory);
    }
})(function (require, exports) {
    "use strict";
    var Agenda = require('agenda');
    var bodyParser = require('body-parser');
    var express = require('express');
    var path = require('path');
    var socketIo = require('socket.io');
    var request = require('request');
    var socketIoAuth = require('socketio-auth');
    var app = express();
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(express.static(path.join(__dirname, 'public'), { maxAge: 86400 }));
    app.use('/jspm_packages', express.static(path.join(__dirname, '../jspm_packages')));
    var router = express.Router();
    router.use(function (req, res, next) { return next(); });
    router.route('/test').get(function (req, res) { return res.json({ test: 'ok' }); });
    router.get('/config.js', function (req, res) { return res.sendFile(path.join(__dirname, '../config.js')); });
    router.get('/socket.io-client.js', function (req, res) { return res.sendFile(path.join(__dirname, '../jspm_packages/npm/socket.io-client@1.4.6.js')); });
    app.use('/', router);
    var server = app.listen(3000, 'localhost', function () {
        console.log('App listening at http://%s:%s', server.address().address, server.address().port);
        console.log(__dirname);
    });
    var io = socketIo.listen(server);
    socketIoAuth(io, {
        authenticate: function (socket, data, callback) {
            return callback(null, true);
        }
    });
    io.sockets.on('connection', function (socket) {
        console.log("user connected");
        socket.emit('helloWorld', { hello: 'world' });
        socket.on('refreshRepos', function (data) {
            console.log(data);
            console.log('refreshRepos called');
            var url = "https://api.github.com/users/" + (data && data.user) + "/repos";
            request(url, { json: true, headers: { 'user-agent': 'node.js' } }, function (err, response, data) {
                console.log(data);
                socket.emit('reposRefreshed', data);
            });
        });
    });
    var mongoConnectionString = "mongodb://localhost/agenda";
    var agenda = new Agenda({ db: { address: mongoConnectionString } });
    agenda.define('test', function (job, done) {
        console.log('agenda test');
        done();
    });
    agenda.on('ready', function () {
        agenda.every('10 minutes', 'test');
        agenda.start();
    });
});
//# sourceMappingURL=server.js.map