		.state('main.list.task',angularAMD.route({
			url : '/task',
			views : {
				'@main' : angularAMD.route({
					controllerUrl : ['simple/view/task_module/js/task/TaskService.js']
				})
			}
		}))
		.state('main.list.task.taskList',angularAMD.route({
             url : '/taskList',
             onEnter: function($rootScope) { 
 				var model  = {
 					eId:'taskList',
 					name:'课题实体管理',
 					route:'main.list.task.taskList'
 				}
 				$rootScope.selectModule(model);
 			},
			 views : {
                 'taskList@main.list' : angularAMD.route({
                	 controller:'taskListController',
 					 controllerUrl : ['simple/view/task_module/js/task/TaskList.js'],
                     templateUrl : 'simple/view/task_module/html/task/TaskList.html'
                 })
             }
		}))
		.state('main.list.task.taskAddForm',angularAMD.route({
             url : '/taskAddForm/:operate',
             views : {
                'taskAddForm@main.list' : angularAMD.route({
                	controller:'taskFormController',
 					controllerUrl : ['simple/view/task_module/js/task/TaskForm.js'],
                    templateUrl : 'simple/view/task_module/html/task/TaskForm.html'
                })
             },
             onEnter: function($rootScope,$stateParams) {
 				var model  ={
 					eId:'taskAddForm',
 					name:'新增课题实体',
 					route:'main.list.task.taskAddForm'
 				}
 				$rootScope.selectModule(model,$stateParams);
 			}
		}))
        .state('main.list.task.taskEditForm',angularAMD.route({
            url : '/taskEditForm/:operate/:id',
            views : {
                'taskEditForm@main.list' : angularAMD.route({
                	controller:'taskFormController',
                    controllerUrl : ['simple/view/task_module/js/task/TaskForm.js'],
                    templateUrl : 'simple/view/task_module/html/task/TaskForm.html'
                })
            },
            onEnter: function($rootScope,$stateParams){
                var model  ={
                    eId:'taskEditForm',
                    name:'编辑课题实体',
                    route:'main.list.task.taskEditForm'
                }
                $rootScope.selectModule(model,$stateParams);
            }
        }))
		.state('main.list.task.taskDisplay',angularAMD.route({
			url : '/taskDisplay/:id',
            views : {
                'taskDisplay@main.list' : angularAMD.route({
                	controller:'taskDisplayController',
					controllerUrl : ['simple/view/task_module/js/task/TaskDisplay.js'],
                    templateUrl : 'simple/view/task_module/html/task/TaskDisplay.html'
                })
            }, 
			onEnter: function($rootScope,$stateParams) {
				var model  = {
					eId:'taskDisplay',
					name:'查看课题实体',
					route:'main.list.task.taskDisplay'
				}
				$rootScope.selectModule(model,$stateParams);
			}
		}))