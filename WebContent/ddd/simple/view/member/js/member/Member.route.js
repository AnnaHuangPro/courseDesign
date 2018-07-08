		.state('main.list.member',angularAMD.route({
			url : '/member',
			views : {
				'@main' : angularAMD.route({
					controllerUrl : ['simple/view/member/js/member/MemberService.js']
				})
			}
		}))
		.state('main.list.member.memberList',angularAMD.route({
             url : '/memberList',
             onEnter: function($rootScope) { 
 				var model  = {
 					eId:'memberList',
 					name:'会员管理',
 					route:'main.list.member.memberList'
 				}
 				$rootScope.selectModule(model);
 			},
			 views : {
                 'memberList@main.list' : angularAMD.route({
                	 controller:'memberListController',
 					 controllerUrl : ['simple/view/member/js/member/MemberList.js'],
                     templateUrl : 'simple/view/member/html/member/MemberList.html'
                 })
             }
		}))
		.state('main.list.member.memberAddForm',angularAMD.route({
             url : '/memberAddForm/:operate',
             views : {
                'memberAddForm@main.list' : angularAMD.route({
                	controller:'memberFormController',
 					controllerUrl : ['simple/view/member/js/member/MemberForm.js'],
                    templateUrl : 'simple/view/member/html/member/MemberForm.html'
                })
             },
             onEnter: function($rootScope,$stateParams) {
 				var model  ={
 					eId:'memberAddForm',
 					name:'新增会员',
 					route:'main.list.member.memberAddForm'
 				}
 				$rootScope.selectModule(model,$stateParams);
 			}
		}))
        .state('main.list.member.memberEditForm',angularAMD.route({
            url : '/memberEditForm/:operate/:id',
            views : {
                'memberEditForm@main.list' : angularAMD.route({
                	controller:'memberFormController',
                    controllerUrl : ['simple/view/member/js/member/MemberForm.js'],
                    templateUrl : 'simple/view/member/html/member/MemberForm.html'
                })
            },
            onEnter: function($rootScope,$stateParams){
                var model  ={
                    eId:'memberEditForm',
                    name:'编辑会员',
                    route:'main.list.member.memberEditForm'
                }
                $rootScope.selectModule(model,$stateParams);
            }
        }))
		.state('main.list.member.memberDisplay',angularAMD.route({
			url : '/memberDisplay/:id',
            views : {
                'memberDisplay@main.list' : angularAMD.route({
                	controller:'memberDisplayController',
					controllerUrl : ['simple/view/member/js/member/MemberDisplay.js'],
                    templateUrl : 'simple/view/member/html/member/MemberDisplay.html'
                })
            }, 
			onEnter: function($rootScope,$stateParams) {
				var model  = {
					eId:'memberDisplay',
					name:'查看会员',
					route:'main.list.member.memberDisplay'
				}
				$rootScope.selectModule(model,$stateParams);
			}
		}))