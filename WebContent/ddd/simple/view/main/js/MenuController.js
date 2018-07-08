define(['app'], function (app) 
{
	
	
	app.controller('MenuController',['$location','$rootScope','$scope','$state','ModuleService','angularPermission',
	                    function ($location,$rootScope,$scope,$state,ModuleService,angularPermission) {
		var operatorId = angularPermission.getLoginUser() == null?0:angularPermission.getLoginUser().eId;
		$scope.loadSystem = function()
		{
			$scope.oneAtATime = false;
			$scope.isOpen = false;
			$scope.childIsOpen = false;
			$scope.status = {
								isFirstOpen: true,
								isFirstDisabled: false
							};
			ModuleService.constructNewTree(operatorId,findModulesResult,findModulesFault);
			function findModulesResult(data)
			{
				$scope.modules = data;
			}
			
			function findModulesFault(error)
			{
				$rootScope.openErrorDialog(error);
			}
		}
		
		
		
		$rootScope.loadSystem = $scope.loadSystem;
		
		$scope.loadSystem();
		
		$scope.ChangeState = function(module)
		{
			if(module.url != undefined && module.url != null && module.url != ""){
				$location.path(module.url);
			}
			else if(module.route != undefined && module.route != null && module.route != "")
			{
				$state.go(module.route);
			}
		}
		
		$scope.menuOptions = {
				nodeChildren: "children",
				dirSelectable: false,
				injectClasses: {
					ul: "a1",
					li: "a2",
					liSelected: "a7",
					iExpanded: "a3",
					iCollapsed: "a4",
					iLeaf: "a5",
					label: "a6",
					labelSelected: "a8"        
				}
			};		
			
			//选择节点事件处理
			$scope.showSelected = function(node)
			{
				if(node.children && node.children.length >0 ) return;
				 
				if(node.url != undefined && node.url != null && node.url != ""){
					$location.path(node.url);
				}
				else if(node.route != undefined && node.route != null && node.route != "")
				{
					$state.go(node.route);
				}
 
			};
			
			//节点展开事件
			$scope.onNodeToggle = function(node)
			{

			};
		
	}]);
});