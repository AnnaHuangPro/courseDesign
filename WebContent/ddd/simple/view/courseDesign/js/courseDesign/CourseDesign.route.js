		.state('main.list.courseDesign',angularAMD.route({
			url : '/courseDesign',
			views : {
				'@main' : angularAMD.route({
					controllerUrl : ['simple/view/courseDesign/js/courseDesign/CourseDesignService.js']
				})
			}
		}))
		.state('main.list.courseDesign.courseDesignList',angularAMD.route({
             url : '/courseDesignList',
             onEnter: function($rootScope) { 
 				var model  = {
 					eId:'courseDesignList',
 					name:'课程设计管理',
 					route:'main.list.courseDesign.courseDesignList'
 				}
 				$rootScope.selectModule(model);
 			},
			 views : {
                 'courseDesignList@main.list' : angularAMD.route({
                	 controller:'courseDesignListController',
 					 controllerUrl : ['simple/view/courseDesign/js/courseDesign/CourseDesignList.js'],
                     templateUrl : 'simple/view/courseDesign/html/courseDesign/CourseDesignList.html'
                 })
             }
		}))
		.state('main.list.courseDesign.courseDesignAddForm',angularAMD.route({
             url : '/courseDesignAddForm/:operate',
             views : {
                'courseDesignAddForm@main.list' : angularAMD.route({
                	controller:'courseDesignFormController',
 					controllerUrl : ['simple/view/courseDesign/js/courseDesign/CourseDesignForm.js'],
                    templateUrl : 'simple/view/courseDesign/html/courseDesign/CourseDesignForm.html'
                })
             },
             onEnter: function($rootScope,$stateParams) {
 				var model  ={
 					eId:'courseDesignAddForm',
 					name:'新增课程设计',
 					route:'main.list.courseDesign.courseDesignAddForm'
 				}
 				$rootScope.selectModule(model,$stateParams);
 			}
		}))
        .state('main.list.courseDesign.courseDesignEditForm',angularAMD.route({
            url : '/courseDesignEditForm/:operate/:id',
            views : {
                'courseDesignEditForm@main.list' : angularAMD.route({
                	controller:'courseDesignFormController',
                    controllerUrl : ['simple/view/courseDesign/js/courseDesign/CourseDesignForm.js'],
                    templateUrl : 'simple/view/courseDesign/html/courseDesign/CourseDesignForm.html'
                })
            },
            onEnter: function($rootScope,$stateParams){
                var model  ={
                    eId:'courseDesignEditForm',
                    name:'编辑课程设计',
                    route:'main.list.courseDesign.courseDesignEditForm'
                }
                $rootScope.selectModule(model,$stateParams);
            }
        }))
		.state('main.list.courseDesign.courseDesignDisplay',angularAMD.route({
			url : '/courseDesignDisplay/:id',
            views : {
                'courseDesignDisplay@main.list' : angularAMD.route({
                	controller:'courseDesignDisplayController',
					controllerUrl : ['simple/view/courseDesign/js/courseDesign/CourseDesignDisplay.js'],
                    templateUrl : 'simple/view/courseDesign/html/courseDesign/CourseDesignDisplay.html'
                })
            }, 
			onEnter: function($rootScope,$stateParams) {
				var model  = {
					eId:'courseDesignDisplay',
					name:'查看课程设计',
					route:'main.list.courseDesign.courseDesignDisplay'
				}
				$rootScope.selectModule(model,$stateParams);
			}
		}))