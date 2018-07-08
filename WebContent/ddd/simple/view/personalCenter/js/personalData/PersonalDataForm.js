angular.module('personalDataFormModule', [])
.controller('personalDataFormController',['$rootScope','$scope','$state','angularPermission','$stateParams','dialogs','EmployeeService','TeacherService','StudentService',
function($rootScope,$scope,$state,angularPermission,$stateParams,dialogs,EmployeeService,TeacherService,StudentService) {
	var  employeeP= angularPermission.getLoginUser().employee;
		$scope.init = function() {
			$scope.findPersonalMessageByEidAndRole();
		}
    $scope.findPersonalMessageByEidAndRole = function() {

        EmployeeService.findPersonalMessageByEidAndRole(employeeP.eId,employeeP.remark,sucessCB,errorCB);

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
		
    $scope.updateEmployee = function() {

		EmployeeService.updateEmployee($scope.employee,sucessCB,errorCB);
		function sucessCB()	{
				$rootScope.closeOperateTab();
				$state.go('main.list.personalData.personalDataDisplay');
		}
		function errorCB(error)	{
			$rootScope.openErrorDialog(error);
		}
	};

    $scope.updateTeacher = function() {

        TeacherService.updateTeacher($scope.teacher,sucessCB,errorCB);
        function sucessCB()	{
            $rootScope.closeOperateTab();
            $state.go('main.list.personalData.personalDataDisplay');
        }
        function errorCB(error)	{
            $rootScope.openErrorDialog(error);
        }
    };

    $scope.updateStudent = function() {

        StudentService.updateStudent($scope.student,sucessCB,errorCB);
        function sucessCB()	{
            $rootScope.closeOperateTab();
            $state.go('main.list.personalData.personalDataDisplay');
        }
        function errorCB(error)	{
            $rootScope.openErrorDialog(error);
        }
    };

		function refreshGrid(){
			$scope.refreshGrid("codeTableListGrid");
		}

		$scope.back = function() {
			$rootScope.closeOperateTab();
			$state.go('main.list.personalData.personalDataDisplay');
		}
	}]);
	
	
