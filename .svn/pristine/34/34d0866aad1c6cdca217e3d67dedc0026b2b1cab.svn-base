		.state('main.list.permission',angularAMD.route({
			url : '/permission',
			views : {
				'@main' : angularAMD.route({
					controllerUrl : ['simple/view/permission/js/permission/PermissionService.js']
				})
			}
		}))
		.state('main.list.permission.permissionList',angularAMD.route({
             url : '/permissionList',
             onEnter: function($rootScope) { 
 				var model  = {
 					eId:'permissionList',
 					name:'权限管理',
 					route:'main.list.permission.permissionList'
 				}
 				$rootScope.selectModule(model);
 			},
			 views : {
                 'permissionList@main.list' : angularAMD.route({
                	 controller:'permissionListController',
 					 controllerUrl : ['simple/view/permission/js/permission/PermissionList.js'],
                     templateUrl : 'simple/view/permission/html/permission/PermissionList.html'
                 })
             }
		}))
		.state('main.list.permission.permissionAddForm',angularAMD.route({
             url : '/permissionAddForm/:operate',
             views : {
                'permissionAddForm@main.list' : angularAMD.route({
                	controller:'permissionFormController',
 					controllerUrl : ['simple/view/permission/js/permission/PermissionForm.js'],
                    templateUrl : 'simple/view/permission/html/permission/PermissionForm.html'
                })
             },
             onEnter: function($rootScope,$stateParams) {
 				var model  ={
 					eId:'permissionAddForm',
 					name:'新增权限',
 					route:'main.list.permission.permissionAddForm'
 				}
 				$rootScope.selectModule(model,$stateParams);
 			}
		}))
        .state('main.list.permission.permissionEditForm',angularAMD.route({
            url : '/permissionEditForm/:operate/:id',
            views : {
                'permissionEditForm@main.list' : angularAMD.route({
                	controller:'permissionFormController',
                    controllerUrl : ['simple/view/permission/js/permission/PermissionForm.js'],
                    templateUrl : 'simple/view/permission/html/permission/PermissionForm.html'
                })
            },
            onEnter: function($rootScope,$stateParams){
                var model  ={
                    eId:'permissionEditForm',
                    name:'编辑权限',
                    route:'main.list.permission.permissionEditForm'
                }
                $rootScope.selectModule(model,$stateParams);
            }
        }))
		.state('main.list.permission.permissionDisplay',angularAMD.route({
			url : '/permissionDisplay/:id',
            views : {
                'permissionDisplay@main.list' : angularAMD.route({
                	controller:'permissionDisplayController',
					controllerUrl : ['simple/view/permission/js/permission/PermissionDisplay.js'],
                    templateUrl : 'simple/view/permission/html/permission/PermissionDisplay.html'
                })
            }, 
			onEnter: function($rootScope,$stateParams) {
				var model  = {
					eId:'permissionDisplay',
					name:'查看权限',
					route:'main.list.permission.permissionDisplay'
				}
				$rootScope.selectModule(model,$stateParams);
			}
		}))