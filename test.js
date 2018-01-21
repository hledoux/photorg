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


const async = require("async");

const fs = require("fs");




f_console_info("this is an info");
f_console_alert("this is an alert");
f_console_error("this is an error");
f_console_fatal("this is a fatal");


f_console_inspect("hello", {
  "f_is_false(yes)" : f_is_false("yes"),
  "f_is_false(no)" : f_is_false("no"),
  "f_is_false(true)" : f_is_false("true"),
  "f_is_false(false)" : f_is_false("false"),
});


let la_files = [
  "cgi.js",
  "console.js",
  "date.js",
  "misc.js",
  "number.js",
  "photorg.js",
  "string.js",
  "test.js",
  "tests",
  "toto.pl" ];


let la_task_list = la_files.map(function (ps_one_file_name) {
  return(function (pf_callback) {
    fs.stat(ps_one_file_name, function(ps_err, po_stats) {
      f_console_inspect(`stat(${ps_one_file_name}):`, po_stats);
      pf_callback(ps_err, po_stats);
    });
  });
});


async.parallel(la_task_list , function(err, results) {
  //
});
