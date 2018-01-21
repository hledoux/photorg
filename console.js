
"use strict";


let cs_console_trace_prefix_alert = '!!! ALERT !!! ';
let cs_console_trace_prefix_error = '!!! ERROR !!! ';
let cs_console_trace_prefix_fatal = '!!! FATAL !!! ';
let cs_console_trace_prefix_warning = '!!! WARNING !!! ';




// ********************************************************************
//  FUNCTION DESCRIPTION :
//  -
//  ARGUMENTS :
//  -
//  RETURN VALUE :
//  -
//  HISTORY :
//  - Creation          : Mon Sep 24 06:31:19 2007 - Herve LEDOUX on carbone14
//  - Last modification : Fri Jan 24 11:48:27 2014 - Herve Ledoux (carbone20)
// ********************************************************************
function f_console_info(...pa_var_args) {
  console.info(pa_var_args.map(function (po_one_arg) {
    return(po_one_arg.toString());
  }).join(''));
}



// A special version of [f_console_info(...)], able to process any type of data
function f_console_inspect(...pa_var_args) {
  f_console_info(pa_var_args.map(function(po_one_arg) {
    // [null]
    if (po_one_arg === null) {
      return('-null-');
    }

    // [undefined]
    if (po_one_arg === undefined) {
      return('-undefined-');
    }

    // standard object that can be stringified with JSON
    return(JSON.stringify(po_one_arg, null, 2));
  }, pa_var_args).join(' '));
}


function f_console_warning(...pa_var_args) {
  f_console_info.apply(f_console_info, [ cs_console_trace_prefix_warning ].concat(pa_var_args));
}


function f_console_alert(...pa_var_args) {
  f_console_info.apply(f_console_info, [ cs_console_trace_prefix_alert ].concat(pa_var_args));
}


function f_console_error(...pa_var_args) {
  f_console_info.apply(f_console_info, [ cs_console_trace_prefix_error ].concat(pa_var_args));
}


function f_console_security_issue(...pa_var_args) {
  f_console_error.apply(f_console_error, [ '##SECURITY## ' ].concat(pa_var_args));
}


function f_console_fatal(...pa_var_args) {
  f_console_info.apply(f_console_info, [ cs_console_trace_prefix_fatal ].concat(pa_var_args));
}


function f_console_assert(pb_check_condition, ...pa_var_args) {
  if (! pb_check_condition) {
    f_console_error.apply(f_console_error, [ 'assertion failed ' ].concat(pa_var_args));
  }

  return(pb_check_condition);
}


function f_console_block(ps_message, pf_sub_to_exec) {
  f_console_indent(ps_message);
  {
    pf_sub_to_exec();
  }
  f_console_unindent();
}


function _f_console_NOT_IMPLEMENTED(ps_method, pb_silent) {
  if (! pb_silent) {
    f_console_error('call to API [', ps_method, '] - NOT IMPLEMENTED');
  }
}



// API [f_console_...] not fully implemented in JS today
function f_console_configure() {
  _f_console_NOT_IMPLEMENTED('f_console_configure', true);
}
function f_console_start() {
  _f_console_NOT_IMPLEMENTED('f_console_start', true);
}
function f_console_stop() {
  _f_console_NOT_IMPLEMENTED('f_console_stop', true);
}
function f_console_separator() {
  _f_console_NOT_IMPLEMENTED('f_console_separator', true);
}
function f_console_indent() {
  _f_console_NOT_IMPLEMENTED('f_console_indent', true);
}
function f_console_unindent() {
  _f_console_NOT_IMPLEMENTED('f_console_unindent', true);
}
function f_console_progress() {
  _f_console_NOT_IMPLEMENTED('f_console_progress', true);
}
function f_console_usage() {
  _f_console_NOT_IMPLEMENTED('f_console_usage');
}
function f_console_OUTGOING_CNX() {
  _f_console_NOT_IMPLEMENTED('f_console_OUTGOING_CNX');
}
function f_console_get_count_errors() {
  _f_console_NOT_IMPLEMENTED('f_console_get_count_errors');
}
function f_console_get_count_warnings() {
  _f_console_NOT_IMPLEMENTED('f_console_get_count_warnings');
}
function f_console_get_count_alerts() {
  _f_console_NOT_IMPLEMENTED('f_console_get_count_alerts');
}
function f_console_reset() {
  _f_console_NOT_IMPLEMENTED('f_console_reset', true);
}
function f_console_dump_stats() {
  _f_console_NOT_IMPLEMENTED('f_console_dump_stats');
}
function f_console_debug_pkg() {
  _f_console_NOT_IMPLEMENTED('f_console_debug_pkg');
}
function f_console_debug_chrono() {
  _f_console_NOT_IMPLEMENTED('f_console_debug_chrono');
}


// ##UNIT-TEST## Unitary self-testing of the library - This code
// should move to an external script of unitary tests - NodeJS ?
function f_console_lib_self_test() {
  "use strict";

  let lo_complex_object = {
    a: 'this',
    b: 'is',
    c: 'a',
    d: 'complex',
    e: ['object', 'to', 'inspect' ]
  };

  f_console_info('f_console_info:', ' this', ' is', ' an', ' info', ' - DONE');
  f_console_warning('f_console_warning:', ' this', ' is', ' a', ' warning', ' - DONE');
  f_console_alert('f_console_alert:', ' this', ' is', ' an', ' alert', ' - DONE');
  f_console_error('f_console_error:', ' this', ' is', ' an', ' error', ' - DONE');
  f_console_fatal('f_console_fatal:', ' this', ' is', ' a', ' fatal error', ' - DONE');

  f_console_inspect('f_console_inspect:', lo_complex_object, '- DONE');
  f_console_assert(true, 'f_console_assert:', ' this', ' is', ' an', ' assert', ' ok', ' - DONE');
  f_console_assert(false, 'f_console_assert:', ' this', ' is', ' an', ' assert', ' FAILED', ' - DONE');
}



// exports
module.exports.f_console_OUTGOING_CNX = f_console_OUTGOING_CNX;
module.exports.f_console_alert = f_console_alert;
module.exports.f_console_assert = f_console_assert;
module.exports.f_console_block = f_console_block;
module.exports.f_console_configure = f_console_configure;
module.exports.f_console_debug_chrono = f_console_debug_chrono;
module.exports.f_console_debug_pkg = f_console_debug_pkg;
module.exports.f_console_dump_stats = f_console_dump_stats;
module.exports.f_console_error = f_console_error;
module.exports.f_console_fatal = f_console_fatal;
module.exports.f_console_get_count_alerts = f_console_get_count_alerts;
module.exports.f_console_get_count_errors = f_console_get_count_errors;
module.exports.f_console_get_count_warnings = f_console_get_count_warnings;
module.exports.f_console_indent = f_console_indent;
module.exports.f_console_info = f_console_info;
module.exports.f_console_inspect = f_console_inspect;
module.exports.f_console_lib_self_test = f_console_lib_self_test;
module.exports.f_console_progress = f_console_progress;
module.exports.f_console_reset = f_console_reset;
module.exports.f_console_security_issue = f_console_security_issue;
module.exports.f_console_separator = f_console_separator;
module.exports.f_console_start = f_console_start;
module.exports.f_console_stop = f_console_stop;
module.exports.f_console_unindent = f_console_unindent;
module.exports.f_console_usage = f_console_usage;
module.exports.f_console_warning = f_console_warning;
