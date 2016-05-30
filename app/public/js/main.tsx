import * as React from 'react';
import * as ReactDom from 'react-dom';
import 'whatwg-fetch';
import {reposForUser} from './api';
import RepositoryList from './repository-list';
import * as socketIO from 'socket.io-client';

class HelloWorld extends React.Component<any, any>{
    render() {
        return <div>
            <h2>Repository list</h2>
            <RepositoryList />
        </div>;
    }
}

var socket = socketIO.connect('http://localhost:3000');
socket.on('helloWorld', res => ReactDom.render(<div><p>{JSON.stringify(res) }</p><HelloWorld /></div>, document.getElementById("app")));
socket.connect();

