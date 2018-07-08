define(['app'],function(app)
{
	app.controller("VipLoginCtr",['$window','dialogs','$rootScope','$state','$scope','VipLoginService','angularPermission','StorageUtil','asynchroMarkService',
	                              function($window,dialogs,$rootScope,$state,$scope,VipLoginService,angularPermission,StorageUtil,asynchroMarkService)
	{
		$scope.ifDisplayloginPanel = true;
		$scope.init = function(){
			$scope.remember = false;
			$scope.selectGroup = {};
			$scope.groups = [];
			
			var _onlyCode =  StorageUtil.getOnlyCode();
			var _password = StorageUtil.getVipPassword();
			
			$scope.onlyCode = _onlyCode;
			$scope.password = _password;
			if(_password){
				var pswd_md5 = _password;
				if(_password.length < 32){
					pswd_md5 = hex_md5(_password);
				}
				$scope.password = pswd_md5;
				$scope.remember = true;
			}else{
				$(document).ready(function(){
					$('#password').attr('value','');
				})
			}
			
		}
		
		/**
		 * success { isSuccess:boolean, loginUser:{ currentOrganization :
		 * {eId:long}, groups : [ {eId:long} ... ], loginVip : { eId:long,
		 * onlyCode:string, password:string}, onlyCode : string,
		 * userPermissionsCode : [string,string,..] } }
		 */
	    $scope.memberCheck=function()
	    {
	    	function successcb(data){
	    		if(!data.isSuccess){
	    			dialogs.error('登录提示','用户名或密码错误!!!',{size:'sm'});
	    		}
	    		else{
		    		$scope.groups = data.groups || [];
		    		$scope.selectGroup = $scope.groups[0];
		    		$scope.selectOrganization(data.onlyCode);
	    		}
	    	}
	    	
	    	function errorcb(error){
	    		$rootScope.openErrorDialog(error);
	    	}
	    	
	    	var pswd_md5 = $scope.password;
			if($scope.password.length < 32){
				pswd_md5 = hex_md5($scope.password);
			}
	    	VipLoginService.vipLogin($scope.onlyCode,pswd_md5,successcb,errorcb);
	    };
	    
	    $scope.selectOrganization = function(onlyCode) {
	    	if(!$scope.selectGroup || !angular.isObject($scope.selectGroup)){
	    		dialogs.error('登录提示','请选择单位!',{size:'sm'});
	    	}
	    	
	    	function successcb(data){
	    		if(!data.isSuccess){
	    			dialogs.error('登录提示','请选择单位!',{size:'sm'});
	    			return;
	    		}
	    		StorageUtil.setOnlyCode($scope.onlyCode);
	    		if($scope.remember){
	    			StorageUtil.setVipPassword($scope.password);
	    		}
    			else{
	    			StorageUtil.removeVipPassword();
    			}
	    		
    			angularPermission.setPermissions(data.loginUser.userPermissionsCode);
	    		angularPermission.setLoginUser(data.loginUser);
	    		
	    		$state.go("main.list.welcome");
	    	}
	    	
	    	function errorcb(error){
	    		$rootScope.openErrorDialog(error);
	    	}
	    	
	    	var pswd_md5 = $scope.password;
			if($scope.password.length < 32){
				pswd_md5 = hex_md5($scope.password);
			}
			VipLoginService.checkOrganization(onlyCode,pswd_md5,$scope.selectGroup,successcb,errorcb);
	    }
	    
	    
	    // 回车事件
	    $scope.loginConvenient = function($event){
	    	 var keycode = window.event?event.keyCode:event.which;
	    	   if(keycode==13){
	    		   if($scope.ifDisplayloginPanel)
	    			   $scope.memberCheck();
	    		   else 
	    			   $scope.selectOrganization();
	           	}
	    	   else return;
	    }
	    
	    $scope.isSelectGroup = function(ngModelCtr){
	    	if($scope.groups.length == 0){
	    		return true;
	    	}
	    	else if($scope.selectGroup && $scope.selectGroup.eId){
	    		ngModelCtr.$setValidity('required',true);
	    		return true;
	    	}
	    	else{
	    		ngModelCtr.$setValidity('required',false);
	    		return false;
	    	}
	    }
	    
	    $scope.isGroupsEmpty = function(ngModelCtr){
	    	if($scope.groups.length != 0){
	    		ngModelCtr.$setValidity('isEmpty',true);
	    		return false;
	    	}
	    	else{
	    		ngModelCtr.$setValidity('isEmpty',false);
	    		return true;
	    	}
	    }
	    $scope.register = function(){
	    	$state.go("register");
	    }
	   
		
		/* 校外登陆 */
		$scope.loginBySchool = function(){
			var apiUrl = "http://api.cqu.edu.cn/v1/oauth2/authorize?appid=250135&redirect_uri=";
			var backUrl = $window.location.origin+"/CMS/vipExtendAction/apiLoginBack";
			$window.open(apiUrl+backUrl);
		}
	}])
});

