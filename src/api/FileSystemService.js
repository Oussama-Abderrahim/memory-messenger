const fs = require("fs");
const { dialog } = require("electron").remote;

/**
 * Callback called after reading a file
 * @callback FileSystemService~ReadFileCb
 * @param {Object} data - Json data
 * @param {string} folderpath - Path to the read folder
 */

/**
 * @class
 * @classdesc A service for external files reading and parsing
 */
class FileSystemService {
  constructor() {}

  /**
   * Prompt to open a file, and extract folder path, then parse the file
   * @param {FileSystemService~ReadFileCb} cb Callback that takes two Params:
   */
  loadJsonFile(cb) {
    this._readFileFromChooser((data, filepath) => {
      cb(JSON.parse(data), filepath);
    });
  }

  /**
   * Read and parse a JSON file in the given path
   * @param {FileSystemService~ReadFileCb} cb Callback that takes two Params:
   */
  readJsonFile(filepath, cb) {
    console.log(filepath);
    fs.readFile(filepath, "utf8", (err, data) => {
      cb(JSON.parse(data), filepath);
    });
  }

  /**
   * Prompt to open a file, and extract folder path
   * @param {FileSystemService~ReadFileCb} cb
   */
  _readFileFromChooser(cb) {
    dialog.showOpenDialog((fileNames) => {
      // fileNames is an array that contains all the selected
      if (fileNames === undefined || fileNames.length == 0) {
        console.log("No file selected");
        cb(null);
        return;
      }
      let filepath = fileNames[0];

      fs.readFile(filepath, "utf8", (err, data) => {
        if (err) {
          alert("An error ocurred reading the file :" + err.message);

          cb(null);
        }
        /// TODO : extract path correctly
        let pathRegex = /(.)*\\messages\\/i;
        filepath = filepath.match(pathRegex)[0];
        filepath = filepath.slice(0, -9); // 9 is "messages/".length, since URIs start with 'messages/'
        cb(data, filepath);
      });
    });
  }
}

module.exports = new FileSystemService();
