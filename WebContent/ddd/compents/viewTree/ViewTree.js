(function(angular) {
	var treeId = 1;
	'use strict';
	angular.module("viewTreeModule", [])
.directive("viewtree",['ViewTreeService','$rootScope',	function(ViewTreeService,$rootScope) {
	return {
		restrict : 'E',
		replace:true,
		scope : {
			viewTreeKey : '=',
			},
			link : function(scope, element, attrs) {
				scope.nodeMap = {};
				scope.nodeLengthMap = {};
				scope.myTreeKey = treeId;
				treeId++;
				scope.$watch("viewTreeKey", function(
						newVal, oldVal) {
					if (newVal) {
						scope.show();
						}
					})
			scope.show = function() {
					// 查询树
					scope.loadData = function() {
						if (scope.viewTreeKey != null&& scope.viewTreeKey != "") {
							ViewTreeService.findViewTreeByKey(scope.viewTreeKey,findViewTreeSCB,findViewTreeECB);
						}
					}
					scope.d =function(event) {
						scope.loadTreeNodeData(scope.nodeMap[event.object.id]);
					}
					scope.clooapse = function(event){
						w2ui[scope.myTreeKey].collapseAll(w2ui[scope.myTreeKey].get(event.object.id));
						var length = scope.nodeLengthMap[event.object.id];
						scope.treeLength -= length;
						scope.treeLength +=5;
						//$('#' + scope.myTreeKey)[0].style.height = scope.treeLength+"px";
					
					}
					scope.expand = function(event){
						var length = scope.nodeLengthMap[event.object.id];
						scope.treeLength += length;
						//$('#' + scope.myTreeKey)[0].style.height = scope.treeLength+"px";
					}
					scope.a = function(event){
//						console.log(event);
					}
					function findViewTreeSCB(data) {
						scope.viewTree = data;
						// 找到一颗viewTree之后就创建一个slider
						scope.root = {
								name : scope.myTreeKey,
								nodes : [],
								onClick : scope.d,
								onFocus: scope.d,
								onMenuClick:scope.d,
								onResize:scope.a,
								onRefresh:scope.a,
								onCollapse:scope.d,
								onExpand:scope.d,
								id : scope.myTreeKey,
						}
						if (w2ui[scope.myTreeKey]) {
							w2ui[scope.myTreeKey].destroy();
						}
						scope.loadTreeNodeData(null);
					};
					
					function findViewTreeECB(	error) {
						alert(error);
					};
					
					// 加载树的结点的数据
					// 节点展开事件 加载数据
					scope.firstLevel = false;
					scope.loadTreeNodeData = function(node) {
						scope.currentNodeToggle = node;
						if(!node){
							scope.currentNodeToggle = {
									nodeIndex : 0,
									isLoad : false
							};
							scope.firstLevel = true;
						}
						// 节点数据没有加载过，则加载
						if (scope.currentNodeToggle.isLoad == false) {
							ViewTreeService.findDataByViewTreeNodeIndex(scope.viewTree.eId,scope.currentNodeToggle,successCB,errorCB);
						}
						scope.$emit("treeSelect",	scope.currentNodeToggle);
					};
						function successCB(data) {
							scope.currentNodeToggle.isLoad = true;
							var datas = data.nodes;
							if(!datas || datas.lenght ==0){
								return;
							}
							// 找到该节点的数据之后
							// 插入数据
							var myNodex = [];
							for (var i = 0, j = datas.length; i < j; i++) {
								scope.nodeMap[datas[i][datas[i].idColumn]] = datas[i];
								var node = {};
								node.id = datas[i][datas[i].idColumn],
								node.name = "node "+datas[i][datas[i].idColumn];
								node.text = datas[i].name,
								node.nodes = [],
								node.img = 'icon-folder'
								myNodex.push(node);
							}
							if (scope.firstLevel) {
								scope.root.nodes = myNodex;
								$('#' + scope.myTreeKey).w2sidebar(scope.root);
								scope.firstLevel = false;
								//初始化高度
								scope.treeLength = myNodex.length *33;
								//$('#' + scope.myTreeKey)[0].style.height = scope.treeLength+"px";
							} else {
								var eid = scope.currentNodeToggle[scope.currentNodeToggle.idColumn];
									scope.nodeLengthMap[eid] = myNodex.length *33;
									w2ui[scope.myTreeKey].insert(w2ui[scope.myTreeKey].get(eid),null,	myNodex);
									w2ui[scope.myTreeKey].expand(eid);
							}
						};
						function errorCB(	error) {
							alert(error);
						};
						scope.loadData();
					}
				},
				templateUrl : function(elem, scope) {
					if (scope.viewTreeKey) {
						return 'compents/viewTree/asset/Template.html';
						} else {
							return 'compents/viewTree/asset/Template.html1';
							}
					}
				};
				}
]);
	})(angular)
