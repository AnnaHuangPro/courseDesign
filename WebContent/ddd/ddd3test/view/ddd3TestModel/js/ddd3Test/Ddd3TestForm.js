angular.module('DDD3.ddd3TestModule', [])
.controller('ddd3TestFormController',['$timeout','$q','asynchroMarkService','$rootScope','$scope','Ddd3TestService','$state','angularPermission','$stateParams','dialogs','OperatorService',
function($timeout,$q,asynchroMarkService,$rootScope,$scope,Ddd3TestService,$state,angularPermission,$stateParams,dialogs,OperatorService){
	$scope.showSaveAndAddButton = $stateParams.operate == 'add' ?true:false;
	$scope.operate = $stateParams.operate;
	$scope.id = $stateParams.id;

	$scope.dddtest = 10;
	
	$scope.timeCon = {};
	$scope.test = "1";
	$scope.a = function(){
		$scope.DDD = true;
	}
	
	$scope.create = function(){
		$scope.ddd3Test = {};
		//设置默认值
	}
	
	$scope.mytest=[
	            {f1:"ddd",f2:"ddd3"},
	            {f1:"DDD",f2:"DDD3"}
	            ];
	
	$scope.notExist = function(value){
		var ddd = ['a','b','c'];
		return ddd.indexOf(value) === -1;
	}
	
	$scope.doesNotExist = function(value) {
        var db = ['a', 'b'];
        // Simulates an asyncronous trip to the server.
        if(value){
        	OperatorService.findOperatorById(value,function(data){$scope.d = data},function(error){});
        }
        
        	   return $q(function(resolve, reject) {
                   $timeout(function() {
   	                if ($scope.d) {
   	                	reject();
   	                } else {
   	                	resolve();
   	                }
               }, 500);
           });
        	
        
     
    };
    
	
	$scope.init = function()
	{
		if($stateParams.operate=='edit')
		{
			$scope.findDdd3Test();
		}else if($stateParams.operate=='add'){
			$scope.create();
		}else{
			dialogs.error("错误","操作类型 "+$scope.operate+" 在当前请求中无效");
		}
	}
	
	//getDdd3TestDetail
	$scope.findDdd3Test = function()
	{
		//放到$rootScope中 
		$rootScope.app.asynchroMask.mask("加载中。。。。。");
		Ddd3TestService.findDdd3TestById($scope.id,sucessCB,errorCB);

		function sucessCB(data)
		{
			$rootScope.app.asynchroMask.unmask();
			$scope.ddd3Test = data;
		};

		function errorCB(error)
		{
			$rootScope.app.asynchroMask.unmask();
			$rootScope.openErrorDialog(error);
		}
	};
	$scope.cancel = function(){
		$rootScope.closeOperateTab();
		$state.go("main.list.ddd3Test.ddd3TestListRoute");
	}
	
	$scope.ddd = function(aaa){
		console.log(aaa);
		return 12;
	}
	
	
	//不传对象 isNeedNew由界面传
	$scope.saveDdd3Test = function(isNeedNew)
	{
		if($scope.operate=='add')
		{
			$scope.addDdd3Test($scope.ddd3Test,isNeedNew);
		}
		else if($scope.operate=='edit')
		{
			//添加 更新并新增功能isNeedNew
			$scope.updateDdd3Test($scope.ddd3Test,isNeedNew);
		}
	}
	
	//由上面isNeedNew决定
	/*$scope.saveAndAddDdd3Test = function()
	{
		$scope.addDdd3Test($scope.ddd3Test,false);
	}	*/
	$scope.addDdd3Test = function(ddd3Test,isNeedNew)
	{   
		$rootScope.app.asynchroMask.mask("加载中。。。。。");
		return Ddd3TestService.saveDdd3Test(ddd3Test,sucessCB,errorCB);

		function sucessCB(data)
		{
			$rootScope.app.asynchroMask.unmask();
			if(isNeedNew){
				//$scope.ddd3Test=null;
				$scope.create();
			}
			else//处理一些默认值
			{
				//$scope.refreshGrid();
				//$rootScope.closeOperateTab();
				//$state.go('main.list.ddd3Test.ddd3TestListRoute');
			}
			
		}
		function errorCB(error)//回掉方法命名
		{
			$rootScope.app.asynchroMask.unmask();
			$rootScope.openErrorDialog(error);
		}
	}
	$scope.updateDdd3Test = function(ddd3Test,isNeedNew)
	{
		$rootScope.app.asynchroMask.mask("加载中。。。。。");
		Ddd3TestService.updateDdd3Test(ddd3Test,sucessCB,errorCB);
	
		function sucessCB()
		{
			$rootScope.app.asynchroMask.unmask();
			
			if(isNeedNew){
				//$scope.ddd3Test=null;
				$scope.create();
			}
			else//处理一些默认值
			{
				$scope.refreshGrid();
				$rootScope.closeOperateTab();
				$state.go('main.list.ddd3Test.ddd3TestListRoute');
			}
		}
		function errorCB(error)
		{
			$rootScope.app.asynchroMask.unmask();
			$rootScope.openErrorDialog(error);
		}
	};
	
	$scope.refreshGrid = function(){
		var controller = $rootScope.getController('ddd3TestListGrid' , 'ddatagrid');
		if(controller){
			controller.refreshCurrent();
		}
	}
}]);