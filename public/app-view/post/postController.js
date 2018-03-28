app.controller('PostController', ['$rootScope','$scope','$location' ,'HttpService', function( $rootScope,$scope,$location,HttpService ){
    var vm = this;

    vm.state = $rootScope.search.state;
    vm.region = $rootScope.search.region;
    vm.category = $rootScope.search.category;

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
	  	"state": "Select State", 
	    "region": "Select Region",
	    "category": "Select Category",
	    "location": "Specific Location", 
	    "age": 19,
	    "message": "Post your add here",
	    "email": ""
	};
	vm.verifyemail = "";
    vm.addPost = function(){
    	if (vm.data.files && vm.data.files.length > 5) {
	    	alert(vm.data.files.length+" files selected ... Max allowed files is 5."); 
		}else{
			$rootScope.loading = true;
	    	 HttpService.AddPost(this.data)
	        .then(function(response){
	            if (response.data.resultDescription === 'SUCCESS') {
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