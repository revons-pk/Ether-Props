if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
}else {
    //set the provider you want from Web3.providers
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}

web3.eth.getAccounts(function (error, result) {
    if(!error)
    {
        if(result=='')
        {
            $('#notloggedin').show();
        }
    }
    else{
        console.error(error);
    }
});

var registercontract=web3.eth.contract(userabi);
var registercontractaddress=registercontract.at('0x93215b17454a331a92de3b252e5e70c7db780494');
console.log(registercontractaddress);

var tokencontract=web3.eth.contract(tokenabi);
var tokencontractaddress=tokencontract.at('0xef121d14f2689245293710c3491972772ed1adfd');
console.log(tokencontractaddress);

var updatecheck=tokencontractaddress.ttransfer();

updatecheck.watch(function(error,result){
	if(!error)
	{
		if(result.args.confirm==true)
		{
            $('#confirm').show();
			$('.token-form').show();
			$('#loader').hide();
		}
		else
		{
			$('#notconfirm').show();
		}
	}
	else
	{
		console.error(error);
	}
});

function tokenbuy()
{
    $('#loader').show();
    $('.token-form').hide();
    var amount=$('#tokenvalue').val();
    tokencontractaddress.buyToken(amount,function(error,result){
        if(!error)
        {
            console.log("Success");
        }
        else
        {
            console.error(error);
        }
    });
}

function hidealert()
{
    $('#confirm').hide();
    $('#notconfirm').hide();
    $('#notloggedin').hide();
}