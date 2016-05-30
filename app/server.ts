import * as express from 'express';
import * as path from 'path';
import * as bodyParser from 'body-parser';
import * as socketIO from 'socket.io';
import * as Agenda from 'agenda';

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public'), { maxAge: 86400 }));

app.use('/jspm_packages', express.static(path.join(__dirname, '../jspm_packages')));

var router = express.Router();
router.use((req, res, next) => next());

router.route('/test').get((req, res) => res.json({ test: 'ok' }));

router.get('/config.js', (req, res) => res.sendFile(path.join(__dirname, '../config.js')));
router.get('/socket.io-client.js', (req, res) => res.sendFile(path.join(__dirname, '../jspm_packages/npm/socket.io-client@1.4.6.js')));

app.use('/', router);

var server = app.listen(3000, 'localhost', () => {
    console.log('App listening at http://%s:%s', server.address().address, server.address().port);
    console.log(__dirname);
});

var io = socketIO.listen(server);
io.sockets.on('connection', function (socket) {
    console.log("user connected");
    socket.emit('helloWorld', { hello: 'world' });
});

var mongoConnectionString = "mongodb://localhost/agenda";

var agenda = new Agenda({ db: { address: mongoConnectionString } });

agenda.define('test', function (job, done) {
    console.log('agenda test');
    done();
});

agenda.on('ready', function () {
    agenda.every('3 seconds', 'test');

    agenda.start();
});