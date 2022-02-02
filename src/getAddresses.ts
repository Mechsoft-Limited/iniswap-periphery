
import fs from 'fs';
import path from 'path';
const { FACTORY_ADDRESS,INIT_CODE_HASH } = require('@iniswap/core/build');
const router = fs.readFileSync(path.join(__dirname,'../binance_address.txt'),'utf8');

const addresses = `
  module.exports ={
    ROUTER_ADDRESS: '${router}',
    INIT_CODE_HASH: '${INIT_CODE_HASH}',
    FACTORY_ADDRESS: '${FACTORY_ADDRESS}',
  }`
  fs.writeFileSync(path.join(__dirname,"../build/index.js"),addresses);
