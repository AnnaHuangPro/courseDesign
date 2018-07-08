define(['app'], function (app) 
{
	app.controller('VipTopCtr',['$rootScope','$scope','$state','$interval','angularPermission','VipLoginService','GroupMgtService',
	function($rootScope,$scope,$state,$interval,angularPermission,VipLoginService,GroupMgtService){
		$scope.ifDisplayAdminloginButton = false;
		$scope.$on('isLogin', function(event,loginUser) {
			$scope.loginUser = loginUser;
			$scope.member = loginUser.loginVip;
			if($scope.member.nickname == null || $scope.member.nickname == "") {
				$scope.member.nickname = $scope.member.onlyCode;
			}
			if ($scope.member.password == null || $scope.member.password == "") {
				getAdminPermission($scope.member.onlyCode);
			}
			if(!$scope.$$phase){
				$scope.$apply();
			}
		});
		
		//更新问候语
		$scope.greetingLanguage = Get_Greetings()+"好,";
		$scope.greetingChange = function() {
			$scope.greetingLanguage = Get_Greetings()+"好,";
		} 
		
		//后台登录入口是否展示
		function getAdminPermission(onlyCode){
			function successcb(data){
				if (data != null && data != "") {
					$scope.ifDisplayAdminloginButton = true;
				}
			}
			function errorcb(error){
				alert("获取数据失败");
			}
			VipLoginService.getAdminPermisson(onlyCode,successcb,errorcb);
		}
		//切换会员组(权限点)
		$scope.changeGroup = function(group) {
			$scope.loginUser.currentGroup = group;
			$scope.$emit('changeGroup',group);
		}
	    
		//退出登录
		$scope.vipLoginOut = function()
		{
			function successcb(){}
			function errorcb(){}
			VipLoginService.vipLoginOut(successcb,errorcb);
			//sessionStorage.removeItem("vipLogin");
    		angularPermission.removeVipLogin();
			$state.go("login");
		}
		
		function Get_Greetings()
		{
			var now = new Date();  
	        var times = now.getHours();  
	        var whe=parseInt(times);  
	        if(times>=0 && times<6){return "凌晨"}  
	        if(times>=6 && times<9){return "早上"}  
	        if(times>=9 && times<11){return "上午"}  
	        if(times>=11 && times<13){return "中午"}  
	        if(times>=13 && times<17){return "下午"}  
	        if(times>=17 && times<19){return "傍晚"}  
	        if(times>=19 && times<24){return "晚上"} 
		}
	}]);
});
