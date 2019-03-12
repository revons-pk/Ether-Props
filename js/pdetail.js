if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
}else {
    //set the provider you want from Web3.providers
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}

var tokencontract=web3.eth.contract(tokenabi);
var tokencontractaddress=tokencontract.at('0xef121d14f2689245293710c3491972772ed1adfd');
console.log(tokencontractaddress);

var propertycontract=web3.eth.contract(propertyabi);
var propertycontractaddress=propertycontract.at('0x8a3d73949c160806c61a77377e860906b8e8b2d9');
console.log(propertycontractaddress);

var registercontract=web3.eth.contract(userabi);
var registercontractaddress=registercontract.at('0x93215b17454a331a92de3b252e5e70c7db780494');
console.log(registercontractaddress);

var transferevent=propertycontractaddress.suctransfer();
transferevent.watch(function(error,result){
    if(!error)
    {
        $('#confirm').show();
        $('#loader').hide();
        $('#register').show();
    }
});

var id = window.location.href.split('?').pop()
 console.log(id);

 propertycontractaddress.GetType(id,function(error,result){
   if(!error){
     $("#typeid").val(result);
   }else{
     console.error(error);
   }
 });

propertycontractaddress.GetPrice(id,function(error,result){
   if(!error){
     $("#priceid").val(result);
   }else{
     console.error(error);
   }
 });

propertycontractaddress.GetBedrooms(id,function(error,result){
   if(!error){
     $("#bedroomid").val(result);
   }else{
     console.error(error);
   }
 });

propertycontractaddress.GetBathrooms(id,function(error,result){
   if(!error){
     $("#bathroomid").val(result);
   }else{
     console.error(error);
   }
 });

 propertycontractaddress.GetYearBuilt(id,function(error,result){
   if(!error){
     $("#yearbuiltid").val(result);
   }else{
     console.error(error);
   }
 });

 propertycontractaddress.GetFloors(id,function(error,result){
   if(!error){
     $("#floorid").val(result);
   }else{
     console.error(error);
   }
 });

 propertycontractaddress.GetArea(id,function(error,result){
   if(!error){
     $("#areaid").val(result);
   }else{
     console.error(error);
   }
 });

 propertycontractaddress.GetDescription(id,function(error,result){
   if(!error){
     $("#descriptionid").val(result);
   }else{
     console.error(error);
   }
 });

 propertycontractaddress.GetLocation(id,function(error,result){
   if(!error){
     $("#locationid").val(result);
   }else{
     console.error(error);
   }
 });

 propertycontractaddress.GetCityn(id,function(error,result){
   if(!error){
     $("#cityid").val(result);
   }else{
     console.error(error);
   }
 });

 
 propertycontractaddress.GetId(id,function(error,result){
   if(!error){
     $("#idid").val(result);
   }else{
     console.error(error);
   }
 });

 
 propertycontractaddress.GetAddressOfOwner(id,function(error,result){
   if(!error){
     $("#ownerid").val(result);
   }else{
     console.error(error);
   }
 });

 function PropertyTransfer(){

    $('#loader').show();
    $('#register').hide();

var price=$("#priceid").val();
var owner=$("#ownerid").val();
console.log(price);
console.log(owner);
  
  
  web3.eth.getAccounts(function (error, result) {
    if(!error){

      registercontractaddress.isUserRegistered(function(error,result3){
        if(result3==false)
        {
          $('#loader').hide();
          $('#register').show();
          $('#registereduser').show();
          return;
        }

      });
  
      tokencontractaddress.balanceOf(result,function(error,result2){
       if(!error){
         if(result2>=price){
  
          tokencontractaddress.transfer(owner,price,function(error,result2){
               if(!error){
  
                 propertycontractaddress.Propertytransfer(owner, id, id-1, function(error,result){
                   if(!error){
                     console.log("Sucess");
                   }
                   else{
                     console.error(error);
                   }
                 });
  
  
  
               }else{
                 console.error(error);
               }
  
          });
         }
         else
         {
             $('#notenough').show();
             $('#loader').hide();
             $('#register').show();
         }
  
  
  
       }else{
  
  
         console.log(error);
       }
  
  
      });
  
  
    }else{
  
      console.error(error);
    }
  
  
  });
}

function hidealert()
{
    $('#confirm').hide();
    $('#notenough').hide();
    $('#registereduser').hide();
}