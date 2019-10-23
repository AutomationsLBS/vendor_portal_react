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
        const usertype = userdata.type
        return usertype
    }else {
        return ''
    }
}

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
   
    "mainnav": [
        
        
        { name: "Login", link: "/login", icon: "login.png", isLogin: false, template: "beforeLogin", isDisplay:false, isSubNav : false, buttonClass:"" },
        //{ name: "Tab", link: "/tab1", icon: "residents.png", isLogin: true, template: "user", isDisplay:false, isSubNav : false, buttonClass:""},

        //{ name: "Independent Contractor", link: "#", icon: "contractor-icon.png", isLogin: true, template: "user", isDisplay:true, isSubNav : false, buttonClass :"dropdown-btn", childClass : "independent"},
        { name: "My Communities", link: "/communityc", icon: "communities.png", isLogin: true, template: "user", isDisplay:true, isSubNav : false , buttonClass:"" ,usertype: "contractor" },
        
        //{ name: "Vendor Agency", link: "#", icon: "vendor.png", isLogin: true, template: "user", isDisplay:true, isSubNav : false, buttonClass :"dropdown-btn" , childClass : 'vendor' },
        { name: "Agency Communities", link: "/communityv", icon: "communities.png", isLogin: true, template: "user", isDisplay:true, isSubNav : false, buttonClass :"" ,usertype: 'vendor' },       
        { name: "Agency Employees", link: "/employees", icon: "employees.png", isLogin: true, template: "user", isDisplay:true, isSubNav : false, buttonClass :"" ,usertype: 'vendor' },
        { name: "Agency Credentials", link: "/credentials", icon: "credentials-icon.png", isLogin:true, template:"user", isDisplay:true, isSubNav : false, buttonClass:"",usertype: "vendor" },
        { name: "My Credentials", link: "/credentials", icon: "credentials-icon.png", isLogin:true, template:"user", isDisplay:true, isSubNav : false, buttonClass:"",usertype: "contractor" },

        { name: "Settings", link: "#", icon: "settings-icon.png", isLogin: true, template: "user", isDisplay:true, isSubNav : false, buttonClass :"dropdown-btn", childClass :"settings", usertype:getUserType()},
        { name: "Payment Settings", link: "/mypayments", icon: "payment-icon-1.png", isLogin:true,template:"user", isDisplay:true, isSubNav : true, buttonClass :"settings" ,usertype: getUserType() },
        { name: "Add Admin", link: "/addAdmin", icon: "admin-icon.png", isLogin:true,template:"user", isDisplay:true, isSubNav : true, buttonClass :"settings" ,usertype: 'vendor'},
        { name: "Change Password", link: "/updatenewpin", icon: "changepassword-icon.png", isLogin:true,template:"user", isDisplay:true, isSubNav : true, buttonClass :"settings",usertype: 'vendor'},
        { name: "Update Details", link: "/updateDetails", icon: "update-white.png", isLogin:true,template:"user", isDisplay:true, isSubNav : true, buttonClass :"settings" ,usertype: 'contractor' },
        //{ name: "Payment Settings", link: "/mypayments", icon: "payment-icon-1.png", isLogin:true,template:"user", isDisplay:true, isSubNav : true, buttonClass :"settings" ,usertype: 'vendor'},
        //{ name: "Payment History", link: "/paymenthistory", icon: "payment-history.png", isLogin:true,template:"user", isDisplay:true, isSubNav : true, buttonClass :"settings", usertype: 'vendor'},

        //{ name: "Reports", link: "/agencyReport", icon: "reports-icon.png", isLogin: true, template: "user", isDisplay:true, isSubNav : false, buttonClass :"", usertype: 'vendor' },

        
        { name: "Add Credentials", link: "/credentialsCreate", icon: "residents.png", isLogin:true, template:"user", isDisplay:false, isSubNav : false},
        { name: "Edit Credentials", link: "/credentialsEdit", icon: "residents.png", isLogin:true, template:"user", isDisplay:false, isSubNav : false},
        { name: "Register", link: "/register", icon: "residents.png", isLogin: false, template: "beforeLogin", isDisplay:false, isSubNav : false },
        { name: "Add Employees", link: "/employeesCreate", icon: "residents.png", isLogin:true,template:"user", isDisplay:false, isSubNav : false},
    ],
    "api": {
        
        'login': {
            'url': '/api/v1/web/signin', 'type': 'post', 'isToken': false
        },
        
        
    }
}

export default Config;