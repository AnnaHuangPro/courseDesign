angular.module('personalDataDisplayModule', [])
.controller('personalDataDisplayController',['$rootScope','$scope','$state','angularPermission','$stateParams','EmployeeService','dialogs','HeadPortraitService',
function($rootScope,$scope,$state,angularPermission,$stateParams,EmployeeService,dialogs,HeadPortraitService) {
	var   employee = angularPermission.getLoginUser().employee;
    $scope.logo = "simple/view/personalCenter/html/personalData/test.png";

	$scope.modifyPassword = function() {
		$state.go('main.list.personalData.modifyPasswordForm',{operate:'edit'});
	}

	$scope.modifyData = function() {
		$state.go('main.list.personalData.personalDataForm',{operate:'edit'});
	}

    $scope.findPersonalMessageByEidAndRole = function() {

        EmployeeService.findPersonalMessageByEidAndRole(employee.eId,employee.remark,sucessCB,errorCB);

        function sucessCB(data)	{
        	if(data.remark == "teacher"){
                $scope.isTeacher = true;
                $scope.teacher = data;
			}else if(data.remark == "student"){
                $scope.isStudent = true;
                $scope.student = data;
			}else{
                $scope.isEmployee = true;
                $scope.employee = data;
			}
        };

        function errorCB(error)	{
            $rootScope.openErrorDialog(error);
        }
    }

	$scope.init= function(){
		$scope.findPersonalMessageByEidAndRole();
		$scope.findHeadPortraitUrl();
	}
	$scope.findHeadPortraitUrl = function() {

	HeadPortraitService.findLogoUrl(employee.eId,sucesscb,errorcb);

	function sucesscb(data)	{
	    $scope.logoUrl = data;
	};

	function errorcb(error)	{
		console.log("获取头像失败！");
	}
	}
	
}]);