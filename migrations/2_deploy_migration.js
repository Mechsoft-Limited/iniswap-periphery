const Router = artifacts.require("IniRouter");
const safeMath = artifacts.require("SafeMath");
const IniLibrary = artifacts.require('IniLibrary');
const TransferHelper = artifacts.require("TransferHelper");

const fs = require('fs');
const path = require('path');
const { FACTORY_ADDRESS,INIT_CODE_HASH } = require('@iniswap/core/build');
const weth = "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"; // "0xae13d989dac2f0debff460ac112a837c89baa7cd";

module.exports= async function(deployer,network,accounts){


if(!FACTORY_ADDRESS || !weth) throw new Error('Missing addresses');

await deployer.deploy(safeMath);
await deployer.link(safeMath,[Router,IniLibrary,TransferHelper]);
await deployer.deploy(IniLibrary);
await deployer.link(IniLibrary,Router);
await deployer.deploy(TransferHelper);
await deployer.link(TransferHelper,Router);


await deployer.deploy(Router,FACTORY_ADDRESS,weth);
const router = await Router.deployed();
  fs.writeFileSync(path.join(__dirname,`../${network}_address.txt`),router.address);
  

//router.addLiquidityETH(token1,1000)
}