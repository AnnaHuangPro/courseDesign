  define(["app"], function (app) 
{
	app.factory("ImportService", ['ExportAndImportService','$rootScope','asynchroMarkService','AttachmentService','dialogs',function(ExportAndImportService,$rootScope,asynchroMarkService,AttachmentService,dialogs)
	{
		var importService = {
				import:function(importConfigKey,gridName){
					if(importConfigKey == undefined || gridName == undefined){
						dialogs.error("错误","参数错误");
						return;
					}
					
					var importConfig={
							importConfigKey:importConfigKey,
							eId:null
					}
					var  dlg = dialogs.create('simple/view/importConfigs/html/importConfigs/template.html','importDialogCtrl',{importConfig:importConfig},{keyboard: true,backdrop: false});
					dlg.result.then(function(importConfig){
						function sucesscb(data){
							asynchroMarkService.unmask();
							$rootScope.getController(gridName,'ddatagrid').refreshCurrent();
						}
						function errorcb(error){
							asynchroMarkService.unmask();
						}
						
						asynchroMarkService.mask("导入中，请稍后...");
						ExportAndImportService.importDataFile(importConfig.importConfigKey,importConfig.eId,sucesscb,errorcb);
						
					},function(){
						//取消
					});
				}
		};
	
		return importService;
	}])
	app.controller('importDialogCtrl',function($scope,$uibModalInstance,data){
		 $scope.importConfig=data.importConfig;
		
		 $scope.cancel = function(){
		    $uibModalInstance.dismiss('Canceled');
		 }
		 
		 $scope.sure=function(){
			 $uibModalInstance.close($scope.importConfig);
		 }
	})
});
