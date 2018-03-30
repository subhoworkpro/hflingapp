app.controller('PostController', ['$rootScope','$scope','$location' ,'HttpService', function( $rootScope,$scope,$location,HttpService ){
    var vm = this;

    $scope.states = $rootScope.stateList;
    $scope.regions = $rootScope.regionList;
    $scope.categories = $rootScope.categoryList;

    vm.state = $rootScope.search.state;
    vm.region = $rootScope.search.region;
    vm.category = $rootScope.search.category;

    $scope.changeListInCtrl = function(data){
        $rootScope.regionList = $rootScope.masterList[data];
        console.log("list updated:"+data);
        $scope.regions = $rootScope.regionList
        $scope.regions.unshift("Region");
   };


    vm.files = []; 

    console.log("asd");

    vm.post = function () {
        $location.path('/post');
    };

 //    vm.upload=function(){
	//     alert(vm.data.files.length+" files selected ... Write your Upload Code"); 
	    
	// };

	vm.check=function(){
		if (vm.data.files.length > 0) {
	    	alert(vm.data.files.length+" files selected ... Max allowed files is 5."); 
		}
	    
	};

    vm.search = function () {
    	$rootScope.search.state = this.state;
        $rootScope.search.region = this.region;
        $rootScope.search.category = this.category;
        console.log("asdasdsa");
        $location.path('/search');
    };

    vm.data = {
    	"title": "",
	  	"state": "State", 
	    "region": "Region",
	    "category": "Category",
	    "location": "", 
	    "age": "",
	    "message": "Post your add here",
	    "email": ""
	};
	vm.verifyemail = "";
    vm.addPost = function(){
    	if (vm.data.files && vm.data.files.length > 5) {
	    	alert(vm.data.files.length+" files selected ... Max allowed files is 5."); 
		}else{
			$rootScope.loading = true;
            console.log(vm.data.files);
			var postData = {
				"title": this.data.title, 
				"state": this.data.state, 
			    "region": this.data.region, 
			    "category": this.data.category, 
			    "location": this.data.location, 
			    "age": this.data.age,
			    "message": this.data.message, 
			    "email": this.data.email
			    // "images": vm.data.files
			};
	    	 HttpService.AddPost(this.data)
	        .then(function(response){
	            if (response.data.status === 'SUCCESS') {
	                console.log("success");
	                $location.path('/search');
	                $rootScope.loading = false;
	            }else{
	            	$rootScope.loading = false;
	                // FlashService.Error(response.data.resultDescription);
	                vm.dataLoading = false;
	                $location.path('/');
	            };
	            
	        });
	    }
    }

}]);
