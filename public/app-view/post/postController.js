app.controller('PostController', ['$rootScope','$scope','$location' ,'HttpService', function( $rootScope,$scope,$location,HttpService ){
    var vm = this;

    $scope.states = $rootScope.stateList;
    $scope.regions = $rootScope.regionList;
    if ($scope.regions && $scope.regions.indexOf("Region") == -1){
	    $scope.regions.unshift("Region");
	}
    $scope.categories = $rootScope.categoryList;

    vm.state = $rootScope.search.state;
    vm.region = $rootScope.search.region;
    vm.category = $rootScope.search.category;

    $rootScope.imageList = [];

    $scope.changeListInCtrl = function(data){
        $rootScope.regionList = $rootScope.masterList[data];
        console.log("list updated:"+data);
        $scope.regions = $rootScope.regionList
        $scope.regions.unshift("Region");
   };

   $scope.stopLoader = function(){
		$rootScope.loadingImage = false;
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
	    "message": "",
	    "email": ""
	};
	vm.verifyemail = "";
    vm.addPost = function(){
    	if ($rootScope.imageList && $rootScope.imageList.length > 5) {
	    	alert($rootScope.imageList.length+" files selected ... Max allowed files is 5."); 
		}else if ((!vm.data.state ||vm.data.state == 'State')||(!vm.data.region ||vm.data.region == 'Region')||(!vm.data.category ||vm.data.category == 'Category')){
			alert("Please Select, Region and Category."); 
		}else if (!vm.data.title){
			alert("Please enter title of the post."); 
		}else if (!vm.captcha){
			alert("Please accept the terms and condition."); 
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
			    "email": this.data.email,
			    "files": $rootScope.imageList
			};
	    	 HttpService.AddPost(postData)
	        .then(function(response){
	            if (response.status == '200') {
	                console.log("success");
	                alert("Your ad has been created. A verification mail will be sent shortly!"); 
	                $location.path('/');
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
