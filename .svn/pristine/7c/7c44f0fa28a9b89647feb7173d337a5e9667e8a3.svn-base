.controller(	"reportController",["$rootScope","$scope","$state","ModelFileService",function($rootScope, $scope,$state,ModelFileService) {
	
	function successCB(data){
		$scope.reports = data;
	}
	function errorCB(error){
		
	}
	ModelFileService.findAllModelFile(successCB,errorCB);
	$scope.go = function(key){
		$state.go('main.list.reportFormPreview.previewRoute',{modelFileKey:key});
	}
	$scope.more = function(){
		$state.go('main.list.modelFile.modelFileListRoute');
	}
}])