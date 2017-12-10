
"use strict";


var cs_console_trace_prefix_alert = '!!! ALERT !!! ';
var cs_console_trace_prefix_error = '!!! ERROR !!! ';
var cs_console_trace_prefix_fatal = '!!! FATAL !!! ';
var cs_console_trace_prefix_warning = '!!! WARNING !!! ';




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
module.exports.f_console_info = function f_console_info(
    ...pa_msh_parts)
{

  if ((! _go_console_window) ||
      (_go_console_window.closed))


    // Collect and concatenate all the extra arguments into a single
    // string
  {
    var li_ArgNo = f_console_info.length;
    var li_ArgC = arguments.length;
    while (li_ArgNo < li_ArgC) {
      ps_msg += arguments[li_ArgNo++];
    }
  }

  var lo_log_timestamp = _go_console_window.document.createElement('span');
  lo_log_timestamp.className = 'CssDbgLogTimStp';
  lo_log_timestamp.innerHTML = '[' + f_format_date_YYYYMMDDhhmmssms(null, '-', ':', ' ') + ']';

  var lo_log_payload = _go_console_window.document.createElement('pre');
  lo_log_payload.className = 'CssDbgLogPayload';
  $(lo_log_payload).text(ps_msg);

  var lo_log_rec = _go_console_window.document.createElement('div');
  lo_log_rec.className = 'CssDbgLogRec';
  lo_log_rec.appendChild(lo_log_timestamp);
  lo_log_rec.appendChild(lo_log_payload);

  _go_console_window.document.body.appendChild(lo_log_rec);

  // auto-scroll
  _go_console_window.scroll(0, f_max(_go_console_window.document.body.scrollHeight,
                                     _go_console_window.document.body.offsetHeight,
                                     _go_console_window.document.documentElement.clientHeight,
                                     _go_console_window.document.documentElement.scrollHeight,
                                     _go_console_window.document.documentElement.offsetHeight));
}


// A special version of [f_console_info(...)], able to process any type of data
function f_console_inspect() {
  "use strict";

  var lf_process_one_arg = function(po_arg) {
    // [null]
    if (po_arg === null) {
      return('-null-');
    }

    // [undefined]
    if (po_arg === undefined) {
      return('-undefined-');
    }

    // XML document
    if ((po_arg) &&
        (po_arg.XMLDocument) &&
        (po_arg.XMLDocument.documentElement)) {
      var lo_dom_status=new c_dom_status(po_arg);
      var ls_xml=f_dom_dso_to_str(po_arg);

      // check status
      return(f_JoinNonEmptyVals('',
                                'Status:',
                                '\n',
                                'level=', lo_dom_status.level,
                                '\n',
                                'mnemonic=', lo_dom_status.mnemonic,
                                '\n',
                                'message=', lo_dom_status.message,
                                '\n',
                                'rowcount=', lo_dom_status.row_count,
                                '\n',
                                'query_duration_ms=', lo_dom_status.query_duration_ms,
                                ls_xml));
    }


    // standard object that can be stringified with JSON
    if (window.JSON) {
      return(JSON.stringify(po_arg, null, 2));
    }


    // ultimate default case
    return(po_arg.toString());
  };


  var la_fragments = [];

  // consume the arguments one by one
  var li_ArgNo = 0;
  var li_ArgC = arguments.length;
  while (li_ArgNo < li_ArgC) {
    la_fragments.push(lf_process_one_arg(arguments[li_ArgNo++]));
  }

  f_console_info(f_JoinNonEmptyVals(' ', la_fragments));
}


function f_console_warning() {
  "use strict";

  var la_info_args = [ cs_console_trace_prefix_warning ].concat(Array.prototype.slice.call(arguments));
  f_console_info.apply(f_console_info, la_info_args);
}


function f_console_alert() {
  "use strict";

  var la_info_args = [ cs_console_trace_prefix_alert ].concat(Array.prototype.slice.call(arguments));
  f_console_info.apply(f_console_info, la_info_args);
}


function f_console_error() {
  "use strict";

  var la_info_args = [ cs_console_trace_prefix_error ].concat(Array.prototype.slice.call(arguments));
  f_console_info.apply(f_console_info, la_info_args);
}


function f_console_security_issue() {
  "use strict";

  var la_info_args = [ '##SECURITY## ' ].concat(Array.prototype.slice.call(arguments));

  // this call to [alert(...)] is intentional, in order to avoid HTML
  // or JS injection - do NOT replace by [f_alert(...)] or any other
  // mean leading to a HTML rendering
  alert(la_info_args.join(''));
}


function f_console_fatal() {
  "use strict";

  var la_info_args = [ cs_console_trace_prefix_fatal ].concat(Array.prototype.slice.call(arguments));
  f_console_info.apply(f_console_info, la_info_args);

  // no way to stop execution...
}


function f_console_assert(
  pb_check_condition) {
  "use strict";

  if (! pb_check_condition) {
    var la_info_args = [ 'assertion failed ' ].concat(Array.prototype.slice.call(arguments, f_console_assert.length));
    f_console_error.apply(f_console_error, la_info_args);
  }

  return(pb_check_condition);
}



// ********************************************************************
//  FUNCTION DESCRIPTION :
//  - Dump the current JavaScript call-stack
//  ARGUMENTS :
//  -
//  RETURN VALUE :
//  -
//  HISTORY :
//  - Creation          : Mon Jun 15 07:19:46 2009 - Herve LEDOUX on carbone14
//  - Last modification : Thu Sep 22 09:43:35 2016 - Herve Ledoux on xnms-ldev
// ********************************************************************
function f_console_dump_call_stack(
  pb_display_it,
  ps_intro_message) {
  "use strict";

  var ls_dump = '';

  // in strict mode, it is no longer possible to inspect the call-stack...
  f_console_error('Attempt to dump the call-stack - impossible');

  return(ls_dump);
}


function f_console_block(ps_message, pf_sub_to_exec) {
  f_console_indent(ps_message);
  {
    pf_sub_to_exec();
  }
  f_console_unindent();
}


function _f_console_NOT_IMPLEMENTED(
  ps_method,
  pb_silent) {
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

  var lo_complex_object = {
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



export
