
"use strict";


const gm_fs = require('fs');


class PhotoScanner {
  constructor() {
    // ##TODO##
  }


  m_scan_file(ps_file) {
    console.log(`file: ${ps_file}`);
  }


  m_scan_dir(ps_dir) {
    console.log(`dir: ${ps_dir}`);
    gm_fs.readdir(ps_dir, function(ps_err, pa_files) {
      if (ps_err) {
        console.error(ps_err)
      }

      else {
        pa_files.forEach(function(ps_dir_entry) {
          m_scan_file(ps_dir + '/' + ps_dir_entry);
        });
      }
    });
  }
}


let go_scanner = new PhotoScanner();



go_scanner.m_scan_dir('.');
