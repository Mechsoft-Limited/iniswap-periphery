const Router = artifacts.require("IniRouter");
const SafeMath = artifacts.require("SafeMath");
const IniLibrary = artifacts.require('IniLibrary');
const TransferHelper = artifacts.require("TransferHelper");

const fs = require('fs');
const path = require('path');
const { FACTORY_ADDRESS,INIT_CODE_HASH } = require('@iniswap/core/build');
const weth = "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"; // "0xae13d989dac2f0debff460ac112a837c89baa7cd";

module.exports= async function(deployer,network,accounts){


if(!FACTORY_ADDRESS || !weth) throw new Error('Missing addresses');

//await deployer.deploy(safeMath);//0x5448A34170eA1b9d8B6a233c8d8C226e6c5522C2
const safeMath =  await SafeMath.at('0x5448A34170eA1b9d8B6a233c8d8C226e6c5522C2')
await deployer.link(safeMath,[Router,IniLibrary,TransferHelper]);
//await deployer.deploy(IniLibrary);//0x60a6180c48dd0261Dc6946Ff10058F019A0eec79
const iniLibrary = await IniLibrary.at('0x60a6180c48dd0261Dc6946Ff10058F019A0eec79')
await deployer.link(iniLibrary,Router);
//await deployer.deploy(TransferHelper);//0x9d3a36Eff8B5a6D762c0EE3A8F29E2AA043500F4
const transferHelper = await TransferHelper.at('0x9d3a36Eff8B5a6D762c0EE3A8F29E2AA043500F4');
await deployer.link(transferHelper,Router);


await deployer.deploy(Router,FACTORY_ADDRESS,weth);//0xbcc57121B8A294FfCF6Ec68121406a18a3DFa383
const router = await Router.deployed();
  fs.writeFileSync(path.join(__dirname,`../${network}_address.txt`),router.address);
  

//router.addLiquidityETH(token1,1000)
}