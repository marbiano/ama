// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract AMA {
  uint256 questionsCount;

  event NewQuestion(address indexed from, uint256 timestamp, string question);

  struct Question {
    address creator;
    string question;
    uint256 timestamp;
  }

  Question[] questions;

  constructor() payable {
    console.log("I'm alive!");
  }

  function ask(string memory _question) public {
    questionsCount += 1;
    console.log("%s has asked a question", msg.sender);

    questions.push(Question(msg.sender, _question, block.timestamp));
    emit NewQuestion(msg.sender, block.timestamp, _question);
  }

  function getTotalQuestions() public view returns (uint256) {
    return questionsCount;
  }

  function getAllQuestions() public view returns (Question[] memory) {
    return questions;
  }
}
