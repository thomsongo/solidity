(function (Contract) {
    var web3;
    var instance;

    function init() {
        web3 = new Web3(
            (window.web3 && window.web3.currentProvider) ||
            new Web3.providers.HttpProvider(Contract.endpoint));

        var contract_interface = web3.eth.contract(Contract.abi);
        instance = contract_interface.at(Contract.address);

    }
    function updateOwners() {
        if(!$("#dogId").val()){

            alert("enter dog id");
        }
        else if(!$("#OwnerName").val()){

            alert("Enter owner name");
        }
        else{
        let Id=$("#dogId").val();
        let OwnerName=$("#OwnerName").val();
        instance.updateList.sendTransaction(Id,OwnerName,{from:"0x95c2332b26bb22153a689ae619d81a6c59e0a804", gas:30000000, value:100000}, function(error,result){
            if(error){

                alert("Error in updating the blockchain");
                return;
            }
            console.log("success");

        })
    }}
    function getOwner(cb) {
        let ID=$("#dogIdOutput").val();
        instance.getOwner.call(ID,function (error, result) {
            cb(error, result);
        });
    }

    $(document).ready(function () {
        init();

        $("#submitButton").click(function(){

            updateOwners();

        })
        $("#getOwnerButton").click(function(){

            getOwner(function(error,result){

                if(error){
                    console.error("error",error);
                    return;
                }
                alert(result);
            })
        })
    });

})(Contracts['dogOwner']);
