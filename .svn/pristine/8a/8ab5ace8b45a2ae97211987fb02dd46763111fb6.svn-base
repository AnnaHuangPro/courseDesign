angular.module('modelFileModule', [])
.controller('modelFileFormController',['$rootScope','$scope','ModelFileService','$state','angularPermission','$stateParams',
function($rootScope,$scope,ModelFileService,$state,angularPermission,$stateParams){
	$scope.showSaveAndAddButton = $stateParams.operate == 'add' ?true:false;
	$scope.operate = $stateParams.operate;
	$scope.id = $stateParams.id;

	$scope.getInitModelFileData = function()
	{
		if($stateParams.operate=='edit')
		{
			$scope.getModelFileDetail();
		}else {
			$scope.modelFile = {}
			$scope.modelFile.withChart = '否'
		}
	}
	
	$scope.getModelFileDetail = function()
	{
		ModelFileService.findModelFileById($scope.id,sucesscb,errorcb);

		function sucesscb(data)
		{
			$scope.modelFile = data;
//			$scope.modelFile.withChart = $scope.modelFile.withChart ? '是':'否'
		};

		function errorcb(error)
		{
			$rootScope.openErrorDialog(error);
		};
	};
	
	$scope.saveModelFile = function(modelFile)
	{
//		$scope.modelFile.withChart = $scope.modelFile.withChart === '是' ? true:false
		if($scope.operate=='add')
		{
			$scope.addModelFile(modelFile,true);
		}
		else if($scope.operate=='edit')
		{
			$scope.updateModelFile(modelFile);
		}
	}
	
	$scope.saveAndAddModelFile = function(modelFile)
	{
		if(modelFile.isDefaultExpName){
			modelFile.isDefaultExpName = (modelFile.isDefaultExpName).toString();
		}
		$scope.addModelFile(modelFile,false);
	}	
	$scope.addModelFile = function(modelFile,needColseTab)
	{   
		//新增时
		var uploadController = $rootScope.getController("modelfileUpload","dfileupload");
		uploadController.uploadAllFileInterface().then(function(data){
			//上传文件成功
			//为实体设置自动生成的编码
			if(data != ""){
				modelFile.attachmentCode = data;
			}
			
			ModelFileService.saveModelFile({modelFile:modelFile},sucesscb,errorcb);
			function sucesscb(data)
			{
				if(needColseTab){
					$rootScope.closeOperateTab();
					$state.go('main.list.modelFile.modelFileList');
				}
				else{
					$scope.modelFile=null;
				}
				$scope.refreshGrid();
			}
			function errorcb(error)
			{
				$rootScope.openErrorDialog(error);
			}
		},function(data){
			//上传文件失败
			alert(data);
		});
		
	}
	$scope.updateModelFile = function(modelFile)
	{
		
		var uploadController = $rootScope.getController("modelfileUpload","dfileupload");
		uploadController.uploadAllFileInterface(modelFile.attachmentCode).then(function(data){
			//上传文件成功
			ModelFileService.updateModelFile({modelFile:modelFile},sucesscb,errorcb);
			function sucesscb()
			{
				$rootScope.closeOperateTab();
				$state.go('main.list.modelFile.modelFileList');
				$scope.refreshGrid();
			}
			function errorcb(error)
			{
				$rootScope.openErrorDialog(error);
			}
		},function(data){
			//上传文件失败
			alert(data);
		});
	};
	
	$scope.refreshGrid = function(){
		var controller = $rootScope.getController('modelFileListGrid' , 'ddatagrid');
		if(controller){
			controller.refreshCurrent();
		}
	}
}]);