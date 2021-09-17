// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract WavePortal {
    uint totalWaves;
    uint private seed;
    event NewWave(address indexed from,uint timestamp,string message);
    struct Wave{
        address waver;
        string message;
        uint timestamp;
    }
    Wave[] waves;
    mapping (address=>uint) waveCounts;
    mapping (address =>uint) lastWavedAt;
    constructor() payable{
        console.log("Yo yo, I am a contract and I am smart");
    }

    function wave(string memory _message)public{

        require(lastWavedAt[msg.sender]+30 seconds < block.timestamp,"Wait 15 mins");

        lastWavedAt[msg.sender] = block.timestamp;
        totalWaves+=1;
        console.log("%s is waved message %s", msg.sender,_message);
        waves.push(Wave(msg.sender,_message,block.timestamp));

        uint randomNumber = (block.difficulty+ block.timestamp+seed)%100;
        console.log("Random generated %s",randomNumber);
        seed = randomNumber;

        emit NewWave(msg.sender, block.timestamp, _message);
        waveCounts[msg.sender]+=1;

        if(randomNumber>50){
            console.log("%s Won ",msg.sender);
        uint prize = 0.0001 ether;
        require(prize <= address(this).balance,"trying to withdraw more than contract has");
        (bool success,) = (msg.sender).call{value:prize}("");
        require(success,"failed to withdraw money from contract");
        }
    }

    function getTotalWaves() view public returns(uint){
        console.log("we have %d total waves", totalWaves);
        console.log("sender %s count %d ",msg.sender,waveCounts[msg.sender]  );
        return totalWaves;
    }
    function getAllWaves() view public returns(Wave[] memory){
        return waves;
    }

}