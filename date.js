/*jslint fudge, white, node */


const { f_string_pad_left, f_is_true } = require("string");


function _f_get_default_date(pd_date) {

  // Default date ==> now
  if (! pd_date) {
    pd_date = new Date();
  }

  return(pd_date);
}


export function f_format_date_YYYYMMDD(
  pd_date,
  ps_sep_date) {

  pd_date = _f_get_default_date(pd_date);

  return(pd_date.getUTCFullYear() + ps_sep_date +
         f_string_pad_left(pd_date.getUTCMonth() + 1, "0", 2) + ps_sep_date +
         f_string_pad_left(pd_date.getUTCDate(), "0", 2));
}


export function f_format_date_YYYYMMDDhhmmss(
  pd_date,
  ps_sep_date,
  ps_sep_time,
  ps_sep_parts) {

  pd_date = _f_get_default_date(pd_date);

  return(pd_date.getUTCFullYear() + ps_sep_date +
         f_string_pad_left(pd_date.getUTCMonth() + 1, "0", 2) + ps_sep_date +
         f_string_pad_left(pd_date.getUTCDate(), "0", 2) + ps_sep_parts +
         f_string_pad_left(pd_date.getUTCHours(), "0", 2) + ps_sep_time +
         f_string_pad_left(pd_date.getUTCMinutes(), "0", 2) + ps_sep_time +
         f_string_pad_left(pd_date.getUTCSeconds(), "0", 2));
}


export function f_format_date_YYYYMMDDhhmmssms(
  pd_date,
  ps_sep_date,
  ps_sep_time,
  ps_sep_parts) {

  pd_date = _f_get_default_date(pd_date);

  return(pd_date.getUTCFullYear() + ps_sep_date +
         f_string_pad_left(pd_date.getUTCMonth() + 1, "0", 2) + ps_sep_date +
         f_string_pad_left(pd_date.getUTCDate(), "0", 2) + ps_sep_parts +
         f_string_pad_left(pd_date.getUTCHours(), "0", 2) + ps_sep_time +
         f_string_pad_left(pd_date.getUTCMinutes(), "0", 2) + ps_sep_time +
         f_string_pad_left(pd_date.getUTCSeconds(), "0", 2) + ps_sep_time +
         f_string_pad_left(pd_date.getUTCMilliseconds(), "0", 3));
}



// Return a timestamp in format
// - [YYYY-MM-DDThh:mm:ss] when pb_compress is null | false
// - [YYYYMMDDhhmmss] when pb_compress is true
export function f_format_date_iso(
  pd_date,
  pb_compress) {

  pb_compress = f_is_true(pb_compress);

  return(f_format_date_YYYYMMDDhhmmss(pd_date,
                                      (pb_compress ? "" : "-"), // ps_sep_date
                                      (pb_compress ? "" : ":"), // ps_sep_time
                                      (pb_compress ? "" : "T")));
}


