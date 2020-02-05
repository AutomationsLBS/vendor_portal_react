import React from 'react';
import axios from "axios";
import Config from "../container/config";
import CommonService from './commonServices';
import { ToastContainer, toast } from 'react-toastify';

// Add a request interceptor
axios.interceptors.request.use(
  config => {
    // debugger;
      console.log("at interceptors request\n", config);
      if(config.method === 'get'){
        let userData = CommonService.getToken()
        if(userData != null){
          // config.headers['Authorization'] = "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiMzM3MiIsImV4cCI6MTU0MjEwNjg5M30.QXVK-0AIOXs9ys54SvY0LJPyhaPS5_R7-IsGAlhG7qU";
          config.headers['Authorization'] = userData;
          console.log("token_Data",userData)
        }
      }else if(config.method === 'post'){
        if(config != undefined && config.data.service === undefined && config.data.service != "login"){
          let userData = CommonService.getToken()
          if(userData != null){
            // config.headers['Authorization'] = "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiMzM3MiIsImV4cCI6MTU0MjEwNjg5M30.QXVK-0AIOXs9ys54SvY0LJPyhaPS5_R7-IsGAlhG7qU";
            config.headers['Authorization'] = userData;
          }
        }
        if(config.data.hasOwnProperty('service')){
          delete config.data.service;
        }
      }
    // Do something before request is sent
    return config;
  },
  error => {

    if(error !== undefined && error.response !== undefined && error.response.data.message === "Invalid token"){      
      toast.error(error.response.data.message, {
        position: toast.POSITION.TOP_CENTER
      });
      window.location.href = "/login";
      window.localStorage.clear();
    }

    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  response => {
    // debugger;
      console.log("At Interceptors response\n", response);
    // Do something with response data
    return response.data;
  },
  error => {
    // debugger;
    
    if(error !== undefined && error.response !== undefined && error.response.data.message === "Invalid token"){      
      toast.error(error.response.data.message, {
        position: toast.POSITION.TOP_CENTER
      });
      window.location.href = "/login";
      window.localStorage.clear();
    }
    // debugger;
    // Do something with response error
    return Promise.reject(error);
  }
);

axios.login = () => {
  return Config.apiUrlData + Config.api.login.url;

};


axios.myCommunitys = () => {
  return Config.apiUrlData + Config.api.myCommunitys.url;
  
};

axios.employeeDetails = () => {
  return Config.apiUrlData + Config.api.employeeDetails.url;
  
};

axios.req_credentials = () => {
  return Config.apiUrlData + Config.api.req_credentials.url;
  
};

axios.my_credentials = () => {
  return Config.apiUrlData + Config.api.my_credentials.url; 
  
};


axios.add_credential = () => {
  return Config.apiUrlData + Config.api.add_credential.url;
  
};

axios.credential_types = () => {
  return Config.apiUrlData + Config.api.credential_types.url;
  
};

axios.vendor_agencies = () => {
  return Config.apiUrlData + Config.api.vendor_agencies.url;
  
};

axios.community_employees = () => {
  return Config.apiUrlData + Config.api.community_employees.url;
  
};


axios.update_pin = () => {
  return Config.apiUrlData + Config.api.update_pin.url;
  
};



axios.update_profile = () => {
  return Config.apiUrlData + Config.api.update_profile.url;
  
};
axios.create_employee = () => {
  return Config.apiUrlData + Config.api.create_employee.url;
  
};

axios.update_employee = () => {
  return Config.apiUrlData + Config.api.update_employee.url;
  
};


axios.forgot_pin = () => {
  return Config.apiUrlData + Config.api.forgot_pin.url;
  
};

axios.community_credentials = () => {
  return Config.apiUrlData + Config.api.community_credentials.url;
  
};




axios.employee_details = () => {
  return Config.apiUrlData + Config.api.employee_details.url;
  
};


axios.update_credential = () => {
  return Config.apiUrlData + Config.api.update_credential.url;
  
};

axios.credential_details = () => {
  return Config.apiUrlData + Config.api.credential_details.url;
  
};

axios.vendor_req_credentials = () => {
  return Config.apiUrlData + Config.api.vendor_req_credentials.url;
  
};
axios.visits_history = () => {
  return Config.apiUrlData + Config.api.visits_history.url;
  
};





export default axios;
