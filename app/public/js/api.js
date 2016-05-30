(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", 'whatwg-fetch'], factory);
    }
})(function (require, exports) {
    "use strict";
    require('whatwg-fetch');
    var reposForUser = function (userName) {
        var url = "https://api.github.com/users/" + userName + "/repos";
        return fetch(url).then(function (response) { return response.json(); });
    };
    exports.reposForUser = reposForUser;
});
//# sourceMappingURL=api.js.map