import * as Agenda from 'agenda';
import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as path from 'path';
import * as socketIo from 'socket.io';
import * as request from 'request';
import socketIoAuth = require('socketio-auth');

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// static files
app.use(express.static(path.join(__dirname, 'public'), { maxAge: 86400 }));

// give client side access to jspm_packages
app.use('/jspm_packages', express.static(path.join(__dirname, '../jspm_packages')));

var router = express.Router();
router.use((req, res, next) => next());

router.route('/test').get((req, res) => res.json({ test: 'ok' }));

// misc routing stuff for needed files
router.get('/config.js', (req, res) => res.sendFile(path.join(__dirname, '../config.js')));
router.get('/socket.io-client.js', (req, res) => res.sendFile(path.join(__dirname, '../jspm_packages/npm/socket.io-client@1.4.6.js')));

app.use('/', router);

// start the server
var server = app.listen(3000, 'localhost', () => {
    console.log('App listening at http://%s:%s', server.address().address, server.address().port);
    console.log(__dirname);
});

// setup socket.io
var io = socketIo.listen(server);

socketIoAuth(io, {
    authenticate: function (socket, data, callback) {
        //get credentials sent by the client 
        // var username = data.username;
        // var password = data.password;

        // db.findUser('User', { username: username }, function (err, user) {

        //     //inform the callback of auth success/failure 
        //     if (err || !user) return callback(new Error("User not found"));
        //     return callback(null, user.password == password);
        // });
        return callback(null, true);
    }
});

io.sockets.on('connection', socket => {
    console.log("user connected");
    socket.emit('helloWorld', { hello: 'world' });
    socket.on('refreshRepos', data => {
        console.log(data);
        console.log('refreshRepos called');

        let url = `https://api.github.com/users/${data && data.user}/repos`;
        request(url, { json: true, headers: { 'user-agent': 'node.js' } }, (err, response, data) => {
            console.log(data);
            socket.emit('reposRefreshed', data)
        });
    });
});


// test agenda job scheduler
var mongoConnectionString = "mongodb://localhost/agenda";

var agenda = new Agenda({ db: { address: mongoConnectionString } });

agenda.define('test', (job, done) => {
    console.log('agenda test');
    done();
});

agenda.on('ready', () => {
    agenda.every('10 minutes', 'test');

    agenda.start();
});