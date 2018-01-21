#!/bin/env node

"use strict";

const {
  f_is_false
} = require("./string");


const {
  f_console_alert,
  f_console_error,
  f_console_fatal,
  f_console_info,
  f_console_inspect
} = require("./console");



f_console_info('this is an info');
f_console_alert('this is an alert');
f_console_error('this is an error');
f_console_fatal('this is a fatal');


f_console_inspect("hello", {
  "f_is_false(yes)" : f_is_false("yes"),
  "f_is_false(no)" : f_is_false("no"),
  "f_is_false(true)" : f_is_false("true"),
  "f_is_false(false)" : f_is_false("false"),
});

