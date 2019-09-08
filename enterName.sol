pragma solidity ^0.4.17;

contract enterName {
    string public Name;




    function enterName() public {
       Name="goru";
    }

    function update(string memory naam) public payable{
        Name=naam;
    }
}
