app.controller('DetailController', ['$rootScope','$scope','$location','HttpService', function( $rootScope,$scope,$location,HttpService ){
    var vm = this;

    vm.state = $rootScope.search.state;
    vm.region = $rootScope.search.region;
    vm.category = $rootScope.search.category;


    var path = $location.path();
    var arr = path.split("/");
    var id = arr[arr.length-1];
    $scope.id = id;

    $scope.initController = function () {
	    var	path = $location.path();
	    var arr = path.split("/");
	    var id = arr[arr.length-1];
	    $scope.id = id;

	    HttpService.GetAPost(id)
        .then(function(response){
            console.log(response);
            if (response.status == '200') {
                $rootScope.currentPost.data = response.data;

                console.log("success");
                $scope.message = $rootScope.currentPost.data.body;
                $scope.age = $rootScope.currentPost.data.age;
                $scope.region = $rootScope.currentPost.data.region;
                $scope.sender1 = $rootScope.currentPost.data.email;
            }else{
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
    	$rootScope.search.state = this.state;
        $rootScope.search.region = this.region;
        $rootScope.search.category = this.category;
        console.log("asdasdsa");
        $location.path('/search');
    };

    vm.notify = function () {
    	console.log("mail sent");
    	var data = {
    		"message": "Perfect match found for both of you.", 
		    "subject": "We need to put in a subject",
		    "sender1": $scope.sender1,
		    "sender2": "duttasubh2010@gmail.com",
		    "link": $location.$$absUrl
    	};
    	HttpService.SendMail(data)
        .then(function(response){
            if (response.success == '200') {
                console.log("success");
            }else{
                // FlashService.Error(response.data.resultDescription);
                vm.dataLoading = false;
                $location.path('/');
            };
            
        });
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