(function (Contract) {
    var web3;
    var instance;

    function init(cb) {
        web3 = new Web3(
            (window.web3 && window.web3.currentProvider) ||
            new Web3.providers.HttpProvider(Contract.endpoint));

        var contract_interface = web3.eth.contract(Contract.abi);
        instance = contract_interface.at(Contract.address);


        cb();
    }
    // a function to query the blockchain and get a variable from it without changing state of the contract.
    // That is why no ether has been sent. because this wont be recorded as a transaction on the blockchain.


    function getName(cb){

        instance.Name(function(error,result){

            cb(error,result);

            // a callback function is given as an argument to the getName function.
            //When blockcahinis enquired for the Name variable it can either send an error or the result.
            //Whatever value comes it will be used in the cb function.(error or result)


          });
    }


    // This function will take the value entered by the user and send it to the blockchain. this functionwill change the variable Name in the contract.
    // As the state of the contract changes, we have to send ether for this transaction to take place.(value)



    function sendName() {
        let newname=$("#nameInput").val();
        instance.update.sendTransaction(newname,{from:" 0x95c2332b26bb22153a689ae619d81a6c59e0a804",gas:30000000}, function(error,result){

            if(error){
                alert("error in sending number back to the blockcahin");
            }
            else{
                    //The setTimeout function is used because it takes some time for the block to get  confirmed in the blockchain.
                    // Hence to get the updated value we wait for 1000ms and then call for the variable Name.
                    setTimeout(function(){
                      getName(function(error,result){

                          if(error){
                              alert("error");
                              return;
                          }

                              $('#message').html(result);

                      });
                    }, 1000)
                }
            });
    }

    $(document).ready(function () {
        init(function () {
          getName(function(error,result){

              if(error){
                  alert("error");
                  return;
              }

                  $('#message').append(result);

          });


        });
        $("#submitButton").click(function(){

        sendName();
    });
    });




})(Contracts['enterName']);
