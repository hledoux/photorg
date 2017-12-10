/*jslint fudge, white, node */

const gm_util = require("./util");
const gm_string = require("./string");


const _cr_is_number = /^[\-+]?\d+(\.\d+)?$/;
module.exports f_is_number = function f_is_number(ps_text) {

  // trivial cases
  if (gm_string.f_string_is_blank(ps_text)) {
    return(false);
  }

  return(_cr_is_number.test(ps_text));
};


module.exports f_n_min = function f_n_min(...pa_vals) {
  let ln_result;

  pa_vals.forEach(function(pn_val) {
    if (! gm_util.f_is_defined(ln_result)) {
      ln_result = pn_val;
      return;
    }

    if ((gm_util.f_is_defined(pn_val)) &&
        (pn_val < ln_result)) {
      ln_result = pn_val;
      return;
    }
  });

  return(ln_result);
};


module.exports f_n_max = function f_n_max(...pa_vals) {
  let ln_result;

  pa_vals.forEach(function(pn_val) {
    if (! gm_util.f_is_defined(ln_result)) {
      ln_result = pn_val;
      return;
    }

    if ((gm_util.f_is_defined(pn_val)) &&
        (pn_val > ln_result)) {
      ln_result = pn_val;
      return;
    }
  });

  return(ln_result);
};


// Utilities [f_n_cmp] that can be used within the context of a call to
// [Array.sort(...)]
module.exports f_n_cmp = function f_n_cmp(pn_a, pn_b) {
  return((pn_a < pn_b) ? -1 : ((pn_a > pn_b) ? 1 : 0));
};
