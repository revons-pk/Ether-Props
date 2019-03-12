pragma solidity ^0.4.25;

contract Property {
    struct PropertyFeatures{
        string Type;
        uint Price;
        uint Bedrooms;
        uint Bathrooms;
        uint YearBuilt;
        uint Floors;
        string Area;
        string Description;
        string Location;
        string City;
        bool Status;
        uint Id;
        address OwnerAddress;
    }

    uint TotalNoProperties=0;
    mapping(address=>PropertyFeatures[])UserProperty;
    mapping(uint=>PropertyFeatures)PropertyId;
    
    event listproperty(bool checker);
    event del(bool checker);
    event update(bool checker);
    event suctransfer(bool checker);
    function SetProperty(string _type, uint _Price, uint _Bedrooms, uint _Bathrooms, uint _YearBuilt,uint _Floors,string _Area, string _Description,string _Location,string _City, bool _Status) public returns (bool){
        TotalNoProperties++;
       UserProperty[msg.sender].push(PropertyFeatures(_type,_Price,_Bedrooms,_Bathrooms,_YearBuilt,_Floors,_Area,_Description,_Location,_City,_Status,TotalNoProperties,msg.sender));
       PropertyId[TotalNoProperties]=PropertyFeatures(_type,_Price,_Bedrooms,_Bathrooms,_YearBuilt,_Floors,_Area,_Description,_Location,_City,_Status,TotalNoProperties,msg.sender);
       emit listproperty(true);
       return true;
    } 
    function DeleteProperty(uint PropertyNo,uint _Propertyid)public  {
        delete(UserProperty[msg.sender][PropertyNo]);
        delete(PropertyId[_Propertyid]);
        emit del(true);
    }
    function GetStatus(uint _id) public view returns(bool){
        return PropertyId[_id].Status;
    }
    function GetStatusByAddress(address OwnerAddress,uint PropertyNo) public view returns(bool){
       return UserProperty[OwnerAddress][PropertyNo].Status;
    }
        function GetAddressOfOwner(uint _id) public view returns(address){
        return PropertyId[_id].OwnerAddress;
    }
    function GetId(uint _id) public view returns(uint){
        return PropertyId[_id].Id;
    }
     function GetIdByAddress(address OwnerAddress,uint PropertyNo) public view returns(uint){
       return UserProperty[OwnerAddress][PropertyNo].Id;
    }
    function GetType(uint _id) public view returns(string){
       return PropertyId[_id].Type;
    }
     function GetTypeByAddress(address OwnerAddress,uint PropertyNo) public view returns(string){
       return UserProperty[OwnerAddress][PropertyNo].Type;
    }
     function GetPrice(uint _id) public view returns(uint){
       return PropertyId[_id].Price;
    }
     function GetPriceByAddress(address OwnerAddress,uint PropertyNo) public view returns(uint){
       return UserProperty[OwnerAddress][PropertyNo].Price;
    }
     function GetBedrooms(uint _id) public view returns(uint){
       return PropertyId[_id].Bedrooms;
    }
     function GetBedroomsByAddress(address OwnerAddress,uint PropertyNo) public view returns(uint){
       return UserProperty[OwnerAddress][PropertyNo].Bedrooms;
    }
     function GetBathrooms(uint _id) public view returns(uint){
       return PropertyId[_id].Bedrooms;
    }
     function GetBathroomsByAddress(address OwnerAddress,uint PropertyNo) public view returns(uint){
       return UserProperty[OwnerAddress][PropertyNo].Bathrooms;
    }
     function GetYearBuilt(uint _id) public view returns(uint){
       return PropertyId[_id].YearBuilt;
    }
     function GetYearBuiltByAddress(address OwnerAddress,uint PropertyNo) public view returns(uint){
       return UserProperty[OwnerAddress][PropertyNo].YearBuilt;
    }
     function GetFloors(uint _id) public view returns(uint){
       return PropertyId[_id].Floors;
    }
     function GetFloorsByAddress(address OwnerAddress,uint PropertyNo) public view returns(uint){
       return UserProperty[OwnerAddress][PropertyNo].Floors;
    }
     function GetArea(uint _id) public view returns(string){
       return PropertyId[_id].Area;
    }
     function GetAreaByAddress(address OwnerAddress,uint PropertyNo) public view returns(string){
       return UserProperty[OwnerAddress][PropertyNo].Area;
    }
     function GetDescription(uint _id) public view returns(string){
       return PropertyId[_id].Description;
    }
     function GetDescriptionByAddress(address OwnerAddress,uint PropertyNo) public view returns(string){
       return UserProperty[OwnerAddress][PropertyNo].Description;
    }
     function GetLocation(uint _id) public view returns(string){
       return PropertyId[_id].Location;
    }
     function GetLocationByAddress(address OwnerAddress,uint PropertyNo) public view returns(string){
       return UserProperty[OwnerAddress][PropertyNo].Location;
    }
     function GetCityn(uint _id) public view returns(string){
       return PropertyId[_id].City;
    }
     function GetCityByAddress(address OwnerAddress,uint PropertyNo) public view returns(string){
       return UserProperty[OwnerAddress][PropertyNo].City;
    }
    function GetTotalNoOfProperties() public view returns(uint){
        return TotalNoProperties;
    }
    uint j=1;
    uint i=0;
     function GetOwnersTotalNoOfProperties() public view returns(uint){
    return UserProperty[msg.sender].length; 
    }
    function UpdateProperty(string _type, uint _Price, uint _Bedrooms, uint _Bathrooms, uint _YearBuilt,uint _Floors,string _Area, string _Description,string _Location,string _City, bool _Status,uint PropertyNo,uint _Propertyid)public returns (bool)
    {
        UserProperty[msg.sender][PropertyNo]=PropertyFeatures(_type,_Price,_Bedrooms,_Bathrooms,_YearBuilt,_Floors,_Area,_Description,_Location,_City,_Status,_Propertyid,msg.sender);
        PropertyId[_Propertyid]=PropertyFeatures(_type,_Price,_Bedrooms,_Bathrooms,_YearBuilt,_Floors,_Area,_Description,_Location,_City,_Status,_Propertyid,msg.sender);
       emit update(true);
        return true;
    }
 
    function Propertytransfer(address propertyowner ,uint id,uint propertyno) public returns(bool){

            TotalNoProperties++;
          
            UserProperty[msg.sender].push(PropertyFeatures( GetType(id),GetPrice(id),GetBedrooms(id),GetBathrooms(id),GetYearBuilt(id),GetFloors(id),GetArea(id),GetDescription(id),GetLocation(id),GetCityn(id),GetStatus(id),TotalNoProperties,msg.sender));
            PropertyId[TotalNoProperties]=PropertyFeatures( GetType(id),GetPrice(id),GetBedrooms(id),GetBathrooms(id),GetYearBuilt(id),GetFloors(id),GetArea(id),GetDescription(id),GetLocation(id),GetCityn(id),GetStatus(id),TotalNoProperties,msg.sender);
            delete(UserProperty[propertyowner][propertyno]);
            delete(PropertyId[id]);
            emit suctransfer(true);
            return true;
       } 
      
    
     

    }