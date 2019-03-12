pragma solidity ^0.4.25;

contract Userregistry
{
    mapping (uint => address) _idToAddress;
    mapping (address => userdata) _addressToUser;
    
    uint noofuser;
    address admin;
    bool registrationstatus;
    
    struct userdata
    {
        uint id;
        string name;
        uint phone_no;
        string email;
        string residanceaddress;
        string cnic;
    }
    
    constructor()
    {
        noofuser=0;
        admin=msg.sender;
        registrationstatus=false;
    }
    
    function register(string memory _name,uint _phone_no,string memory _email,string memory _residanceaddress,string memory _cnic) public returns (uint result)
    {
        uint check=_addressToUser[msg.sender].id;
        
        if(_idToAddress[check] == msg.sender)
        {
            result=1;
        }
        else if(registrationstatus==false)
        {
            result=2;
        }
        else
        {
            noofuser++;
            _idToAddress[noofuser]=msg.sender;
            _addressToUser[msg.sender]=userdata(noofuser,_name,_phone_no,_email,_residanceaddress,_cnic);
            result=0;
        }
    }
    
    function isUserRegistered() public view returns (bool)
    {
        if(_addressToUser[msg.sender].id!=0 && _idToAddress[_addressToUser[msg.sender].id]!=0)
        {
          return true;   
        }
    }
    
    function updateDetail(string memory _name,uint _phone_no,string memory _email,string memory _residanceaddress,string memory _cnic) public returns (bool)
    {
        _addressToUser[msg.sender]=userdata(noofuser,_name,_phone_no,_email,_residanceaddress,_cnic);
        return true;
    }
    
    function getNoofUser() public view returns (uint)
    {
        return noofuser;
    }
    
    function getId() public view returns (uint)
    {
        return _addressToUser[msg.sender].id;
    }
    
    function getName() public view returns (string)
    {
        return _addressToUser[msg.sender].name;
    }
    
    function getPhoneNo() public view returns (uint)
    {
        return _addressToUser[msg.sender].phone_no;
    }
    
    function getEmail() public view returns (string)
    {
        return _addressToUser[msg.sender].email;
    }
    
    function getResidanceAddress() public view returns (string)
    {
        return _addressToUser[msg.sender].residanceaddress;
    }
    
    function unregister() public returns (bool)
    {
        delete(_addressToUser[msg.sender]);
        return true;
    }
    
    function enableRegistration() public returns (bool)
    {
        if(msg.sender==admin)
        {
            registrationstatus=true;
            return true;
        }
    }
    
    function disableRegistration() public returns (bool)
    {
        if(msg.sender==admin)
        {
            registrationstatus=false;
            return true;
        }
    }
    
    function changeAdmin(address _newadmin) returns (bool)
    {
        if(isContract(_newadmin)==false)
        {
            if(admin==msg.sender)
            {
                admin=_newadmin;
                return true;
            }
        }
    }
    
    function isContract(address addr) returns (bool) 
    {
        uint size;
        assembly { size := extcodesize(addr) }
        return size > 0;
    }
}