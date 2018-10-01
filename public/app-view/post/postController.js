app.controller('PostController', ['$rootScope','$scope','$location' ,'HttpService', '$window', function( $rootScope,$scope,$location,HttpService,$window ){
    var vm = this;

    $rootScope.pageTitle = "Post an ad";

    $scope.states = $rootScope.stateList;
    $scope.regions = $rootScope.regionList;

    $scope.haircolors = $rootScope.haircolorList;
    $scope.heights = $rootScope.heightList;
    $scope.ethnicity = $rootScope.ethnicityList;
    $scope.orientation = $rootScope.orientationList;
    $scope.bodytype = $rootScope.bodytypeList;
    $scope.eyecolor = $rootScope.eyecolorList;
    $scope.status = $rootScope.statusList;
    $scope.gender = $rootScope.genderList;
    $scope.bodyhair = $rootScope.bodyHairList;
    $scope.hivstatus = $rootScope.hivstatusList;

    var range = ["Age"];
	for(var i=0;i<201;i++) {
	  range.push(i);
	}
	$scope.ageRange = range;

	range = ["Weight"];
	for(var i=90;i<501;i++) {
	  range.push(i);
	}

	$scope.weightRange = range;


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
	    "email": "",
	    "haircolor": "Hair Color",
	    "height": "Height",
	    "ethnicity": "Ethnicity",
	    "orientation": "Orientation",
	    "bodytype": "Body Type",
	    "eyecolor": "Eye Color",
	    "mstatus": "Status",
	    "gender": "Gender",
	    "bodyhair": "Body Hair",
	    "hivstatus": "HIV Status",
	    "weight" : "Weight",
	    "mage" : "Age"
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
    	vm.showAgeError = false;

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

		if(vm.data.age && isNaN(vm.data.age)){
			vm.showAgeError = true;
		}

		if (vm.data.email != vm.verifyemail){
			vm.showEmailError = true;
			// alert("Please accept the terms and condition."); 
		}

		if ((vm.data.haircolor == 'Hair Color')){
			vm.data.haircolor = "";
			// alert("Please Select, Region and Category."); 
		}

		if ((vm.data.height == 'Height')){
			vm.data.height = "";
			// alert("Please Select, Region and Category."); 
		}

		if ((vm.data.ethnicity == 'Ethnicity')){
			vm.data.ethnicity = "";
			// alert("Please Select, Region and Category."); 
		}

		if ((vm.data.orientation == 'Orientation')){
			vm.data.orientation = "";
			// alert("Please Select, Region and Category."); 
		}

		if ((vm.data.bodytype == 'Body Type')){
			vm.data.bodytype = "";
			// alert("Please Select, Region and Category."); 
		}

		if ((vm.data.eyecolor == 'Eye Color')){
			vm.data.eyecolor = "";
			// alert("Please Select, Region and Category."); 
		}

		if ((vm.data.mstatus == 'Status')){
			vm.data.mstatus = "";
			// alert("Please Select, Region and Category."); 
		}

		if ((vm.data.gender == 'Gender')){
			vm.data.gender = "";
			// alert("Please Select, Region and Category."); 
		}

		if ((vm.data.bodyhair == 'Body Hair')){
			vm.data.bodyhair = "";
			// alert("Please Select, Region and Category."); 
		}

		if ((vm.data.hivstatus == 'HIV Status')){
			vm.data.hivstatus = "";
			// alert("Please Select, Region and Category."); 
		}

		if ((vm.data.mage == 'Age')){
			vm.data.mage = "";
			// alert("Please Select, Region and Category."); 
		}

		if ((vm.data.weight == 'Weight')){
			vm.data.weight = "";
			// alert("Please Select, Region and Category."); 
		}

		if( vm.showRequiredStateError || vm.showRequiredRegionError || vm.showAgeError || vm.showRequiredCategoryError || vm.showMessageError || vm.showCaptchaError || vm.showImageError || vm.showTitleError || vm.showEmailError || vm.showMissingEmailError){
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
			    "haircolor": this.data.haircolor,
			    "height": this.data.height,
			    "ethnicity": this.data.ethnicity,
			    "orientation": this.data.orientation,
			    "bodytype": this.data.bodytype,
			    "eyecolor": this.data.eyecolor,
			    "mstatus": this.data.mstatus,
			    "gender": this.data.gender,
			    "bodyhair": this.data.bodyhair,
			    "hivstatus": this.data.hivstatus,
			    "weight" : this.data.weight,
			    "mage" : this.data.mage,
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
