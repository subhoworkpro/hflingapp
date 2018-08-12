app.controller('PostController', ['$rootScope','$scope','$location' ,'HttpService', '$window', function( $rootScope,$scope,$location,HttpService,$window ){
    var vm = this;

    $rootScope.pageTitle = "Post an ad";

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

   $scope.deleteImage = function(index){
		console.log("Deleted");
		$rootScope.imageList.splice(index, 1);
		vm.data.files = $rootScope.imageList;
		console.log($rootScope.imageList);
		console.log(vm.data.files);
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
    	vm.showImageError = false;
    	vm.showRequiredStateError = false;
    	vm.showRequiredRegionError = false;
    	vm.showRequiredCategoryError = false;
    	vm.showMessageError = false;
    	vm.showTitleError = false;
    	vm.showCaptchaError = false;
    	vm.showMissingEmailError =false;
    	vm.showEmailError = false;

    	vm.showError = true;
    	if ($rootScope.imageList && $rootScope.imageList.length > 5) {
    		vm.showImageError = true;
    		vm.imageLength = $rootScope.imageList.length;
	    	// alert($rootScope.imageList.length+" files selected ... Max allowed files is 5."); 
		}
		if ((!vm.data.state ||vm.data.state == 'State')){
			vm.showRequiredStateError = true;
			// alert("Please Select, Region and Category."); 
		}
		if ((!vm.data.region ||vm.data.region == 'Region')){
			vm.showRequiredRegionError = true;
			// alert("Please Select, Region and Category."); 
		}
		if ((!vm.data.category ||vm.data.category == 'Category')){
			vm.showRequiredCategoryError = true;
			// alert("Please Select, Region and Category."); 
		}
		if (!vm.data.title){
			vm.showTitleError = true;
			// alert("Please enter title of the post."); 
		}
		if (!vm.data.message){
			vm.showMessageError = true;
			// alert("Please enter title of the post."); 
		}
		if (!vm.captcha){
			vm.showCaptchaError = true;
			// alert("Please accept the terms and condition."); 
		}

		if (vm.data.email == ''){
			vm.showMissingEmailError = true;
			// alert("Please accept the terms and condition."); 
		}

		if (vm.data.email != vm.verifyemail){
			vm.showEmailError = true;
			// alert("Please accept the terms and condition."); 
		}

		if( vm.showRequiredStateError || vm.showRequiredRegionError || vm.showRequiredCategoryError || vm.showMessageError || vm.showCaptchaError || vm.showImageError || vm.showTitleError || vm.showEmailError || vm.showMissingEmailError){
			console.log("Validation Failed");
			$window.scrollTo(0, 0);
		}else{
			vm.showImageError = false;
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
	                console.log(response)
	                // alert("Your ad has been created. A verification mail will be sent shortly!"); 
	                if (response && response.data && response.data["_id"]) {
	                	$location.path('/confirm/'+response.data["_id"]);
	                }else if(response && response.data && response.data["data"] == "limit reached"){
	                	$location.path('/error');
	                }
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
