#set($EntityNameUp="${entityClass.className}")
#set($EntityNameAllLow="${entityClass.className.toLowerCase()}")
#set($EntityNameLow="${entityClass.className.substring(0,1).toLowerCase()}${entityClass.className.substring(1)}")
#set($extension=".route.js")
#set($fileName="${EntityNameUp}")
#set($index = ${entityClass.packageName.lastIndexOf(".")} + 1)
#set($simplePackage=${entityClass.packageName.substring($index)})
#set($outputFile="${htmlAndjsCodeGenPath}${simplePackage}/js/${EntityNameLow}/${fileName}${extension}")
#set($daole="$")
		.state('main.list.${EntityNameLow}',angularAMD.route({
			url : '/${EntityNameLow}',
			views : {
				'@main' : angularAMD.route({
					controllerUrl : ['${sbuSystem}/view/${simplePackage}/js/${EntityNameLow}/${EntityNameUp}Service.js']
				})
			}
		}))
		.state('main.list.${EntityNameLow}.${EntityNameLow}List',angularAMD.route({
             url : '/${EntityNameLow}List',
             onEnter: function($rootScope) { 
 				var model  = {
 					eId:'${EntityNameLow}List',
 					name:'${entityClass.entityInfo.label}管理',
 					route:'main.list.${EntityNameLow}.${EntityNameLow}List'
 				}
 				$rootScope.selectModule(model);
 			},
			 views : {
                 '${EntityNameLow}List@main.list' : angularAMD.route({
                	 controller:'${EntityNameLow}ListController',
 					 controllerUrl : ['${sbuSystem}/view/${simplePackage}/js/${EntityNameLow}/${EntityNameUp}List.js'],
                     templateUrl : '${sbuSystem}/view/${simplePackage}/html/${EntityNameLow}/${EntityNameUp}List.html'
                 })
             }
		}))
		.state('main.list.${EntityNameLow}.${EntityNameLow}AddForm',angularAMD.route({
             url : '/${EntityNameLow}AddForm/:operate',
             views : {
                '${EntityNameLow}AddForm@main.list' : angularAMD.route({
                	controller:'${EntityNameLow}FormController',
 					controllerUrl : ['${sbuSystem}/view/${simplePackage}/js/${EntityNameLow}/${EntityNameUp}Form.js'],
                    templateUrl : '${sbuSystem}/view/${simplePackage}/html/${EntityNameLow}/${EntityNameUp}Form.html'
                })
             },
             onEnter: function($rootScope,$stateParams) {
 				var model  ={
 					eId:'${EntityNameLow}AddForm',
 					name:'新增${entityClass.entityInfo.label}',
 					route:'main.list.${EntityNameLow}.${EntityNameLow}AddForm'
 				}
 				$rootScope.selectModule(model,$stateParams);
 			}
		}))
        .state('main.list.${EntityNameLow}.${EntityNameLow}EditForm',angularAMD.route({
            url : '/${EntityNameLow}EditForm/:operate/:id',
            views : {
                '${EntityNameLow}EditForm@main.list' : angularAMD.route({
                	controller:'${EntityNameLow}FormController',
                    controllerUrl : ['${sbuSystem}/view/${simplePackage}/js/${EntityNameLow}/${EntityNameUp}Form.js'],
                    templateUrl : '${sbuSystem}/view/${simplePackage}/html/${EntityNameLow}/${EntityNameUp}Form.html'
                })
            },
            onEnter: function($rootScope,$stateParams){
                var model  ={
                    eId:'${EntityNameLow}EditForm',
                    name:'编辑${entityClass.entityInfo.label}',
                    route:'main.list.${EntityNameLow}.${EntityNameLow}EditForm'
                }
                $rootScope.selectModule(model,$stateParams);
            }
        }))
		.state('main.list.${EntityNameLow}.${EntityNameLow}Display',angularAMD.route({
			url : '/${EntityNameLow}Display/:id',
            views : {
                '${EntityNameLow}Display@main.list' : angularAMD.route({
                	controller:'${EntityNameLow}DisplayController',
					controllerUrl : ['${sbuSystem}/view/${simplePackage}/js/${EntityNameLow}/${EntityNameUp}Display.js'],
                    templateUrl : '${sbuSystem}/view/${simplePackage}/html/${EntityNameLow}/${EntityNameUp}Display.html'
                })
            }, 
			onEnter: function($rootScope,$stateParams) {
				var model  = {
					eId:'${EntityNameLow}Display',
					name:'查看${entityClass.entityInfo.label}',
					route:'main.list.${EntityNameLow}.${EntityNameLow}Display'
				}
				$rootScope.selectModule(model,$stateParams);
			}
		}))