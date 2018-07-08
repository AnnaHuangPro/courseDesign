		.state('main.list.stuCourseProgress',angularAMD.route({
			url : '/stuCourseProgress',
			views : {
				'@main' : angularAMD.route({
					controllerUrl : ['simple/view/courseDesign/js/stuCourseProgress/StuCourseProgressService.js']
				})
			}
		}))
		.state('main.list.stuCourseProgress.stuCourseProgressList',angularAMD.route({
             url : '/stuCourseProgressList',
             onEnter: function($rootScope) { 
 				var model  = {
 					eId:'stuCourseProgressList',
 					name:'课程设计进度表管理',
 					route:'main.list.stuCourseProgress.stuCourseProgressList'
 				}
 				$rootScope.selectModule(model);
 			},
			 views : {
                 'stuCourseProgressList@main.list' : angularAMD.route({
                	 controller:'stuCourseProgressListController',
 					 controllerUrl : ['simple/view/courseDesign/js/stuCourseProgress/StuCourseProgressList.js'],
                     templateUrl : 'simple/view/courseDesign/html/stuCourseProgress/StuCourseProgressList.html'
                 })
             }
		}))
		.state('main.list.stuCourseProgress.stuCourseProgressAddForm',angularAMD.route({
             url : '/stuCourseProgressAddForm/:operate',
             views : {
                'stuCourseProgressAddForm@main.list' : angularAMD.route({
                	controller:'stuCourseProgressFormController',
 					controllerUrl : ['simple/view/courseDesign/js/stuCourseProgress/StuCourseProgressForm.js'],
                    templateUrl : 'simple/view/courseDesign/html/stuCourseProgress/StuCourseProgressForm.html'
                })
             },
             onEnter: function($rootScope,$stateParams) {
 				var model  ={
 					eId:'stuCourseProgressAddForm',
 					name:'新增课程设计进度表',
 					route:'main.list.stuCourseProgress.stuCourseProgressAddForm'
 				}
 				$rootScope.selectModule(model,$stateParams);
 			}
		}))
        .state('main.list.stuCourseProgress.stuCourseProgressEditForm',angularAMD.route({
            url : '/stuCourseProgressEditForm/:operate/:id',
            views : {
                'stuCourseProgressEditForm@main.list' : angularAMD.route({
                	controller:'stuCourseProgressFormController',
                    controllerUrl : ['simple/view/courseDesign/js/stuCourseProgress/StuCourseProgressForm.js'],
                    templateUrl : 'simple/view/courseDesign/html/stuCourseProgress/StuCourseProgressForm.html'
                })
            },
            onEnter: function($rootScope,$stateParams){
                var model  ={
                    eId:'stuCourseProgressEditForm',
                    name:'编辑课程设计进度表',
                    route:'main.list.stuCourseProgress.stuCourseProgressEditForm'
                }
                $rootScope.selectModule(model,$stateParams);
            }
        }))
		.state('main.list.stuCourseProgress.stuCourseProgressDisplay',angularAMD.route({
			url : '/stuCourseProgressDisplay/:id',
            views : {
                'stuCourseProgressDisplay@main.list' : angularAMD.route({
                	controller:'stuCourseProgressDisplayController',
					controllerUrl : ['simple/view/courseDesign/js/stuCourseProgress/StuCourseProgressDisplay.js'],
                    templateUrl : 'simple/view/courseDesign/html/stuCourseProgress/StuCourseProgressDisplay.html'
                })
            }, 
			onEnter: function($rootScope,$stateParams) {
				var model  = {
					eId:'stuCourseProgressDisplay',
					name:'查看课程设计进度表',
					route:'main.list.stuCourseProgress.stuCourseProgressDisplay'
				}
				$rootScope.selectModule(model,$stateParams);
			}
		}))
		.state('main.list.stuCourseProgress.stuChooseCourseList',angularAMD.route({
             url : '/stuChooseCourseList',
             onEnter: function($rootScope) { 
 				var model  = {
 					eId:'stuChooseCourseList',
 					name:'学生课程设计选题',
 					route:'main.list.stuCourseProgress.stuChooseCourseList'
 				}
 				$rootScope.selectModule(model);
 			},
			 views : {
                 'stuChooseCourseList@main.list' : angularAMD.route({
                	 controller:'stuChooseCourseListController',
 					 controllerUrl : ['simple/view/courseDesign/js/stuCourseProgress/stuChooseCourseList.js'],
                     templateUrl : 'simple/view/courseDesign/html/stuCourseProgress/stuChooseCourseList.html'
                 })
             }
		}))