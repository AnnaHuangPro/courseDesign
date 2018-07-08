		.state('main.list.scheduleTask',angularAMD.route({
			url : '/scheduleTask',
			views : {
				'@main' : angularAMD.route({
					controllerUrl : ['simple/view/scheduleTask/js/scheduleTask/ScheduleTaskService.js']
				})
			}
		}))
		.state('main.list.scheduleTask.scheduleTaskList',angularAMD.route({
             url : '/scheduleTaskList',
             onEnter: function($rootScope) { 
 				var model  = {
 					eId:'scheduleTaskList',
 					name:'计划任务管理',
 					route:'main.list.scheduleTask.scheduleTaskList'
 				}
 				$rootScope.selectModule(model);
 			},
			 views : {
                 'scheduleTaskList@main.list' : angularAMD.route({
                	 controller:'scheduleTaskListController',
 					 controllerUrl : ['simple/view/scheduleTask/js/scheduleTask/ScheduleTaskList.js'],
                     templateUrl : 'simple/view/scheduleTask/html/scheduleTask/ScheduleTaskList.html'
                 })
             }
		}))
		.state('main.list.scheduleTask.scheduleTaskAddForm',angularAMD.route({
             url : '/scheduleTaskAddForm/:operate',
             views : {
                'scheduleTaskAddForm@main.list' : angularAMD.route({
                	controller:'scheduleTaskFormController',
 					controllerUrl : ['simple/view/scheduleTask/js/scheduleTask/ScheduleTaskForm.js'],
                    templateUrl : 'simple/view/scheduleTask/html/scheduleTask/ScheduleTaskForm.html'
                })
             },
             onEnter: function($rootScope,$stateParams) {
 				var model  ={
 					eId:'scheduleTaskAddForm',
 					name:'新增计划任务',
 					route:'main.list.scheduleTask.scheduleTaskAddForm'
 				}
 				$rootScope.selectModule(model,$stateParams);
 			}
		}))
        .state('main.list.scheduleTask.scheduleTaskEditForm',angularAMD.route({
            url : '/scheduleTaskEditForm/:operate/:id',
            views : {
                'scheduleTaskEditForm@main.list' : angularAMD.route({
                	controller:'scheduleTaskFormController',
                    controllerUrl : ['simple/view/scheduleTask/js/scheduleTask/ScheduleTaskForm.js'],
                    templateUrl : 'simple/view/scheduleTask/html/scheduleTask/ScheduleTaskForm.html'
                })
            },
            onEnter: function($rootScope,$stateParams){
                var model  ={
                    eId:'scheduleTaskEditForm',
                    name:'编辑计划任务',
                    route:'main.list.scheduleTask.scheduleTaskEditForm'
                }
                $rootScope.selectModule(model,$stateParams);
            }
        }))
		.state('main.list.scheduleTask.scheduleTaskDisplay',angularAMD.route({
			url : '/scheduleTaskDisplay/:id',
            views : {
                'scheduleTaskDisplay@main.list' : angularAMD.route({
                	controller:'scheduleTaskDisplayController',
					controllerUrl : ['simple/view/scheduleTask/js/scheduleTask/ScheduleTaskDisplay.js'],
                    templateUrl : 'simple/view/scheduleTask/html/scheduleTask/ScheduleTaskDisplay.html'
                })
            }, 
			onEnter: function($rootScope,$stateParams) {
				var model  = {
					eId:'scheduleTaskDisplay',
					name:'查看计划任务',
					route:'main.list.scheduleTask.scheduleTaskDisplay'
				}
				$rootScope.selectModule(model,$stateParams);
			}
		}))