angular.module('asynchroMarkApp',[]).factory('asynchroMarkService', function(ngDialog,$timeout) {
		var asynchroMark = {};
		var dialogId = 0;
		var openCount = 0;
		var openTimer = null;
		asynchroMark.mask = function(label) {
			if(openCount > 0)
			{
				openCount++;
				return;
			}
			openCount = 1;
			openTimer = $timeout(function(){
				openTimer = null;
				dialogId = ngDialog.open({
					template: '<div>' +
					'<div style="width:150px; margin:0 auto;;text-align:center;"><img src="asset/loading.gif"></img></div>' +
					'<div style="width:100px; margin:0 auto;"><h3>' + label + '</h3></div>' +
					'</div>',
					plain: true,
					closeByEscape: false,
					width: '100px',
					closeByDocument: false,
					showClose: true
				}).id;
			},1000);
		}
		asynchroMark.unmask = function() {
			if(openCount > 1)
			{
				openCount--;
				return;
			}
			openCount = 0;
			if(openTimer != null)
			{
				$timeout.cancel(openTimer);
				openTimer = null;
				return;
			}
			
			$timeout(function(){
					if(dialogId == 0) return;
					ngDialog.close(dialogId, "");
					dialogId = 0;
				},200);
			
		}
		return asynchroMark;
	});
