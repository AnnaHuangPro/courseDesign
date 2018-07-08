	.state('main.list.personalData',angularAMD.route({
			url : '/personalData',
			views : {
				'@main' : angularAMD.route({
					controllerUrl : ['simple/view/organization/js/employee/EmployeeService.js']
				})
			}
		}))
		.state('main.list.personalData.personalDataForm',angularAMD.route({
             url : '/personalDataForm',
             onEnter: function($rootScope) { 
            	 var model  = {
            			 eId:'personalDataForm',
            			 name:'编辑个人资料',
            			 route:'main.list.personalData.personalDataForm'
            	 }
            	 $rootScope.selectModule(model);
             },
			 views : {
                 'personalDataForm@main.list' : angularAMD.route({
                	 controller:'personalDataFormController',
 					 controllerUrl : ['simple/view/personalCenter/js/personalData/PersonalDataForm.js'],
                     templateUrl : 'simple/view/personalCenter/html/personalData/PersonalDataForm.html'
                 })
             }
		}))
		.state('main.list.personalData.personalDataDisplay',angularAMD.route({
             url : '/personalDataDisplay',
             onEnter: function($rootScope) { 
            	 var model  = {
            			 eId:'personalDataDisplay',
            			 name:'个人中心',
            			 route:'main.list.personalData.personalDataDisplay'
            	 }
            	 $rootScope.selectModule(model);
             },
			 views : {
                 'personalDataDisplay@main.list' : angularAMD.route({
                	 controller:'personalDataDisplayController',
 					 controllerUrl : ['simple/view/personalCenter/js/personalData/PersonalDataDisplay.js'],
                     templateUrl : 'simple/view/personalCenter/html/personalData/PersonalDataDisplay.html'
                 })
             }
		}))
		.state('main.list.personalData.modifyPasswordForm',angularAMD.route({
             url : '/modifyPasswordForm/:operate',
             onEnter: function($rootScope,$stateParams) {
            	 var model  ={
            			 eId:'modifyPasswordForm',
            			 name:'修改密码',
            			 route:'main.list.personalData.modifyPasswordForm'
            	 }
            	 $rootScope.selectModule(model,$stateParams);
             },
             views : {
                'modifyPasswordForm@main.list' : angularAMD.route({
                	controller:'modifyPasswordFormController',
	               	 controllerUrl : ['simple/view/personalCenter/js/personalData/ModifyPasswordForm.js',
	               	                  "simple/view/permission/js/operator/OperatorService.js"
	               	                  ],
	                 templateUrl : 'simple/view/personalCenter/html/personalData/ModifyPasswordForm.html'
                })
             }
		}))
		
	