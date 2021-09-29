// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract AMA {
  address public owner;

  struct Question {
    address creator;
    uint256 timestamp;
    string text;
  }

  struct Answer {
    uint256 timestamp;
    string text;
  }

  Question[] questions;

  mapping(address => uint256) public lastQuestionTimestamp;
  mapping(address => mapping(uint256 => Answer)) public answers;

  event NewQuestion(address indexed creator, uint256 timestamp, string text);
  event NewAnswer(address indexed questionFrom, uint256 questionTimestamp, string text);

  modifier onlyOwner() {
    require(msg.sender == owner, 'Not owner');
    _;
  }

  constructor() payable {
    console.log("I'm alive!");
    owner = msg.sender;
  }

  function ask(string memory _text) public {
    require(
      lastQuestionTimestamp[msg.sender] + 30 seconds <= block.timestamp,
      'You can ask only once per day'
    );

    lastQuestionTimestamp[msg.sender] = block.timestamp;

    console.log("%s has asked a question", msg.sender);

    questions.push(Question(msg.sender, block.timestamp, _text));
    emit NewQuestion(msg.sender, block.timestamp, _text);
  }

  function answer(address _questionCreator, uint _questionTimestamp, string memory _text) public onlyOwner {
    console.log("%s question has been answered", _questionCreator);
    answers[_questionCreator][_questionTimestamp] = Answer(block.timestamp, _text);
    emit NewAnswer(_questionCreator, _questionTimestamp, _text);
  }

  function getQuestions() public view returns (Question[] memory) {
    return questions;
  }

  function getAnswer(address _questionCreator, uint _questionTime) public view returns (Answer memory) {
    return answers[_questionCreator][_questionTime];
  }
}
