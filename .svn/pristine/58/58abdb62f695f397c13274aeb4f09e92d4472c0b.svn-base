		.state('main.list.operator',angularAMD.route({
			url : '/operator',
			views : {
				'@main' : angularAMD.route({
					controllerUrl : ['simple/view/permission/js/operator/OperatorService.js']
				})
			}
		}))
		.state('main.list.operator.operatorList',angularAMD.route({
             url : '/operatorList',
             onEnter: function($rootScope) { 
 				var model  = {
 					eId:'operatorList',
 					name:'操作员管理',
 					route:'main.list.operator.operatorList'
 				}
 				$rootScope.selectModule(model);
 			},
			 views : {
                 'operatorList@main.list' : angularAMD.route({
                	 controller:'operatorListController',
 					 controllerUrl : ['simple/view/permission/js/operator/OperatorList.js'],
                     templateUrl : 'simple/view/permission/html/operator/OperatorList.html'
                 })
             }
		}))
		.state('main.list.operator.operatorAddForm',angularAMD.route({
             url : '/operatorAddForm/:operate',
             views : {
                'operatorAddForm@main.list' : angularAMD.route({
                	controller:'operatorFormController',
 					controllerUrl : ['simple/view/permission/js/operator/OperatorForm.js'],
                    templateUrl : 'simple/view/permission/html/operator/OperatorForm.html'
                })
             },
             onEnter: function($rootScope,$stateParams) {
 				var model  ={
 					eId:'operatorAddForm',
 					name:'新增操作员',
 					route:'main.list.operator.operatorAddForm'
 				}
 				$rootScope.selectModule(model,$stateParams);
 			}
		}))
        .state('main.list.operator.operatorEditForm',angularAMD.route({
            url : '/operatorEditForm/:operate/:id',
            views : {
                'operatorEditForm@main.list' : angularAMD.route({
                	controller:'operatorFormController',
                    controllerUrl : ['simple/view/permission/js/operator/OperatorForm.js'],
                    templateUrl : 'simple/view/permission/html/operator/OperatorForm.html'
                })
            },
            onEnter: function($rootScope,$stateParams){
                var model  ={
                    eId:'operatorEditForm',
                    name:'编辑操作员',
                    route:'main.list.operator.operatorEditForm'
                }
                $rootScope.selectModule(model,$stateParams);
            }
        }))
		.state('main.list.operator.operatorDisplay',angularAMD.route({
			url : '/operatorDisplay/:id',
            views : {
                'operatorDisplay@main.list' : angularAMD.route({
                	controller:'operatorDisplayController',
					controllerUrl : ['simple/view/permission/js/operator/OperatorDisplay.js'],
                    templateUrl : 'simple/view/permission/html/operator/OperatorDisplay.html'
                })
            }, 
			onEnter: function($rootScope,$stateParams) {
				var model  = {
					eId:'operatorDisplay',
					name:'查看操作员',
					route:'main.list.operator.operatorDisplay'
				}
				$rootScope.selectModule(model,$stateParams);
			}
		}))
    .state('main.list.operator.assignRoles',angularAMD.route({
        url : '/assignRoles/:id/:name',
        views : {
            'assignRoles@main.list' : angularAMD.route({
                templateUrl : 'simple/view/permission/html/operator/AssignRole.html',
                controllerUrl : ['simple/view/organization/js/organization/OrganizationService.js',
				                 'simple/view/permission/js/role/RoleService.js',
				                 'simple/view/permission/js/operator/AssignRole.js']
            })
        },
        onEnter: function($rootScope,$stateParams){
            var model  ={
                eId:'assignRoles',
                name:'分配角色',
                route:'main.list.operator.assignRoles'
            }
            $rootScope.selectModule(model,$stateParams);
        }
    }))