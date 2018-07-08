		.state('main.list.teacher',angularAMD.route({
			url : '/teacher',
			views : {
				'@main' : angularAMD.route({
					controllerUrl : ['simple/view/teacher_module/js/teacher/TeacherService.js']
				})
			}
		}))
		.state('main.list.teacher.teacherList',angularAMD.route({
             url : '/teacherList',
             onEnter: function($rootScope) { 
 				var model  = {
 					eId:'teacherList',
 					name:'教师实体管理',
 					route:'main.list.teacher.teacherList'
 				}
 				$rootScope.selectModule(model);
 			},
			 views : {
                 'teacherList@main.list' : angularAMD.route({
                	 controller:'teacherListController',
 					 controllerUrl : ['simple/view/teacher_module/js/teacher/TeacherList.js'],
                     templateUrl : 'simple/view/teacher_module/html/teacher/TeacherList.html'
                 })
             }
		}))
		.state('main.list.teacher.teacherAddForm',angularAMD.route({
             url : '/teacherAddForm/:operate',
             views : {
                'teacherAddForm@main.list' : angularAMD.route({
                	controller:'teacherFormController',
 					controllerUrl : ['simple/view/teacher_module/js/teacher/TeacherForm.js'],
                    templateUrl : 'simple/view/teacher_module/html/teacher/TeacherForm.html'
                })
             },
             onEnter: function($rootScope,$stateParams) {
 				var model  ={
 					eId:'teacherAddForm',
 					name:'新增教师实体',
 					route:'main.list.teacher.teacherAddForm'
 				}
 				$rootScope.selectModule(model,$stateParams);
 			}
		}))
        .state('main.list.teacher.teacherEditForm',angularAMD.route({
            url : '/teacherEditForm/:operate/:id',
            views : {
                'teacherEditForm@main.list' : angularAMD.route({
                	controller:'teacherFormController',
                    controllerUrl : ['simple/view/teacher_module/js/teacher/TeacherForm.js'],
                    templateUrl : 'simple/view/teacher_module/html/teacher/TeacherForm.html'
                })
            },
            onEnter: function($rootScope,$stateParams){
                var model  ={
                    eId:'teacherEditForm',
                    name:'编辑教师实体',
                    route:'main.list.teacher.teacherEditForm'
                }
                $rootScope.selectModule(model,$stateParams);
            }
        }))
		.state('main.list.teacher.teacherDisplay',angularAMD.route({
			url : '/teacherDisplay/:id',
            views : {
                'teacherDisplay@main.list' : angularAMD.route({
                	controller:'teacherDisplayController',
					controllerUrl : ['simple/view/teacher_module/js/teacher/TeacherDisplay.js'],
                    templateUrl : 'simple/view/teacher_module/html/teacher/TeacherDisplay.html'
                })
            }, 
			onEnter: function($rootScope,$stateParams) {
				var model  = {
					eId:'teacherDisplay',
					name:'查看教师实体',
					route:'main.list.teacher.teacherDisplay'
				}
				$rootScope.selectModule(model,$stateParams);
			}
		}))