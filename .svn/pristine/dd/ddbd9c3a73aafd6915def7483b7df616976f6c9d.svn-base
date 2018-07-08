		.state('main.list.attachmentGroupItem',angularAMD.route({
			url : '/attachmentGroupItem',
			views : {
				'@main' : angularAMD.route({
					controllerUrl : ['simple/view/attachmentGroup/js/attachmentGroupItem/AttachmentGroupItemService.js']
				})
			}
		}))
		.state('main.list.attachmentGroupItem.attachmentGroupItemList',angularAMD.route({
             url : '/attachmentGroupItemList',
             onEnter: function($rootScope) { 
 				var model  = {
 					eId:'attachmentGroupItemList',
 					name:'文档项管理',
 					route:'main.list.attachmentGroupItem.attachmentGroupItemList'
 				}
 				$rootScope.selectModule(model);
 			},
			 views : {
                 'attachmentGroupItemList@main.list' : angularAMD.route({
                	 controller:'attachmentGroupItemListController',
 					 controllerUrl : ['simple/view/attachmentGroup/js/attachmentGroupItem/AttachmentGroupItemList.js'],
                     templateUrl : 'simple/view/attachmentGroup/html/attachmentGroupItem/AttachmentGroupItemList.html'
                 })
             }
		}))
		.state('main.list.attachmentGroupItem.attachmentGroupItemAddForm',angularAMD.route({
             url : '/attachmentGroupItemAddForm/:operate',
             views : {
                'attachmentGroupItemAddForm@main.list' : angularAMD.route({
                	controller:'attachmentGroupItemFormController',
 					controllerUrl : ['simple/view/attachmentGroup/js/attachmentGroupItem/AttachmentGroupItemForm.js'],
                    templateUrl : 'simple/view/attachmentGroup/html/attachmentGroupItem/AttachmentGroupItemForm.html'
                })
             },
             onEnter: function($rootScope,$stateParams) {
 				var model  ={
 					eId:'attachmentGroupItemAddForm',
 					name:'新增文档项',
 					route:'main.list.attachmentGroupItem.attachmentGroupItemAddForm'
 				}
 				$rootScope.selectModule(model,$stateParams);
 			}
		}))
        .state('main.list.attachmentGroupItem.attachmentGroupItemEditForm',angularAMD.route({
            url : '/attachmentGroupItemEditForm/:operate/:id',
            views : {
                'attachmentGroupItemEditForm@main.list' : angularAMD.route({
                	controller:'attachmentGroupItemFormController',
                    controllerUrl : ['simple/view/attachmentGroup/js/attachmentGroupItem/AttachmentGroupItemForm.js'],
                    templateUrl : 'simple/view/attachmentGroup/html/attachmentGroupItem/AttachmentGroupItemForm.html'
                })
            },
            onEnter: function($rootScope,$stateParams){
                var model  ={
                    eId:'attachmentGroupItemEditForm',
                    name:'编辑文档项',
                    route:'main.list.attachmentGroupItem.attachmentGroupItemEditForm'
                }
                $rootScope.selectModule(model,$stateParams);
            }
        }))
		.state('main.list.attachmentGroupItem.attachmentGroupItemDisplay',angularAMD.route({
			url : '/attachmentGroupItemDisplay/:id',
            views : {
                'attachmentGroupItemDisplay@main.list' : angularAMD.route({
                	controller:'attachmentGroupItemDisplayController',
					controllerUrl : ['simple/view/attachmentGroup/js/attachmentGroupItem/AttachmentGroupItemDisplay.js'],
                    templateUrl : 'simple/view/attachmentGroup/html/attachmentGroupItem/AttachmentGroupItemDisplay.html'
                })
            }, 
			onEnter: function($rootScope,$stateParams) {
				var model  = {
					eId:'attachmentGroupItemDisplay',
					name:'查看文档项',
					route:'main.list.attachmentGroupItem.attachmentGroupItemDisplay'
				}
				$rootScope.selectModule(model,$stateParams);
			}
		}))