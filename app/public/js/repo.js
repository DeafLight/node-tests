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
        define(["require", "exports", 'react'], factory);
    }
})(function (require, exports) {
    "use strict";
    var React = require('react');
    var Repo = (function (_super) {
        __extends(Repo, _super);
        function Repo() {
            _super.apply(this, arguments);
        }
        Repo.prototype.render = function () {
            return React.createElement("div", null, React.createElement("h3", null, this.props.raw.name), React.createElement("p", null, this.props.raw.description));
        };
        return Repo;
    }(React.Component));
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = Repo;
});
//# sourceMappingURL=repo.js.map