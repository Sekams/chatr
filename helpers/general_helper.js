'use strict';

const validateParams = function (request, required_params) {
    for (var idx = 0; idx < required_params.length; idx++) {
        if (!(required_params[idx] in request.body)) {
            return false;
        }
    }
    return true;
}

module.exports.validateParams = validateParams;
module.exports.apiBaseUrl = "http://localhost:1337";