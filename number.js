/*jslint fudge, white, node */


import { f_is_defined } from "util";
import { f_string_is_blank } from "string";



const _cr_is_number = /^[\-+]?\d+(\.\d+)?$/;
export function f_is_number(ps_text) {

  // trivial cases
  if (f_string_is_blank(ps_text)) {
    return(false);
  }

  return(_cr_is_number.test(ps_text));
}


export function f_n_min(...pa_vals) {
  let ln_result;

  pa_vals.forEach(function(pn_val) {
    if (! f_is_defined(ln_result)) {
      ln_result = pn_val;
    }

    else if ((f_is_defined(pn_val)) &&
             (pn_val < ln_result)) {
      ln_result = pn_val;
    }
  });

  return(ln_result);
}


export function f_n_max(...pa_vals) {
  let ln_result;

  pa_vals.forEach(function(pn_val) {
    if (! f_is_defined(ln_result)) {
      ln_result = pn_val;
    }

    else if ((f_is_defined(pn_val)) &&
             (pn_val > ln_result)) {
      ln_result = pn_val;
    }
  });

  return(ln_result);
}


// Utilities [f_n_cmp] that can be used within the context of a call to [Array.sort(...)]
export function f_n_cmp (pn_a, pn_b) {
  return((pn_a < pn_b) ? -1 : ((pn_a > pn_b) ? 1 : 0));
}
