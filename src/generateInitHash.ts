import { bytecode } from '@iniswap/core/build/IniPair.json'
import { keccak256 } from '@ethersproject/solidity'
import fs from 'fs';
import path from 'path';
const COMPUTED_INIT_CODE_HASH = keccak256(['bytes'], [`0x${bytecode}`]);

fs.writeFileSync(path.join(__dirname,'./initCodeHash.ts'), `export const INIT_CODE_HASH = '${COMPUTED_INIT_CODE_HASH}'`)