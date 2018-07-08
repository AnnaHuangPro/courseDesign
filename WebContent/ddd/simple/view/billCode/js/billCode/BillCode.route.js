		.state('main.list.billCode',angularAMD.route({
			url : '/billCode',
			views : {
				'@main' : angularAMD.route({
					controllerUrl : ['simple/view/billCode/js/billCode/BillCodeService.js']
				})
			}
		}))
		.state('main.list.billCode.billCodeList',angularAMD.route({
             url : '/billCodeList',
             onEnter: function($rootScope) { 
 				var model  = {
 					eId:'billCodeList',
 					name:'编码定义管理',
 					route:'main.list.billCode.billCodeList'
 				}
 				$rootScope.selectModule(model);
 			},
			 views : {
                 'billCodeList@main.list' : angularAMD.route({
                	 controller:'billCodeListController',
 					 controllerUrl : ['simple/view/billCode/js/billCode/BillCodeList.js'],
                     templateUrl : 'simple/view/billCode/html/billCode/BillCodeList.html'
                 })
             }
		}))
		.state('main.list.billCode.billCodeAddForm',angularAMD.route({
             url : '/billCodeAddForm/:operate',
             views : {
                'billCodeAddForm@main.list' : angularAMD.route({
                	controller:'billCodeFormController',
 					controllerUrl : ['simple/view/billCode/js/billCode/BillCodeForm.js'],
                    templateUrl : 'simple/view/billCode/html/billCode/BillCodeForm.html'
                })
             },
             onEnter: function($rootScope,$stateParams) {
 				var model  ={
 					eId:'billCodeAddForm',
 					name:'新增编码定义',
 					route:'main.list.billCode.billCodeAddForm'
 				}
 				$rootScope.selectModule(model,$stateParams);
 			}
		}))
        .state('main.list.billCode.billCodeEditForm',angularAMD.route({
            url : '/billCodeEditForm/:operate/:id',
            views : {
                'billCodeEditForm@main.list' : angularAMD.route({
                	controller:'billCodeFormController',
                    controllerUrl : ['simple/view/billCode/js/billCode/BillCodeForm.js'],
                    templateUrl : 'simple/view/billCode/html/billCode/BillCodeForm.html'
                })
            },
            onEnter: function($rootScope,$stateParams){
                var model  ={
                    eId:'billCodeEditForm',
                    name:'编辑编码定义',
                    route:'main.list.billCode.billCodeEditForm'
                }
                $rootScope.selectModule(model,$stateParams);
            }
        }))
		.state('main.list.billCode.billCodeDisplay',angularAMD.route({
			url : '/billCodeDisplay/:id',
            views : {
                'billCodeDisplay@main.list' : angularAMD.route({
                	controller:'billCodeDisplayController',
					controllerUrl : ['simple/view/billCode/js/billCode/BillCodeDisplay.js'],
                    templateUrl : 'simple/view/billCode/html/billCode/BillCodeDisplay.html'
                })
            }, 
			onEnter: function($rootScope,$stateParams) {
				var model  = {
					eId:'billCodeDisplay',
					name:'查看编码定义',
					route:'main.list.billCode.billCodeDisplay'
				}
				$rootScope.selectModule(model,$stateParams);
			}
		}))