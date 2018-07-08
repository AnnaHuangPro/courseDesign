angular.module("mainModule",['ngDialog'])
	.controller('VipMainCtr',['dialogs','GroupMgtService','$filter','asynchroMarkService','$q','angularPermission','$state','$rootScope','$scope','anchorScroll','ManMgtService','dialogs',
	    function(dialogs,GroupMgtService,$filter,asynchroMarkService,$q,angularPermission,$state,$rootScope,$scope,anchorScroll,ManMgtService,dialogs) {
			function init(){
				function successcb(data) {
					if(data.isSuccess) {
						var member = data.loginUser.loginVip;
						if (angular.isUndefined(member.introduce) || member.introduce=="") {
							member.introduce = "这个人很懒，什么也没有说。。。。";
						}
						if (angular.isUndefined(member.avatarUrl) || member.avatarUrl=="") {
							member.avatarUrl = "asset/missing.png";
						}
						$scope.getSexIcon = function(member){
							if(angular.equals('男',$scope.member.sex)){
								return "icon_man";
							}else if(angular.equals('女',$scope.member.sex)){
								return "icon_woman";
							}else{
								return "icon_unkonw_sex";
							}
						}
						$scope.member = member;
						angularPermission.setPermissions(data.loginUser.userPermissionsCode);
						$scope.$broadcast('isLogin',data.loginUser);
					}else {
						dialogs.error('错误提示','登录超时!!!',{size: 'md'});
						$state.go('login');
					}
				}
				
				function errorcb(error) {
					dialogs.error('错误提示','无法获取用户信息!!!',{size: 'md'});
				}
				
				return ManMgtService.getCurrentLoginUser(successcb,errorcb).$promise;
			}
				
			$scope.$on('changeGroup', function(event,currentGroup) {
				function successCB(loginUser){	
					angularPermission.setPermissions(loginUser.userPermissionsCode);
					$scope.$broadcast('changeGroup1','changeGroup1');
				}
				function errorCB(error){
					
				}
				GroupMgtService.changeGroupProjection(currentGroup.eId,successCB,errorCB);
	
			});
			
			/* 初始化加载数据 */
			var initDefer = $q.defer();
			initDefer.promise
						.then(init)
						.catch(function error(error){
							$rootScope.openErrorDialog(error);
						});
			initDefer.resolve();
			
			
			/* 初始化rootscope */
			$rootScope.app= {};
			$rootScope.app.asynchroMask = asynchroMarkService;
			$rootScope.app.treeId = 1;
			
			$rootScope.app.notify = function(str){
				// 提示
				dialogs.notify("提示", str, {size:'sm',animation:false,backdrop:false})
			}
			$rootScope.app.error = function(str){
				// 错误
				dialogs.error("错误", str, {size:'sm',animation:false})
			}
			
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
	}])
	.controller('memberInfoCtr',function($scope,$uibModalInstance,data,angularPermission,modifyAccountService,dialogs){
		
		$scope.initMemberData = function() {
			$scope.member = data.member;
		}
		$scope.updateMember = function(member) {
			modifyAccountService.updateMemberInfo({member:member},sucesscb,errorcb);
			function sucesscb(data) {
				if (data != null) {
					dialogs.notify('成功',"保存成功",{size:'sm'});
				} else {
					dialogs.error('错误',"保存失败",{size:'sm'});
				}
			}
			function errorcb() {
				dialogs.error('错误',"保存失败",{size:'sm'});
			}
			$scope.save();
		};
		
		$scope.cancel = function(){
			$uibModalInstance.dismiss('取消');
		};
		
		$scope.save = function(){
			$uibModalInstance.close($scope.member);
		};
		
		$scope.hitEnter = function(evt){
			if(angular.equals(evt.keyCode,13) && !(angular.equals($scope.user.name,null) || angular.equals($scope.user.name,'')))
				$scope.save();
		};
		
		
		$rootScope.app={};
		$rootScope.app.asynchroMask = asynchroMarkService;		
		$rootScope.app.notify = function(str){
			//提示
			dialogs.notify("提示", str, {size:'sm',animation:false,backdrop:false})
		}
		$rootScope.app.error = function(str){
			//错误
			dialogs.error("错误", str, {size:'sm',animation:false})
		}
		
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
	})
