		.state('main.list.major',angularAMD.route({
			url : '/major',
			views : {
				'@main' : angularAMD.route({
					controllerUrl : ['simple/view/major_module/js/major/MajorService.js']
				})
			}
		}))
		.state('main.list.major.majorList',angularAMD.route({
             url : '/majorList',
             onEnter: function($rootScope) { 
 				var model  = {
 					eId:'majorList',
 					name:'专业信息实体管理',
 					route:'main.list.major.majorList'
 				}
 				$rootScope.selectModule(model);
 			},
			 views : {
                 'majorList@main.list' : angularAMD.route({
                	 controller:'majorListController',
 					 controllerUrl : ['simple/view/major_module/js/major/MajorList.js'],
                     templateUrl : 'simple/view/major_module/html/major/MajorList.html'
                 })
             }
		}))
		.state('main.list.major.majorAddForm',angularAMD.route({
             url : '/majorAddForm/:operate',
             views : {
                'majorAddForm@main.list' : angularAMD.route({
                	controller:'majorFormController',
 					controllerUrl : ['simple/view/major_module/js/major/MajorForm.js'],
                    templateUrl : 'simple/view/major_module/html/major/MajorForm.html'
                })
             },
             onEnter: function($rootScope,$stateParams) {
 				var model  ={
 					eId:'majorAddForm',
 					name:'新增专业信息实体',
 					route:'main.list.major.majorAddForm'
 				}
 				$rootScope.selectModule(model,$stateParams);
 			}
		}))
        .state('main.list.major.majorEditForm',angularAMD.route({
            url : '/majorEditForm/:operate/:id',
            views : {
                'majorEditForm@main.list' : angularAMD.route({
                	controller:'majorFormController',
                    controllerUrl : ['simple/view/major_module/js/major/MajorForm.js'],
                    templateUrl : 'simple/view/major_module/html/major/MajorForm.html'
                })
            },
            onEnter: function($rootScope,$stateParams){
                var model  ={
                    eId:'majorEditForm',
                    name:'编辑专业信息实体',
                    route:'main.list.major.majorEditForm'
                }
                $rootScope.selectModule(model,$stateParams);
            }
        }))
		.state('main.list.major.majorDisplay',angularAMD.route({
			url : '/majorDisplay/:id',
            views : {
                'majorDisplay@main.list' : angularAMD.route({
                	controller:'majorDisplayController',
					controllerUrl : ['simple/view/major_module/js/major/MajorDisplay.js'],
                    templateUrl : 'simple/view/major_module/html/major/MajorDisplay.html'
                })
            }, 
			onEnter: function($rootScope,$stateParams) {
				var model  = {
					eId:'majorDisplay',
					name:'查看专业信息实体',
					route:'main.list.major.majorDisplay'
				}
				$rootScope.selectModule(model,$stateParams);
			}
		}))