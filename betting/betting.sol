pragma solidity ^0.4.17;

contract betting{

    address owner;
    mapping(address=>bool) Results;

    function contractBalance() public constant  returns(uint256){
        return address(this).balance;
    }

    function betting() public{
        owner=msg.sender;
    }

    function Bet() public payable {
        require(msg.value>=100 wei);
        uint256 betAmount=msg.value;
        uint256  time;

        time=block.timestamp;

        if(time%2==0){
            (msg.sender).transfer(2*(betAmount));
            Results[msg.sender]=true;
        }

    }
    function getResult(address player) public constant returns(bool) {

        return Results[player];
    }
}
