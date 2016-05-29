'use strict';

var paths = process.argv.slice(2);

const fs = require('fs');
function deleteFolderRecursive(path) {
  if (fs.existsSync(path)) {
    if (fs.statSync(path).isDirectory()) {
      fs.readdirSync(path).forEach(function (file, index) {
        var curPath = path + "/" + file;
        if (fs.lstatSync(curPath).isDirectory()) { // recurse
          deleteFolderRecursive(curPath);
        } else { // delete file
          fs.unlinkSync(curPath);
        }
      });
      fs.rmdirSync(path);
    }
    else {
      fs.unlinkSync(path);
    }
  }
}

paths
  .forEach(function (path) {
    deleteFolderRecursive(path);
  });
