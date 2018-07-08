		.state('main.list.attachmentGroupTemplate',angularAMD.route({
			url : '/attachmentGroupTemplate',
			views : {
				'@main' : angularAMD.route({
					controllerUrl : ['simple/view/attachmentGroup/js/attachmentGroupTemplate/AttachmentGroupTemplateService.js']
				})
			}
		}))
		.state('main.list.attachmentGroupTemplate.attachmentGroupTemplateList',angularAMD.route({
             url : '/attachmentGroupTemplateList',
             onEnter: function($rootScope) { 
 				var model  = {
 					eId:'attachmentGroupTemplateList',
 					name:'文档组(模板)管理',
 					route:'main.list.attachmentGroupTemplate.attachmentGroupTemplateList'
 				}
 				$rootScope.selectModule(model);
 			},
			 views : {
                 'attachmentGroupTemplateList@main.list' : angularAMD.route({
                	 controller:'attachmentGroupTemplateListController',
 					 controllerUrl : ['simple/view/attachmentGroup/js/attachmentGroupTemplate/AttachmentGroupTemplateList.js'],
                     templateUrl : 'simple/view/attachmentGroup/html/attachmentGroupTemplate/AttachmentGroupTemplateList.html'
                 })
             }
		}))
		.state('main.list.attachmentGroupTemplate.attachmentGroupTemplateAddForm',angularAMD.route({
             url : '/attachmentGroupTemplateAddForm/:operate',
             views : {
                'attachmentGroupTemplateAddForm@main.list' : angularAMD.route({
                	controller:'attachmentGroupTemplateFormController',
 					controllerUrl : ['simple/view/attachmentGroup/js/attachmentGroupTemplate/AttachmentGroupTemplateForm.js'],
                    templateUrl : 'simple/view/attachmentGroup/html/attachmentGroupTemplate/AttachmentGroupTemplateForm.html'
                })
             },
             onEnter: function($rootScope,$stateParams) {
 				var model  ={
 					eId:'attachmentGroupTemplateAddForm',
 					name:'新增文档组(模板)',
 					route:'main.list.attachmentGroupTemplate.attachmentGroupTemplateAddForm'
 				}
 				$rootScope.selectModule(model,$stateParams);
 			}
		}))
        .state('main.list.attachmentGroupTemplate.attachmentGroupTemplateEditForm',angularAMD.route({
            url : '/attachmentGroupTemplateEditForm/:operate/:id',
            views : {
                'attachmentGroupTemplateEditForm@main.list' : angularAMD.route({
                	controller:'attachmentGroupTemplateFormController',
                    controllerUrl : ['simple/view/attachmentGroup/js/attachmentGroupTemplate/AttachmentGroupTemplateForm.js'],
                    templateUrl : 'simple/view/attachmentGroup/html/attachmentGroupTemplate/AttachmentGroupTemplateForm.html'
                })
            },
            onEnter: function($rootScope,$stateParams){
                var model  ={
                    eId:'attachmentGroupTemplateEditForm',
                    name:'编辑文档组(模板)',
                    route:'main.list.attachmentGroupTemplate.attachmentGroupTemplateEditForm'
                }
                $rootScope.selectModule(model,$stateParams);
            }
        }))
		.state('main.list.attachmentGroupTemplate.attachmentGroupTemplateDisplay',angularAMD.route({
			url : '/attachmentGroupTemplateDisplay/:id',
            views : {
                'attachmentGroupTemplateDisplay@main.list' : angularAMD.route({
                	controller:'attachmentGroupTemplateDisplayController',
					controllerUrl : ['simple/view/attachmentGroup/js/attachmentGroupTemplate/AttachmentGroupTemplateDisplay.js'],
                    templateUrl : 'simple/view/attachmentGroup/html/attachmentGroupTemplate/AttachmentGroupTemplateDisplay.html'
                })
            }, 
			onEnter: function($rootScope,$stateParams) {
				var model  = {
					eId:'attachmentGroupTemplateDisplay',
					name:'查看文档组(模板)',
					route:'main.list.attachmentGroupTemplate.attachmentGroupTemplateDisplay'
				}
				$rootScope.selectModule(model,$stateParams);
			}
		}))