const Router = artifacts.require("IniRouter");
const safeMath = artifacts.require("SafeMath");

const fs = require('fs');
const path = require('path');
module.exports= async function(deployer,network,accounts){

const factory = fs.readFileSync(path.join(__dirname,'../../iniswap-core/address.txt'),'utf8');
 const weth = "0xae13d989dac2f0debff460ac112a837c89baa7cd";//network === "development"?fs.readFileSync(path.join(__dirname,'../../weth/address.txt'),'utf8'):
//"0xae13d989dac2f0debff460ac112a837c89baa7cd";
const token1 = fs.readFileSync(path.join(__dirname,'../../tokens/address1.txt'),'utf8');
const token2 = fs.readFileSync(path.join(__dirname,'../../tokens/address2.txt'),'utf8');
  
if(!factory || !weth) throw new Error('Missing addresses');

await deployer.deploy(safeMath);
await deployer.link(safeMath,Router,);
await deployer.deploy(Router,factory,weth);
const router = await Router.deployed();
  fs.writeFileSync(path.join(__dirname,"../address.txt"),router.address);

//router.addLiquidityETH(token1,1000)
}