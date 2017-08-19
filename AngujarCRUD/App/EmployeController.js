//============================DATA ACCESS SERVICE========================================
myApp.factory('EmployeService', ['$resource', "appSettings", function ($resource, appSettings) {
    return $resource(appSettings.serverPath + '/Employe/Data/:id', { id: '@id' },
    {
        update: {
            method: 'PUT'
        },
        query: {
            method: 'GET',

            isArray: true
        },
        get: {
            method: 'GET',


            isArray: false
        },
        save: {
            method: 'POST'
        },
        'delete': {
            method: 'DELETE'
        }

    });

}]);

//==============================MAIN CONTROLLER====================================================
myApp.controller("EmployeController", ["$scope", "$state", "$location", "$stateParams", "$modal", "EmployeService",
    function ($scope, $state, $location, $stateParams, $modal, EmployeService) {
       
        $scope.hasLoad = true;
        $scope.showAlert = false;
        $scope.message = "";
        $scope.hideAlert = function () {
            $scope.showAlert = false;
        }
        $scope.loader = {
            loading: false
        };

        $scope.showloader = function () {
            $scope.loader.loading = true;
        }
        $scope.hideloader = function () {
            $scope.loader.loading = false;
        }
        $scope.refresh = function () {
            $state.reload();
        }

        $scope.toggleExpand = function (expand) {
            $scope.isOpen = expand;
        };

        $scope.accordionExpanded = false;
        $scope.isOpen = false;
        $scope.IsinDb = false;
        $scope.changeClops = function () {
            if ($scope.searchQuery) {
                $scope.accordionExpanded = true;
                $scope.isOpen = true;
            } else {
                $scope.accordionExpanded = false;
                $scope.isOpen = false;
            }
        }
        //========================GET===================================================



        $scope.search = function () {
            EmployeService.query({
                q: $scope.query,
                limit: $scope.limit,
                offset: $scope.offset
            },
                function (items) {
                    $scope.more = items.length === 20;
                    $scope.accountheads = $scope.accountheads.concat(items);
                }
            );
        };
        $scope.sort = function (col) {
            if ($scope.sort_order === col) {
                $scope.desc = !$scope.desc;
            } else {
                $scope.sort_order = col;
                $scope.desc = false;
            }
        };

        $scope.reset = function () {
            $scope.sort_order = 'Name';
            $scope.desc = false;
            $scope.offset = 0;
            $scope.accountheads = [];
            $scope.more = true;
            $scope.limit = 20;
            $scope.search();
        };

        $scope.show_more = function () {
            $scope.showloader();
            $scope.offset += $scope.limit;
            $scope.search();
            $scope.hideloader();
        };

        $scope.has_more = function () {
            return $scope.more;
        }

        $scope.reset();

        //========================UPDATE================================================
        $scope.update = function (item) {
            EmployeService.update({ id: item.Id }, item, function () {
                $scope.message = "Accounthead Update Successfully!!!";
                $scope.showAlert = true;
                $scope.reset();
            });
        };
        //========================INSERT================================================
        $scope.save = function (item) {
            EmployeService.save(item, function () {
                $scope.message = "Accounthead Insert Successfully!!!";
                $scope.showAlert = true;
                $scope.reset();
            });
        };
        //========================DELET================================================
        $scope.deleteItem = function (id) {

            //dialogsService.confirm('Are you sure you want to Delete this item?', 'Delete?', ['OK', 'Cancel'])
            //    .then(function () {
            //        //var itemId = this.product.Id;
            //        EmployeService.delete({ id: id }, function () {
            //            $("#item_" + id).fadeOut();
            //            $scope.message = "Accounthead Deteted Successfully!!!";
            //            $scope.showAlert = true;
            //            $scope.reset();
            //        });
            //    });
        }
        
        //==============================CALL MODAL=====================================
        $scope.editItem = function (item) {
         var modalInstance = $modal.open({
                templateUrl: '/Employe/Create',
                controller: 'EditEmployeController',
                resolve: {
                    data: function () {
                        return {
                            itemToEdit: item
                        };
                    }
                }
            });

            modalInstance.result.then(function (result) {
                result.Id = $stateParams.id;
                if (item) {
                    result.Id = item.Id;
                    $scope.update(result);
                } else {
                    $scope.save(result);
                }
            });
        }
    }
]);

//===========================MODAL CONTROLLER==================================
myApp.controller("EditEmployeController", ["$scope", "$modalInstance", "data",
    function ($scope, $modalInstance, data) {

        $scope.editableItem = angular.copy(data.itemToEdit);
        console.log(data.itemToEdit);
        $scope.title = (data.itemToEdit ? 'Edit Employee' : 'Add New Employee');
        $scope.cancel = function () {
            $modalInstance.dismiss();
        }
        $scope.save = function (formName) {
            if (formName.$valid) {
               // $modalInstance.close($scope.editableItem);
            }

        }
    }]);