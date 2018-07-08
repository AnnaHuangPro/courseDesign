		.state('main.list.role',angularAMD.route({
			url : '/role',
			views : {
				'@main' : angularAMD.route({
					controllerUrl : ['simple/view/permission/js/role/RoleService.js']
				})
			}
		}))
		.state('main.list.role.roleList',angularAMD.route({
             url : '/roleList',
             onEnter: function($rootScope) { 
 				var model  = {
 					eId:'roleList',
 					name:'角色管理',
 					route:'main.list.role.roleList'
 				}
 				$rootScope.selectModule(model);
 			},
			 views : {
                 'roleList@main.list' : angularAMD.route({
                	 controller:'roleListController',
 					 controllerUrl : ['simple/view/permission/js/role/RoleList.js'],
                     templateUrl : 'simple/view/permission/html/role/RoleList.html'
                 })
             }
		}))
		.state('main.list.role.roleAddForm',angularAMD.route({
             url : '/roleAddForm/:operate',
             views : {
                'roleAddForm@main.list' : angularAMD.route({
                	controller:'roleFormController',
 					controllerUrl : ['simple/view/permission/js/role/RoleForm.js'],
                    templateUrl : 'simple/view/permission/html/role/RoleForm.html'
                })
             },
             onEnter: function($rootScope,$stateParams) {
 				var model  ={
 					eId:'roleAddForm',
 					name:'新增角色',
 					route:'main.list.role.roleAddForm'
 				}
 				$rootScope.selectModule(model,$stateParams);
 			}
		}))
        .state('main.list.role.roleEditForm',angularAMD.route({
            url : '/roleEditForm/:operate/:id',
            views : {
                'roleEditForm@main.list' : angularAMD.route({
                	controller:'roleFormController',
                    controllerUrl : ['simple/view/permission/js/role/RoleForm.js'],
                    templateUrl : 'simple/view/permission/html/role/RoleForm.html'
                })
            },
            onEnter: function($rootScope,$stateParams){
                var model  ={
                    eId:'roleEditForm',
                    name:'编辑角色',
                    route:'main.list.role.roleEditForm'
                }
                $rootScope.selectModule(model,$stateParams);
            }
        }))
		.state('main.list.role.roleDisplay',angularAMD.route({
			url : '/roleDisplay/:id',
            views : {
                'roleDisplay@main.list' : angularAMD.route({
                	controller:'roleDisplayController',
					controllerUrl : ['simple/view/permission/js/role/RoleDisplay.js'],
                    templateUrl : 'simple/view/permission/html/role/RoleDisplay.html'
                })
            }, 
			onEnter: function($rootScope,$stateParams) {
				var model  = {
					eId:'roleDisplay',
					name:'查看角色',
					route:'main.list.role.roleDisplay'
				}
				$rootScope.selectModule(model,$stateParams);
			}
		}))

    .state('main.list.role.assignPermissions',angularAMD.route({
        url : '/assignPermissions/:id/:name',
        views : {
            'assignPermissions@main.list' : angularAMD.route({
                templateUrl : 'simple/view/permission/html/role/AssignPermission.html',
                controllerUrl : [ 'simple/view/permission/js/permission/PermissionService.js',
				                  'simple/view/permission/js/module/ModuleService.js',
				                  'simple/view/permission/js/role/AssignPermission.js']
            })
        },
	    onEnter: function($rootScope,$stateParams){
	    	var model  ={
	    			eId:'assignPermissions',
	    			name:'分配权限点',
	    			route:'main.list.role.assignPermissions'
	    	}
	    	$rootScope.selectModule(model,$stateParams);
	    }
    }))