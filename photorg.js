
"use strict";


const gm_fs = require('fs');


class PhotoScanner {
  constructor() {
    // ##TODO##
  }


  _m_handle_fatal(ps_error) {
    if (ps_error) {
      console.error(ps_error);
      process.exit(2);
    }

    return(false);
  }


  _m_handle_error(ps_error) {
    if (ps_error) {
      console.error(ps_error);
      return(true);
    }

    return(false);
  }


  _m_scan_dir_elt(ps_elt_path) {
    let lo_self = this;

    console.log(`entry: [${ps_elt_path}]`); // ##TODO##

    gm_fs.lstat(ps_elt_path, function(ps_error, po_stats) {
      if (! lo_self._m_handle_error(ps_error)) {

        // directory ==> recurse
        if (po_stats.isDirectory()) {
          lo_self.m_scan_dir(ps_elt_path);
        }

        // symbolic link ==> ignore
        else if (po_stats.isSymbolicLink()) {
          console.warning(`skipping symlink [${ps_elt_path}]`);
          // ignore / skip it
        }

        // plain file
        else if (po_stats.isFile()) {
          lo_self.m_scan_file(ps_elt_path);
        }

        // anothe case ?
        else {
          lo_self._m_handle_fatal(`dir element [${ps_elt_path}] has an unknown type`);
        }
      }
    });
  }


  m_scan_dir(ps_dir) {
    let lo_self = this;

    console.log(`dir: [${ps_dir}]`);
    gm_fs.readdir(ps_dir, function(ps_error, pa_files) {
      if (! lo_self._m_handle_error(ps_error)) {
        pa_files.forEach(function(ps_dir_entry) {
          lo_self._m_scan_dir_elt(ps_dir + '/' + ps_dir_entry);
        });
      }
    });
  }



  m_scan_file(ps_file_path) {
    let lo_self = this;

    console.log(`plain file: [${ps_file_path}]`);
    // ##TODO##
  }
}


let go_scanner = new PhotoScanner();



go_scanner.m_scan_dir('.');
