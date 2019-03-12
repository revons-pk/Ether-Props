if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
}else {
    //set the provider you want from Web3.providers
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}

var propertycontract=web3.eth.contract(propertyabi);
var propertycontractaddress=propertycontract.at('0x8a3d73949c160806c61a77377e860906b8e8b2d9');
console.log(propertycontractaddress);

var total;
  var table = document.getElementById("ListedPropertyTable");
  var table1=$('#tablell');
  
  propertycontractaddress.GetTotalNoOfProperties(function(error,result){
	  var id;
	  var price;
	  var type;
	  var city;
    if(!error){	
		for(var i=1; i<=result;i++){   
					propertycontractaddress.GetId(i,function(error,result)
					{
						if(!error)
						{
							id=result;
						}
						else
						{
							console.error(error);
						}
					});
					propertycontractaddress.GetPrice(i,function(error,result1)
					{
						if(!error)
						{
							price=result1;
						}
						else
						{
							console.error(error);
						}
					});
					propertycontractaddress.GetType(i,function(error,result2)
					{
						if(!error)
						{
							type=result2;
						}
						else
						{
							console.error(error);
						}
					});
					propertycontractaddress.GetCityn(i,function(error,result3)
					{
						if(!error)
						{
							city=result3;
						var candidateTemplate = "<tr><th><a onclick='get("+id+")'>" + id+ "</a></th><td>" + price + "</td><td>" + type + "</td><td>"+ city+ "</td></tr>";
                        if(id!=0){table1.append(candidateTemplate);}
						}
						else
						{
							console.error(error);
						}
						
					});
                    }
   }else{
      console.error(error);
    }
  })
  $(document).ready(function(){
  $("#propertytypeid").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $("#tablell tr").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });
});


	  $(document).ready(function(){
  $("#cityid").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $("#tablell tr").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });
});

$(document).ready(function(){
  $("#priceid").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $("#tablell tr").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });
}); 

function get(id)
{
	window.location="pdetail.html?"+id;
}