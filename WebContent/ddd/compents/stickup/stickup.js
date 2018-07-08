angular.module('stickupApp', [])
.directive('stickup', ['$interpolate',function ($interpolate) {
  return {
    link:function (scope, element, attrs, ngModelCtrl) {
    	$(element).stickUp();
    }
  };
}]);