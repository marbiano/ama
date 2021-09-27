// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract AMA {
  uint256 questionsCount;
  uint256 private salt;

  event NewQuestion(address indexed from, uint256 timestamp, string question);

  struct Question {
    address creator;
    string question;
    uint256 timestamp;
  }

  Question[] questions;

  mapping(address => uint256) public lastQuestionTimestamp;

  constructor() payable {
    console.log("I'm alive!");
  }

  function ask(string memory _question) public {
    require(
      lastQuestionTimestamp[msg.sender] + 1 days <= block.timestamp,
      'You can ask only once per day'
    );

    lastQuestionTimestamp[msg.sender] = block.timestamp;

    uint256 random = (block.difficulty + block.timestamp + salt) % 100;
    salt = random;

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
