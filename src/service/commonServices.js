import React from 'react';
import Config from '../container/config';
import Loader from 'react-loader-spinner';

const CommonService = {};

CommonService.renderLoader = (loader) => {
	return (
		<div className={
				(loader) 
					? "loader-container showLoader" 
					: "loader-container hideLoader"
			}>
			<Loader  
				type="Rings" 
				color="#48b16f" 
				height="100"	 
				width="100" />
		</div>
	)        
}
CommonService.getToken = () => {
	let userData = CommonService.localStore.get('userData');
    let key = JSON.parse(userData.userData);
	let token = (	key != undefined && 
					key != null && 
					key.auth_token != null
					) 	? key.auth_token 
						: null;
	return token;
}

CommonService.localStore = {
	get: (key) => {
		// debugger;
		let item = CommonService.localStore.encryptItem(key);
		let data = localStorage.getItem(item);
		let result = (data != null) ? CommonService.localStore.decryptData(data) : data;
		return {[key]: result};
	},
	set: (key, value) => {
		// debugger;
		let encryptData = CommonService.localStore.encrypt(key, value);
		localStorage.setItem(encryptData[0], encryptData[1]);
	},
	delete: (key) => {
		localStorage.removeItem(btoa(key));
	},
	deleteAll: () => {
		localStorage.clear();
	},
	encrypt: (key, data) => {
		let keyData = btoa(key);
		let valueData = btoa(data);
		return [keyData, valueData];
	},
	encryptItem: (text) => {
		return btoa(text);
	},
	decryptData: (data) => {
		return atob(data);
	}
}

CommonService.toTitleCase = (str) => {
	if(str !== "" && str !== null  && str !== undefined){
		return str.toLowerCase().replace(/^(.)|\s(.)/g, ($1) => $1.toUpperCase());
	}else{
		return str;
	}
}


export default CommonService;