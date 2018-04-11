app.controller('HomeController', ['$rootScope','$scope', '$location', function( $rootScope,$scope,$location ){
    var vm = this;

    $rootScope.pageTitle = "Healthy Fling";

    vm.state = "State";
    vm.region = "Region";
    vm.category = "Category";

    $scope.states = $rootScope.stateList;
    $scope.regions = $rootScope.regionList;
    if ($scope.regions && $scope.regions.indexOf("Region") == -1){
        $scope.regions.unshift("Region");
    }
    $scope.categories = $rootScope.categoryList;

    $scope.changeListInCtrl = function(data){
        $rootScope.regionList = $rootScope.masterList[data];
        console.log("list updated:"+data);
        $scope.regions = $rootScope.regionList
        $scope.regions.unshift("Region");
   };


    console.log("Inside Home Controller");

    vm.post = function () {
        vm.dataLoading = true;
        console.log("asdasdsa");
        $location.path('/post');
    };

    vm.search = function () {
        $rootScope.loading = true;
        console.log(this.state);
        $rootScope.search.state = this.state;
        $rootScope.search.region = this.region;
        $rootScope.search.category = this.category;
        vm.dataLoading = true;
        console.log("asdasdsa");
        $location.path('/search');
    };

}]);