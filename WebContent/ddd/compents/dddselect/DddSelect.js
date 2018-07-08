angular.module("dddSelectApp",[])
.directive("dselect",['CodeTableService',"angularPermission","ListViewService",function(CodeTableService,angularPermission,ListViewService)
{
	return{
		restrict:'E',
		replace:true,
		require: '?ngModel',
		scope:{
			options:'=',
			showName:'@',
			codeTypeKey:'@',
			defaultValue:'@',
			selectedField:'@',
			required:'@',
			readOnly:'@',
			firstIn:'=',
			isdisabled:'=',
			placeholder:'@',
			
			//加*为必填
			listViewKey:'@', //视图的key*
			numberOfData:'@',//可以设置数据条数，默认300条
			initFilter:'@',//初始化过滤条件和外键一样
			idFiled:'@'//这个视图的主键 *
		},
		link:function($scope, element, attrs, ngModelController)//$$HashMap
		{
			if($scope.listViewKey){
				function successCB(data){
					$scope.options = data[0].result;
				}
				function errorCB(data){
					console.log("码表查询数据错误");
				}
				if(!$scope.initFilter){
					$scope.initFilter = {};
				}else{
					$scope.initFilter = angular.fromJson($scope.initFilter);
				}
				if(!$scope.numberOfData){
					$scope.numberOfData = 300;
				}
				$scope.$watch("initFilter",function(newVal,oldVal){
					if(newVal == oldVal){
						return;
					}
					else{
						$scope.clearn();
						ListViewService.getResult(1,$scope.numberOfData,$scope.listViewKey,{},{},$scope.initFilter,{},successCB,errorCB);
					}
				})
				ListViewService.getResult(1,$scope.numberOfData,$scope.listViewKey,{},{},$scope.initFilter,{},successCB,errorCB);
			}
			
			if($scope.firstIn == undefined){
				$scope.firstIn=true;
			}
			
			$scope.ngModelController = ngModelController;
			
			$scope.clearn = function(){
				if(!$scope.readOnly && $scope.options){
					$scope.options.selected = undefined
				}
			}
			
			if($scope.showName==undefined){//码表，默认为name
				$scope.showName="name";
			}
		 
			
			if(angular.isDefined($scope.codeTypeKey)&&$scope.codeTypeKey!==''){//码表
				var codeTables = angularPermission.getCache("codeTable",$scope.codeTypeKey);
				if(codeTables)
				{
					$scope.options=codeTables;
					
					if(ngModelController.$viewValue != $scope.options.selected){
						selectedItem();
					}
				}
				else
				{	
					CodeTableService.findCodeTablesByKey($scope.codeTypeKey,sucesscb,errorcb);
				
					function sucesscb(data){
						$scope.options=data;
						
						if(ngModelController.$viewValue != $scope.options.selected){
							selectedItem();
						}
					}
					function errorcb(error){alert("查询码表项失败！");}
				}
			}
			
			
			
			$scope.$watch("options",function(newVal,oldVal){
				if($scope.defaultValue != undefined){
					ngModelController.$setViewValue($scope.defaultValue);
				}
				
				if(newVal != undefined &&$scope.firstIn && ngModelController.$viewValue != undefined){
					selectedItem();
					$scope.firstIn=false;
				}
			});
			
			$scope.$watch("options.selected",function(newVal,oldVal){
				if(newVal == undefined){
					ngModelController.$setViewValue(undefined);
				}else if($scope.codeTypeKey != undefined&&$scope.codeTypeKey!=''){//码表
					ngModelController.$setViewValue(newVal.value);
				}else{//外部赋值
					if($scope.selectedField != undefined){
						ngModelController.$setViewValue(newVal[$scope.selectedField]);
					}else{
						ngModelController.$setViewValue(newVal);
					}
				}
			});
			
			$scope.$watch("ngModelController.$viewValue",function(newVal,oldVal){
				if(newVal == undefined && $scope.options != undefined){
					$scope.options.selected=undefined;
				}else if(newVal != oldVal && $scope.options != undefined){
					selectedItem();
				}
			});
			
			function selectedItem(){
				if($scope.listViewKey){
					//排除idfiled大小写的问题
					angular.forEach(ngModelController.$viewValue,function(value,key){
						if(key.toLowerCase() == $scope.idFiled.toLowerCase()){
							ngModelController.$viewValue[$scope.idFiled] = value;
						}
					})
					
					for(var i=0;i<$scope.options.length;i++){
						if(ngModelController.$viewValue[$scope.idFiled] == $scope.options[i][$scope.idFiled]){
							$scope.options.selected=$scope.options[i];
							return;
						}
					}
					
				}
				/*$scope.options.selected = ngModelController.$viewValue;
				return;*/
				
				for(var i=0;i<$scope.options.length;i++){
					if(ngModelController.$viewValue==getValue($scope.options[i])){
						$scope.options.selected=$scope.options[i];
						break;
					}else if(ngModelController.$viewValue.toString==$scope.options[i].toString){
						$scope.options.selected=$scope.options[i];
						break;
					}
				}
			}
			
			function getValue(obj){//如果码表value有值取value,否则取name
				if($scope.codeTypeKey != undefined){
					if(obj.value != undefined){
						return obj.value;
					}else if(obj.name != undefined){
						return obj.name;
					}
				}else if($scope.selectedField != undefined){
					return obj[$scope.selectedField];
				}else{
					return obj;
				}
			}
		},

		templateUrl:'compents/dddselect/asset/template.html'
	}
}])
.directive("dddtypehead",["ListViewService",function(ListViewService)
{
	return{
		restrict:'E',
		replace:true,
		require: '?ngModel',
		scope:{
			showName:'@',
			key:'@'
		},
		link:function($scope, element, attrs, ngModelController)//$$HashMap
		{
			$scope.initFilter = {};
			
			$scope.loadData = function()
			{
				ListViewService.getDataSourceResult($scope.key,$scope.initFilter,successCB,errorCB);
				function successCB(data){
					$scope.names = data;
				}
				function errorCB(data){
					console.log("码表查询数据错误");
				}
			}
			
			$scope.onSelect = function($item, $model, $label)
			{
				ngModelController.$setViewValue($model);
				ngModelController.$render();
			}
			
			$scope.ngModelController = ngModelController;  //ngModelController.$viewValue
			$scope.loadData();
		},
		
		template:'<input type="text" typeahead-min-length="0" typeahead-select-on-exact="true" typeahead-on-select="onSelect($item, $model, $label)" typeahead="n[showName] for n in names | filter:$viewValue" class="form-control">'
	}
}]);