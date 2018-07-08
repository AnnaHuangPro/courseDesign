.state("main.list.workflow",angularAMD.route({
		url : '/workflow',
		views : {
			"@main" : angularAMD.route({
				controllerUrl : [
				                 'simple/view/workflow/js/task/TaskService.js',
				                 'simple/view/workflow/asset/base.js',
				                 'simple/view/model/js/model/ModelService.js',
				                 'simple/view/model/js/modelData/ModelDataService.js'
					                 ]
			})
		}
	}))
	/** 任务列表 */
	/* 我的任务 */
	.state('main.list.workflow.submitedTask',angularAMD.route({
       url : '/submitedTask/:taskType/:name',
       views : {
           'submitedTask@main.list' : angularAMD.route({
            templateUrl:'simple/view/workflow/html/task/TaskList.html',
			controllerUrl : [
			                 'simple/view/workflow/js/task/TaskList.js']
            })
        },
        onEnter: function($rootScope,$stateParams){
            var model  ={
                eId:'submitedTask',
                name:$stateParams.name,		
                route:'main.list.workflow.submitedTask'
            }
            $rootScope.selectModule(model,$stateParams);
        }
    }))
	
	//待办任务
    .state('main.list.workflow.nonHandleTaskList',angularAMD.route({
       url : '/nonHandleTaskList/:taskType/:name',
       views : {
           'nonHandleTaskList@main.list' : angularAMD.route({
            templateUrl:'simple/view/workflow/html/task/TaskList.html',
			controllerUrl : [
			                 'simple/view/workflow/js/task/TaskList.js']
            })
        },
        onEnter: function($rootScope,$stateParams){
            var model  ={
                eId:'nonHandleTaskList',
                name:$stateParams.name,		
                route:'main.list.workflow.nonHandleTaskList'
            }
            $rootScope.selectModule(model,$stateParams);
        }
    }))
    //已办任务
    .state('main.list.workflow.operatedTaskList',angularAMD.route({
       url : '/operatedTaskList/:taskType/:name',
       views : {
           'operatedTaskList@main.list' : angularAMD.route({
            templateUrl:'simple/view/workflow/html/task/TaskList.html',
			controllerUrl : [
			                 'simple/view/workflow/js/task/TaskList.js']
            })
        },
        onEnter: function($rootScope,$stateParams){
            var model  ={
                eId:'operatedTaskList',
                name:$stateParams.name,		
                route:'main.list.workflow.operatedTaskList'
            }
            $rootScope.selectModule(model,$stateParams);
        }
    }))
    //已完成任务
    .state('main.list.workflow.completedTaskList',angularAMD.route({
       url : '/completedTaskList/:taskType/:name',
       views : {
           'completedTaskList@main.list' : angularAMD.route({
            templateUrl:'simple/view/workflow/html/task/TaskList.html',
			controllerUrl : [
			                 'simple/view/workflow/js/task/TaskList.js']
            })
        },
        onEnter: function($rootScope,$stateParams){
            var model  ={
                eId:'completedTaskList',
                name:$stateParams.name,		
                route:'main.list.workflow.completedTaskList'
            }
            $rootScope.selectModule(model,$stateParams);
        }
    }))
    
    //任务详情
       .state('main.list.workflow.taskForm',angularAMD.route({
        url : '/taskForm/:taskId/:taskType/:name/:preCheckResult/:reApply/:formId',
        views : {
            'taskForm@main.list' : angularAMD.route({
            	templateUrl:'simple/view/workflow/html/task/TaskForm.html',
				controllerUrl : ['simple/view/workflow/js/task/TaskForm.js',
				                 "simple/view/systemConfig/js/systemConfig/SystemConfigService.js"
				                 ]
            	})
        	},
        	onEnter: function($rootScope,$stateParams){
                var model  ={
                    eId:'taskForm',
                    name:$stateParams.name + "详情",
                    route:'main.list.workflow.taskForm'
                }
                $rootScope.selectModule(model,$stateParams);
            }
       }))
       //流程历史
       .state('main.list.workflow.processHistory',angularAMD.route({
        url :'/processHistory/:taskId/:processInstanceId/:taskType/:name',
        views : {
            'processHistory@main.list' : angularAMD.route({
            	templateUrl:'simple/view/workflow/html/task/ProcessHistory.html',
				controllerUrl : ['simple/view/workflow/js/task/ProcessHistory.js']
            	})
        	},
        	onEnter: function($rootScope,$stateParams){
                var model  ={
                    eId:'processHistory',
                    name:"流程历史",
                    route:'main.list.workflow.processHistory'
                }
                $rootScope.selectModule(model,$stateParams);
            }
       })) 
       
        //数据提交后查看审批历史
       .state('main.list.workflow.dataProcessHistory',angularAMD.route({
        url :'/dataProcessHistory/:processInstanceId/:formKey/:formId',
        views : {
            'dataProcessHistory@main.list' : angularAMD.route({
            	templateUrl:'simple/view/workflow/html/task/dataHistory/DataProcessHistory.html',
				controllerUrl : ['simple/view/workflow/js/task/dataHistory/DataProcessHistory.js']
            	})
        	},
        	onEnter: function($rootScope,$stateParams){
                var model  ={
                    eId:'dataProcessHistory',
                    name:"审批历史",
                    route:'main.list.workflow.dataProcessHistory'
                }
                $rootScope.selectModule(model,$stateParams);
            }
       })) 