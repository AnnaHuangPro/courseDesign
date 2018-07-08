#set($EntityNameUp="${entityClass.className}")
#set($EntityNameLow="${entityClass.className.substring(0,1).toLowerCase()}${entityClass.className.substring(1)}")
#set($extension=".js")
#set($fileName="${EntityNameUp}Service")
#set($index = ${entityClass.packageName.lastIndexOf(".")} + 1)
#set($simplePackage=${entityClass.packageName.substring($index)})
#set($outputFile="${htmlAndjsCodeGenPath}${simplePackage}/js/${EntityNameLow}/${fileName}${extension}")

define(["app"], function (app) {
	app.factory("${EntityNameUp}Service", function($resource) {
		
		var ${EntityNameLow}Service = $resource("../${shortCode}/${EntityNameUp}/:action", {});
		${EntityNameLow}Service.save${EntityNameUp}=function(${EntityNameLow},sucesscb,errorcb)	{
			${EntityNameLow}Service.save({action:"save${EntityNameUp}"},{${EntityNameLow}:${EntityNameLow}},sucesscb,errorcb);
		};
		
		${EntityNameLow}Service.delete${EntityNameUp}=function(${EntityNameLow}Id,sucesscb,errorcb)	{
			${EntityNameLow}Service.save({action:"delete${EntityNameUp}"},{${EntityNameLow}Id:${EntityNameLow}Id},sucesscb,errorcb);
		};
		
		${EntityNameLow}Service.update${EntityNameUp}=function(${EntityNameLow},sucesscb,errorcb) {
			${EntityNameLow}Service.save({action:"update${EntityNameUp}"},{${EntityNameLow}:${EntityNameLow}},sucesscb,errorcb);
		};
		 
		${EntityNameLow}Service.find${EntityNameUp}ById=function(${EntityNameLow}Id,sucesscb,errorcb) {
			${EntityNameLow}Service.get({action:"find${EntityNameUp}ById",${EntityNameLow}Id:${EntityNameLow}Id},sucesscb,errorcb);
		};
		
		${EntityNameLow}Service.findAll${EntityNameUp}=function(sucesscb,errorcb) {
			${EntityNameLow}Service.query({action:"findAll${EntityNameUp}"},sucesscb,errorcb);
		}
		return ${EntityNameLow}Service;
})});
