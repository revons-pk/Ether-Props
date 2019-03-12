if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
}else {
    //set the provider you want from Web3.providers
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}

web3.eth.getAccounts(function (error, result) {
    if(!error)
    {
        $('#etheraddress').val(result);
    }
    else{
        console.error(error);
    }
});

var registercontract=web3.eth.contract(userabi);
var registercontractaddress=registercontract.at('0x93215b17454a331a92de3b252e5e70c7db780494');
console.log(registercontractaddress);

var event=registercontractaddress.rcheck();

event.watch(function(error,result){
if(!error)
{
    if(result.args.registercheck==0){
       $('#registered').show(); 
    }
    else if(result.args.registercheck==1){
        $('#registereduser').show(); 
    }
    else if(result.args.registercheck==2){
        $('#registerclose').show(); 
     }
    $('#loader').hide();
    $('#register').show();
}
else{
    console.error(error);
    $('#loader').hide();
    $('#register').show();
}
});

function register()
{
var name=$('#name').val();
var email=$('#email').val();
var phone=$('#phone').val();
var address=$('#address').val();
registercontractaddress.register(name,phone,email,address,function(error,result)
    {
        if(!error)
        {
            console.log("Success");
            console.log(result);
        }
        else
        {
            console.error(error);
        }
    });
    $('#loader').show();
    $('#register').hide();

    $('#name').val('');
    $('#email').val('');
    $('#phone').val('');
    $('#address').val('');
}

function hidealert()
{
    $('#registered').hide();
    $('#registereduser').hide();
    $('#registerclose').hide();
}

