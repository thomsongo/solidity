(function (Contract) {
    var connection;
    var instance;
    var accounts;

    function init(cb) {
        connection = new Web3(
            (window.web3 && window.web3.currentProvider) ||
            new Web3.providers.HttpProvider(Contract.endpoint));

        var contract_interface = connection.eth.contract(Contract.abi);
        instance = contract_interface.at(Contract.address);
        cb();

        accounts=web3.eth.accounts[0];
    }

    function getBalance() {

        instance.contractBalance(function(error,result){

            if(error){

                alert("cant get the balance from Blockchain");

            }

                $("#balance").html(result.toString());

        })

    }

    function getResult(){

        instance.getResult(accounts,function(error,result){

            if(error){

                alert("error in getting the bool value");
            }

            else if(result){
                alert("YOU WON");
            }
            else{
                alert("YOU LOST");
            }
        })

    }


    function getReceipt(txHash) {

            web3.eth.getTransactionReceipt(txHash, function(error,receipt){

                if(error){
                    alert("there was an error in getting the receipt");
                }

                else if(receipt.status=="0x1"){

                    getResult();
                }
                else{

                    window.setTimeout(function(){

                        getReceipt(txhash);
                    },5000);
                }
            })
    }
    function Bet() {

        let Amount=$("#betValue").val();
        instance.Bet.sendTransaction({from:accounts, gas:30000000, value: Amount}, function(error, txHash){

           if(error){
               alert("error!");
           }

           getReceipt(txHash);
        })

    }

    $(document).ready(function () {
        init(function(){
            getBalance();

        })

        $("#submitButton").click(function(){

            Bet();
        })
    });
})(Contracts['betting']);
