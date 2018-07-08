		.state('main.list.taskManage',angularAMD.route({
			url : '/taskManage',
			views : {
				'@main' : angularAMD.route({
					controllerUrl : ['simple/view/taskManageModel/js/taskManage/TaskManageService.js']
				})
			}
		}))
		.state('main.list.taskManage.taskManageList',angularAMD.route({
             url : '/taskManageList',
             onEnter: function($rootScope) { 
 				var model  = {
 					eId:'taskManageList',
 					name:'任务管理管理',
 					route:'main.list.taskManage.taskManageList'
 				}
 				$rootScope.selectModule(model);
 			},
			 views : {
                 'taskManageList@main.list' : angularAMD.route({
                	 controller:'taskManageListController',
 					 controllerUrl : ['simple/view/taskManageModel/js/taskManage/TaskManageList.js'],
                     templateUrl : 'simple/view/taskManageModel/html/taskManage/TaskManageList.html'
                 })
             }
		}))
		.state('main.list.taskManage.taskManageAddForm',angularAMD.route({
             url : '/taskManageAddForm/:operate',
             views : {
                'taskManageAddForm@main.list' : angularAMD.route({
                	controller:'taskManageFormController',
 					controllerUrl : ['simple/view/taskManageModel/js/taskManage/TaskManageForm.js'],
                    templateUrl : 'simple/view/taskManageModel/html/taskManage/TaskManageForm.html'
                })
             },
             onEnter: function($rootScope,$stateParams) {
 				var model  ={
 					eId:'taskManageAddForm',
 					name:'新增任务管理',
 					route:'main.list.taskManage.taskManageAddForm'
 				}
 				$rootScope.selectModule(model,$stateParams);
 			}
		}))
        .state('main.list.taskManage.taskManageEditForm',angularAMD.route({
            url : '/taskManageEditForm/:operate/:id',
            views : {
                'taskManageEditForm@main.list' : angularAMD.route({
                	controller:'taskManageFormController',
                    controllerUrl : ['simple/view/taskManageModel/js/taskManage/TaskManageForm.js'],
                    templateUrl : 'simple/view/taskManageModel/html/taskManage/TaskManageForm.html'
                })
            },
            onEnter: function($rootScope,$stateParams){
                var model  ={
                    eId:'taskManageEditForm',
                    name:'编辑任务管理',
                    route:'main.list.taskManage.taskManageEditForm'
                }
                $rootScope.selectModule(model,$stateParams);
            }
        }))
		.state('main.list.taskManage.taskManageDisplay',angularAMD.route({
			url : '/taskManageDisplay/:id',
            views : {
                'taskManageDisplay@main.list' : angularAMD.route({
                	controller:'taskManageDisplayController',
					controllerUrl : ['simple/view/taskManageModel/js/taskManage/TaskManageDisplay.js'],
                    templateUrl : 'simple/view/taskManageModel/html/taskManage/TaskManageDisplay.html'
                })
            }, 
			onEnter: function($rootScope,$stateParams) {
				var model  = {
					eId:'taskManageDisplay',
					name:'查看任务管理',
					route:'main.list.taskManage.taskManageDisplay'
				}
				$rootScope.selectModule(model,$stateParams);
			}
		}))