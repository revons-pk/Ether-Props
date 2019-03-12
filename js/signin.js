if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
}else {
    //set the provider you want from Web3.providers
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}

var registercontract=web3.eth.contract(userabi);
var registercontractaddress=registercontract.at('0x93215b17454a331a92de3b252e5e70c7db780494');
console.log(registercontractaddress);

web3.eth.getAccounts(function (error, result) {
    if(!error)
    {
        $('#etheraddress').val(result);
        if(result=='')
        {
            $('#notloggedin').show();
        }
    }
    else{
        console.error(error);
    }
});

function signin()
{
    web3.eth.getAccounts(function (error, result) {
        if(!error)
        {
            $('#etheraddress').val(result);
            if(result=='')
            {
                $('#notloggedin').show();
            }
            else
            {
                registercontractaddress.isUserRegistered(function(error,result){
                    if(!error)
                    {
                        if(result==true){
                        window.location = "dashboard.html?"+2;
                        }
                        else
                        {
                            $('#notregistered').show();
                        }
                    }
                    else
                    {
                        console.error(error);
                    }
                });
            }
        }
        else{
            console.error(error);
        }
    });
}

function hidealert()
{
    $('#notloggedin').hide();
    $('#notregistered').hide();
}