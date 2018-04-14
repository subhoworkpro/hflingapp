app.controller('DetailController', ['$rootScope','$scope','$location','HttpService','$http','$route','FlashService', function( $rootScope,$scope,$location,HttpService,$http,$route,FlashService){
    var vm = this;
    
    if($rootScope.visitedSearchPage){
        $rootScope.loading = true;
    }

    $scope.states = $rootScope.stateList;
    $scope.regions = $rootScope.regionList || ["REGION"];
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

   $scope.changeMainImage = function(file){
        $scope.mainImage = file.url;
   }

    vm.state = $rootScope.search.state;
    vm.region = $rootScope.search.region;
    vm.category = $rootScope.search.category;



    var path = $location.path();
    var arr = path.split("/");
    var id = arr[arr.length-1];
    $scope.id = id;


    $scope.initController = function () {

        $http.get("/data.json")
        .success(function (data) {
            $rootScope.masterList = data;
        })

        vm.state = $rootScope.search.state;
        vm.region = $rootScope.search.region;
        vm.category = $rootScope.search.category;
	    var	path = $location.path();
	    var arr = path.split("/");
	    var id = arr[arr.length-1];
	    $scope.id = id;
        if($rootScope.visitedSearchPage){
            $rootScope.loading = true;
        }
        $scope.mainImage = "http://placehold.it/710X420";
	    HttpService.GetAPost(id)
        .then(function(response){
            console.log(response);
            if (response.status == '200') {
                $rootScope.currentPost.data = response.data;
                var params = $location.search();
                if(params && params.success == 'true'){
                    FlashService.Success("Your post is now Live.");
                }
                $rootScope.regionList = $rootScope.masterList[response.data.state];
                $scope.regions = $rootScope.regionList;
                console.log("success");
                vm.state = response.data.state;
                vm.region = response.data.region;
                vm.category = response.data.category;
                $scope.title = $rootScope.currentPost.data.title;
                $rootScope.pageTitle = $scope.title;
                $scope.post_id = $rootScope.currentPost.data["_id"];
                $scope.message = $rootScope.currentPost.data.body;
                $scope.age = $rootScope.currentPost.data.age;
                $scope.region = $rootScope.currentPost.data.region;
                $scope.location = $rootScope.currentPost.data.location;
                $scope.sender1 = $rootScope.currentPost.data.email;
                $scope.state = $rootScope.currentPost.data.state;
                $scope.category = $rootScope.currentPost.data.category;
                $scope.created = $rootScope.currentPost.data.created;
                $scope.files = $rootScope.currentPost.data.files;
                $rootScope.loading = false;
                if($scope.files.length > 0){
                    $scope.mainImage = $scope.files[0].url;
                }
            }else{
                $rootScope.loading = false;
                vm.dataLoading = false;
                $location.path('/');
            };
            
        });
    };

    $rootScope.reloadPost = function(){
    	vm.state = $rootScope.currentPost.data.body;
    }

    vm.post = function () {
        $location.path('/post');
    };

    vm.search = function () {
        $rootScope.loading = true;
    	$rootScope.search.state = this.state;
        $rootScope.search.region = this.region;
        $rootScope.search.category = this.category;
        console.log("asdasdsa");
        $location.path('/search');
    };

    $scope.notify = function () {
        $scope.showEmail = true;
    	console.log("mail sent");

        if ($scope.showEmail && $scope.sender2 && $scope.sender2.length > 0) {
            $rootScope.loading = true;
            var data = {
             "message": "Perfect match found for both of you.", 
                "subject": "We need to put in a subject",
                "sender1": $scope.sender1,
                "sender2": $scope.sender2,
                "link": $location.$$absUrl
            };
            HttpService.SendMail(data)
            .then(function(response){
                console.log(response);
                if (response.success == '200' || response.success == '250') {
                    console.log("success");
                    $rootScope.loading = false;
                    alert("Email has been sent to the poster!"); 
                }else{
                    // FlashService.Error(response.data.resultDescription);
                    vm.dataLoading = false;
                    $rootScope.loading = false;
                    alert("Email has been sent to the poster!"); 
                    $location.path('/');
                };
                
            });    
        }
    	
    };


    // if ($rootScope.currentPost.data) {
    // 	console.log($rootScope.currentPost);
    // 	vm.message = $rootScope.currentPost.data.body;
    // 	vm.age = $rootScope.currentPost.data.age;
    // 	vm.region = $rootScope.currentPost.data.region;

    // }else if(id){

    // }else{
    // 	$location.path("/");
    // }

}]);