var registerApp = angular.module("registerApp",['angular.permission']);
registerApp.controller("VipRegistCtr",['$rootScope','$state','$scope','angularPermission','$modal','ManMgtService','dialogs',
                                       function($rootScope,$state,$scope,angularPermission,$modal,ManMgtService,dialogs){
	$scope.codeUrl="../Member/validateCode";
	$scope.agree = true;
	//从后台获取验证码图片
	$scope.createCode = function()
	{
	  var random =  Math.random()*10;
	  $scope.codeUrl="../Member/validateCode?random="+random;
	}
	//初始化表单
	$scope.init = function(){
		$scope.member = {
				onlyCode : '',
				password : '',
				ckey :'',
				surePassword : ''
		}
		$scope.validateCode = '';
	}
	//保存新会员
	$scope.saveMember = function(member)
	{
		member.typeCode = "校外";
		ManMgtService.returnValidate($scope.validateCode,sucesscb,errorcb);
		
		function sucesscb(data)
		{
			if(data['result']==true)
			{
				function sucesscb(data)
				{
					if(data!=null&&data!=""){
						dialogs.error('成功',"注册成功，请登录",{size:'sm'});
						$state.go('login');
						
					}
					else
						dialogs.error('错误',"注册失败",{size:'sm'});
				}
				function errorcb(data)
				{
					dialogs.error('错误',data.data.message,{size:'sm'});
				}
				ManMgtService.saveMember(member,sucesscb,errorcb);

			}else
				{
					dialogs.error('错误',"验证码错误",{size:'sm'});
					$scope.validateCode="";
					$scope.createCode();
				}
		}
		function errorcb(error)
		{
			dialogs.error(error);
		}
	}	
	$scope.$watch("member.password", function(newVal,oldVal) {
		$scope.isFirstShow = false
		$scope.isSecShow = false;
		$scope.isThrShow = false;
		if(newVal != oldVal && newVal != undefined){
			var wordReg = /[a-zA-Z]+/;
			var numReg = /\d+/;
			var charReg = /([@|\\|/|~|+|-| |\|]+)/;
			var charLength = newVal.length;
			if(newVal=="" || charLength==0){
				$scope.isFirstShow = false
				$scope.isSecShow = false;
				$scope.isThrShow = false;
			}
			else{
				$scope.turnTrue = true;
				var wordRegTest = wordReg.test(newVal);
				var numRegTest = numReg.test(newVal);
				var charTest = charReg.test(newVal);
			    if((wordRegTest&&charLength >= 6) || (numRegTest&&charLength >= 6) ||  (charTest&&charLength >= 6)){    
			    	$scope.isFirstShow = true;
			    }
			    if((((wordRegTest && numRegTest)||(charTest && numRegTest)||(wordRegTest && charTest)) && charLength >= 8) || charLength >= 18){
			    	$scope.isSecShow = true;
			    }
			    if(wordRegTest && numRegTest && charTest && charLength >= 10 && charLength <= 20){
			    	$scope.isThrShow = true;
			    }
			}
		}
	});
	$scope.isSure = function(ngModelCtr){
		if($scope.member.password && $scope.member.surePassword && $scope.member.surePassword == $scope.member.password){
			ngModelCtr.$setValidity("isSure",true);
			return true;
		}
		else{
			ngModelCtr.$setValidity("isSure",false);
			return false;
		}
	}
	$scope.reset = function() {
		$state.go("login");
	};
	
}]);

