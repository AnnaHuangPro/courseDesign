define(['codemirror/mode/velocity/velocity', 'codemirror/mode/sql/sql', ],
function() {
    return angular.module('viewTreeModule', []).controller('viewTreeFormController1', ['$rootScope', '$stateParams', '$scope', '$state', 'ViewTreeService', 'dialogs',
    function($rootScope, $stateParams, $scope, $state, ViewTreeService, dialogs) {

        $scope.init = function() {

            if ($stateParams.operate != 'add') {
                function sucessCB(data) {
                    $scope.viewTree = data;
                    $scope.refreshNodeGrid();
                };
                function errorCB(error) {
                    dialogs.error('加载数据失败!');
                }
                ViewTreeService.findViewTreeById($stateParams.id, sucessCB, errorCB);
            } else {

}
        };

        $scope.refreshNodeGrid = function() {
            $rootScope.getController('treeNodeGrid1', 'ddatagrid').setDataGridProviders($scope.viewTree.viewTreeNodes);
        }
        $scope.deleteNode = function(node) {
            for (var i = 0; i < $scope.viewTree.viewTreeNodes.length; i++) {
                if ($scope.viewTree.viewTreeNodes[i].eId == node.eId) {
                    $scope.viewTree.viewTreeNodes.splice(i, 1);
                    break;
                }
            }
            $scope.refreshNodeGrid();
        }
        $scope.alertNodeDialog = function(node) {
            node = node || {};
            var dlg = dialogs.create('simple/view/tree/html/viewTreeNode/ViewTreeNodeForm.html', 'treeNodeDialogCtr', {
                viewTreeNode: node
            },
            {
                size: 'md',
                backdrop: true,
                animation: true
            });
            dlg.result.then(function(viewTreeNode) {
                if (viewTreeNode.eId) {
                    for (var i = 0; i < $scope.viewTree.viewTreeNodes.length; i++) {
                        if ($scope.viewTree.viewTreeNodes[i].eId == viewTreeNode.eId) {
                            $scope.viewTree.viewTreeNodes[i] = viewTreeNode;
                            break;
                        }
                    }
                } else {
                	$scope.viewTree.viewTreeNodes = [];
                    $scope.viewTree.viewTreeNodes.push(viewTreeNode);
                }
                $scope.refreshNodeGrid();
            })
        }

        $scope.saveViewTree = function() {
            if ($stateParams.operate == 'add') {
                $scope.addViewTree();
            } else if ($stateParams.operate == 'edit') {
                $scope.updateViewTree();
            }
        };
        $scope.addViewTree = function() {
            function sucessCB(data) {
                dialogs.notify('结果', '添加成功!', {
                    size: 'sm'
                });
                $scope.$broadcast('refreshCurrentPageData');
                refreshGrid();
                $scope.back();

            }
            function errorCB(error) {
                $rootScope.openErrorDialog(error);
            }

            ViewTreeService.saveViewTree($scope.viewTree, sucessCB, errorCB);
        };
        $scope.cancelOperate = function() {
            $scope.closeOperateTab();
            if (!$scope.selectTab("viewTreeList")) {
                $state.go('main.list.viewTree.viewTreeList');
            }
        }
        $scope.updateViewTree = function() {
            function sucessCB(data) {
                dialogs.notify('结果', '修改成功!', {
                    size: 'sm'
                });
                refreshGrid();
                $scope.back();
            }
            function errorCB(error) {
                $rootScope.openErrorDialog(error);
            }

            ViewTreeService.updateViewTree($scope.viewTree, sucessCB, errorCB);
        };

        //	$scope.refreshGrid = function() {
        //		var controller = $rootScope.getController(
        //				"viewTreeListGrid", "ddatagrid");
        //		if (controller) {
        //			controller.refreshCurrent();
        //		} else {
        //			//
        //		}
        //	}
        function refreshGrid() {
            $scope.refreshGrid("viewTreeListGrid");
        }
        $scope.back = function() {
            $scope.turnToTab(true, "viewTreeList", "main.list.viewTree.viewTreeList");
        }
        $scope.operationColumns = [];

        var editColumn = {};
        editColumn.click = $scope.alertNodeDialog;
        editColumn.label = '编辑';
        editColumn.icon = 'glyphicon glyphicon-edit';
        editColumn.permission = 'viewTree_edit';
        $scope.operationColumns.push(editColumn);

        var deleteColumn = {};
        deleteColumn.click = $scope.deleteNode;
        deleteColumn.label = '删除';
        deleteColumn.icon = 'glyphicon glyphicon-remove-circle';
        deleteColumn.permission = 'viewTree_delete';
        $scope.operationColumns.push(deleteColumn);

    }]).controller("treeNodeDialogCtr", ['data', '$rootScope', '$scope', '$uibModalInstance',
    function(data, $rootScope, $scope, $uibModalInstance) {
        $scope = angular.extend($scope, data);
        $scope.editorOpt = {
            mode: 'text/x-mariadb',
            theme: 'eclipse'
        };
        $scope.cancel = function() {
            $uibModalInstance.dismiss('取消');
        };
        $scope.save = function() {
            $uibModalInstance.close($scope.viewTreeNode);
        }
    }])
})