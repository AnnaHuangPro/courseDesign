		.state('main.list.sendMessage',angularAMD.route({
			url : '/sendMessage',
			views : {
				'@main' : angularAMD.route({
					controllerUrl : ['simple/view/message_module/js/sendMessage/SendMessageService.js']
				})
			}
		}))
		.state('main.list.sendMessage.sendMessageList',angularAMD.route({
             url : '/sendMessageList',
             onEnter: function($rootScope) { 
 				var model  = {
 					eId:'sendMessageList',
 					name:'消息实体管理',
 					route:'main.list.sendMessage.sendMessageList'
 				}
 				$rootScope.selectModule(model);
 			},
			 views : {
                 'sendMessageList@main.list' : angularAMD.route({
                	 controller:'sendMessageListController',
 					 controllerUrl : ['simple/view/message_module/js/sendMessage/SendMessageList.js'],
                     templateUrl : 'simple/view/message_module/html/sendMessage/SendMessageList.html'
                 })
             }
		}))
		.state('main.list.sendMessage.sendMessageAddForm',angularAMD.route({
             url : '/sendMessageAddForm/:operate',
             views : {
                'sendMessageAddForm@main.list' : angularAMD.route({
                	controller:'sendMessageFormController',
 					controllerUrl : ['simple/view/message_module/js/sendMessage/SendMessageForm.js'],
                    templateUrl : 'simple/view/message_module/html/sendMessage/SendMessageForm.html'
                })
             },
             onEnter: function($rootScope,$stateParams) {
 				var model  ={
 					eId:'sendMessageAddForm',
 					name:'新增消息实体',
 					route:'main.list.sendMessage.sendMessageAddForm'
 				}
 				$rootScope.selectModule(model,$stateParams);
 			}
		}))
        .state('main.list.sendMessage.sendMessageEditForm',angularAMD.route({
            url : '/sendMessageEditForm/:operate/:id',
            views : {
                'sendMessageEditForm@main.list' : angularAMD.route({
                	controller:'sendMessageFormController',
                    controllerUrl : ['simple/view/message_module/js/sendMessage/SendMessageForm.js'],
                    templateUrl : 'simple/view/message_module/html/sendMessage/SendMessageForm.html'
                })
            },
            onEnter: function($rootScope,$stateParams){
                var model  ={
                    eId:'sendMessageEditForm',
                    name:'编辑消息实体',
                    route:'main.list.sendMessage.sendMessageEditForm'
                }
                $rootScope.selectModule(model,$stateParams);
            }
        }))
		.state('main.list.sendMessage.sendMessageDisplay',angularAMD.route({
			url : '/sendMessageDisplay/:id',
            views : {
                'sendMessageDisplay@main.list' : angularAMD.route({
                	controller:'sendMessageDisplayController',
					controllerUrl : ['simple/view/message_module/js/sendMessage/SendMessageDisplay.js'],
                    templateUrl : 'simple/view/message_module/html/sendMessage/SendMessageDisplay.html'
                })
            }, 
			onEnter: function($rootScope,$stateParams) {
				var model  = {
					eId:'sendMessageDisplay',
					name:'查看消息实体',
					route:'main.list.sendMessage.sendMessageDisplay'
				}
				$rootScope.selectModule(model,$stateParams);
			}
		}))