/*jslint fudge, white, node */


// return true when the argument is neither undefined nor null
export function f_is_defined(po_value) {
  return((po_value !== null) &&
         (po_value !== undefined));
}


// negation of [f_is_defined]
export function f_is_not_defined(po_value) {
  return(! f_is_defined(po_value));
}




// a dummy null function
export function f_no_op() {
  // null / empty function
}





export function f_iterate_async(
  ph_args) {

  let lh_args = Object.assign({
    pa_iterate_on_list: null,
    pf_call_for_earch: null,
    pn_pause_ms_between_calls: 1,
    pf_call_after: null
  }, ph_args);


  if ((lh_args.pa_iterate_on_list) &&
      (lh_args.pf_call_for_earch)) {

    let lf_iterate_next;
    lf_iterate_next = function() {

      // while there is at least one element in the list
      if (lh_args.pa_iterate_on_list.length) {
        // the first call fo [pf_call_for_earch(...)] that returns false break the chain
        if (lh_args.pf_call_for_earch(lh_args.pa_iterate_on_list.shift())) {

          // prepare a deferred call for the next element
          setTimeout(lf_iterate_next, lh_args.pn_pause_ms_between_calls);
        }
      }


      // the list is now empty - ultimate call to [pf_call_after(...)]
      else {
        if (lh_args.pf_call_after) {
          lh_args.pf_call_after();
        }
      }
    };

    // ignition
    lf_iterate_next();
  }
}
