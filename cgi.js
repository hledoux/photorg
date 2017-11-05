


// Sanity check on an argument provided by the end-user - quite
// similar to [PM_CCC::T_CgiAncestor::m_sanitize_argument_from_client]
function f_sanitize_argument_from_client(ps_arg_name, ps_arg_value) {

  var ls_result;

  TRY_ME: {

    // presence of a <script> tag in the value ==> ILLEGAL
    if (f_string_match_re(ps_arg_value, /\<\s*script\b[^\>]*\>/i)) {
      f_console_security_issue("attempt to inject argument [" + ps_arg_name + "] with illegal value [" + ps_arg_value + "] - HACK ATTEMPT ?");
      break TRY_ME;
    }

    // presence of an attribute [onblablabla=...] in the value ==> ILLEGAL
    if (f_string_match_re(ps_arg_value, /\b(?:on\w+)\s*\=\s*[\x22\x27]/i)) {
      f_console_security_issue("attempt to inject argument [" + ps_arg_name + "] with illegal value [" + ps_arg_value + "] - HACK ATTEMPT ?");
      break TRY_ME;
    }

    // at this point, we consider ps_arg_value is safe
    ls_result = ps_arg_value;
  } // TRY_ME

  return(ls_result);
}
