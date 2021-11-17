const Router = artifacts.require("IniRouter");
const safeMath = artifacts.require("SafeMath");
const IniLibrary = artifacts.require('IniLibrary');
const TransferHelper = artifacts.require("TransferHelper");

const fs = require('fs');
const path = require('path');
const { FACTORY_ADDRESS,INIT_CODE_HASH } = require('@iniswap/core/build');
module.exports= async function(deployer,network,accounts){

//const factory = "0x02eD0469b9A6A9AbAf31ABA0645E9eda8B51585c" //fs.readFileSync(path.join(__dirname,'../../iniswap-core/address.txt'),'utf8');
 const weth = "0xae13d989dac2f0debff460ac112a837c89baa7cd";//network === "development"?fs.readFileSync(path.join(__dirname,'../../weth/address.txt'),'utf8'):
//"0xae13d989dac2f0debff460ac112a837c89baa7cd";
// const token1 = fs.readFileSync(path.join(__dirname,'../../tokens/address1.txt'),'utf8');
// const token2 = fs.readFileSync(path.join(__dirname,'../../tokens/address2.txt'),'utf8');
  
if(!FACTORY_ADDRESS || !weth) throw new Error('Missing addresses');

await deployer.deploy(safeMath);
await deployer.link(safeMath,[Router,IniLibrary,TransferHelper]);
await deployer.deploy(IniLibrary);
await deployer.link(IniLibrary,Router);
await deployer.deploy(TransferHelper);
await deployer.link(TransferHelper,Router);


await deployer.deploy(Router,FACTORY_ADDRESS,weth);
const router = await Router.deployed();
  fs.writeFileSync(path.join(__dirname,"../address.txt"),router.address);
  

//router.addLiquidityETH(token1,1000)
}