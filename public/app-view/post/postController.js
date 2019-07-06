app.controller('PostController', ['$rootScope','$scope','$location' ,'HttpService', '$window', 'FlashService', function( $rootScope,$scope,$location,HttpService,$window,FlashService ){
    var vm = this;

    $rootScope.pageTitle = "Post an ad";

    $scope.countries = $rootScope.countryList;
    $scope.states = $rootScope.stateList;
    $scope.regions = $rootScope.regionList;

    $scope.newstates = ["State"];
    $scope.newregions = [];

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

    $scope.anonymouscomment = [ "enabled", "disabled" ];
    $scope.notified = [ "yes", "no" ];
    $scope.postermode = [ "Personals", "The Wall" ];

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

    $scope.savedPreference = ($rootScope.savedPreference == "locked");
    vm.savedPreference = ($rootScope.savedPreference == "locked");

    vm.country = $rootScope.search.country || "Country";
    vm.state = $rootScope.search.state || "State";
    vm.region = $rootScope.search.region || "Region";
    vm.category = $rootScope.search.category || "Category";

    $rootScope.imageList = [];

    $scope.changeListInCtrl = function(data){
        if(data != "" && data != undefined && data != "State" && data != "Provinces"){
            $rootScope.regionList = $rootScope.masterList[data];
            console.log("list updated:"+data);
            $scope.regions = $rootScope.regionList;
            $scope.regions.unshift("Region");
            var temp = $scope.regions;
            $scope.regions = temp.filter(function(item, pos){
              return temp.indexOf(item)== pos; 
            });
        }else{
            if (vm.country == "United States" || vm.country == "Canada") {
                $scope.regions = ['Region'];   
            }
        }
   };

   $scope.changeStateListInCtrl = function(data){
        if(data != "" && data != undefined && data != "Country"){
            $rootScope.masterList = $rootScope.masterListAll[data];
            $rootScope.stateList = Object.keys($rootScope.masterListAll[data]);
            $scope.states = $rootScope.stateList;
            // $rootScope.regionList = $rootScope.masterListAll[data];
            console.log("list updated:"+data);
            if (data != "United States" && data != "Canada") {
                $rootScope.regionList = $rootScope.masterList["State"];
                $scope.regions = $rootScope.regionList;
                $scope.regions.unshift("Region");
                var temp = $scope.regions;
                $scope.regions = temp.filter(function(item, pos){
                  return temp.indexOf(item)== pos; 
                });
            }else if(data == "Canada"){
                console.log($scope.states);
                vm.state = "Provinces";
            }
        }else{
            // $scope.regions = ['Region'];
        }
   };

   $scope.changeNewPostList = function(data){
        if(data != "" && data != undefined && data != "State" && data != "Provinces"){
            $scope.newregions = $scope.newmasterList[data];
            $scope.newregions.unshift("Region");
            var temp = $scope.newregions;
            $scope.newregions = temp.filter(function(item, pos){
              return temp.indexOf(item)== pos; 
            });
        }else{
            $scope.newregions = ['Region'];
        }
   };

   $scope.changeNewPostStateList = function(data){
        if(data != "" && data != undefined && data != "Country"){
            $scope.newmasterList = $rootScope.masterListAll[data];
            $scope.newstates = Object.keys($rootScope.masterListAll[data]);
            // $rootScope.regionList = $rootScope.masterListAll[data];
            console.log("list updated:"+data);
            if (data != "United States" && data != "Canada") {
                $scope.newregions = $scope.newmasterList["State"];
                $scope.newregions.unshift("Region");
                var temp = $scope.newregions;
                $scope.newregions = temp.filter(function(item, pos){
                  return temp.indexOf(item)== pos; 
                });
            }
        }else{
            // $scope.regions = ['Region'];
        }
   };

   vm.lockPreference = function () {
        $window.localStorage.setItem("healthyfling_preference","locked");
        $window.localStorage.setItem("healthyfling_preference_country",vm.country);
        $window.localStorage.setItem("healthyfling_preference_state",vm.state);
        $window.localStorage.setItem("healthyfling_preference_region",vm.region);
        $window.localStorage.setItem("healthyfling_preference_category",vm.category);
        $rootScope.savedPreference = true;
        vm.savedPreference = true;
        $scope.savedPreference = "locked";
        FlashService.Success("Search preference saved for easier browsing.");
        console.log("preference locked");
    };

    vm.unlockPreference = function () {
        $window.localStorage.setItem("healthyfling_preference","unlocked");
        
        vm.country = $rootScope.search.country = "Country";
        vm.state = $rootScope.search.state = "State";
        vm.region = $rootScope.search.region = "Region";
        vm.category = $rootScope.search.category = "Category";

        $rootScope.savedPreference = false;
        vm.savedPreference = false;
        $scope.savedPreference = "unlocked";
        FlashService.Success("Search preference has been deleted.");
        console.log("preference unlocked");  
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
    	$rootScope.search.country = this.country;
    	$rootScope.search.state = this.state;
        $rootScope.search.region = this.region;
        $rootScope.search.category = this.category;
        console.log("asdasdsa");
        $location.path('/search');
    };


    vm.data = {
    	"title": "",
    	"country": "Country",
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
	    "anonymouscomment" : "disabled",
	    "notified" : "no",
	    "share" : "disabled",
	    "embed":"",
	    "weight" : "Weight",
	    "mage" : "Age",	    
	    "postermode" : "Personals",
	};
	vm.verifyemail = "";
    vm.addPost = function(){
    	vm.showImageError = false;
    	vm.showRequiredCountryError = false;
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
		if ((!vm.data.country ||vm.data.country == 'Country')){
			vm.showRequiredCountryError = true;
			// alert("Please Select, Region and Category."); 
		}
		if ((!vm.data.state ||vm.data.state == 'State' || vm.data.state == 'Provinces') && (vm.data.country == "United States" || vm.data.country == "Canada")){
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

		if( vm.showRequiredStateError || vm.showRequiredCountryError || vm.showRequiredRegionError || vm.showAgeError || vm.showRequiredCategoryError || vm.showMessageError || vm.showCaptchaError || vm.showImageError || vm.showTitleError || vm.showEmailError || vm.showMissingEmailError){
			console.log("Validation Failed");
			$window.scrollTo(0, 0);
			if(vm.data.mage == ""){
		    	vm.data.mage = "Age";
		    }
		    if(vm.data.haircolor == ""){
		    	vm.data.haircolor = "Hair Color";
		    }
		    if(vm.data.height == ""){
		    	vm.data.height = "Height";
		    }
		    if(vm.data.ethnicity == ""){
		    	vm.data.ethnicity = "Ethnicity";
		    }
		    if(vm.data.orientation == ""){
		    	vm.data.orientation = "Orientation";
		    }
		    if(vm.data.bodytype == ""){
		    	vm.data.bodytype = "Body Type";
		    }
		    if(vm.data.eyecolor == ""){
		    	vm.data.eyecolor = "Eye Color";
		    }
		    if(vm.data.mstatus == ""){
		    	vm.data.mstatus = "Status";
		    }
		    if(vm.data.gender == ""){
		    	vm.data.gender = "Gender";
		    }
		    if(vm.data.bodyhair == ""){
		    	vm.data.bodyhair = "Body Hair";
		    }
		    if(vm.data.hivstatus == ""){
		    	vm.data.hivstatus = "HIV Status";
		    }
		    if(vm.data.weight == ""){
		    	vm.data.weight = "Weight";
		    }
		}else{
			vm.showError = false;
			vm.showImageError = false;
			$rootScope.loading = true;
            console.log(vm.data.files);
			var postData = {
				"title": this.data.title,
				"country": this.data.country,
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
			    "anonymouscomment": this.data.anonymouscomment,
			    "notified" : this.data.notified,
			    "share": this.data.share,
			    "embed": this.data.embed.replace("src=", "xxx=").replace("href=", "yyyy="),
			    "weight" : this.data.weight,
			    "mage" : this.data.mage,
			    "files": $rootScope.imageList,
			    "postermode": this.data.postermode,
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
	      
					    if(vm.data.mage == ""){
					    	vm.data.mage = "Age";
					    }
					    if(vm.data.haircolor == ""){
					    	vm.data.haircolor = "Hair Color";
					    }
					    if(vm.data.height == ""){
					    	vm.data.height = "Height";
					    }
					    if(vm.data.ethnicity == ""){
					    	vm.data.ethnicity = "Ethnicity";
					    }
					    if(vm.data.orientation == ""){
					    	vm.data.orientation = "Orientation";
					    }
					    if(vm.data.bodytype == ""){
					    	vm.data.bodytype = "Body Type";
					    }
					    if(vm.data.eyecolor == ""){
					    	vm.data.eyecolor = "Eye Color";
					    }
					    if(vm.data.mstatus == ""){
					    	vm.data.mstatus = "Status";
					    }
					    if(vm.data.gender == ""){
					    	vm.data.gender = "Gender";
					    }
					    if(vm.data.bodyhair == ""){
					    	vm.data.bodyhair = "Body Hair";
					    }
					    if(vm.data.hivstatus == ""){
					    	vm.data.hivstatus = "HIV Status";
					    }
					    if(vm.data.weight == ""){
					    	vm.data.weight = "Weight";
					    }
	                	FlashService.Error("Maximum Limit Reached: You have too many posts at one time. You can delete some posts or wait till your other posts expire!");
	                	$window.scrollTo(0, 0);
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
