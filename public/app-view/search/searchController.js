app.controller('SearchController', ['$rootScope','$scope','$location' ,'HttpService','$window', function( $rootScope,$scope,$location,HttpService,$window ){
    var vm = this;

    $rootScope.pageTitle = "Healthy Fling";

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

    $rootScope.loading = true;

    $rootScope.adPosts = {};
    console.log("in SearchController");
    // vm.currentPage = 0;
    var path = $location.search();
    console.log(path);
    vm.currentPage = path.page || 0;
    vm.pageSize = 100;

    vm.state = $rootScope.search.state || "State";
    vm.region = $rootScope.search.region || "Region";
    vm.category = $rootScope.search.category || "Category";

     vm.post = function () {
        $location.path('/post');
    };

    vm.search = function () {
        $rootScope.search.state = vm.state;
        $rootScope.search.region = vm.region;
        $rootScope.search.category = vm.category;
        console.log("asdasdsa");
        this.reloadSearch();
    };

    vm.searchAll = function(){
        vm.state = "State";
        vm.region = "Region";
        vm.category = "Category";

        $rootScope.search.state = vm.state;
        $rootScope.search.region = vm.region;
        $rootScope.search.category = vm.category;
        console.log("asdasdsa");
        this.reloadSearch();
    }

    vm.searchFilter = function (state,region,category) {
        if(state == 'State' && region == 'Region'){
            console.log("Do nothing");
        }else{
            // $rootScope.loading = true;
            $rootScope.search.state = state;
            vm.state = state;
            $rootScope.search.region = region;
            vm.region = region;
            $rootScope.search.category = category;
            vm.category = category;
            console.log("asdasdsa");
            this.reloadSearch();
        };
    };

    vm.reloadSearch = function(){
        $rootScope.loading = true;
        HttpService.GetPosts()
        .then(function(response){
            console.log(response);
            if (response.status == '200') {
                $rootScope.adPosts.data = [];

                for(var i = 0;i<response.data.length;i++){
                    $rootScope.adPosts.data.push(response.data[i]);
                }
                console.log("success");
                $rootScope.refreshAds();
                $rootScope.loading = false;
            }else{
                vm.dataLoading = false;
                $location.path('/');
                $rootScope.loading = false;
            };
            
        });
    }

    vm.nextPage = function(){
        vm.currentPage=vm.currentPage+1;
        console.log(vm.currentPage);
        $location.search('page',vm.currentPage);
    }

    vm.prevPage = function(){
        vm.currentPage=vm.currentPage-1;
        console.log(vm.currentPage);
        $location.search('page',vm.currentPage);
    }

    $scope.initController = function () {
        console.log("loading....");
        $rootScope.loading = true;
        HttpService.GetPosts()
        .then(function(response){
            console.log(response);
            if (response.status == '200') {
                $rootScope.visitedSearchPage = true;
                // $rootScope.allCharts.pie.labels = [];
                // $rootScope.allCharts.pie.data = [];
                // for(var i = 0;i<response.data.data.length;i++){
                //     $rootScope.allCharts.pie.labels.push(response.data.data[i][0]);
                //     $rootScope.allCharts.pie.data.push(parseInt(response.data.data[i][1]));
                // }
                // $rootScope.refreshPie();
                $rootScope.adPosts.data = [];

                for(var i = 0;i<response.data.length;i++){
                    $rootScope.adPosts.data.push(response.data[i]);
                    // $rootScope.allCharts.pie.labels.push(response.data.data[i][0]);
                    // $rootScope.allCharts.pie.data.push(parseInt(response.data.data[i][1]));
                }
                console.log("success");
                $rootScope.refreshAds();
                $rootScope.loading = false;
            }else{
                // FlashService.Error(response.data.resultDescription);
                vm.dataLoading = false;
                $location.path('/');
                $rootScope.loading = false;
            };
            
        });

    }

}]);

app.filter('startFrom', function() {
    return function(input, start) {
        start = +start; //parse to int
        if (input) {
            return input.slice(start);
        }else{
            return 0;
        }
        
    }
});

app.filter('roundup', function() {
  return function(input) {
    return Math.ceil(input);
  };
});


app.controller("AdsController",['$scope','$rootScope','$location','HttpService', function ($scope,$rootScope,$location,HttpService) {
  console.log("Inside AdsController ");
  var vm = {};
  vm.state = $rootScope.search.state;
  vm.region = $rootScope.search.region;
  vm.category = $rootScope.search.category;

  $rootScope.loading = true;

  $rootScope.currentPost = {};

   $rootScope.viewDetail = function(data){
        console.log(data);
        $rootScope.currentPost.data = data;
        $location.path("/detail/"+data['_id']);
   }
    
  $rootScope.refreshAds = function(){

    HttpService.GetPosts()
    .then(function(response){
        console.log(response);
        if (response.status == '200') {
            $rootScope.adPosts.data = [];

            if($rootScope.search.region != "Region" && $rootScope.search.region != ""){
                $rootScope.pageTitle = $rootScope.search.region;
            }else{
                $rootScope.pageTitle = "All Regions";
            }

            for(var i = 0;i<response.data.length;i++){
                $rootScope.adPosts.data.push(response.data[i]);
            }
            console.log("success");
            $rootScope.loading = false;
        }else{
            $rootScope.loading = false;
            vm.dataLoading = false;
            $location.path('/');
        };
        
    });

    // if($rootScope.adPosts.data){
        $scope.data = $rootScope.adPosts.data.reverse();    
    // }
    
  }

}]);