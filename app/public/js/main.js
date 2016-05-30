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
        define(["require", "exports", 'react', 'react-dom', 'whatwg-fetch', './repository-list', 'socket.io-client'], factory);
    }
})(function (require, exports) {
    "use strict";
    var React = require('react');
    var ReactDom = require('react-dom');
    require('whatwg-fetch');
    var repository_list_1 = require('./repository-list');
    var socketIO = require('socket.io-client');
    var HelloWorld = (function (_super) {
        __extends(HelloWorld, _super);
        function HelloWorld() {
            _super.apply(this, arguments);
        }
        HelloWorld.prototype.render = function () {
            return React.createElement("div", null, React.createElement("h2", null, "Repository list"), React.createElement(repository_list_1.default, null));
        };
        return HelloWorld;
    }(React.Component));
    var socket = socketIO.connect('http://localhost:3000');
    socket.on('helloWorld', function (res) { return ReactDom.render(React.createElement("div", null, React.createElement("p", null, JSON.stringify(res)), React.createElement(HelloWorld, null)), document.getElementById("app")); });
    socket.connect();
});
//# sourceMappingURL=main.js.map