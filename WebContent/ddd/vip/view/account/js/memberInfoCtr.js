define([ 'app' ], function(app) {
	app.controller('memberInfoCtr', ['$rootScope','$scope','modifyAccountService','angularPermission',
			function($rootScope,$scope, modifyAccountService, angularPermission) {
				$scope.initMemberData = function() {
					modifyAccountService.getCurrentMember(sucesscb,errorcb);
					function sucesscb(data) {
						$scope.member = data;
						initBaseInfoSelect();
						initDetailInfoSelect();
					};
					
					function errorcb(data) {
						alert("加载失败!\n");
					};
				}
				$scope.updateMember = function(member) {
					modifyAccountService.updateMemberInfo({member:member},sucesscb,errorcb);
					function sucesscb(data) {
						if (data != null) {
							$rootScope.app.notify('保存成功!');
						} else {
							$rootScope.app.error('保存失败!');
						}
					}
					function errorcb() {
						$rootScope.app.error('保存失败!');
					}
				};
				function initDetailInfoSelect() {
					$scope.allBloodType = [ 'A', 'B', 'C', 'O', 'AO', 'BO' ];
					$scope.allMaritalStatus = [ '单身', '已婚', '恋爱', '离异', '未知' ];
					$scope.allEduStatus = [ '博士', '硕士', '研究生', '大学生', '高中生',
							'其他' ];
					$scope.types = [ '教职工', '本科生', '研究生', '其他' ];
				}
				function initBaseInfoSelect() {
					$scope.allCareer = [ '老师', '学生', '作者', '科学家', '老总', '其他' ];
				}
			} ]);
});