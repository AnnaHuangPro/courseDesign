angular.module('dynamicFormModule', ['dynamicFormApp'])
.controller('dynamicFormFormController',['$rootScope','$scope','DynamicFormService','$state','$stateParams','ngDialog',"dialogs",
function($rootScope,$scope,DynamicFormService,$state,$stateParams,ngDialog,dialogs){
	
	$scope.dynamicForm = {};
	$scope.showSaveAndAddButton = $stateParams.operate == 'add' ?true:false;
	$scope.operate = $stateParams.operate;
	$scope.id = $stateParams.id;

	$scope.getInitDynamicFormData = function()
	{
		if($stateParams.operate=='edit')
		{
			$scope.getDynamicFormDetail();
		}
	}
	
	$scope.getDynamicFormDetail = function()
	{
		DynamicFormService.findDynamicFormById($scope.id,sucesscb,errorcb);

		function sucesscb(data)
		{
			$scope.dynamicForm = data;
			$scope.dynamicForm.copyForm = angular.fromJson(data.copyForm);
			$scope.dynamicFormCopy = angular.copy($scope.dynamicForm);
		};

		function errorcb(error)
		{
			$rootScope.openErrorDialog(error);
		};
	};
	
	$scope.saveDynamicForm = function(dynamicForm)
	{
		if($scope.operate=='add'&&dynamicForm.copyForm)
		{	
			$scope.findDynamicFormById(dynamicForm.copyForm.EId);

		}
		else if($scope.operate=='add')
		{
			$scope.addDynamicForm(dynamicForm);
		}else if($scope.operate=='edit'&&dynamicForm.copyForm&&dynamicForm.copyForm.EId!=$scope.dynamicFormCopy.copyForm.EId)
		{
			$scope.findDynamicFormById(dynamicForm.copyForm.EId);
		}
		else if($scope.operate=='edit')
		{
			$scope.updateDynamicForm(dynamicForm);
		}
	}
	
	$scope.addDynamicForm = function(dynamicForm)
	{   
		DynamicFormService.saveDynamicForm({dynamicForm:dynamicForm},sucesscb,errorcb);

		function sucesscb(data)
		{
			window.open("dynamicForm.html?dynamicFormId="+data.eId);
		}
		function errorcb(error)
		{
			$rootScope.openErrorDialog(error);
		}
	}
	$scope.updateDynamicForm = function(dynamicForm,needColseTab)
	{
		DynamicFormService.updateDynamicForm({dynamicForm:dynamicForm},sucesscb,errorcb);
	
		function sucesscb()
		{
			dialogs.notify('结果','修改成功!',{size:'sm'});
			window.close();
		}
		function errorcb(error)
		{
			$rootScope.openErrorDialog(error);
		}
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

	//保存设计器中设计的模板
	$scope.saveDesigner = function(data)
	{
		if($scope.dynamicForm == null)
		{
			dialogs.error("错误","请先填写表单信息，然后保存!",{size:'md'});
			return;
		}
		
		$scope.dynamicForm.dynamicFormOldHtml = data.parse_formString;
		$scope.dynamicForm.dynamicFormData = data.parse_data;
		if($scope.dynamicForm.eId > 0)
		{
			$scope.updateDynamicForm($scope.dynamicForm,false);
		}
		else
		{
			$scope.addDynamicForm($scope.dynamicForm,false);
		}
	};
	
	$scope.findDynamicFormById = function(id)
	{
		DynamicFormService.findDynamicFormById(id,sucesscb,errorcb);

		function sucesscb(data)
		{
			$scope.dynamicForm.dynamicFormOldHtml = data.dynamicFormOldHtml;
			$scope.dynamicForm.dynamicFormNewHtml = data.dynamicFormNewHtml;
			$scope.dynamicForm.totalCount  = data.totalCount;
			if($scope.operate=='add')
			{
				$scope.addDynamicForm($scope.dynamicForm);
			}else if($scope.operate=='edit')
			{
				$scope.updateDynamicForm($scope.dynamicForm);
			}
		};

		function errorcb(error)
		{
			$rootScope.openErrorDialog(error);
		};
	};

	$scope.$watch("dynamicForm.copyForm", function(newVal, oldVal) 
	{
         if(newVal!=oldVal)
         {
         	
         	if($scope.operate=="add")
         	{
	         	if(!$scope.dynamicForm.dynamicFormKey)
	         	{
	         		$scope.dynamicForm.dynamicFormKey = newVal.dynamicFormKey+"_copy";
	         	}
	         	if(!$scope.dynamicForm.dynamicFormName)
	         	{
	         		$scope.dynamicForm.dynamicFormName = newVal.dynamicFormName+"_复制";
	         	}
         	}else if($scope.operate=='edit'&&$scope.dynamicForm.copyForm.EId!=$scope.dynamicFormCopy.copyForm.EId)
         	{
         		var dlg = dialogs.confirm('复制表单','确认要复制吗？\n将会覆盖原来的表单',{size:'md'});
         		dlg.result.then(function(btn){
			
				},function(btn){
					
					$scope.dynamicForm.copyForm = $scope.dynamicFormCopy.copyForm;
				});

         	}
         }
    });

//	$scope.cancelOperate = function()
//	{
//		$rootScope.closeOperateTab();
//	}
	function refreshGrid(){
		$scope.refreshGrid("dynamicFormListGrid");
	}
	$scope.back = function() {
		$scope.turnToTab(true,"dynamicFormList","main.list.dynamicForm.dynamicFormList")
	}
}]);