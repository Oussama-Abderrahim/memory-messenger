const fs = require("fs");
const { dialog } = require("electron").remote;

/**
 *
 * @param {function(JSON)} cb A callback that takes read file in JSON
 */
const loadConversationFromFile = cb => {
  readFile(data => {
    cb(JSON.parse(data));
  });
};

/**
 * Read a file using a FileChooserDialog
 * @param {function(String)} cb A callback that takes file content
 */
const readFile = cb => {
  dialog.showOpenDialog(fileNames => {
    // fileNames is an array that contains all the selected
    if (fileNames === undefined) {
      console.log("No file selected");
      cb(null);
    }
    let filepath = fileNames[0];

    fs.readFile(filepath, "utf8", (err, data) => {
      if (err) {
        alert("An error ocurred reading the file :" + err.message);

        cb(null);
      }
      console.log(data);
      cb(data);
    });
  });
};

module.exports = loadConversationFromFile;
