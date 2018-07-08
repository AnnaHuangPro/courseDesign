angular.module("exportAndImportApp", [])
.directive("dataimport",function($rootScope)
{
	return {
		restrict:'E',
		scope:{
			importConfigKey:'@',
			buttonName:'@'
		},
		templateUrl:"compents/exportAndImport/asset/template.html",
		controller : ["$scope","ExportAndImportService",function($scope,ExportAndImportService) {
			$scope.import = function(){
				ExportAndImportService.importDataFromFile($scope.importConfigKey,function(data){alert("成功")},function(){alert("失败")});
			}
		}]
    }
})
.factory("exportAndImportService", [ "$resource", function($resource) {
	var obj = {},
		_service = $resource('../ExportAndImport/:method', {});
		
	function isNumber(judgeOrder) {
		return !Number.isNaN( Number(judgeOrder) );
	}
	
	obj.export = function( configKey, ids ) {
		var _ids = [];
		
		if ( angular.isArray( ids ) ) {
			var index = ids.length;
			do {
				var item = ids[--index];
				
				/* item为对象 */
				if( !angular.isArray(item) && angular.isObject(item) ) {/* angular.isObject在是Object和Array都为true */
					var _id = item.EId || item.eId || item.eid;
					if ( isNumber(_id) ) {
						_ids.push( Number.parseInt( _id ) );
					}
				}else if( isNumber( item ) ) {
					_ids.push( Number.parseInt( item ) );
				}
				
			} while (index)
				
		}else if ( angular.isObject( ids ) ) {
			var _id = ids.EId || ids.eId || ids.eid;
			if ( isNumber( _id ) ) {
				_ids.push( Number.parseInt( _id ) );
			}
			
		}else if ( isNumber( ids ) ) {
			_ids.push( Number.parseInt( ids ) );
		}
		
		if( _ids.length === 0 || typeof configKey !== 'string')
			return;
		
		return _service.save({method:'exportByConfigkeyAndIds'},{configKey:configKey,ids:_ids});
	}
	
	obj.importByFile = function(path){
		if( !angular.isString(path) )
			return;
		return _service.save({method:'importByFile'},{path:path});
	}
	
	return obj;
} ])
/**

 * 点击将绑定对象导出成json文件
 * 注意：ng-model可以绑定为 数组、单个对象或单个数字，数组项只能由对象（包含EId）或纯数字组成，单个对象必须包含EId
 * 使用：<elem export-btn configKey(必须)='name|{bindVariName}' successfn(可选)='fn()'  ng-model='(变量名)->[1,2] | [{eid:1},{EId:2}] | 1 | {eid:1}'></elem>
 * 返回：
 * {
 * 		isSuccess:是否成功，
 * 		message:json字符串 | 失败原因
 * }
 *  
 */
.directive('exportBtn',['exportAndImportService',function(exportAndImportService){
	return {
		restrict:'A',
		require:'?ngModel',
		link:function( scope, elem, attr, ngModelCtr) {
			var _outClickFnName = attr.ngClick ? attr.ngClick.slice(0,attr.ngClick.length-2) : "",
				_successFnName = attr.successfn ? attr.successfn.slice(0,attr.successfn.length-2) : "";
			
			elem.on("click",function() {
				
				if( _outClickFnName ) {
					scope[_outClickFnName]();
				}
				
				if( attr.ngModel && attr.configkey ) {
					var _promise = exportAndImportService.export( attr.configkey, scope[attr.ngModel] ).$promise;
					_promise.then( 
							function(obj) {
								
								if( !obj.isSuccess ) {
									alert( obj.message );
								}
								
								if( typeof scope[_successFnName] === 'function') {
									scope[_successFnName]( obj );
								}else{
									alert("导出成功!");
								}
							},
							function(error) {
								/* 服务器错误处理 */
							}
					);
				}
			})
		}
	}
}])
.directive('importBtn',['exportAndImportService','$http',function(exportAndImportService,$http){
	return {
		restrict:'E',
		replace:false,
		scope:{
			
		},
		templateUrl:'compents/exportAndImport/asset/importTemp.html',
		link:function( scope, elem, attr ) {
			
			elem.find("input").bind("change",function(changeEvent){
				var _file = changeEvent.target.files;
				if(! /text\/\w+/.test(_file[0].type)){
					alert("请选择文本文件！");
					return;
				}
				
				uploadTemporaryFile(_file[0]);
			});
			
			function uploadTemporaryFile(file){
				var fd = new FormData();
				fd.append("temporaryFile",file);
				
				var _uploadPromise = $http.post("/DDD3/UploadServlet?isTemporary=true", fd, {
					transformRequest: angular.identity,
					headers: {'Content-Type': undefined}
				});
				
				_uploadPromise.then(
					function( obj ) {
						var _importPromise = exportAndImportService.importByFile(obj.data).$promise;
						_importPromise.then(
								function() {
									alert("导入成功!");
								},
								function(error) {
									alert("导入失败!");
								}
						);
					},
					function(){
						alert("上传失败！");
					}
				);
				
			}
			
		}
		
	}
}] )


