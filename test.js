#!/bin/env node

"use strict";

const { f_is_false } = require("./string");
const { f_console_info, f_console_inspect } = require("./console");

f_console_info("hello");

f_console_inspect({
  "f_is_false(yes)" : f_is_false("yes"),
  "f_is_false(no)" : f_is_false("no"),
  "f_is_false(true)" : f_is_false("true"),
  "f_is_false(false)" : f_is_false("false"),
});
