#!/usr/bin/env node

const util = require('util');
const { exec } = require('node:child_process');
const execPromise = util.promisify(exec);

var inquirer = require('inquirer');

const commander = async (cmd) => {
  const { stdout } = await execPromise(cmd);
  return stdout;
}
const GIT_BRANCH = 'git branch';
const GIT_CHECKOUT = 'git checkout ';

async function init() {
  const branchStdout = await commander(GIT_BRANCH);
  const branch = [];
  branchStdout.split('\n').forEach(item => {
    const ele = item.replace('*', '').trim();
    if (ele) {
      branch.push({
        name: ele,
        value: ele
      });
    }
  })
  const { action } = await inquirer.prompt([
    {
      name: 'action',
      type: 'list',
      message: '请选择要切换的分支',
      choices: branch
    }
  ])
  const checkoutStdout = await commander(`${GIT_CHECKOUT} ${action}`);
  console.log(checkoutStdout);
}
init();
