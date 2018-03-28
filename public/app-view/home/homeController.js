app.controller('HomeController', ['$rootScope','$scope', '$location', function( $rootScope,$scope,$location ){
    var vm = this;

    vm.state = "State";
    vm.region = "Region";
    vm.category = "Category";

    $scope.states = $rootScope.stateList;
    $scope.regions = $rootScope.regionList;
    $scope.categories = $rootScope.categoryList;


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