#!/bin/env node

"use strict";

const { f_is_false } = require("./string");

console.inspect = function inspect (ph_args) {
  console.log(gm_util.inspect(ph_args, {
    showHidden: true,
    depth: null
  }));
}


console.info("hello");

console.inspect({
  "f_is_false(yes)" : f_is_false("yes"),
  "f_is_false(no)" : f_is_false("no"),
  "f_is_false(true)" : f_is_false("true"),
  "f_is_false(false)" : f_is_false("false"),
});
