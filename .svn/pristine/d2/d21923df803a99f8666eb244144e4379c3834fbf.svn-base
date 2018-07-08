(function ( angular ) {
    'use strict';
    angular.module( 'menuControl', [] )
    .directive(
		"menucontrolnew",["$rootScope","$state","$location",
		function($rootScope,$state,$location) {
			return {
				restrict : 'E',
				 scope: {
	                    menuModel: "=",
	                },
				
				link: function(scope, element, attrs) {
					scope.$watch("menuModel",function(newVal,oldVal){
						if(newVal){
							if(w2ui['mynode']){
								w2ui['mynode'].destroy();
							}
							
							$rootScope.treeData = newVal;
							$rootScope.treeData.onClick=function (event) {
								var node = event.object;
								if((node.routeData != null && node.routeData != "") || (node.location != null && node.location != "")){
									if(event.object.nodes != null && event.object.nodes.length !=0){
										//模块自己配错了，父级木块还有路由
									}else{
										if(event.object && event.object != ""){
											if(event.object.location){
												scope.$apply(function(){
													$location.path(event.object.location);
												})
											}else if(event.object.routeData ){
												var paramsStr = event.object.routeParamsObj || '{}';
												$state.go(event.object.routeData,angular.fromJson(paramsStr));
											}
										}
									}
								}else{
									if(event.object.nodes == null || event.object.nodes.length ==0){
										throw new Error("没有找到  "+event.object.text+"  的路由");
									}
								}
						     };
							$('#mySidebar').w2sidebar($rootScope.treeData);
							//默认展开全部系统模块
							if($rootScope.treeData && $rootScope.treeData.nodes){
								for(var i =0;i<$rootScope.treeData.nodes.length;i++){
									var firstSystemId = $rootScope.treeData.nodes[i].id;
									w2ui['mynode'].toggle(firstSystemId);
								}
							}
							
						}
					})
				},
	                templateUrl:'simple/view/main/js/menu-tree/asset/Template.html'
			}
}])
        .directive( 'menucontrol', ['$compile', function( $compile ) {
            /**
             * @param cssClass - the css class
             * @param addClassProperty - should we wrap the class name with class=""
             */
            function classIfDefined(cssClass, addClassProperty) {
                if (cssClass) {
                    if (addClassProperty)
                        return 'class="' + cssClass + '"';
                    else
                        return cssClass;
                }
                else
                    return "";
            }
            
            function ensureDefault(obj, prop, value) {
                if (!obj.hasOwnProperty(prop))
                    obj[prop] = value;
            }
            
            return {
                restrict: 'EA',
                require: "menucontrol",
                transclude: true,
                scope: {
                    menuModel: "=",
                    selectedNode: "=?",
                    selectedNodes: "=?",
                    expandedNodes: "=?",
                    onSelection: "&",
                    onNodeToggle: "&",
                    options: "=?",
                    orderBy: "@",
                    reverseOrder: "@",
                    filterExpression: "=?",
                    filterComparator: "=?"
                },
                controller: ['$scope', function( $scope ) {

                    function defaultIsLeaf(node) {
                        return !node[$scope.options.nodeChildren] || node[$scope.options.nodeChildren].length === 0;
                    }

                    function shallowCopy(src, dst) {
                        if (angular.isArray(src)) {
                            dst = dst || [];

                            for ( var i = 0; i < src.length; i++) {
                                dst[i] = src[i];
                            }
                        } else if (angular.isObject(src)) {
                            dst = dst || {};

                            for (var key in src) {
                                if (hasOwnProperty.call(src, key) && !(key.charAt(0) === '$' && key.charAt(1) === '$')) {
                                    dst[key] = src[key];
                                }
                            }
                        }

                        return dst || src;
                    }
                    function defaultEquality(a, b) {
                        if (a === undefined || b === undefined)
                            return false;
                        a = shallowCopy(a);
                        a[$scope.options.nodeChildren] = [];
                        b = shallowCopy(b);
                        b[$scope.options.nodeChildren] = [];
                        return angular.equals(a, b);
                    }

                    $scope.options = $scope.options || {};
                    ensureDefault($scope.options, "multiSelection", false);
                    ensureDefault($scope.options, "nodeChildren", "children");
                    ensureDefault($scope.options, "dirSelectable", "true");
                    ensureDefault($scope.options, "injectClasses", {});
                    ensureDefault($scope.options.injectClasses, "ul", "");
                    ensureDefault($scope.options.injectClasses, "li", "");
                    ensureDefault($scope.options.injectClasses, "liSelected", "");
                    ensureDefault($scope.options.injectClasses, "iExpanded", "");
                    ensureDefault($scope.options.injectClasses, "iCollapsed", "");
                    ensureDefault($scope.options.injectClasses, "iLeaf", "");
                    ensureDefault($scope.options.injectClasses, "label", "");
                    ensureDefault($scope.options.injectClasses, "labelSelected", "");
                    ensureDefault($scope.options, "equality", defaultEquality);
                    ensureDefault($scope.options, "isLeaf", defaultIsLeaf);

                    $scope.selectedNodes = $scope.selectedNodes || [];
                    $scope.expandedNodes = $scope.expandedNodes || [];
                    $scope.expandedNodesMap = {};
                    for (var i=0; i < $scope.expandedNodes.length; i++) {
                        $scope.expandedNodesMap[""+i] = $scope.expandedNodes[i];
                    }
                    $scope.parentScopeOfmenu = $scope.$parent;


                    function isSelectedNode(node) {
                        if (!$scope.options.multiSelection && ($scope.options.equality(node, $scope.selectedNode)))
                            return true;
                        else if ($scope.options.multiSelection && $scope.selectedNodes) {
                            for (var i = 0; (i < $scope.selectedNodes.length); i++) {
                                if ($scope.options.equality(node, $scope.selectedNodes[i])) {
                                    return true;
                                }
                            }
                            return false;
                        }
                    }

                    $scope.headClass = function(node) {
                        var liSelectionClass = classIfDefined($scope.options.injectClasses.liSelected, false);
                        var injectSelectionClass = "";
                        if (liSelectionClass && isSelectedNode(node))
                            injectSelectionClass = " " + liSelectionClass;
                        if ($scope.options.isLeaf(node))
                            return "menu-leaf" + injectSelectionClass;
                        if ($scope.expandedNodesMap[this.$id])
                            return "menu-expanded" + injectSelectionClass;
                        else
                            return "menu-collapsed" + injectSelectionClass;
                    };
                    
                    /**获取节点展开状态对应的样式类*/
                    $scope.nodeExpandedStyleClass = function(node) {
                        var liSelectionClass = classIfDefined($scope.options.injectClasses.liSelected, false);
                        var injectSelectionClass = "";
                        if (liSelectionClass && isSelectedNode(node))
                            injectSelectionClass = " " + liSelectionClass;
                        if ($scope.options.isLeaf(node))
                            return "";
                        if ($scope.expandedNodesMap[this.$id])
                            return "SelectedParentNode";
                        else
                            return "";
                    };
                    
                    $scope.iBranchClass = function() {
                        if ($scope.expandedNodesMap[this.$id])
                            return classIfDefined($scope.options.injectClasses.iExpanded);
                        else
                            return classIfDefined($scope.options.injectClasses.iCollapsed);
                    };

                    $scope.nodeExpanded = function() {
                        return !!$scope.expandedNodesMap[this.$id];
                    };

                    $scope.selectNodeHead = function() {
                        var expanding = $scope.expandedNodesMap[this.$id] === undefined;
                        $scope.expandedNodesMap[this.$id] = (expanding ? this.node : undefined);
                        if (expanding) {
                            $scope.expandedNodes.push(this.node);
                        }
                        else {
                            var index;
                            for (var i=0; (i < $scope.expandedNodes.length) && !index; i++) {
                                if ($scope.options.equality($scope.expandedNodes[i], this.node)) {
                                    index = i;
                                }
                            }
                            if (index != undefined)
                                $scope.expandedNodes.splice(index, 1);
                        }
                        if ($scope.onNodeToggle)
                            $scope.onNodeToggle({node: this.node, expanded: expanding});
                    };

                    $scope.selectNodeLabel = function( selectedNode ){
                        if (selectedNode[$scope.options.nodeChildren] && selectedNode[$scope.options.nodeChildren].length > 0 &&
                            !$scope.options.dirSelectable) {
                            this.selectNodeHead();
                        }
                        else {
                            var selected = false;
                            if ($scope.options.multiSelection) {
                                var pos = -1;
                                for (var i=0; i < $scope.selectedNodes.length; i++) {
                                    if($scope.options.equality(selectedNode, $scope.selectedNodes[i])) {
                                        pos = i;
                                        break;
                                    }
                                }
                                if (pos === -1) {
                                    $scope.selectedNodes.push(selectedNode);
                                    selected = true;
                                } else {
                                    $scope.selectedNodes.splice(pos, 1);
                                }
                            } else {
                                if (!$scope.options.equality(selectedNode, $scope.selectedNode)) {
                                    $scope.selectedNode = selectedNode;
                                    selected = true;
                                }
                                else {
                                    $scope.selectedNode = undefined;
                                }
                            }
                            if ($scope.onSelection)
                                $scope.onSelection({node: selectedNode, selected: selected});
                        }
                    };

                    $scope.selectedClass = function(node) {
                        var isThisNodeSelected = isSelectedNode(this.node);
                        var labelSelectionClass = classIfDefined($scope.options.injectClasses.labelSelected, false);
                        var injectSelectionClass = "";
                        if (labelSelectionClass && isThisNodeSelected) {
                            injectSelectionClass = " " + labelSelectionClass; 
                        }

                        return isThisNodeSelected?"menu-selected"  + injectSelectionClass:"";
                    };
                    
                    $scope.selectedClassInsert = function(node) {
                    	var isThisNodeSelected = isSelectedNode(this.node);
                    	
                    	return isThisNodeSelected?"| ":"";
                    }
                    
                    $scope.isChildNodeInsert = function(node) {
                    	if ($scope.options.isLeaf(node)) {
                    		if(isSelectedNode(this.node))
                    			return "InsertSelectedChildNode";
                    		else 
                    			return "InsertChildNode";
                    	}
                    	else return "InsertParentNode";
                    }
                    
                    //menu template
                    var orderBy = $scope.orderBy ? ' | orderBy:orderBy:reverseOrder' : '';
                    var template =
                        '<ul '+classIfDefined($scope.options.injectClasses.ul, true)+'>' +
                            '<li ng-repeat="node in node.' + $scope.options.nodeChildren + ' | filter:filterExpression:filterComparator ' + orderBy + '" ng-class="headClass(node)" '+classIfDefined($scope.options.injectClasses.li, true)+'>' +
                            '<div ng-class="nodeExpandedStyleClass(node)" class="{{isChildNodeInsert(node)}}">' +
                            '<span class={{node.iconClass}} ></span><span class="selectedNode">{{selectedClassInsert(node)}}</span>' +
                            '<div class="menu-label '+classIfDefined($scope.options.injectClasses.label, false)+'" ng-class="selectedClass(node)" ng-click="selectNodeLabel(node)" menu-transclude></div></div>' +
                            '<menuitem  ng-if="nodeExpanded()"></menuitem>' +
                            '</li>' +
                            '</ul>';

                    this.template = $compile(template);
                }],
                compile: function(element, attrs, childTranscludeFn) {
                    return function ( scope, element, attrs, menumodelCntr ) {

                        scope.$watch("menuModel", function updateNodeOnRootScope(newValue) {
                            if (angular.isArray(newValue)) {
                                if (angular.isDefined(scope.node) && angular.equals(scope.node[scope.options.nodeChildren], newValue))
                                    return;
                                scope.node = {};
                                scope.synteticRoot = scope.node;
                                scope.node[scope.options.nodeChildren] = newValue;
                            }
                            else {
                                if (angular.equals(scope.node, newValue))
                                    return;
                                scope.node = newValue;
                            }
                        });

                        scope.$watchCollection('expandedNodes', function(newValue) {
                            var notFoundIds = 0;
                            var newExpandedNodesMap = {};
                            var $liElements = element.find('li');
                            var existingScopes = [];
                            // find all nodes visible on the menu and the scope $id of the scopes including them
                            angular.forEach($liElements, function(liElement) {
                                var $liElement = angular.element(liElement);
                                var liScope = $liElement.scope();
                                existingScopes.push(liScope);
                            });
                            // iterate over the newValue, the new expanded nodes, and for each find it in the existingNodesAndScopes
                            // if found, add the mapping $id -> node into newExpandedNodesMap
                            // if not found, add the mapping num -> node into newExpandedNodesMap
                            angular.forEach(newValue, function(newExNode) {
                                var found = false;
                                for (var i=0; (i < existingScopes.length) && !found; i++) {
                                    var existingScope = existingScopes[i];
                                    if (scope.options.equality(newExNode, existingScope.node)) {
                                        newExpandedNodesMap[existingScope.$id] = existingScope.node;
                                        found = true;
                                    }
                                }
                                if (!found)
                                    newExpandedNodesMap[notFoundIds++] = newExNode;
                            });
                            scope.expandedNodesMap = newExpandedNodesMap;
                        });

//                        scope.$watch('expandedNodesMap', function(newValue) {
//
//                        });

                        //Rendering template for a root node
                        menumodelCntr.template( scope, function(clone) {
                            element.html('').append( clone );
                        });
                        // save the transclude function from compile (which is not bound to a scope as apposed to the one from link)
                        // we can fix this to work with the link transclude function with angular 1.2.6. as for angular 1.2.0 we need
                        // to keep using the compile function
                        scope.$menuTransclude = childTranscludeFn;
                    }
                }
            };
        }])
        .directive("menuitem", function() {
            return {
                restrict: 'E',
                require: "^menucontrol",
                link: function( scope, element, attrs, menumodelCntr) {
                    // Rendering template for the current node
                    menumodelCntr.template(scope, function(clone) {
                        element.html('').append(clone);
                    });
                }
            }
        })
        .directive("menuTransclude", function() {
            return {
                link: function(scope, element, attrs, controller) {
                    if (!scope.options.isLeaf(scope.node)) {
                        angular.forEach(scope.expandedNodesMap, function (node, id) {
                            if (scope.options.equality(node, scope.node)) {
                                scope.expandedNodesMap[scope.$id] = scope.node;
                                scope.expandedNodesMap[id] = undefined;
                            }
                        });
                    }
                    if (!scope.options.multiSelection && scope.options.equality(scope.node, scope.selectedNode)) {
                        scope.selectedNode = scope.node;
                    } else if (scope.options.multiSelection) {
                        var newSelectedNodes = [];
                        for (var i = 0; (i < scope.selectedNodes.length); i++) {
                            if (scope.options.equality(scope.node, scope.selectedNodes[i])) {
                                newSelectedNodes.push(scope.node);
                            }
                        }
                        scope.selectedNodes = newSelectedNodes;
                    }

                    // create a scope for the transclusion, whos parent is the parent of the menu control
                    scope.transcludeScope = scope.parentScopeOfmenu.$new();
                    scope.transcludeScope.node = scope.node;
                    scope.transcludeScope.$parentNode = (scope.$parent.node === scope.synteticRoot)?null:scope.$parent.node;
                    scope.transcludeScope.$index = scope.$index;
                    scope.transcludeScope.$first = scope.$first;
                    scope.transcludeScope.$middle = scope.$middle;
                    scope.transcludeScope.$last = scope.$last;
                    scope.transcludeScope.$odd = scope.$odd;
                    scope.transcludeScope.$even = scope.$even;
                    scope.$on('$destroy', function() {
                        scope.transcludeScope.$destroy();
                    });

                    scope.$menuTransclude(scope.transcludeScope, function(clone) {
                        element.empty();
                        element.append(clone);
                    });
                }
            }
        });
})( angular );
