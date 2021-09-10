
const configBase = require('./config-base-edge');
const merge = require('lodash.merge');


exports.config= merge({}, configBase, {
    specs: [
        './../specs/seq_flow_scenarios.js'   
    ]
});