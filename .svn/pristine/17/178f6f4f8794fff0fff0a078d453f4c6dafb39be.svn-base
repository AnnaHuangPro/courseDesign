angular.module('modifyPasswordFormModule', []).controller(
		'modifyPasswordFormController',
		function($scope, $rootScope, angularPermission, OperatorService,
				dialogs) {
			$scope.opeId = angularPermission.getLoginUser().eId;
			$scope.lower = false;
			$scope.medium = false;
			$scope.high = false;
			$scope.securitylevel = "";
			$scope.newPawdHint = "";
			$scope.correct = true;

			/*
			 * var pattern_d = /^\d+$/; //全数字 var pattern_s = /^[A-Za-z]+$/
			 * //全字符 var pattern_w = /^\w+$/; //数字或者字符 var pattern_W = /^\W+$/
			 * //全非数字也非字符 var pattern_r = /^\w+\W+[\w\W]*\w+$/ //以字母或者数字开头结尾的字符串
			 */
			$scope.$watch('newPawd', function(newVal, oldVal) {
				if (newVal != oldVal) {
					if (!newVal) {
						$scope.lower = false;
						$scope.medium = false;
						$scope.high = false;
					} else if (newVal.length < 3) {
						$scope.lower = false;
						$scope.medium = false;
						$scope.high = false;
					} else if (newVal.length < 5 && newVal.length >= 3) {
						$scope.lower = true;
						$scope.medium = false;
						$scope.high = false;
						$scope.securitylevel = "欠佳";
					} else if (newVal.length >= 5 && newVal.length <= 10) {
						$scope.lower = true;
						$scope.medium = true;
						$scope.high = false;
						$scope.securitylevel = "可以";
					} else if (newVal.length > 10 && newVal.length <= 12) {
						$scope.lower = true;
						$scope.medium = true;
						$scope.high = true;
						$scope.securitylevel = "厉害";
					} else if (newVal.length > 16) {
						$rootScope.app.error("密码不能超过16位噢!");
						$scope.newPawd = newVal.slice(0, 16);
					}
				}

			})
			$scope.valideNewPwdInfo = function() {

				if (angular.equals($scope.newPawd, $scope.newPawdConfirm)) {
					$scope.newPawdHint = "√";
					$scope.correct = true;
				} else {
					$scope.newPawdHint = "两次输入密码不一致 !";
					$scope.correct = false;

				}
			}
			$scope.clearValidInfo = function() {
				$scope.newPawdHint = "";
				$scope.correct = false;

			}
			$scope.change = function() {
				$scope.oldPawdT = hex_md5($scope.oldPawd);
				$scope.newPawdT = hex_md5($scope.newPawd);
				OperatorService.changePasswd($scope.opeId, $scope.newPawdT,
						$scope.oldPawdT, successCB, errorCB);
				function successCB(data) {
					if (data > 0) {
						alert("修改成功");
						$rootScope.closeOperateTab();
					} else {
						$scope.oldPawdHint = "当前输入密码有误";
					}
				}
				;
				function errorCB(error) {
					console.log("cancel");
				}
			}
			$scope.cancel = function() {
				$rootScope.closeOperateTab();
			};

		});
