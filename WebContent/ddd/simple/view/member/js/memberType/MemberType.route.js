		.state('main.list.memberType',angularAMD.route({
			url : '/memberType',
			views : {
				'@main' : angularAMD.route({
					controllerUrl : ['simple/view/member/js/memberType/MemberTypeService.js']
				})
			}
		}))
		.state('main.list.memberType.memberTypeList',angularAMD.route({
             url : '/memberTypeList',
             onEnter: function($rootScope) { 
 				var model  = {
 					eId:'memberTypeList',
 					name:'会员类别管理',
 					route:'main.list.memberType.memberTypeList'
 				}
 				$rootScope.selectModule(model);
 			},
			 views : {
                 'memberTypeList@main.list' : angularAMD.route({
                	 controller:'memberTypeListController',
 					 controllerUrl : ['simple/view/member/js/memberType/MemberTypeList.js'],
                     templateUrl : 'simple/view/member/html/memberType/MemberTypeList.html'
                 })
             }
		}))
		.state('main.list.memberType.memberTypeAddForm',angularAMD.route({
             url : '/memberTypeAddForm/:operate',
             views : {
                'memberTypeAddForm@main.list' : angularAMD.route({
                	controller:'memberTypeFormController',
 					controllerUrl : ['simple/view/member/js/memberType/MemberTypeForm.js'],
                    templateUrl : 'simple/view/member/html/memberType/MemberTypeForm.html'
                })
             },
             onEnter: function($rootScope,$stateParams) {
 				var model  ={
 					eId:'memberTypeAddForm',
 					name:'新增会员类别',
 					route:'main.list.memberType.memberTypeAddForm'
 				}
 				$rootScope.selectModule(model,$stateParams);
 			}
		}))
        .state('main.list.memberType.memberTypeEditForm',angularAMD.route({
            url : '/memberTypeEditForm/:operate/:id',
            views : {
                'memberTypeEditForm@main.list' : angularAMD.route({
                	controller:'memberTypeFormController',
                    controllerUrl : ['simple/view/member/js/memberType/MemberTypeForm.js'],
                    templateUrl : 'simple/view/member/html/memberType/MemberTypeForm.html'
                })
            },
            onEnter: function($rootScope,$stateParams){
                var model  ={
                    eId:'memberTypeEditForm',
                    name:'编辑会员类别',
                    route:'main.list.memberType.memberTypeEditForm'
                }
                $rootScope.selectModule(model,$stateParams);
            }
        }))
		.state('main.list.memberType.memberTypeDisplay',angularAMD.route({
			url : '/memberTypeDisplay/:id',
            views : {
                'memberTypeDisplay@main.list' : angularAMD.route({
                	controller:'memberTypeDisplayController',
					controllerUrl : ['simple/view/member/js/memberType/MemberTypeDisplay.js'],
                    templateUrl : 'simple/view/member/html/memberType/MemberTypeDisplay.html'
                })
            }, 
			onEnter: function($rootScope,$stateParams) {
				var model  = {
					eId:'memberTypeDisplay',
					name:'查看会员类别',
					route:'main.list.memberType.memberTypeDisplay'
				}
				$rootScope.selectModule(model,$stateParams);
			}
		}))