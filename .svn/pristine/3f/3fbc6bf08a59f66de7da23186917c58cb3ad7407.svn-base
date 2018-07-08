		.state('main.list.department',angularAMD.route({
			url : '/department',
			views : {
				'@main' : angularAMD.route({
					controllerUrl : ['simple/view/organization/js/department/DepartmentService.js']
				})
			}
		}))
		.state('main.list.department.departmentList',angularAMD.route({
             url : '/departmentList',
             onEnter: function($rootScope) { 
 				var model  = {
 					eId:'departmentList',
 					name:'部门管理',
 					route:'main.list.department.departmentList'
 				}
 				$rootScope.selectModule(model);
 			},
			 views : {
                 'departmentList@main.list' : angularAMD.route({
                	 controller:'departmentListController',
 					 controllerUrl : ['simple/view/organization/js/department/DepartmentList.js'],
                     templateUrl : 'simple/view/organization/html/department/DepartmentList.html'
                 })
             }
		}))
		.state('main.list.department.departmentAddForm',angularAMD.route({
             url : '/departmentAddForm/:operate',
             views : {
                'departmentAddForm@main.list' : angularAMD.route({
                	controller:'departmentFormController',
 					controllerUrl : ['simple/view/organization/js/department/DepartmentForm.js'],
                    templateUrl : 'simple/view/organization/html/department/DepartmentForm.html'
                })
             },
             onEnter: function($rootScope,$stateParams) {
 				var model  ={
 					eId:'departmentAddForm',
 					name:'新增部门',
 					route:'main.list.department.departmentAddForm'
 				}
 				$rootScope.selectModule(model,$stateParams);
 			}
		}))
        .state('main.list.department.departmentEditForm',angularAMD.route({
            url : '/departmentEditForm/:operate/:id',
            views : {
                'departmentEditForm@main.list' : angularAMD.route({
                	controller:'departmentFormController',
                    controllerUrl : ['simple/view/organization/js/department/DepartmentForm.js'],
                    templateUrl : 'simple/view/organization/html/department/DepartmentForm.html'
                })
            },
            onEnter: function($rootScope,$stateParams){
                var model  ={
                    eId:'departmentEditForm',
                    name:'编辑部门',
                    route:'main.list.department.departmentEditForm'
                }
                $rootScope.selectModule(model,$stateParams);
            }
        }))
		.state('main.list.department.departmentDisplay',angularAMD.route({
			url : '/departmentDisplay/:id',
            views : {
                'departmentDisplay@main.list' : angularAMD.route({
                	controller:'departmentDisplayController',
					controllerUrl : ['simple/view/organization/js/department/DepartmentDisplay.js'],
                    templateUrl : 'simple/view/organization/html/department/DepartmentDisplay.html'
                })
            }, 
			onEnter: function($rootScope,$stateParams) {
				var model  = {
					eId:'departmentDisplay',
					name:'查看部门',
					route:'main.list.department.departmentDisplay'
				}
				$rootScope.selectModule(model,$stateParams);
			}
		}))