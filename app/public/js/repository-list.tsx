import * as React from 'react';
import {reposForUser} from './api';
import Repo from './repo';
import * as io from 'socket.io-client';

export default class RepositoryList extends React.Component<any, any>{
    protected socket: SocketIOClient.Socket;

    constructor(props: Object) {
        super(props);
        this.state = { repos: [] };
        this.socket = io('http://localhost:3000');
        this.socket.on('reposRefreshed', (repos: Object) => {
            console.log(typeof repos);
            this.setState({ repos: repos });
        });
    }

    componentDidMount() {
        console.log('component did mount');
        this.socket.emit('refreshRepos', { user: 'dev-i-ant' });
    }

    render() {
        var repos = this.state.repos.map((repo: any) => <li key={repo.id}><Repo raw={repo} /></li>);
        return <ul>{repos}</ul>;
    }
}