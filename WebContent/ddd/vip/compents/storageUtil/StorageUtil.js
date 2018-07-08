angular.module('StorageUtil',[])
	.factory('StorageUtil',function(){
		return {
			setOnlyCode : function(onlyCode){
				if(onlyCode === undefined){
					return;
				}
				localStorage.setItem("onlyCode",onlyCode);
			},
			setVipPassword : function(password){
				if(password === undefined){
					return;
				}
				var pswd_md5 = password;
				if(password.length < 32){
					pswd_md5 = hex_md5(password);
				}
				localStorage.setItem("vipPassword",pswd_md5);
			},
			removeOnlyCode : function(){
				localStorage.removeItem("onlyCode");
			},
			removeVipPassword : function(){
				localStorage.removeItem("vipPassword");
			},
			getOnlyCode : function(){
				return localStorage.getItem("onlyCode");
			},
			getVipPassword : function(){
				return localStorage.getItem("vipPassword");
			}
		}
	})