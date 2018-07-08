		.state('main.list.codeType',angularAMD.route({
			url : '/codeType',
			views : {
				'@main' : angularAMD.route({
					controllerUrl : ['simple/view/codeTable/js/codeType/CodeTypeService.js']
				})
			}
		}))
		.state('main.list.codeType.codeTypeList',angularAMD.route({
             url : '/codeTypeList',
             onEnter: function($rootScope) { 
 				var model  = {
 					eId:'codeTypeList',
 					name:'码表类型管理',
 					route:'main.list.codeType.codeTypeList'
 				}
 				$rootScope.selectModule(model);
 			},
			 views : {
                 'codeTypeList@main.list' : angularAMD.route({
                	 controller:'codeTypeListController',
 					 controllerUrl : ['simple/view/codeTable/js/codeType/CodeTypeList.js'],
                     templateUrl : 'simple/view/codeTable/html/codeType/CodeTypeList.html'
                 })
             }
		}))
		.state('main.list.codeType.codeTypeAddForm',angularAMD.route({
             url : '/codeTypeAddForm/:operate',
             views : {
                'codeTypeAddForm@main.list' : angularAMD.route({
                	controller:'codeTypeFormController',
 					controllerUrl : ['simple/view/codeTable/js/codeType/CodeTypeForm.js'],
                    templateUrl : 'simple/view/codeTable/html/codeType/CodeTypeForm.html'
                })
             },
             onEnter: function($rootScope,$stateParams) {
 				var model  ={
 					eId:'codeTypeAddForm',
 					name:'新增码表类型',
 					route:'main.list.codeType.codeTypeAddForm'
 				}
 				$rootScope.selectModule(model,$stateParams);
 			}
		}))
        .state('main.list.codeType.codeTypeEditForm',angularAMD.route({
            url : '/codeTypeEditForm/:operate/:id',
            views : {
                'codeTypeEditForm@main.list' : angularAMD.route({
                	controller:'codeTypeFormController',
                    controllerUrl : ['simple/view/codeTable/js/codeType/CodeTypeForm.js'],
                    templateUrl : 'simple/view/codeTable/html/codeType/CodeTypeForm.html'
                })
            },
            onEnter: function($rootScope,$stateParams){
                var model  ={
                    eId:'codeTypeEditForm',
                    name:'编辑码表类型',
                    route:'main.list.codeType.codeTypeEditForm'
                }
                $rootScope.selectModule(model,$stateParams);
            }
        }))
		.state('main.list.codeType.codeTypeDisplay',angularAMD.route({
			url : '/codeTypeDisplay/:id',
            views : {
                'codeTypeDisplay@main.list' : angularAMD.route({
                	controller:'codeTypeDisplayController',
					controllerUrl : ['simple/view/codeTable/js/codeType/CodeTypeDisplay.js'],
                    templateUrl : 'simple/view/codeTable/html/codeType/CodeTypeDisplay.html'
                })
            }, 
			onEnter: function($rootScope,$stateParams) {
				var model  = {
					eId:'codeTypeDisplay',
					name:'查看码表类型',
					route:'main.list.codeType.codeTypeDisplay'
				}
				$rootScope.selectModule(model,$stateParams);
			}
		}))