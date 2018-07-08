angular.module('browerErrorPageModel',[])
.controller('browerErrorPageController',['$scope','ModelFileService',function($scope,ModelFileService)
{
	$scope.dowloadChrome = function(){
		
		var success = function(data){
			window.location.href = "../DownLoadServlet?attachmentId="+ data;
		}
		var error = function(error){
			alert(error);
		}
		ModelFileService.findModelFileAttachmentsId("chrome",success,error);
	}
}]);