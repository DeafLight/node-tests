import * as React from 'react';
import {reposForUser} from './api';
import Repo from './repo';

export default class RepositoryList extends React.Component<any, any>{
    constructor(props: Object) {
        super(props);
        this.state = { repos: [] };
    }

    componentDidMount() {
        reposForUser('dev-i-ant').then((repos: Object) =>
            this.setState({ repos: repos }));
    }

    render() {
        var repos = this.state.repos.map((repo: any) => <li key={repo.id}><Repo raw={repo} /></li>);
        return <ul>{repos}</ul>;
    }
}