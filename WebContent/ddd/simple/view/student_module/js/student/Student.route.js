		.state('main.list.student',angularAMD.route({
			url : '/student',
			views : {
				'@main' : angularAMD.route({
					controllerUrl : ['simple/view/student_module/js/student/StudentService.js']
				})
			}
		}))
		.state('main.list.student.studentList',angularAMD.route({
             url : '/studentList',
             onEnter: function($rootScope) { 
 				var model  = {
 					eId:'studentList',
 					name:'学生实体管理',
 					route:'main.list.student.studentList'
 				}
 				$rootScope.selectModule(model);
 			},
			 views : {
                 'studentList@main.list' : angularAMD.route({
                	 controller:'studentListController',
 					 controllerUrl : ['simple/view/student_module/js/student/StudentList.js'],
                     templateUrl : 'simple/view/student_module/html/student/StudentList.html'
                 })
             }
		}))
		.state('main.list.student.studentAddForm',angularAMD.route({
             url : '/studentAddForm/:operate',
             views : {
                'studentAddForm@main.list' : angularAMD.route({
                	controller:'studentFormController',
 					controllerUrl : ['simple/view/student_module/js/student/StudentForm.js'],
                    templateUrl : 'simple/view/student_module/html/student/StudentForm.html'
                })
             },
             onEnter: function($rootScope,$stateParams) {
 				var model  ={
 					eId:'studentAddForm',
 					name:'新增学生实体',
 					route:'main.list.student.studentAddForm'
 				}
 				$rootScope.selectModule(model,$stateParams);
 			}
		}))
        .state('main.list.student.studentEditForm',angularAMD.route({
            url : '/studentEditForm/:operate/:id',
            views : {
                'studentEditForm@main.list' : angularAMD.route({
                	controller:'studentFormController',
                    controllerUrl : ['simple/view/student_module/js/student/StudentForm.js'],
                    templateUrl : 'simple/view/student_module/html/student/StudentForm.html'
                })
            },
            onEnter: function($rootScope,$stateParams){
                var model  ={
                    eId:'studentEditForm',
                    name:'编辑学生实体',
                    route:'main.list.student.studentEditForm'
                }
                $rootScope.selectModule(model,$stateParams);
            }
        }))
		.state('main.list.student.studentDisplay',angularAMD.route({
			url : '/studentDisplay/:id',
            views : {
                'studentDisplay@main.list' : angularAMD.route({
                	controller:'studentDisplayController',
					controllerUrl : ['simple/view/student_module/js/student/StudentDisplay.js'],
                    templateUrl : 'simple/view/student_module/html/student/StudentDisplay.html'
                })
            }, 
			onEnter: function($rootScope,$stateParams) {
				var model  = {
					eId:'studentDisplay',
					name:'查看学生实体',
					route:'main.list.student.studentDisplay'
				}
				$rootScope.selectModule(model,$stateParams);
			}
		}))