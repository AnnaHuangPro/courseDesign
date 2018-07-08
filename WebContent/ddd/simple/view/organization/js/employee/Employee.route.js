		.state('main.list.employee',angularAMD.route({
			url : '/employee',
			views : {
				'@main' : angularAMD.route({
					controllerUrl : ['simple/view/organization/js/employee/EmployeeService.js']
				})
			}
		}))
		.state('main.list.employee.employeeList',angularAMD.route({
             url : '/employeeList',
             onEnter: function($rootScope) { 
 				var model  = {
 					eId:'employeeList',
 					name:'职员管理',
 					route:'main.list.employee.employeeList'
 				}
 				$rootScope.selectModule(model);
 			},
			 views : {
                 'employeeList@main.list' : angularAMD.route({
                	 controller:'employeeListController',
 					 controllerUrl : ['simple/view/organization/js/employee/EmployeeList.js'],
                     templateUrl : 'simple/view/organization/html/employee/EmployeeList.html'
                 })
             }
		}))
		.state('main.list.employee.employeeAddForm',angularAMD.route({
             url : '/employeeAddForm/:operate',
             views : {
                'employeeAddForm@main.list' : angularAMD.route({
                	controller:'employeeFormController',
 					controllerUrl : ['simple/view/organization/js/employee/EmployeeForm.js'],
                    templateUrl : 'simple/view/organization/html/employee/EmployeeForm.html'
                })
             },
             onEnter: function($rootScope,$stateParams) {
 				var model  ={
 					eId:'employeeAddForm',
 					name:'新增职员',
 					route:'main.list.employee.employeeAddForm'
 				}
 				$rootScope.selectModule(model,$stateParams);
 			}
		}))
        .state('main.list.employee.employeeEditForm',angularAMD.route({
            url : '/employeeEditForm/:operate/:id',
            views : {
                'employeeEditForm@main.list' : angularAMD.route({
                	controller:'employeeFormController',
                    controllerUrl : ['simple/view/organization/js/employee/EmployeeForm.js'],
                    templateUrl : 'simple/view/organization/html/employee/EmployeeForm.html'
                })
            },
            onEnter: function($rootScope,$stateParams){
                var model  ={
                    eId:'employeeEditForm',
                    name:'编辑职员',
                    route:'main.list.employee.employeeEditForm'
                }
                $rootScope.selectModule(model,$stateParams);
            }
        }))
		.state('main.list.employee.employeeDisplay',angularAMD.route({
			url : '/employeeDisplay/:id',
            views : {
                'employeeDisplay@main.list' : angularAMD.route({
                	controller:'employeeDisplayController',
					controllerUrl : ['simple/view/organization/js/employee/EmployeeDisplay.js'],
                    templateUrl : 'simple/view/organization/html/employee/EmployeeDisplay.html'
                })
            }, 
			onEnter: function($rootScope,$stateParams) {
				var model  = {
					eId:'employeeDisplay',
					name:'查看职员',
					route:'main.list.employee.employeeDisplay'
				}
				$rootScope.selectModule(model,$stateParams);
			}
		}))