
var baseDirective = angular.module("baseApp",[]);

baseDirective.directive("dstring",function(){
	return{
        restrict:'A',
        scope:{
        	dlabel:'@',
        	fieldvalue:'=',
        	doptions:'=',//下拉列表的数据源
        	content:'=',
        	dsize:'='/*输入框长度,文本编辑区高度*/
        },        
        template:"<div class='form-group' style='clear:both'>"
		 +"<label class='col-md-2 control-label deplugins-orgname'>{{dlabel}}:</label>"
		 +"<div class='col-md-10'>"
		 +"<textarea class='form-control' ng-model='fieldvalue' rows='5'></textarea>"
		 +"</div>"
	   +"</div>",
   };
});

baseDirective.directive("denum",function(){
	return{
        restrict:'A',
        scope:{
        	dlabel:'@',
        	fieldvalue:'=',
        	doptions:'@',
        	dsize:'='/*输入框长度,文本编辑区高度*/
        },
        controller:function($scope,$transclude,$compile,$element){
        	var template="";
       	 	var array = $scope.doptions.split(".");
       	 	
       	    var options =  new Array();
       	 	for(var i=0;i<array.length;i++)
       	 	{
       	 	   var obj = new Object();
       	 	   obj["title"] = array[i];
       	 	   options.push(obj);
       	 	}
       	 	$scope.options = options;
       	 	
        	template="<div class='form-group' style='clear:both'>"
   			 +"<label class='col-md-2 control-label deplugins-orgname'>"+$scope.dlabel+":</label>"
   			 +"<div class='col-md-10'>"
   			 +	"<select class='form-control' ng-model='fieldvalue' ng-options='o.title as o.title for o in options'>"
   			 +    "<option value=''>--请选择--</option>"
   			 +	"</select>"
   			 +"</div>"
   		     +"</div>";
        	
        	if(template){
            	$element.append(template);
            	$compile($element.contents())($scope);
            }
       }
   };
});

baseDirective.directive("ddate",function(){
	return {
		restrict:'A',
        scope:{
        	dlabel:'@',
        	fieldvalue:'=',
        	doptions:'=',
        	dsize:'='/*输入框长度,文本编辑区高度*/
        },
        template:'<div class="form-group row">'
		    +   '<label class="col-md-4">{{dlabel}}:</label>'
		    +   '<div>'
		    +  	'<input  type="date" class="col-md-8" data-provide="datepicker" data-date-format="yyyy-mm-dd" ng-model="fieldvalue" >'
		    +'</div>'
	};
});

//
baseDirective.directive("dlong",function(){
	return{
        restrict:'A',
        scope:{
        	dlabel:'@',
        	fieldvalue:'=',
        	doptions:'=',//下拉列表的数据源
        	content:'=',
        	dsize:'='/*输入框长度,文本编辑区高度*/
        },
        template:"<div class='form-group row'>"
		 +"<label class='col-md-4'>{{dlabel}}:</label>"
		 +"<input type='text' class=' col-md-8' ng-model='fieldvalue' id='flag'/>"
	   +"</div>",
   };
});
baseDirective.directive("dboolean",function(){
	return{
        restrict:'A',
        scope:{
        	dlabel:'@',
        	fieldvalue:'=',
        	doptions:'=',
        	dsize:'=',/*输入框长度,文本编辑区高度*/
        },
        template:
        	"<div class='form-group row'>"
				 +"<label class='col-md-4'>{{dlabel}}:</label>"
			 +   "<div class='col-md-8'>"
			 +      "<input type='checkbox' ng-model='fieldvalue' value='是' /> &nbsp;&nbsp;" 
			 +   "</div>"
		   +"</div>"
   };
});
