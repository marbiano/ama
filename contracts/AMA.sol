// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract AMA {

  struct Question {
    address creator;
    string question;
    uint256 timestamp;
  }

  struct Answer {
    string question;
    uint256 timestamp;
  }

  Question[] questions;

  mapping(address => uint256) public lastQuestionTimestamp;
  mapping(address => mapping(uint256 => Answer)) public answers;

  event NewQuestion(address indexed from, uint256 timestamp, string question);

  constructor() payable {
    console.log("I'm alive!");
  }

  function ask(string memory _question) public {
    require(
      lastQuestionTimestamp[msg.sender] + 1 days <= block.timestamp,
      'You can ask only once per day'
    );

    lastQuestionTimestamp[msg.sender] = block.timestamp;

    console.log("%s has asked a question", msg.sender);

    questions.push(Question(msg.sender, _question, block.timestamp));
    emit NewQuestion(msg.sender, block.timestamp, _question);
  }

  function answer(address _questionCreator, uint _questionTime, string memory _answer) public {
    answers[_questionCreator][_questionTime] = Answer(_answer, block.timestamp);
    console.log("%s question has been answered", _questionCreator);
  }

  function getQuestions() public view returns (Question[] memory) {
    return questions;
  }

  function getAnswer(address _questionCreator, uint _questionTime) public view returns (Answer memory) {
    return answers[_questionCreator][_questionTime];
  }
}
