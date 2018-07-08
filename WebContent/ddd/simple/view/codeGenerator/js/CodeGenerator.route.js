.state("main.list.codeGenerator",angularAMD.route({
			url : '/codeGenerator',
			views : {
				"@main" : angularAMD.route({
					controllerUrl : ['simple/view/codeGenerator/js/CodeGeneratorService.js']
				})
			}
		}))
.state("main.list.codeGenerator.codeGeneratorForm",angularAMD.route({
	url : '/codeGeneratorForm',
	onEnter: function($rootScope){
		var model  ={
			eId:"codeGeneratorForm",
			name:"代码生成",
			route:"main.list.codeGenerator.codeGeneratorForm"
		}
		$rootScope.selectModule(model);
	},
    views : {
        "codeGeneratorForm@main.list" : angularAMD.route({
        	controller:'codeGeneratorFromController',
            templateUrl : 'simple/view/codeGenerator/html/CodeGenerator.html',
            controllerUrl:['simple/view/codeGenerator/js/CodeGeneratorForm.js']
        })
    }
}))