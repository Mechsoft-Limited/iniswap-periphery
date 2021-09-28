pragma solidity >=0.5.0;

interface IIniMigrator {
    function migrate(address token, uint amountTokenMin, uint amountETHMin, address to, uint deadline) external;
}
