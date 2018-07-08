		.state('main.list.courseDesignProgress',angularAMD.route({
			url : '/courseDesignProgress',
			views : {
				'@main' : angularAMD.route({
					controllerUrl : ['simple/view/courseDesign/js/courseDesignProgress/CourseDesignProgressService.js']
				})
			}
		}))
		.state('main.list.courseDesignProgress.courseDesignProgressList',angularAMD.route({
             url : '/courseDesignProgressList',
             onEnter: function($rootScope) { 
 				var model  = {
 					eId:'courseDesignProgressList',
 					name:'课程设计进度表管理',
 					route:'main.list.courseDesignProgress.courseDesignProgressList'
 				}
 				$rootScope.selectModule(model);
 			},
			 views : {
                 'courseDesignProgressList@main.list' : angularAMD.route({
                	 controller:'courseDesignProgressListController',
 					 controllerUrl : ['simple/view/courseDesign/js/courseDesignProgress/CourseDesignProgressList.js'],
                     templateUrl : 'simple/view/courseDesign/html/courseDesignProgress/CourseDesignProgressList.html'
                 })
             }
		}))
		.state('main.list.courseDesignProgress.courseDesignProgressAddForm',angularAMD.route({
             url : '/courseDesignProgressAddForm/:operate',
             views : {
                'courseDesignProgressAddForm@main.list' : angularAMD.route({
                	controller:'courseDesignProgressFormController',
 					controllerUrl : ['simple/view/courseDesign/js/courseDesignProgress/CourseDesignProgressForm.js'],
                    templateUrl : 'simple/view/courseDesign/html/courseDesignProgress/CourseDesignProgressForm.html'
                })
             },
             onEnter: function($rootScope,$stateParams) {
 				var model  ={
 					eId:'courseDesignProgressAddForm',
 					name:'新增课程设计进度表',
 					route:'main.list.courseDesignProgress.courseDesignProgressAddForm'
 				}
 				$rootScope.selectModule(model,$stateParams);
 			}
		}))
        .state('main.list.courseDesignProgress.courseDesignProgressEditForm',angularAMD.route({
            url : '/courseDesignProgressEditForm/:operate/:id',
            views : {
                'courseDesignProgressEditForm@main.list' : angularAMD.route({
                	controller:'courseDesignProgressFormController',
                    controllerUrl : ['simple/view/courseDesign/js/courseDesignProgress/CourseDesignProgressForm.js'],
                    templateUrl : 'simple/view/courseDesign/html/courseDesignProgress/CourseDesignProgressForm.html'
                })
            },
            onEnter: function($rootScope,$stateParams){
                var model  ={
                    eId:'courseDesignProgressEditForm',
                    name:'编辑课程设计进度表',
                    route:'main.list.courseDesignProgress.courseDesignProgressEditForm'
                }
                $rootScope.selectModule(model,$stateParams);
            }
        }))
		.state('main.list.courseDesignProgress.courseDesignProgressDisplay',angularAMD.route({
			url : '/courseDesignProgressDisplay/:id',
            views : {
                'courseDesignProgressDisplay@main.list' : angularAMD.route({
                	controller:'courseDesignProgressDisplayController',
					controllerUrl : ['simple/view/courseDesign/js/courseDesignProgress/CourseDesignProgressDisplay.js'],
                    templateUrl : 'simple/view/courseDesign/html/courseDesignProgress/CourseDesignProgressDisplay.html'
                })
            }, 
			onEnter: function($rootScope,$stateParams) {
				var model  = {
					eId:'courseDesignProgressDisplay',
					name:'查看课程设计进度表',
					route:'main.list.courseDesignProgress.courseDesignProgressDisplay'
				}
				$rootScope.selectModule(model,$stateParams);
			}
		}))