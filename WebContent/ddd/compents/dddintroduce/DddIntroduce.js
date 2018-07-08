angular.module("dddintroduceApp", []).directive(
		"dddintroduce",["EntityTipsService",
		function(EntityTipsService) {
			return {
				restrict : 'E',
				scope : {
					name:'@'
				},
				
				link: function(scope, element, attrs, ngModelController) {
					
				},
				templateUrl:'compents/dddintroduce/asset/Template.html',
				controller : function($scope,EntityTipsService) {

					$scope.importFields =  [];
					
		    		this.loadProperties = function(){
		    			
						EntityTipsService.findEntityTipsByName($scope.name,successcb,faultcb);
					
						function successcb(data){
							if(data[0]!=null){
							 var properties = data[0].entityAttr;
							
							 $scope.importFields.push(properties);
							}
		    				
			    		};
			    		function faultcb(){
			    		};
		    		}					
		    		this.loadProperties();
					
					
				}
			}
}]);