		.state('main.list.user',angularAMD.route({
			url : '/user',
			views : {
				'@main' : angularAMD.route({
					controllerUrl : ['simple/view/user/js/user/UserService.js']
				})
			}
		}))
		.state('main.list.user.userList',angularAMD.route({
             url : '/userList',
             onEnter: function($rootScope) { 
 				var model  = {
 					eId:'userList',
 					name:'用户管理',
 					route:'main.list.user.userList'
 				}
 				$rootScope.selectModule(model);
 			},
			 views : {
                 'userList@main.list' : angularAMD.route({
                	 controller:'userListController',
 					 controllerUrl : ['simple/view/user/js/user/UserList.js'],
                     templateUrl : 'simple/view/user/html/user/UserList.html'
                 })
             }
		}))
		.state('main.list.user.userAddForm',angularAMD.route({
             url : '/userAddForm/:operate',
             views : {
                'userAddForm@main.list' : angularAMD.route({
                	controller:'userFormController',
 					controllerUrl : ['simple/view/user/js/user/UserForm.js'],
                    templateUrl : 'simple/view/user/html/user/UserForm.html'
                })
             },
             onEnter: function($rootScope,$stateParams) {
 				var model  ={
 					eId:'userAddForm',
 					name:'新增用户',
 					route:'main.list.user.userAddForm'
 				}
 				$rootScope.selectModule(model,$stateParams);
 			}
		}))
        .state('main.list.user.userEditForm',angularAMD.route({
            url : '/userEditForm/:operate/:id',
            views : {
                'userEditForm@main.list' : angularAMD.route({
                	controller:'userFormController',
                    controllerUrl : ['simple/view/user/js/user/UserForm.js'],
                    templateUrl : 'simple/view/user/html/user/UserForm.html'
                })
            },
            onEnter: function($rootScope,$stateParams){
                var model  ={
                    eId:'userEditForm',
                    name:'编辑用户',
                    route:'main.list.user.userEditForm'
                }
                $rootScope.selectModule(model,$stateParams);
            }
        }))
		.state('main.list.user.userDisplay',angularAMD.route({
			url : '/userDisplay/:id',
            views : {
                'userDisplay@main.list' : angularAMD.route({
                	controller:'userDisplayController',
					controllerUrl : ['simple/view/user/js/user/UserDisplay.js'],
                    templateUrl : 'simple/view/user/html/user/UserDisplay.html'
                })
            }, 
			onEnter: function($rootScope,$stateParams) {
				var model  = {
					eId:'userDisplay',
					name:'查看用户',
					route:'main.list.user.userDisplay'
				}
				$rootScope.selectModule(model,$stateParams);
			}
		}))