		.state('main.list.attachmentGroup',angularAMD.route({
			url : '/attachmentGroup',
			views : {
				'@main' : angularAMD.route({
					controllerUrl : ['simple/view/attachmentGroup/js/attachmentGroup/AttachmentGroupService.js']
				})
			}
		}))
		.state('main.list.attachmentGroup.attachmentGroupList',angularAMD.route({
             url : '/attachmentGroupList',
			 views : {
                 'attachmentGroupList@main.list' : angularAMD.route({
                     templateUrl : 'simple/view/attachmentGroup/html/attachmentGroup/AttachmentGroupList.html',
                     controllerUrl : ['simple/view/attachmentGroup/js/attachmentGroup/AttachmentGroupList.js']
                 })
             },
 			onEnter: function($rootScope){
				var model  ={
					eId:'attachmentGroupList',
					name:'文档(中间表)管理',
					route:'main.list.attachmentGroup.attachmentGroupList'
				}
				$rootScope.selectModule(model);
			}
		}))
		
		.state('main.list.attachmentGroup.attachmentGroupAddForm',angularAMD.route({
             url : '/attachmentGroupAddForm/:operate',
             views : {
                'attachmentGroupAddForm@main.list' : angularAMD.route({
                    templateUrl : 'simple/view/attachmentGroup/html/attachmentGroup/AttachmentGroupForm.html',
                    controllerUrl : ['simple/view/attachmentGroup/js/attachmentGroup/AttachmentGroupForm.js']
                })
             },
 			onEnter: function($rootScope,$stateParams){
				var model  ={
					eId:'attachmentGroupAddForm',
					name:'新增文档(中间表)',
					route:'main.list.attachmentGroup.attachmentGroupAddForm'
				}
				$rootScope.selectModule(model,$stateParams);
			}
		}))

        .state('main.list.attachmentGroup.attachmentGroupEditForm',angularAMD.route({
            url : '/attachmentGroupEditForm/:operate/:id',
            views : {
                'attachmentGroupEditForm@main.list' : angularAMD.route({
                    templateUrl : 'simple/view/attachmentGroup/html/attachmentGroup/AttachmentGroupForm.html',
                    controllerUrl : ['simple/view/attachmentGroup/js/attachmentGroup/AttachmentGroupForm.js']
                })
            },
            onEnter: function($rootScope,$stateParams){
                var model  ={
                    eId:'attachmentGroupEditForm',
                    name:'编辑文档(中间表)',
                    route:'main.list.attachmentGroup.attachmentGroupEditForm'
                }
                $rootScope.selectModule(model,$stateParams);
            }
        }))
		.state('main.list.attachmentGroup.attachmentGroupDisplay',angularAMD.route({
			url : '/attachmentGroupDisplay/:id',
            views : {
                'attachmentGroupDisplay@main.list' : angularAMD.route({
                    templateUrl : 'simple/view/attachmentGroup/html/attachmentGroup/AttachmentGroupDisplay.html',
                    controllerUrl : ['simple/view/attachmentGroup/js/attachmentGroup/AttachmentGroupDisplay.js']
                })
            }, 
    		onEnter: function($rootScope,$stateParams){
				var model  ={
					eId:'attachmentGroupDisplay',
					name:'查看文档(中间表)',
					route:'main.list.attachmentGroup.attachmentGroupDisplay'
				}
				$rootScope.selectModule(model,$stateParams);
			}
		}))