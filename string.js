/*jslint fudge, white, node */

"use strict";

const gm_misc = require("./misc");


module.exports.f_string_is_blank_or_null = f_string_is_blank_or_null;
module.exports.f_string_is_blank = f_string_is_blank;
module.exports.f_string_is_not_blank = f_string_is_not_blank;
module.exports.f_string_is_neither_blank_nor_null = f_string_is_neither_blank_nor_null;
module.exports.f_is_false = f_is_false;
module.exports.f_is_true = f_is_true;
module.exports.f_stringify = f_stringify;
module.exports.f_string_trim = f_string_trim;
module.exports.f_join_non_blank_vals = f_join_non_blank_vals;
module.exports.f_get_first_def = f_get_first_def;
module.exports.f_get_first_val = f_get_first_val;
module.exports.f_string_cmp = f_string_cmp;
module.exports.f_convert_px_to_int = f_convert_px_to_int;
module.exports.f_string_match_re = f_string_match_re;
module.exports.f_string_pad_right = f_string_pad_right;
module.exports.f_string_pad_left = f_string_pad_left;
module.exports.f_string_is_email_address = f_string_is_email_address;
module.exports.f_string_is_url = f_string_is_url;
module.exports.f_string_is_html_fragment = f_string_is_html_fragment;
module.exports.f_string_truncate = f_string_truncate;



// Return true if arg is undef | null | made only of blank characters
const _cr_string_blank = /^\s*$/;
function f_string_is_blank(ps_value) {
  // Trivial cases
  if (ps_value === null) {
    return(true);
  }

  if (ps_value === undefined) {
    return(true);
  }

  if (ps_value === "") {
    return(true);
  }

  return(_cr_string_blank.test(ps_value));
}

// negation of [f_string_is_blank]
function f_string_is_not_blank(ps_value) {
  return(! f_string_is_blank(ps_value));
}



// Similar to [f_string_is_blank] - also return true for the special value "null"
const _cr_string_blank_or_null = /^\s*(?:-|null)\s*$/i;
function f_string_is_blank_or_null(ps_value) {

  if (f_string_is_blank(ps_value)) {
    return(true);
  }

  return(_cr_string_blank_or_null.test(ps_value));
}



// negation of [f_string_is_blank_or_null]
function f_string_is_neither_blank_nor_null(ps_value) {
  return(! f_string_is_blank_or_null(ps_value));
}



const _cr_is_false = /^\s*(0|off|false|no|f|n)\s*$/i;
function f_is_false(ps_value) {
  // Any undefined / null value is considered as false
  if (ps_value === null) {
    return(true);
  }

  if (ps_value === undefined) {
    return(true);
  }

  // Some optimizations
  if (ps_value === 0) {
    return(true);
  }

  if (ps_value === 1) {
    return(false);
  }

  if (ps_value === false) {
    return(true);
  }

  if (ps_value === true) {
    return(false);
  }

  if (ps_value === "") {
    return(true);
  }

  // An empty string is considered as false
  if (f_string_is_blank_or_null(ps_value)) {
    return(true);
  }

  // The final test
  return(_cr_is_false.test(ps_value));
}


const _cr_is_true = /^\s*(\d+|on|true|yes|t|y)\s*$/i;
function f_is_true(ps_value) {
  // Any undefined / null value is considered as false
  if (ps_value === null) {
    return(false);
  }

  if (ps_value === undefined) {
    return(false);
  }

  // Some optimizations
  if (ps_value === 0) {
    return(false);
  }

  if (ps_value === 1) {
    return(true);
  }

  if (ps_value === false) {
    return(false);
  }

  if (ps_value === true) {
    return(true);
  }

  if (ps_value === "") {
    return(false);
  }

  if (ps_value === "0") {
    return(false);
  }

  // The final test
  return(_cr_is_true.test(ps_value));
}


// return a stringyfied representation of [po_value] - or null
function f_stringify(po_value) {
  return(gm_misc.f_is_defined(po_value) ? String(po_value) : null);
}


// remove leading / trailing blanks
function f_string_trim(ps_value) {

  if (ps_value === null) {
    return(ps_value);
  }

  if (ps_value === undefined) {
    return(ps_value);
  }

  if (ps_value === "") {
    return(ps_value);
  }

  return(ps_value
         .replace(/^\s+/g, "")
         .replace(/\s+$/g, ""));
}


function f_join_non_blank_vals(ps_sep, ...pa_vals) {
  let ls_result = "";

  let ln_joined = 0;
  while (pa_vals.length) {
    let ls_next_val = pa_vals.shift();
    if (f_string_is_not_blank(ls_next_val)) {
      ls_result += (((ln_joined > 0) ? ps_sep : "") + ls_next_val);
      ln_joined += 1;
    }
  }

  return(ls_result);
}



// Return the first argument which is not null / undefined
function f_get_first_def(...pa_vals) {
  let ls_next_val;

  while (pa_vals.length) {
    ls_next_val = pa_vals.shift();

    if (gm_misc.f_is_defined(ls_next_val)) {
      return(ls_next_val);
    }
  }

  // By default, return the last value
  return(ls_next_val);
}



// Return the first argument with a non-empty value
function f_get_first_val(...pa_vals) {
  let ls_next_val;

  while (pa_vals.length) {
    ls_next_val = pa_vals.shift();

    if (f_string_is_not_blank(ls_next_val)) {
      return(ls_next_val);
    }
  }

  // By default, return the last value
  return(ls_next_val);
}



function f_string_cmp(
  ps_a,
  ps_b) {
  return(ps_a.localeCompare(ps_b));
}


// Parse a value like [15px], and return 15
function f_convert_px_to_int(
  ps_px_value) {
  if (! f_string_is_blank(ps_px_value)) {
    let la_re_parts = ps_px_value.match(/^\s*(\d+)\s*px\s*/);
    if (la_re_parts) {
      return(parseInt(la_re_parts[0]));
    }
  }

  return(null);
}





// a kind of safe replacement for [String.match(...)], with a
// preliminary check that[ps_str] is really a valid string
function f_string_match_re(
  ps_str,
  pr_regexp) {
  return((typeof(ps_str) === "string") ? ps_str.match(pr_regexp) : false);
}



function f_string_pad_right(
  ps_str,
  ps_chr,
  pn_len) {
  ps_str = ps_str.toString();
  ps_chr = ps_chr.toString();

  while (ps_str.length < pn_len) {
    ps_str = ps_str.concat(ps_chr);
  }

  return(ps_str.substr(0, pn_len));
}


function f_string_pad_left(
  ps_str,
  ps_chr,
  pn_len) {
  ps_str = ps_str.toString();
  ps_chr = ps_chr.toString();

  while (ps_str.length < pn_len) {
    ps_str = ps_chr.concat(ps_str);
  }

  return(ps_str.substr(0, pn_len));
}



function f_string_is_email_address(
  ps_str) {
  return(f_string_match_re(ps_str, /^[\w\-.]+@[\w\-.]+$/));
}


function f_string_is_url(
  ps_str) {
  return(f_string_match_re(ps_str, /^(https|http|ftp)\:\/\//));
}


function f_string_is_html_fragment(
  ps_str) {
  return(f_string_match_re(ps_str, /^\s*<\w+(.|\n)*>\s*$/));
}




// When needed, truncate [ps_long_value] to the given [pn_max_len] max
// length, and append [ps_pad_with] to mark the truncation
function f_string_truncate(
  ps_long_value,
  pn_max_len,
  ps_pad_with) {

  if ((ps_long_value) &&
      (pn_max_len)) {
    ps_pad_with = f_get_first_def(ps_pad_with, "...");

    if (ps_long_value.length > pn_max_len) {
      ps_long_value = (ps_long_value.substr(0, (pn_max_len - ps_pad_with.length)) + ps_pad_with);
    }
  }

  return(ps_long_value);
}
