app.controller('SearchController', ['$rootScope','$scope','$location' ,'HttpService', function( $rootScope,$scope,$location,HttpService ){
    var vm = this;

    $rootScope.loading = true;

    $rootScope.adPosts = {};
    console.log("in SearchController");
    vm.currentPage = 0;
    vm.pageSize = 10;

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
        this.reloadSearch();
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
                $rootScope.loading = false;
            }else{
                vm.dataLoading = false;
                $location.path('/');
                $rootScope.loading = false;
            };
            
        });
    }

    $scope.initController = function () {
        console.log("loading....");
        $rootScope.loading = true;
        HttpService.GetPosts()
        .then(function(response){
            console.log(response);
            if (response.status == '200') {
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

    if($rootScope.adPosts.data){
        $scope.data = $rootScope.adPosts.data.reverse();    
    }
    
  }

}]);