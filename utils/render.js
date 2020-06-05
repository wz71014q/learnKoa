const fs = require('fs');
const ejs = require('ejs');

function render(viewUrl, data) {
  return new Promise((resolve, reject) => {
    fs.readFile(viewUrl, 'utf8', (err, file) => {
      if (err) {
        reject(err)
      } else {
        resolve(ejs.render(file, data))
      }
    })
  })
}

module.exports = {
  render
}