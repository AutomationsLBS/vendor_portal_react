import CommonService from '../service/commonServices';


const BaseURL = () => {
    let url  = window.location.href;
    let apiUrl;
    if(url.indexOf("accushield-40179") !== -1){
        apiUrl = "https://accushield-vendor-dev.herokuapp.com";
    }else if(url.indexOf("qaaccushield") !== -1){
        apiUrl = "https://accushield-vendor-qa.herokuapp.com";
    }else{
        apiUrl = "https://accushield-vendor-qa.herokuapp.com";
    }
    
    console.log("Base URL ",apiUrl );
    return apiUrl;
}
const employeeStatus =()=>{

    return   [ { "id":  "temporary",
                  "value"  :"Temporary"}
                  ,
                 {"id" : "active",
                    "value" : "Active"}
                    , 
               { "id" :"defunct" ,
               "value": "Defunct" },
               { "id" :"billing" ,
               "value": "Billing" },
               
            ]
    }


const  credetailStatus = ()=>{
    return  {
        "not_verified":"Submitted" ,
         "in_progress":"In-progress",
         "verified": "Verified", 
         "rejected":"Rejected",
    }
}
const  credetailStatusColors = ()=>{
    return  {
        "not_verified":"green" ,
        "in_progress":"yellow",
         "verified": "Verified", 
         "rejected":"red",
    }
}

const  EmployeeStatusColors = ()=>{
    return  {
        "green" :"",
        "yellow": "",
         "red": ""
    
    }
}


const ApiUrls = ()=>{
   // let url = window.location.href;
    //let apiUrl = "https://accupass-api-dev.herokuapp.com";
    const apiUrl = process.env.REACT_APP_API_BASE_URL
    return apiUrl;

}
const  chargebeeurl = () => {
    return process.env.REACT_APP_CHARGEBEEURL
} 

const daysRangeJson = ()=>{
   const daysRange =  process.env.REACT_APP_API_DAYS
   return daysRange;
}                    

const getUserType = ()=>{
    let tmp = CommonService.localStore.get("userData");
    let userdata = JSON.parse(tmp.userData);
    if(userdata != null){
        const usertype = userdata.visitor_type
        return usertype
    }else {
        return ''
    }
}
const uploadFileSize = ()=>{
    return 10240
}

 let  changeTabName =  (CommonService.localStore.get("visitor_types").visitor_types == "vendor")? "Change Pin"  : "Change Password"; 
 let companysDisplay  =  (CommonService.localStore.get("visitor_types").visitor_types == "vendor")? false : true ; 
const Config = {
    // "baseUrl": "https://jsonplaceholder.typicode.com",
    // "baseUrl": "http://192.168.3.180:3000/",
    "baseUrl": BaseURL(),
    "apiUrlData":ApiUrls(),
    // "baseUrl": "https://accushield-vendor-dev.herokuapp.com",
    // "baseUrl": "https://accushield-vendor-qa.herokuapp.com",
    "images": "/assets/images/",
    "isRoute": false,
    "daysRange":daysRangeJson(),
    "chargebeeurl":chargebeeurl(),
    "usertype" : getUserType(),
    "filesize": uploadFileSize(),
    "credetailStatus":credetailStatus(),
    "employeeStatus":employeeStatus(),
    "credetailStatusColors":credetailStatusColors(),
    "EmployeeStatusColors": EmployeeStatusColors(),
    
   
    "mainnav": [
        
        
        { name: "Login", link: "/login", icon: "login.png", isLogin: false, template: "beforeLogin", isDisplay:false, isSubNav : false, buttonClass:"" },
        //{ name: "Tab", link: "/tab1", icon: "residents.png", isLogin: true, template: "user", isDisplay:false, isSubNav : false, buttonClass:""},
        { name: "Companies", link: "/companies", icon: "credentials-icon.png", isLogin:true, template:"user", isDisplay: companysDisplay, isSubNav : false, buttonClass:"",usertype: "agency_vendor" }, 
        //{ name: "Independent Contractor", link: "#", icon: "contractor-icon.png", isLogin: true, template: "user", isDisplay:true, isSubNav : false, buttonClass :"dropdown-btn", childClass : "independent"},
        { name: "My Communities", link: "/communityc", icon: "communities.png", isLogin: true, template: "user", isDisplay:true, isSubNav : false , buttonClass:"" ,usertype: "vendor" }, // @@@
        
        //{ name: "Vendor Agency", link: "#", icon: "vendor.png", isLogin: true, template: "user", isDisplay:true, isSubNav : false, buttonClass :"dropdown-btn" , childClass : 'vendor' },
        { name: "Agency Communities", link: "/communityv", icon: "communities.png", isLogin: true, template: "user", isDisplay:true, isSubNav : false, buttonClass :"" ,usertype: 'agency' },       
        { name: "Agency Employees", link: "/employees", icon: "employees.png", isLogin: true, template: "user", isDisplay:true, isSubNav : false, buttonClass :"" ,usertype: 'agency' },
      //  { name: "Agency Credentials", link: "/credentials", icon: "credentials-icon.png", isLogin:true, template:"user", isDisplay:true, isSubNav : false, buttonClass:"",usertype: "vendor" },
        { name: "Agency Credentials", link: "/agCredentials", icon: "credentials-icon.png", isLogin:true, template:"user", isDisplay:true, isSubNav : false, buttonClass:"",usertype: "agency" },
       
        { name: "My Credentials", link: "/credentials", icon: "credentials-icon.png", isLogin:true, template:"user", isDisplay:true, isSubNav : false, buttonClass:"",usertype: "vendor" }, // @@

        { name: "Settings", link: "#", icon: "settings-icon.png", isLogin: true, template: "user", isDisplay:true, isSubNav : false, buttonClass :"dropdown-btn", childClass :"settings", usertype:"admin"},
        { name: "Payment Settings", link: "/mypayments", icon: "payment-icon-1.png", isLogin:true,template:"user", isDisplay:true, isSubNav : true, buttonClass :"settings" ,usertype:  "admin"},
     //   { name: "Add Admin", link: "/addAdmin", icon: "admin-icon.png", isLogin:true,template:"user", isDisplay:true, isSubNav : true, buttonClass :"settings" ,usertype: 'agency'},
        { name: changeTabName , link: "/updatenewpin", icon: "changepassword-icon.png", isLogin:true,template:"user", isDisplay:true, isSubNav : true, buttonClass :"settings",usertype: 'agency_vendor'},
      //  { name: "Update Profile", link: "/updateProfile", icon: "admin-icon.png", isLogin:true,template:"user", isDisplay:true, isSubNav : true, buttonClass :"settings",usertype: 'agency_vendor'},
      //  { name: "Update Details", link: "/updateDetails", icon: "update-white.png", isLogin:true,template:"user", isDisplay:true, isSubNav : true, buttonClass :"settings" ,usertype: 'vendor' },
        
        //{ name: "Payment Settings", link: "/mypayments", icon: "payment-icon-1.png", isLogin:true,template:"user", isDisplay:true, isSubNav : true, buttonClass :"settings" ,usertype: 'vendor'},
        //{ name: "Payment History", link: "/paymenthistory", icon: "payment-history.png", isLogin:true,template:"user", isDisplay:true, isSubNav : true, buttonClass :"settings", usertype: 'vendor'},

        //{ name: "Reports", link: "/agencyReport", icon: "reports-icon.png", isLogin: true, template: "user", isDisplay:true, isSubNav : false, buttonClass :"", usertype: 'vendor' },

        
        { name: "Add Credentials", link: "/credentialsCreate", icon: "residents.png", isLogin:true, template:"user", isDisplay:false, isSubNav : false},
        { name: "Edit Credentials", link: "/credentialsEdit", icon: "residents.png", isLogin:true, template:"user", isDisplay:false, isSubNav : false},
        { name: "Register", link: "/forgotpassword", icon: "residents.png", isLogin: false, template: "beforeLogin", isDisplay:false, isSubNav : false },
        { name: "Add Employees", link: "/employeesCreate", icon: "residents.png", isLogin:true,template:"user", isDisplay:false, isSubNav : false},
        
    ],
    "api": {
        
        'login': {
            'url': '/api/v2/vendors/login', 'type': 'post', 'isToken': false
        },
        'myCommunitys': {
            'url': '/api/v2/vendors/communities_list', 'type': 'get', 'isToken': true
        },
        'employeeDetails': {
            'url': '/api/v2/vendors/employees', 'type': 'get', 'isToken': true
        },
        'req_credentials': {
            'url': '/api/v2/vendors/req_credentials', 'type': 'get', 'isToken': true
        },
        'my_credentials': {
            'url': '/api/v2/vendors/my_credentials', 'type': 'get', 'isToken': true
        },
        'add_credential': {
            'url': '/api/v2/vendors/add_credential', 'type': 'post', 'isToken': true
        },
        'credential_types': {
            'url': '/api/v2/vendors/credential_types', 'type': 'post', 'isToken': true
        },
        'vendor_agencies': {
            'url': '/api/v2/vendors/vendor_agencies', 'type': 'get', 'isToken': true
        },
        'community_employees': {
            'url': '/api/v2/vendors/community_employees', 'type': 'get', 'isToken': true
        },
        "update_pin": {
            'url': '/api/v2/vendors/update_pin', 'type': 'post', 'isToken': true
        },
        "update_profile":{
            'url': '/api/v2/vendors/update_profile', 'type': 'post', 'isToken': true

        },
        "create_employee": {
            'url': '/api/v2/vendors/create_employee', 'type': 'post', 'isToken': true
        },
        
        "update_employee": {
            'url': '/api/v2/vendors/update_employee', 'type': 'post', 'isToken': true
        },
        

        "forgot_pin": {
            'url': '/api/v2/vendors/forgot_pin', 'type': 'post', 'isToken': true
        },
        

        "community_credentials": {
            'url': '/api/v2/vendors/community_credentials', 'type': 'get', 'isToken': true
        },
        
        "employee_details":{
        
            'url': '/api/v2/vendors/employee_details', 'type': 'get', 'isToken': true
        },

        
        
        "update_credential":{
        
            'url': '/api/v2/vendors/update_credential', 'type': 'post', 'isToken': true
        },

         
        "credential_details":{
        
            'url': '/api/v2/vendors/credential_details', 'type': 'get', 'isToken': true
        },
        "vendor_req_credentials":{
        
            'url': '/api/v2/vendors/vendor_req_credentials', 'type': 'get', 'isToken': true
        },

        
        
    }
}

export default Config;