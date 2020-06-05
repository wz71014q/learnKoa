const fs = require('fs');
const ejs = require('ejs');

function resolveFile(file) {
  return new Promise((resolve, reject) => {
    fs.readFile(file, 'utf8', (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}

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
  resolveFile,
  render
}