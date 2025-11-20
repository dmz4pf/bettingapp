// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "../src/BettingMarket.sol";

contract DeployScript is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");

        vm.startBroadcast(deployerPrivateKey);

        BettingMarket bettingMarket = new BettingMarket();

        console.log("BettingMarket deployed to:", address(bettingMarket));

        vm.stopBroadcast();
    }
}
