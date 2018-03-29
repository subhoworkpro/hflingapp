app.controller('ContactController', ['$rootScope','$scope', '$location', 'HttpService', function( $rootScope,$scope,$location,HttpService ){
    var vm = this;

    $scope.states = $rootScope.stateList;
    $scope.regions = $rootScope.regionList;
    $scope.categories = $rootScope.categoryList;

    $scope.changeListInCtrl = function(data){
        $rootScope.regionList = $rootScope.masterList[data];
        console.log("list updated:"+data);
        $scope.regions = $rootScope.regionList
        $scope.regions.unshift("Region");
   };

   $scope.updateList = function(data){
        $rootScope.regionList = $rootScope.masterList[data];
        console.log("list updated:"+data);
        $scope.regions = $rootScope.regionList
        $scope.regions.unshift("Region");
   };

    vm.state = $rootScope.search.state;
    vm.region = $rootScope.search.region;
    vm.category = $rootScope.search.category;

    vm.post = function () {
        $location.path('/post');
    };

    vm.search = function () {
    	$rootScope.search.state = this.state;
        $rootScope.search.region = this.region;
        $rootScope.search.category = this.category;
        console.log("asdasdsa");
        $location.path('/search');
    };

        console.log("Inside Home Controller");

        vm.post = function () {
            vm.dataLoading = true;
            console.log("asdasdsa");
            $location.path('/post');
        };

        vm.search = function () {
            vm.dataLoading = true;
            console.log("asdasdsa");
            $location.path('/search');
        };


    $scope.notify = function () {
        $rootScope.loading = true;
        var data = {
         "message": $scope.message + "\n\n Regards, \n\n" + $scope.name+"\n\n"+$scope.email ,
            "subject": $scope.subject,
            // "sender1": "healthyfling@gmail.com"
            "sender1": "duttasubh2010@gmail.com"
        };
        HttpService.SendMail(data)
        .then(function(response){
            console.log(response);
            if (response.success == '200' || response.success == '250') {
                console.log("success");
                $rootScope.loading = false;
                alert("Your request has been received!"); 
            }else{
                // FlashService.Error(response.data.resultDescription);
                vm.dataLoading = false;
                $rootScope.loading = false;
                alert("Your request has been received!"); 
                $location.path('/');
            };
            
        });    
        
    };

}]);