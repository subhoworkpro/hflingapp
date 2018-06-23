app.controller('DashboardController',['$rootScope','$scope','$location' ,'HttpService', '$window', function($rootScope,$scope,$location ,HttpService, $window){
	var vm =this;
	// vm.dashboard = function () {
 //     	 $location.path('/dashboard');
 //    };
  	vm.post = function () {
 		$location.path('/post');
	};

	vm.logout = function () {
 		$location.path('/login');
	};

    vm.login = function () {
        $location.path('/login');
    };

    vm.testing = "Asdasdasdasda";

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

    vm.search = function () {
        $rootScope.loading = true;
        console.log(this.state);
        $rootScope.search.status = "active";
        $rootScope.search.state = this.state;
        $rootScope.search.region = this.region;
        $rootScope.search.category = this.category;
        vm.dataLoading = true;
        console.log("asdasdsa");
        $location.path('/search');
    };

    vm.flagged_search = function () {
        $rootScope.loading = true;
        console.log(this.state);
        $rootScope.search.status = "flagged";
        $rootScope.search.state = this.state;
        $rootScope.search.region = this.region;
        $rootScope.search.category = this.category;
        vm.dataLoading = true;
        console.log("asdasdsa");
        $location.path('/search');
    };

}]);
