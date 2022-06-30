const path = require('path');
const fs = require('fs');
const util = require('util');
const { parseString } = require('xml2js');

const parseStringPromise = util.promisify(parseString);

const rootDir = path.resolve(__dirname, './assets/i18n');
const savePath = path.resolve(__dirname, 'result.json');
const multiplePath = path.resolve(__dirname, 'multiple.json');

const macFileFlag = ['.DS_Store'];
const numberMap = {};
const fielsArray = [];

function getAllFiles(dir) {
  if (!dir) return;
  const fsStats = fs.statSync(dir);
  if (fsStats.isFile()) {
    fielsArray.push(dir);
    return;
  };
  if (fsStats.isDirectory()) {
    const files = fs.readdirSync(dir).filter(item => !macFileFlag.includes(item));
    files.forEach(file => {
      const filePath = path.resolve(dir, file);
      getAllFiles(filePath);
    })
  }
}

function getTransGroupNumber(obj) {
  if (!obj) return;
  const tag = Object.keys(obj).filter(item => item !== '$')[0];
  if (!tag) return;
  if (tag === 'trans-unit') return obj[tag];
  if (typeof obj[tag] === 'object') return getTransGroupNumber(obj[tag]);
}

async function readXmlFiles(filePath) {
  const file = fs.readFileSync(filePath, 'utf8');
  const fileObj = await parseStringPromise(file);
  const transUnitArray = getTransGroupNumber(fileObj.xliff);
  transUnitArray.forEach(unit => {
    if (unit['context-group']) {
      numberMap[unit.source[0]] = numberMap[unit.source[0]] ? numberMap[unit.source[0]] + unit['context-group'].length : unit['context-group'].length;
    }
  })
}

function statistics(obj, threshold) {
  const result = {};
  const sortArray = Object.entries(obj)
    .filter(item => item[1] > threshold)
    .sort((a, b) => b[1] - a[1]);
  const sortMap = Object.fromEntries(sortArray);
  return sortMap;
}

async function getStrCount(rootDir) {
  getAllFiles(rootDir);
  await Promise.all(fielsArray.map(item => readXmlFiles(item)));
  const str = `${JSON.stringify(numberMap)}`;
  const multipleStr = `${JSON.stringify(statistics(numberMap, 5))}`;
  fs.writeFileSync(savePath, str);
  fs.writeFileSync(multiplePath, multipleStr);
}
getStrCount(rootDir);
