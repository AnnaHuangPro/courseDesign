		.state('main.list.memberGroup',angularAMD.route({
			url : '/memberGroup',
			views : {
				'@main' : angularAMD.route({
					controllerUrl : ['simple/view/memberGroup/js/memberGroup/MemberGroupService.js']
				})
			}
		}))
		.state('main.list.memberGroup.memberGroupList',angularAMD.route({
             url : '/memberGroupList',
             onEnter: function($rootScope) { 
 				var model  = {
 					eId:'memberGroupList',
 					name:'会员组管理',
 					route:'main.list.memberGroup.memberGroupList'
 				}
 				$rootScope.selectModule(model);
 			},
			 views : {
                 'memberGroupList@main.list' : angularAMD.route({
                	 controller:'memberGroupListController',
 					 controllerUrl : ['simple/view/memberGroup/js/memberGroup/MemberGroupList.js'],
                     templateUrl : 'simple/view/memberGroup/html/memberGroup/MemberGroupList.html'
                 })
             }
		}))
		.state('main.list.memberGroup.memberGroupAddForm',angularAMD.route({
             url : '/memberGroupAddForm/:operate',
             views : {
                'memberGroupAddForm@main.list' : angularAMD.route({
                	controller:'memberGroupFormController',
 					controllerUrl : ['simple/view/memberGroup/js/memberGroup/MemberGroupForm.js'],
                    templateUrl : 'simple/view/memberGroup/html/memberGroup/MemberGroupForm.html'
                })
             },
             onEnter: function($rootScope,$stateParams) {
 				var model  ={
 					eId:'memberGroupAddForm',
 					name:'新增会员组',
 					route:'main.list.memberGroup.memberGroupAddForm'
 				}
 				$rootScope.selectModule(model,$stateParams);
 			}
		}))
        .state('main.list.memberGroup.memberGroupEditForm',angularAMD.route({
            url : '/memberGroupEditForm/:operate/:id',
            views : {
                'memberGroupEditForm@main.list' : angularAMD.route({
                	controller:'memberGroupFormController',
                    controllerUrl : ['simple/view/memberGroup/js/memberGroup/MemberGroupForm.js'],
                    templateUrl : 'simple/view/memberGroup/html/memberGroup/MemberGroupForm.html'
                })
            },
            onEnter: function($rootScope,$stateParams){
                var model  ={
                    eId:'memberGroupEditForm',
                    name:'编辑会员组',
                    route:'main.list.memberGroup.memberGroupEditForm'
                }
                $rootScope.selectModule(model,$stateParams);
            }
        }))
		.state('main.list.memberGroup.memberGroupDisplay',angularAMD.route({
			url : '/memberGroupDisplay/:id',
            views : {
                'memberGroupDisplay@main.list' : angularAMD.route({
                	controller:'memberGroupDisplayController',
					controllerUrl : ['simple/view/memberGroup/js/memberGroup/MemberGroupDisplay.js'],
                    templateUrl : 'simple/view/memberGroup/html/memberGroup/MemberGroupDisplay.html'
                })
            }, 
			onEnter: function($rootScope,$stateParams) {
				var model  = {
					eId:'memberGroupDisplay',
					name:'查看会员组',
					route:'main.list.memberGroup.memberGroupDisplay'
				}
				$rootScope.selectModule(model,$stateParams);
			}
		}))