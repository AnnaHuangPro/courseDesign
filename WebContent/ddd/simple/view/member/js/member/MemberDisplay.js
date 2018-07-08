angular.module('memberModule', [])
.controller("memberDisplayController",['$rootScope','$scope',"$state",'$stateParams','MemberService',"EntityPropertyDefineService","EntityPropertyService",
function($rootScope,$scope,$state,$stateParams,MemberService,EntityPropertyDefineService,EntityPropertyService)
{
	$scope.propertiesLoad = false;
	$scope.propertiesValueLoad = false;
	
	$scope.hasAdditionField = false;
	
	$scope.getDisplayInitData = function()
	{
		
		MemberService.findMemberById($stateParams.id,sucesscb,errorcb);
		function sucesscb(data){
			$scope.member = data;
		}
		function errorcb(data){
			alert("加载数据失败" +data);
		}	
		
		
		
		//将对应实体的附加字段全部查出用于渲染界面
		/*$scope.propertiesLoad = true;
		EntityPropertyDefineService.findEntityPropertyDefineByType("member",sucesscb,errorcb);
			function sucesscb(data){
				$scope.propertiesLoad = false;
				if(data[0]==null)
					$scope.hasAdditionField = false;
				else
					$scope.hasAdditionField = true;
				$scope.additionFields = data;
			}
			function errorcb(){
				alert("加载附加字段错误");
			}	
			//将某个具体的组织 和 附加字段和附加字段的值 加载出来
			$scope.propertiesValueLoad = true;
			EntityPropertyService.findEntityPropertyByIdandType($stateParams.id,"member",$scope.getDisplayInitDataSuccess,$scope.getDisplayInitDataFail);*/
	}
	
	
	$scope.cancelOperate = function(){
		$rootScope.closeOperateTab();
		$state.go('main.list.member.memberList'); 
	}
	
	/*$scope.getDisplayInitDataSuccess = function(data)
	{
		$scope.organization = data;
		$scope.hasAdditionField = true;
		$scope.propertiesValueLoad = false;
		$scope.organization = data[1];
		var properties = data[0];
		if(properties!=null){
			angular.forEach(properties,function(value,key){
				if($scope.additionFields[key]!=null){
					$scope.additionFields[key].defaultValue = value.stringValue;
				}
			})
		}
	}
	
	$scope.getDisplayInitDataFail = function()
	{
		alert('加载失败');
	}*/
}]);