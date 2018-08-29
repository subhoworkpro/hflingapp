app.controller('EditController', ['$rootScope','$scope','$location' ,'HttpService', '$http', '$window', function( $rootScope,$scope,$location,HttpService,$http,$window ){
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
        $scope.files = $rootScope.imageList;
        console.log($rootScope.imageList);
        console.log($scope.files);
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
    $scope.editPost = function(id){
        console.log("edit clicked");
        $scope.showImageError = false;
        $scope.showRequiredStateError = false;
        $scope.showRequiredRegionError = false;
        $scope.showRequiredCategoryError = false;
        $scope.showMessageError = false;
        $scope.showTitleError = false;
        $scope.showCaptchaError = false;
        $scope.showMissingEmailError =false;
        $scope.showEmailError = false;

        $scope.showError = true;
        if ($rootScope.imageList && $rootScope.imageList.length > 5) {
            $scope.showImageError = true;
            $scope.imageLength = $rootScope.imageList.length;
            // alert($rootScope.imageList.length+" files selected ... Max allowed files is 5."); 
        }
        if ((!$scope.state ||$scope.state == 'State')){
            $scope.showRequiredStateError = true;
            // alert("Please Select, Region and Category."); 
        }
        if ((!$scope.region ||$scope.region == 'Region')){
            $scope.showRequiredRegionError = true;
            // alert("Please Select, Region and Category."); 
        }
        if ((!$scope.category ||$scope.category == 'Category')){
            $scope.showRequiredCategoryError = true;
            // alert("Please Select, Region and Category."); 
        }
        if (!$scope.title){
            $scope.showTitleError = true;
            // alert("Please enter title of the post."); 
        }
        if (!$scope.message){
            $scope.showMessageError = true;
            // alert("Please enter title of the post."); 
        }
        if (!$scope.captcha){
            $scope.showCaptchaError = true;
            // alert("Please accept the terms and condition."); 
        }

        if( $scope.showRequiredStateError || $scope.showRequiredRegionError || $scope.showRequiredCategoryError || $scope.showMessageError || $scope.showCaptchaError || $scope.showImageError || $scope.showTitleError ){
            console.log("Validation Failed");
            $window.scrollTo(0, 0);
        }else{
            $scope.showImageError = false;
            $rootScope.loading = true;
            // console.log(vm.data.files);
            var postData = {
                "title": $scope.title, 
                "state": $scope.state, 
                "region": $scope.region, 
                "category": $scope.category, 
                "location": $scope.location, 
                "age": $scope.age,
                "message": $scope.message,
                "files": $rootScope.imageList
            };
            console.log(postData);
             HttpService.EditPost(id,postData)
            .then(function(response){
                if (response.status == '200') {
                    console.log("success");
                    console.log(response)
                    // alert("Your ad has been created. A verification mail will be sent shortly!"); 
                    if (response && response.data && response.data["_id"]) {
                        $location.path('/detail/'+response.data["_id"]);
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

    vm.detail = function (id) {
      $location.path("/detail/"+id);
    };

     $scope.initController = function () {

        console.log('You r here');

        $http.get("/data.json")
        .success(function (data) {
            $rootScope.masterList = data;
        })

        // vm.state = $rootScope.search.state;
        // vm.region = $rootScope.search.region;
        // vm.category = $rootScope.search.category;
        var path = $location.path();
        var arr = path.split("/");
        var id = arr[arr.length-1];
        $scope.id = id;
        $rootScope.loading = true;
        $scope.mainImage = "https://placehold.it/710X420";
        HttpService.GetAPost(id)
        .then(function(response){
            console.log(response);
            if (response.status == '200') {
                $rootScope.currentPost.data = response.data;

                $rootScope.regionList = $rootScope.masterList[response.data.state];
                $scope.regions = $rootScope.regionList;
                console.log("success");
                vm.state = response.data.state;
                vm.region = response.data.region;
                vm.category = response.data.category;
                $scope.id = $rootScope.currentPost.data["_id"];
                $scope.title = $rootScope.currentPost.data.title;
                $rootScope.pageTitle = $scope.title;
                $scope.message = $rootScope.currentPost.data.body;
                $scope.age = $rootScope.currentPost.data.age;
                $scope.location = $rootScope.currentPost.data.location;
                $scope.region = $rootScope.currentPost.data.region;
                $scope.sender1 = $rootScope.currentPost.data.email;
                $scope.state = $rootScope.currentPost.data.state;
                $scope.category = $rootScope.currentPost.data.category;
                $scope.created = $rootScope.currentPost.data.created;
                $scope.files = $rootScope.currentPost.data.files;
                $rootScope.imageList = $rootScope.currentPost.data.files;
                $rootScope.loading = false;
                if($scope.files.length > 0){
                    $scope.mainImage = $scope.files[0].secure_url;
                }
            }else{
                $rootScope.loading = false;
                vm.dataLoading = false;
                $location.path('/');
            };
            
        });
    };

}]);