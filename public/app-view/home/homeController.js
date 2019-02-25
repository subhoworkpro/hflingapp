app.controller('HomeController', ['$rootScope','$scope', '$location','$window','FlashService', function( $rootScope,$scope,$location,$window,FlashService ){
    var vm = this;

    $rootScope.pageTitle = "Healthy Fling";

    $rootScope.savedPreference = $window.localStorage.getItem("healthyfling_preference");

    if ($rootScope.savedPreference == "locked") {
        $rootScope.search.country = $window.localStorage.getItem("healthyfling_preference_country") || "Country";
        $rootScope.search.state = $window.localStorage.getItem("healthyfling_preference_state") || "State";
        $rootScope.search.region = $window.localStorage.getItem("healthyfling_preference_region") || "Region";
        $rootScope.search.category = $window.localStorage.getItem("healthyfling_preference_category") || "Category";
    }
    

    vm.country = $rootScope.search.country;
    vm.state = $rootScope.search.state;
    vm.region = $rootScope.search.region;
    vm.category = $rootScope.search.category;

    $scope.countries = $rootScope.countryList;
    $scope.states = $rootScope.stateList;
    $scope.regions = $rootScope.regionList;

    $scope.savedPreference = ($rootScope.savedPreference == "locked");
    vm.savedPreference = ($rootScope.savedPreference == "locked");

    if ($scope.regions && $scope.regions.indexOf("Region") == -1){
        $scope.regions.unshift("Region");
    }
    $scope.categories = $rootScope.categoryList;

    $scope.changeListInCtrl = function(data){
        if(data != "" && data != undefined && data != "State"){
            $rootScope.regionList = $rootScope.masterList[data];
            console.log("list updated:"+data);
            $scope.regions = $rootScope.regionList
            $scope.regions.unshift("Region");
        }else{
            $scope.regions = ['Region'];
        }
   };


    console.log("Inside Home Controller");

    vm.post = function () {
        vm.dataLoading = true;
        console.log("asdasdsa");
        $location.path('/post');
    };

    vm.lockPreference = function () {
        $window.localStorage.setItem("healthyfling_preference","locked");
        $window.localStorage.setItem("healthyfling_preference_country",this.country);
        $window.localStorage.setItem("healthyfling_preference_state",this.state);
        $window.localStorage.setItem("healthyfling_preference_region",this.region);
        $window.localStorage.setItem("healthyfling_preference_category",this.category);
        $rootScope.savedPreference = true;
        vm.savedPreference = true;
        $scope.savedPreference = "locked";
        FlashService.Success("Your preference has been saved.");
        console.log("preference locked");
    };

    vm.unlockPreference = function () {
        $window.localStorage.setItem("healthyfling_preference","unlocked");
        $rootScope.savedPreference = false;
        vm.savedPreference = false;
        $scope.savedPreference = "unlocked";
        FlashService.Success("Your preference has been deleted.");
        console.log("preference unlocked");  
    };

    vm.search = function () {
        $rootScope.loading = true;
        console.log(this.state);
        $rootScope.search.country = this.country;
        $rootScope.search.state = this.state;
        $rootScope.search.region = this.region;
        $rootScope.search.category = this.category;
        vm.dataLoading = true;
        console.log("asdasdsa");
        $location.path('/search');
    };

}]);