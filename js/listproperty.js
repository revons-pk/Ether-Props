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

var propertycontract=web3.eth.contract(propertyabi);
var propertycontractaddress=propertycontract.at('0x8a3d73949c160806c61a77377e860906b8e8b2d9');
console.log(propertycontractaddress);

var setpcheck=propertycontractaddress.listproperty();

setpcheck.watch(function(error,result){
if(!error)
{
    if(result.args.checker==true){
       $('#registered').show();
       $('#loader').hide();
        $('.propertyregister-form').show(); 
    }
}
else
{
    console.error(error);
}});

function setproperty()
{
    $('.propertyregister-form').hide();
    $('#loader').show();
    var propertytypeholder=document.getElementById("Propertytypeid");
	  var propertytype= propertytypeholder.options[propertytypeholder.selectedIndex].text;
      var price= $('#price').val();    
      var bedroom= $('#bedroom').val();
      var bathroom= $('#bathroom').val();
      var yearbuilt= $('#yearbuilt').val();
      var floor= $('#floor').val();
      var area;
      if(document.getElementById("meterid").checked){
       area= $('#areaid').val() +" m sq";       
      }else{
       area= $('#areaid').val() + " ft sq";  
      }   
      var description= $('#description').val();
      var location= $('#location').val();
      var city= $('#city').val();
      var status;
      if(document.getElementById("Onid").checked){
     status= true;  
      }else{
      status= false
      }

web3.eth.getAccounts(function (error, result) {
	if(!error){
        if(result=='')
        {
            $('#notloggedin').show();
            $('.propertyregister-form').show();
            $('#loader').hide();
        }
        else
        {
            registercontractaddress.isUserRegistered(function(error,result1){
                if(!error)
                {
                    if(result1==true){
		                propertycontractaddress.SetProperty(propertytype,price,bedroom,bathroom,yearbuilt,floor,area,description,location,city,status,function(error,result2){
                        if(!error){
            
			                console.log("success");
                        }else{
                            console.error(error);
                        }
                    });
                }
                else
                {
                    $('#notregistered').show();
                    $('.propertyregister-form').show();
                    $('#loader').hide();
                }
                }

	            else{
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
}

function hidealert()
{
    $('#notloggedin').hide();
    $('#notregistered').hide();
    $('#registered').hide();
}