var loginApp = angular.module("loginApp",['loginSuccessApp','angular.permission','ddataloadApp','ngDialog']);
loginApp.controller("LoginController",['$rootScope','$state','$scope','LoginService','angularPermission','$modal','$http','ngDialog','ModelFileService','asynchroMarkService','dialogs',
function($rootScope,$state,$scope,LoginService,angularPermission,$modal,$http,ngDialog,ModelFileService,asynchroMarkService,dialogs){
	$scope.dynamic= 1;
	$scope.isChecked = false;
	$scope.dowloadChrome = function(){
		
		var success = function(data){
			window.location.href = "../DownLoadServlet?attachmentId="+ data;
		}
		var error = function(error){
			
		}
		ModelFileService.findModelFileAttachmentsId("chrome",success,error);
	}
	$scope.init = function(){
		
		//初始化设置显示登录框，不显示单位选择框
		$scope.showLoginForm = true;
		
		
		var isChrome = window.navigator.userAgent.indexOf("Chrome") !== -1 
		if(!isChrome){
			//非谷歌浏览器禁止使用
			//$state.go('browerErrorPage');
		}
		 // 读取本地缓存看是否有账户和密码
		$scope.check = false;
		//用户能够查看的所有单位
		$scope.authorizedOrg = null;
		//选择的单位
		$scope.selectedOrg= null;
		$scope.account = localStorage.getItem("account");
		$scope.passw = localStorage.getItem("password");
		if($scope.account!=null && $scope.passw !=null){
			$scope.operatorCode = $scope.account;
			$scope.operatorPassword = $scope.passw;
			$scope.check = true;
		}
		
		$rootScope.app= {};
		$rootScope.app.asynchroMask = asynchroMarkService;
		$rootScope.app.treeId = 1;
		$rootScope.app.notify = function(str){
			//提示
			dialogs.notify("提示", str, {size:'sm',animation:false,backdrop:false});
		}
		$rootScope.app.error = function(str){
			//错误
			dialogs.error("错误", str, {size:'sm',animation:false})
		}
	}
	
	$scope.init();
	
	$scope.searchOrganization = function(){
			LoginService.searchOrganization($scope.operatorCode,
					function(data){
						$rootScope.app.asynchroMask.unmask();
						if(data != null){
							$scope.authorizedOrg = data;
							if($scope.authorizedOrg.length != 0){
								$scope.selectedOrg =  $scope.authorizedOrg[0];
								angular.isDefined($scope.selectOrcCheck[0])
								$scope.selectOrcCheck[$scope.selectedOrg.name] = true;
							}
							if($scope.authorizedOrg.length == 1){
								 $scope.loginIn();
							}else{
								$scope.showLoginForm = !$scope.showLoginForm;
							}
						}
					},function(){
						$rootScope.app.asynchroMask.unmask();
					});
	}
	
	$scope.showError=false;
	

	$scope.startATimer = function(){
		
	}
    $scope.loginCheck=function()
    { 
    	if ($scope.operatorCode&&$scope.operatorPassword) {
    		$scope.loginSuccess=false;
    		/*if($scope.selectedOrg!=null){*/
    			var pswd_md5 =  $scope.operatorPassword;
    			if($scope.operatorPassword.length < 32){
    				pswd_md5 = hex_md5($scope.operatorPassword);
    			}
    			// 发起异步请求，使用进度条遮盖界面
    			$rootScope.app.asynchroMask.mask("数据加载中,请稍后......");
        		LoginService.checkLoginUser($scope.operatorCode,pswd_md5,$scope.selectedOrg,$scope.successCB,$scope.errorCB);
//    			LoginService.checkOperator($scope.operatorCode,pswd_md5,$scope.successCB,$scope.errorCB);
    		/*}
    		else if(!$scope.operatorCode){
    			$rootScope.app.notify("操作员 "+$scope.operatorCode +" 未被分配单位");
    		}*/
    	}
    	else if(!$scope.operatorPassword&&!$scope.operatorCode){
    		$rootScope.app.error("请输入用户名和密码");
    	}
    	else if(!$scope.operatorPassword){
    		$rootScope.app.error("请输入密码");
    	}
    	else
    	{
    		if(!$scope.operatorCode){
    			$rootScope.app.error("请输入用户名");
    			
    		}
    		else{
    			$rootScope.app.error("请选择单位");
    		}
    	}
		
    };
    $scope.loginConvenient = function($event){
    	 var keycode = window.event?event.keyCode:event.which;
    	   if(keycode==13){
    		   $scope.loginCheck();
           }
    	   if(keycode==8){
    		   $scope.operatorPassword = "";
           }
    	
    }
    //////////////
        
    $scope.select = function($event){
    	 var keycode = window.event?event.keyCode:event.which;
    	 alert(keycode);
    }
    
    $scope.comeBack = function(){
    	$scope.showLoginForm = !$scope.showLoginForm;
    	$scope.selectOrcCheck = {};
    }
    $scope.loginIn = function(){
    	if($scope.selectedOrg == null){
    		$rootScope.app.error("请选择单位");
    	}
    	var pswd_md5 =  $scope.operatorPassword;
		if($scope.operatorPassword.length < 32){
			pswd_md5 = hex_md5($scope.operatorPassword);
		}
		$rootScope.app.asynchroMask.mask("数据加载中,请稍后......");
    	LoginService.checkLoginUser($scope.operatorCode,pswd_md5,$scope.selectedOrg,$scope.successLogin,$scope.errorLogin);
    }
    $scope.selectOrcCheck = {};
    $scope.selectOrg = function(org,orgs){
    	$scope.selectOrcCheck = {};
    	$scope.selectedOrg = org;
    	if(!$scope.selectOrcCheck[org.name]){
       	 $scope.selectOrcCheck[org.name] = false;
       }
    	$scope.selectOrcCheck[org.name] =  ! $scope.selectOrcCheck[org.name];
    }
    
    $scope.successCB = function(data){
    	if(data.isLogin == true){
    		$scope.searchOrganization();
    	}else{
    		$rootScope.app.asynchroMask.unmask();
    		$rootScope.app.error("用户名或密码错误");
    	}
    }
    $scope.errorCB = function(error){
    	$rootScope.app.asynchroMask.unmask();
    	$rootScope.openErrorDialog(error);
    }
    
    
    //////////////
   $scope.successLogin = function(data)
	{
	   
	    // 请求成功之后取消进度条
		$rootScope.app.asynchroMask.unmask();
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
			angularPermission.setLoginUser(loginUser);
			var permissions = data['loginUser']['userPermissionsCode'];
			//sessionStorage.setItem("permissions",permissions);
			angularPermission.setPermissions(permissions);
			angularPermission.clearPermission();
			
			//将当前登录单位这个实体放到session中
			//sessionStorage.setItem("selectedOrg",JSON.stringify($scope.selectedOrg));
			angularPermission.setSelectedOrg(JSON.stringify($scope.selectedOrg));
			var state = $rootScope.stateBeforLogin==undefined||$rootScope.stateBeforLogin==''?'main.list.mainTable': $rootScope.stateBeforLogin;
			var stateParams  = $rootScope.stateParamsBeforLogin==undefined?{}: $rootScope.stateParamsBeforLogin;
			$rootScope.$state.go(state,stateParams);
			
		}
		else if(!$scope.loginSuccess || data['isLogin']==false)
		{
			$rootScope.app.error("用户名或密码错误");
		}
	};
   
   $scope.errorLogin = function(error)
	{
	   $rootScope.app.error("登陆异常,请重试或联系管理员!");
	};
	
	
	$rootScope.openErrorDialog = function(clientError){
            var dialogId = ngDialog.open({
                template: 'js/base/asset/clientErrorDialog.html',
                showClose:true,
                controller: ['$scope', function ($scope, $timeout) {
                	if(clientError.data)
                	{	
                		$scope.clientError = clientError.data;
                	}
                	else
            		{
                		$scope.clientError={};
                		$scope.clientError.message=angular.toJson(clientError);
            		}
                	$scope.showDebug = false;
                		
                }],
                className: 'ngdialog-theme-default'
            });
	}			
}]);