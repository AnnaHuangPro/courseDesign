		.state('main.list.attachmentGroupCategory',angularAMD.route({
			url : '/attachmentGroupCategory',
			views : {
				'@main' : angularAMD.route({
					controllerUrl : ['simple/view/attachmentGroup/js/attachmentGroupCategory/AttachmentGroupCategoryService.js']
				})
			}
		}))
		.state('main.list.attachmentGroupCategory.attachmentGroupCategoryList',angularAMD.route({
             url : '/attachmentGroupCategoryList',
             onEnter: function($rootScope) { 
 				var model  = {
 					eId:'attachmentGroupCategoryList',
 					name:'文档组类型管理',
 					route:'main.list.attachmentGroupCategory.attachmentGroupCategoryList'
 				}
 				$rootScope.selectModule(model);
 			},
			 views : {
                 'attachmentGroupCategoryList@main.list' : angularAMD.route({
                	 controller:'attachmentGroupCategoryListController',
 					 controllerUrl : ['simple/view/attachmentGroup/js/attachmentGroupCategory/AttachmentGroupCategoryList.js'],
                     templateUrl : 'simple/view/attachmentGroup/html/attachmentGroupCategory/AttachmentGroupCategoryList.html'
                 })
             }
		}))
		.state('main.list.attachmentGroupCategory.attachmentGroupCategoryAddForm',angularAMD.route({
             url : '/attachmentGroupCategoryAddForm/:operate',
             views : {
                'attachmentGroupCategoryAddForm@main.list' : angularAMD.route({
                	controller:'attachmentGroupCategoryFormController',
 					controllerUrl : ['simple/view/attachmentGroup/js/attachmentGroupCategory/AttachmentGroupCategoryForm.js'],
                    templateUrl : 'simple/view/attachmentGroup/html/attachmentGroupCategory/AttachmentGroupCategoryForm.html'
                })
             },
             onEnter: function($rootScope,$stateParams) {
 				var model  ={
 					eId:'attachmentGroupCategoryAddForm',
 					name:'新增文档组类型',
 					route:'main.list.attachmentGroupCategory.attachmentGroupCategoryAddForm'
 				}
 				$rootScope.selectModule(model,$stateParams);
 			}
		}))
        .state('main.list.attachmentGroupCategory.attachmentGroupCategoryEditForm',angularAMD.route({
            url : '/attachmentGroupCategoryEditForm/:operate/:id',
            views : {
                'attachmentGroupCategoryEditForm@main.list' : angularAMD.route({
                	controller:'attachmentGroupCategoryFormController',
                    controllerUrl : ['simple/view/attachmentGroup/js/attachmentGroupCategory/AttachmentGroupCategoryForm.js'],
                    templateUrl : 'simple/view/attachmentGroup/html/attachmentGroupCategory/AttachmentGroupCategoryForm.html'
                })
            },
            onEnter: function($rootScope,$stateParams){
                var model  ={
                    eId:'attachmentGroupCategoryEditForm',
                    name:'编辑文档组类型',
                    route:'main.list.attachmentGroupCategory.attachmentGroupCategoryEditForm'
                }
                $rootScope.selectModule(model,$stateParams);
            }
        }))
		.state('main.list.attachmentGroupCategory.attachmentGroupCategoryDisplay',angularAMD.route({
			url : '/attachmentGroupCategoryDisplay/:id',
            views : {
                'attachmentGroupCategoryDisplay@main.list' : angularAMD.route({
                	controller:'attachmentGroupCategoryDisplayController',
					controllerUrl : ['simple/view/attachmentGroup/js/attachmentGroupCategory/AttachmentGroupCategoryDisplay.js'],
                    templateUrl : 'simple/view/attachmentGroup/html/attachmentGroupCategory/AttachmentGroupCategoryDisplay.html'
                })
            }, 
			onEnter: function($rootScope,$stateParams) {
				var model  = {
					eId:'attachmentGroupCategoryDisplay',
					name:'查看文档组类型',
					route:'main.list.attachmentGroupCategory.attachmentGroupCategoryDisplay'
				}
				$rootScope.selectModule(model,$stateParams);
			}
		}))