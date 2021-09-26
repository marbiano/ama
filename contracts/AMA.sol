// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract AMA {
    uint256 questionsCount;

    constructor() {
        console.log("I'm alive!");
    }

    function ask() public {
        questionsCount += 1;
        console.log("%s has asked a question", msg.sender);
    }

    function getTotalQuestions() public view returns (uint256) {
        console.log("Total questions: %s", questionsCount);
        return questionsCount;
    }
}