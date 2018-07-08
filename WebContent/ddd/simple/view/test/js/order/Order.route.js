		.state('main.list.order',angularAMD.route({
			url : '/order',
			views : {
				'@main' : angularAMD.route({
					controllerUrl : ['simple/view/test/js/order/OrderService.js']
				})
			}
		}))
		.state('main.list.order.orderList',angularAMD.route({
             url : '/orderList',
             onEnter: function($rootScope) { 
 				var model  = {
 					eId:'orderList',
 					name:'订单管理',
 					route:'main.list.order.orderList'
 				}
 				$rootScope.selectModule(model);
 			},
			 views : {
                 'orderList@main.list' : angularAMD.route({
                	 controller:'orderListController',
 					 controllerUrl : ['simple/view/test/js/order/OrderList.js'],
                     templateUrl : 'simple/view/test/html/order/OrderList.html'
                 })
             }
		}))
		.state('main.list.order.orderAddForm',angularAMD.route({
             url : '/orderAddForm/:operate',
             views : {
                'orderAddForm@main.list' : angularAMD.route({
                	controller:'orderFormController',
 					controllerUrl : ['simple/view/test/js/order/OrderForm.js'],
                    templateUrl : 'simple/view/test/html/order/OrderForm.html'
                })
             },
             onEnter: function($rootScope,$stateParams) {
 				var model  ={
 					eId:'orderAddForm',
 					name:'新增订单',
 					route:'main.list.order.orderAddForm'
 				}
 				$rootScope.selectModule(model,$stateParams);
 			}
		}))
        .state('main.list.order.orderEditForm',angularAMD.route({
            url : '/orderEditForm/:operate/:id',
            views : {
                'orderEditForm@main.list' : angularAMD.route({
                	controller:'orderFormController',
                    controllerUrl : ['simple/view/test/js/order/OrderForm.js'],
                    templateUrl : 'simple/view/test/html/order/OrderForm.html'
                })
            },
            onEnter: function($rootScope,$stateParams){
                var model  ={
                    eId:'orderEditForm',
                    name:'编辑订单',
                    route:'main.list.order.orderEditForm'
                }
                $rootScope.selectModule(model,$stateParams);
            }
        }))
		.state('main.list.order.orderDisplay',angularAMD.route({
			url : '/orderDisplay/:id',
            views : {
                'orderDisplay@main.list' : angularAMD.route({
                	controller:'orderDisplayController',
					controllerUrl : ['simple/view/test/js/order/OrderDisplay.js'],
                    templateUrl : 'simple/view/test/html/order/OrderDisplay.html'
                })
            }, 
			onEnter: function($rootScope,$stateParams) {
				var model  = {
					eId:'orderDisplay',
					name:'查看订单',
					route:'main.list.order.orderDisplay'
				}
				$rootScope.selectModule(model,$stateParams);
			}
		}))