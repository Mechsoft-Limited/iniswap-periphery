import { bytecode } from '@uniswap/v2-core/build/contracts/IniPair.json'
import { keccak256 } from '@ethersproject/solidity'
import fs from 'fs';
import path from 'path';
const COMPUTED_INIT_CODE_HASH = keccak256(['bytes'], [`${bytecode}`]);

fs.writeFileSync(path.join(__dirname,'./initCodeHash.ts'), `export const INIT_CODE_HASH = '${COMPUTED_INIT_CODE_HASH}'`)