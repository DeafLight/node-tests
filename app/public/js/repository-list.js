var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", 'react', './repo', 'socket.io-client'], factory);
    }
})(function (require, exports) {
    "use strict";
    var React = require('react');
    var repo_1 = require('./repo');
    var io = require('socket.io-client');
    var RepositoryList = (function (_super) {
        __extends(RepositoryList, _super);
        function RepositoryList(props) {
            var _this = this;
            _super.call(this, props);
            this.state = { repos: [] };
            this.socket = io('http://localhost:3000');
            this.socket.on('reposRefreshed', function (repos) {
                console.log(typeof repos);
                _this.setState({ repos: repos });
            });
        }
        RepositoryList.prototype.componentDidMount = function () {
            console.log('component did mount');
            this.socket.emit('refreshRepos', { user: 'dev-i-ant' });
        };
        RepositoryList.prototype.render = function () {
            var repos = this.state.repos.map(function (repo) { return React.createElement("li", {key: repo.id}, React.createElement(repo_1.default, {raw: repo})); });
            return React.createElement("ul", null, repos);
        };
        return RepositoryList;
    }(React.Component));
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = RepositoryList;
});
//# sourceMappingURL=repository-list.js.map