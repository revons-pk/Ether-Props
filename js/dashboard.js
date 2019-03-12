if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
}else {
    //set the provider you want from Web3.providers
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}

var registercontract=web3.eth.contract(userabi);
var registercontractaddress=registercontract.at('0x93215b17454a331a92de3b252e5e70c7db780494');
console.log(registercontractaddress);

var tokencontract=web3.eth.contract(tokenabi);
var tokencontractaddress=tokencontract.at('0xef121d14f2689245293710c3491972772ed1adfd');
console.log(tokencontractaddress);

var propertycontract=web3.eth.contract(propertyabi);
var propertycontractaddress=propertycontract.at('0x8a3d73949c160806c61a77377e860906b8e8b2d9');
console.log(propertycontractaddress);

var updatecheck=registercontractaddress.ucheck();
var deletecheck=registercontractaddress.dcheck();

updatecheck.watch(function(error,result){
	if(!error)
	{
		if(result.args.confirm==true)
		{
			$('#updated').show();
			$('.update-form').show();
			$('#loader').hide();
		}
		else
		{
			console.log("Error occured");
		}
	}
	else
	{
		console.error(error);
	}
});

deletecheck.watch(function(error,result){
	if(!error)
	{
		if(result.args.dconfirm==true)
		{
			window.location="signin.html";
		}
		else
		{
			console.log("Error occured");
		}
	}
	else
	{
		console.error(error);
	}
});

web3.eth.getAccounts(function (error, result) {
    if(!error)
    {
		registercontractaddress.getId(result,function(error,result1){
            if(!error)
            {
				$('#id').val(result1);
			}
			else
			{
				console.error(error);
			}
		});
		$('#etheraddress').val(result);

		tokencontractaddress.balanceOf(result,function(error,result6){
            if(!error)
            {
				$('#tbal').val(result6);
			}
			else
			{
				console.error(error);
			}
		});

		web3.eth.getBlockNumber(function (error, result7) {
			if(!error)
			{
				web3.eth.getBalance($('#etheraddress').val(), result7, function(error, result8) {
				if(!error)
				{
					$('#ebal').val(result8/1000000000000000000);
				}
				else
				{
					console.error(error);
				}
				});			
			}
			else
			{
				console.error(error);
			}
		});

        registercontractaddress.getName(result,function(error,result2){
            if(!error)
            {
				document.getElementById("name").innerHTML = result2;
				$('#namef').val(result2);
			}
			else
			{
				console.error(error);
			}
		});
		registercontractaddress.getEmail(result,function(error,result3){
            if(!error)
            {
				$('#email').val(result3);
			}
			else
			{
				console.error(error);
			}
		});
		registercontractaddress.getPhoneNo(result,function(error,result4){
            if(!error)
            {
				$('#phone').val(result4);
			}
			else
			{
				console.error(error);
			}
		});
		registercontractaddress.getResidanceAddress(result,function(error,result5){
            if(!error)
            {
				$('#address').val(result5);
			}
			else
			{
				console.error(error);
			}
        });
    }
    else{
        console.error(error);
    }
});

function updateaccount()
{
	$('#loader').show();
	$('.update-form').hide();

	var id=$('#id').val();
	var name=$('#namef').val();
	var email=$('#email').val();
	var phone=$('#phone').val();
	var address=$('#address').val();

	registercontractaddress.updateDetail(id,name,phone,email,address,function(error,result){
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

var total;
var table1=$('#proptable');

propertycontractaddress.GetOwnersTotalNoOfProperties(function(error,result){
	var id;
	var type;
	var city;
	var price;
	if(!error)
	{
		for(var i=0;i<result;i++)
		{
			web3.eth.getAccounts(function (error, result) {
				if(!error)
				{
					propertycontractaddress.GetIdByAddress(result,i,function(error,result1){
						if(!error)
						{
							id=result1;
							console.log(id);
						}
						else
						{
							console.error(error);
						}
					});

					propertycontractaddress.GetPriceByAddress(result,i,function(error,result1){
						if(!error)
						{
							price=result1;
							console.log(price);
						}
						else
						{
							console.error(error);
						}
					});

					propertycontractaddress.GetTypeByAddress(result,i,function(error,result1){
						if(!error)
						{
							type=result1;
						}
						else
						{
							//console.error(error);
						}
					});

					propertycontractaddress.GetCityByAddress(result,i,function(error,result1){
						if(!error)
						{
							city=result1;
							var candidateTemplate = "<tr><th><a onclick='get("+id+")'>" + id+ "</a></th><td>" + type + "</td><td>" + price + "</td><td>"+ city+ "</td></tr>";
                        	table1.append(candidateTemplate);
						}
						else
						{
							//console.error(error);
						}
					});
				}
				else
				{
					console.error(error);
				}	
		});
	}
}
	else
	{
		console.error(error);
	}
});


function deleteaccount()
{
	$('#loader').show();
	$('.update-form').hide();
	registercontractaddress.unregister(function(error,result){
		if(!error)
		{
			console.log("success");
		}
		else
		{
			console.error(error);
		}
	});
}

function loading() {
	myVar = setTimeout(showPage, 2000);
  }
  
  function showPage() {
	$('#loader').hide();
	$('.update-form').show();
  }

function hidealert()
{
	$('#updated').hide();
}