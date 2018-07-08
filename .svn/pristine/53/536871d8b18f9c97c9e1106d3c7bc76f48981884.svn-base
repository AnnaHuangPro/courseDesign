var ssoApp = angular.module("ssoApp",['angular.permission']);
ssoApp.controller("ssoController",['$rootScope','$state','$scope','angularPermission','$stateParams','LoginService','ngDialog','ModelFileService','asynchroMarkService','dialogs',
function($rootScope,$state,$scope,angularPermission,$stateParams,LoginService,ngDialog,ModelFileService,asynchroMarkService,dialogs){
	$scope.operatorId=$stateParams.operatorId;
	
	$scope.success=function(data){
	    // 请求成功之后取消进度条
		if(data['isLogin']==true)
		{
			if($scope.check==true){
				localStorage.setItem("account",$scope.operatorCode);
				if($scope.operatorPassword.length<32){
					$scope.operatorPassword = hex_md5($scope.operatorPassword);
				}
				localStorage.setItem("password",$scope.operatorPassword);
			}else{
				localStorage.removeItem("account");
				localStorage.removeItem("password");
			}
			
			$rootScope.$state.isLogin = true;
			//sessionStorage.setItem("operatorCode",$scope.operatorCode);
			angularPermission.setOperatorCode($scope.operatorCode);
			//将当前登录单位这个实体放到session中
			//sessionStorage.setItem("selectedOrg",JSON.stringify($scope.selectedOrg));
			angularPermission.setSelectedOrg(JSON.stringify($scope.selectedOrg));
			var operatorAndRoles  = data['loginUser']['loginOperator']['operatorAndRoles']
			var roles = [];
			for(var i=0;i<operatorAndRoles.length;i++){
				var role = operatorAndRoles[i].role
				roles.push({code:role.code,name:role.name});
			}
			
			//sessionStorage.setItem("roles",JSON.stringify(roles));
			angularPermission.setRoles(JSON.stringify(roles));
			var loginUser = data['loginUser']['loginOperator'];
			loginUser.operatorAndRoles = '';
			
			//sessionStorage.setItem("currentLoginUser",JSON.stringify(loginUser));
			angularPermission.setLoginUser(JSON.stringify(loginUser));
			var permissions = data['loginUser']['userPermissionsCode'];
			
			//sessionStorage.setItem("permissions",permissions);
			angularPermission.setPermissions(permissions);
			var state = $rootScope.stateBeforLogin==undefined||$rootScope.stateBeforLogin==''?'main.list.welcome': $rootScope.stateBeforLogin;
			var stateParams  = $rootScope.stateParamsBeforLogin==undefined?{}: $rootScope.stateParamsBeforLogin;
			
			angularPermission.setPermissions(permissions);
			
			$rootScope.tabs = [];
			$rootScope.app= {};
			$rootScope.app.asynchroMask = asynchroMarkService;
			$rootScope.app.treeId = 1;
			
			$rootScope.app.notify = function(str){
				//提示
				dialogs.notify("提示", str, {size:'sm',animation:false,backdrop:false})
			}
			$rootScope.app.error = function(str){
				//错误
				dialogs.error("错误", str, {size:'sm',animation:false})
			}
			
			angularPermission.clearPermission();
			$rootScope.$state.go(state,stateParams);
		}
		else if(!$scope.loginSuccess || data['isLogin']==false)
		{
			alert("用户名或密码错误,或无关联职员");
			$rootScope.$state.go("login");
		}
	}
	
	$scope.error=function(){
		
	}
	LoginService.checkSSO($scope.operatorId,$scope.success,$scope.error);
}]);

