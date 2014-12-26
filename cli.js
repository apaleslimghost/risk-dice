#!/usr/bin/env node

var risk = require('./index.js');

console.log(risk.apply(null, process.argv.slice(2)));
