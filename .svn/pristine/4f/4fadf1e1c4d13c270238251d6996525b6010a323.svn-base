		.state('main.list.organization',angularAMD.route({
			url : '/organization',
			views : {
				'@main' : angularAMD.route({
					controllerUrl : ['simple/view/organization/js/organization/OrganizationService.js']
				})
			}
		}))
		.state('main.list.organization.organizationList',angularAMD.route({
             url : '/organizationList',
             onEnter: function($rootScope) { 
 				var model  = {
 					eId:'organizationList',
 					name:'单位管理',
 					route:'main.list.organization.organizationList'
 				}
 				$rootScope.selectModule(model);
 			},
			 views : {
                 'organizationList@main.list' : angularAMD.route({
                	 controller:'organizationListController',
 					 controllerUrl : ['simple/view/organization/js/organization/OrganizationList.js'],
                     templateUrl : 'simple/view/organization/html/organization/OrganizationList.html'
                 })
             }
		}))
		.state('main.list.organization.organizationAddForm',angularAMD.route({
             url : '/organizationAddForm/:operate',
             views : {
                'organizationAddForm@main.list' : angularAMD.route({
                	controller:'organizationFormController',
 					controllerUrl : ['simple/view/organization/js/organization/OrganizationForm.js'],
                    templateUrl : 'simple/view/organization/html/organization/OrganizationForm.html'
                })
             },
             onEnter: function($rootScope,$stateParams) {
 				var model  ={
 					eId:'organizationAddForm',
 					name:'新增单位',
 					route:'main.list.organization.organizationAddForm'
 				}
 				$rootScope.selectModule(model,$stateParams);
 			}
		}))
        .state('main.list.organization.organizationEditForm',angularAMD.route({
            url : '/organizationEditForm/:operate/:id',
            views : {
                'organizationEditForm@main.list' : angularAMD.route({
                	controller:'organizationFormController',
                    controllerUrl : ['simple/view/organization/js/organization/OrganizationForm.js'],
                    templateUrl : 'simple/view/organization/html/organization/OrganizationForm.html'
                })
            },
            onEnter: function($rootScope,$stateParams){
                var model  ={
                    eId:'organizationEditForm',
                    name:'编辑单位',
                    route:'main.list.organization.organizationEditForm'
                }
                $rootScope.selectModule(model,$stateParams);
            }
        }))
		.state('main.list.organization.organizationDisplay',angularAMD.route({
			url : '/organizationDisplay/:id',
            views : {
                'organizationDisplay@main.list' : angularAMD.route({
                	controller:'organizationDisplayController',
					controllerUrl : ['simple/view/organization/js/organization/OrganizationDisplay.js'],
                    templateUrl : 'simple/view/organization/html/organization/OrganizationDisplay.html'
                })
            }, 
			onEnter: function($rootScope,$stateParams) {
				var model  = {
					eId:'organizationDisplay',
					name:'查看单位',
					route:'main.list.organization.organizationDisplay'
				}
				$rootScope.selectModule(model,$stateParams);
			}
		}))