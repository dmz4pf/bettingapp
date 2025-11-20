// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../src/BettingMarket.sol";

contract BettingMarketTest is Test {
    BettingMarket public bettingMarket;
    address public owner;
    address public user1;
    address public user2;

    function setUp() public {
        owner = address(this);
        user1 = address(0x1);
        user2 = address(0x2);

        bettingMarket = new BettingMarket();

        // Give users some ETH
        vm.deal(user1, 10 ether);
        vm.deal(user2, 10 ether);
    }

    function testCreateMarket() public {
        string memory description = "Will ETH reach $5000 by end of 2025?";
        uint256 endTime = block.timestamp + 30 days;
        uint256 minBet = 0.01 ether;

        uint256 marketId = bettingMarket.createMarket(description, endTime, minBet);

        BettingMarket.Market memory market = bettingMarket.getMarket(marketId);

        assertEq(market.id, 0);
        assertEq(market.creator, owner);
        assertEq(market.description, description);
        assertEq(market.endTime, endTime);
        assertEq(market.minBet, minBet);
        assertEq(market.resolved, false);
    }

    function testPlaceBet() public {
        // Create market
        uint256 endTime = block.timestamp + 30 days;
        uint256 marketId = bettingMarket.createMarket(
            "Test market",
            endTime,
            0.01 ether
        );

        // User1 places bet
        vm.prank(user1);
        bettingMarket.placeBet{value: 1 ether}(marketId, true);

        BettingMarket.Market memory market = bettingMarket.getMarket(marketId);
        assertEq(market.totalYesBets, 1 ether);

        // User2 places opposite bet
        vm.prank(user2);
        bettingMarket.placeBet{value: 0.5 ether}(marketId, false);

        market = bettingMarket.getMarket(marketId);
        assertEq(market.totalNoBets, 0.5 ether);
    }

    function testResolveMarket() public {
        // Create market
        uint256 endTime = block.timestamp + 30 days;
        uint256 marketId = bettingMarket.createMarket(
            "Test market",
            endTime,
            0.01 ether
        );

        // Place bets
        vm.prank(user1);
        bettingMarket.placeBet{value: 1 ether}(marketId, true);

        // Fast forward time
        vm.warp(endTime + 1);

        // Resolve market
        bettingMarket.resolveMarket(marketId, true);

        BettingMarket.Market memory market = bettingMarket.getMarket(marketId);
        assertTrue(market.resolved);
        assertTrue(market.winningOutcome);
    }

    function testClaimWinnings() public {
        // Create market
        uint256 endTime = block.timestamp + 30 days;
        uint256 marketId = bettingMarket.createMarket(
            "Test market",
            endTime,
            0.01 ether
        );

        // Place bets
        vm.prank(user1);
        bettingMarket.placeBet{value: 1 ether}(marketId, true);

        vm.prank(user2);
        bettingMarket.placeBet{value: 1 ether}(marketId, false);

        // Fast forward and resolve
        vm.warp(endTime + 1);
        bettingMarket.resolveMarket(marketId, true);

        // User1 claims winnings
        uint256 balanceBefore = user1.balance;
        vm.prank(user1);
        bettingMarket.claimWinnings(marketId);

        uint256 balanceAfter = user1.balance;
        assertTrue(balanceAfter > balanceBefore);
    }

    function testGetOdds() public {
        // Create market
        uint256 endTime = block.timestamp + 30 days;
        uint256 marketId = bettingMarket.createMarket(
            "Test market",
            endTime,
            0.01 ether
        );

        // Place bets
        vm.prank(user1);
        bettingMarket.placeBet{value: 2 ether}(marketId, true);

        vm.prank(user2);
        bettingMarket.placeBet{value: 1 ether}(marketId, false);

        (uint256 yesOdds, uint256 noOdds) = bettingMarket.getOdds(marketId);

        // 2 ETH YES, 1 ETH NO = 66% YES, 33% NO
        assertEq(yesOdds, 66);
        assertEq(noOdds, 33);
    }

    function testFailBetAfterEndTime() public {
        // Create market
        uint256 endTime = block.timestamp + 30 days;
        uint256 marketId = bettingMarket.createMarket(
            "Test market",
            endTime,
            0.01 ether
        );

        // Fast forward past end time
        vm.warp(endTime + 1);

        // This should fail
        vm.prank(user1);
        bettingMarket.placeBet{value: 1 ether}(marketId, true);
    }

    function testFailBetBelowMinimum() public {
        // Create market
        uint256 endTime = block.timestamp + 30 days;
        uint256 marketId = bettingMarket.createMarket(
            "Test market",
            endTime,
            1 ether
        );

        // This should fail - bet is below minimum
        vm.prank(user1);
        bettingMarket.placeBet{value: 0.5 ether}(marketId, true);
    }
}
