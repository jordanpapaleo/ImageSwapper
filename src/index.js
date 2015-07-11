'use strict';

import Famous           from 'famous';
window.Famous           = Famous;
const FamousEngine      = Famous.core.FamousEngine;
FamousEngine.init();

require('babelify/polyfill');
require('./app/index');
