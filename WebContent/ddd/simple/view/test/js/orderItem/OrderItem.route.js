		.state('main.list.orderItem',angularAMD.route({
			url : '/orderItem',
			views : {
				'@main' : angularAMD.route({
					controllerUrl : ['simple/view/test/js/orderItem/OrderItemService.js']
				})
			}
		}))
		.state('main.list.orderItem.orderItemList',angularAMD.route({
             url : '/orderItemList',
             onEnter: function($rootScope) { 
 				var model  = {
 					eId:'orderItemList',
 					name:'订单条目管理',
 					route:'main.list.orderItem.orderItemList'
 				}
 				$rootScope.selectModule(model);
 			},
			 views : {
                 'orderItemList@main.list' : angularAMD.route({
                	 controller:'orderItemListController',
 					 controllerUrl : ['simple/view/test/js/orderItem/OrderItemList.js'],
                     templateUrl : 'simple/view/test/html/orderItem/OrderItemList.html'
                 })
             }
		}))
		.state('main.list.orderItem.orderItemAddForm',angularAMD.route({
             url : '/orderItemAddForm/:operate',
             views : {
                'orderItemAddForm@main.list' : angularAMD.route({
                	controller:'orderItemFormController',
 					controllerUrl : ['simple/view/test/js/orderItem/OrderItemForm.js'],
                    templateUrl : 'simple/view/test/html/orderItem/OrderItemForm.html'
                })
             },
             onEnter: function($rootScope,$stateParams) {
 				var model  ={
 					eId:'orderItemAddForm',
 					name:'新增订单条目',
 					route:'main.list.orderItem.orderItemAddForm'
 				}
 				$rootScope.selectModule(model,$stateParams);
 			}
		}))
        .state('main.list.orderItem.orderItemEditForm',angularAMD.route({
            url : '/orderItemEditForm/:operate/:id',
            views : {
                'orderItemEditForm@main.list' : angularAMD.route({
                	controller:'orderItemFormController',
                    controllerUrl : ['simple/view/test/js/orderItem/OrderItemForm.js'],
                    templateUrl : 'simple/view/test/html/orderItem/OrderItemForm.html'
                })
            },
            onEnter: function($rootScope,$stateParams){
                var model  ={
                    eId:'orderItemEditForm',
                    name:'编辑订单条目',
                    route:'main.list.orderItem.orderItemEditForm'
                }
                $rootScope.selectModule(model,$stateParams);
            }
        }))
		.state('main.list.orderItem.orderItemDisplay',angularAMD.route({
			url : '/orderItemDisplay/:id',
            views : {
                'orderItemDisplay@main.list' : angularAMD.route({
                	controller:'orderItemDisplayController',
					controllerUrl : ['simple/view/test/js/orderItem/OrderItemDisplay.js'],
                    templateUrl : 'simple/view/test/html/orderItem/OrderItemDisplay.html'
                })
            }, 
			onEnter: function($rootScope,$stateParams) {
				var model  = {
					eId:'orderItemDisplay',
					name:'查看订单条目',
					route:'main.list.orderItem.orderItemDisplay'
				}
				$rootScope.selectModule(model,$stateParams);
			}
		}))