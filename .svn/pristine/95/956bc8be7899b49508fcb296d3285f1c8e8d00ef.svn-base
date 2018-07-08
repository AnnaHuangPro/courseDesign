define(['app'], function (app) 
{
	app.controller('VipMenuCtr',['$route','$rootScope','$scope','$state','ModuleService','angularPermission','$location','anchorScroll'
	                             ,'ngDialog','modifyAccountService','dialogs',
	                    function ($route,$rootScope,$scope,$state,ModuleService,angularPermission,$location,anchorScroll,ngDialog,modifyAccountService,dialogs) {
		
		$scope.$on("isLogin",function(event,loginUser){
			$scope.member  = loginUser.loginVip;
			
			if($scope.member.avatarUrl==undefined||$scope.member.avatarUrl==''|| $scope.member.avatarUrl == null){
				$scope.member.avatarUrl = "https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=365606795,3097561736&fm=58";
			}
			$scope.modules = $scope.loadMemberModules();
			
		})
		$scope.baseUrl = "";
		
		$scope.$on("changeGroup1", function(event,changeGroup1) {
			//重新加载会员组的模块
			$scope.modules = $scope.loadMemberModules();
				
			//刷新当前页面
			$route.reload();

		});
		
		$scope.$on("findModuleByName",function(Name){
			var resModules = [];
			angular.forEach($scope.modules,function(module){
				modules = findModuleByName(modulem,name);
				if(modules && modules.length > 0){
					resModules = resModules.concat(modules);
				}
			})
			$scope.$emit("findModuleByNameRes",moduleRes);
		})
		
		function findModuleByName(module,name){
			var resModules = [];
			if(module.name && module.name == name){
				resModules.push(module);
			}
			else 
			{
				angular.forEach(module.children,function(childModule){
					var modules =  findModuleByName(childModule,name);
					if(modules && modules.length > 0){
						resModule = resModules.concat(modules);
					}
				});
			}
			
			return resModules;
		}
		
		$scope.loadMemberModules = function()
		{
			function successcb(data)
			{
				if(!data.isSuccess){
					if(!data.isLogin){
						alert("登陆超时，请重新登陆");
						$state.go("login");
					}
				}
				else{
					$scope.modules = data.modules;
				}
			}
			
			function errorcb()
			{
				alert("连接超时,请刷新");
				$state.go("login");
			}
			
			ModuleService.findMemberModules(successcb,errorcb);
		}
		
		$scope.turnRouter = function(module){
			angular.forEach($scope.modules,function(moduleRoot){
				angular.forEach(moduleRoot.children,function(moduleChild){
					if(moduleChild.eId == module.eId){
						module.isIn = true;
					}
					else{
						moduleChild.isIn = false;
					}
				})
			})
			if(module.url){
				$location.path(module.url);
				anchorScroll.toView('#content',true);
			}
			else if(module.route){
				$state.go(module.route);
				anchorScroll.toView('#content',true);
			}
		}
		
		$scope.updateMember = function(member)
		{
		    	modifyAccountService.updateMemberInfo({member:member},sucesscb,errorcb);
		        function sucesscb(data)
		        {
		        	if(data!=null)
		        	{
		        		alert('头像上传成功!');
		        	}
		        	else
		        	{
		        		alert('头像上传失败!');
		        	}
		        }
		        function errorcb()
		        {
		        	alert("修改失败!");
		        }
		};
		$scope.closeOperateTab = function(){
			$rootScope.closeOperateTab();
		}
		
	}]);
	app.controller("headPicCtr",['uploadService','$rootScope','$scope',function(uploadService,$rootScope,$scope){
		
		$scope.ensureLocal = function(imgDom){
			function successCB(data){
				if (data != null){
					alert("上传头像成功！");
				}
				else{
					alert("上传头像失败！");
				}
				
			}
			function errorCB(){
				alert("修改失败！");
				
			}	
			uploadService.uploadImgByStream(imgDom,successCB,errorCB);
		}
		
		$scope.cancelN = function(){
		    $rootScope.closeOperateTab();
			alert("取消成功！");
		}
	}])
});
