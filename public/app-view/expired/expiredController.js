app.controller('ExpiredController', ['$rootScope','$scope', '$location', 'HttpService', '$http','$window', 'FlashService', function( $rootScope,$scope,$location,HttpService,$http,$window,FlashService ){
    var vm = this;

    $rootScope.pageTitle = "Healthy Fling";


    $rootScope.savedPreference = $window.localStorage.getItem("healthyfling_preference");

    if ($rootScope.savedPreference == "locked") {
        $rootScope.search.country = $window.localStorage.getItem("healthyfling_preference_country") || "Country";
        $rootScope.search.state = $window.localStorage.getItem("healthyfling_preference_state") || "State";
        $rootScope.search.region = $window.localStorage.getItem("healthyfling_preference_region") || "Region";
        $rootScope.search.category = $window.localStorage.getItem("healthyfling_preference_category") || "Category";
    }

    vm.country = $rootScope.search.country || "Country";
    vm.state = $rootScope.search.state || "State";
    vm.region = $rootScope.search.region || "Region";
    vm.category = $rootScope.search.category || "Category";

    $scope.countries = $rootScope.countryList;
    $scope.states = $rootScope.stateList;
    $scope.regions = $rootScope.regionList;
    if ($scope.regions && $scope.regions.indexOf("Region") == -1){
        $scope.regions.unshift("Region");
    }
    $scope.categories = $rootScope.categoryList;

    $scope.savedPreference = ($rootScope.savedPreference == "locked");
    vm.savedPreference = ($rootScope.savedPreference == "locked");

    $scope.changeListInCtrl = function(data){
        if(data != "" && data != undefined && data != "State"){
            $rootScope.regionList = $rootScope.masterList[data];
            console.log("list updated:"+data);
            $scope.regions = $rootScope.regionList;
            $scope.regions.unshift("Region");
            var temp = $scope.regions;
            $scope.regions = temp.filter(function(item, pos){
              return temp.indexOf(item)== pos; 
            });
        }else{
            $scope.regions = ['Region'];
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

   $scope.updateList = function(data){
        $rootScope.regionList = $rootScope.masterList[data];
        console.log("list updated:"+data);
        $scope.regions = $rootScope.regionList
        $scope.regions.unshift("Region");
   };

    // vm.state = $rootScope.search.state;
    // vm.region = $rootScope.search.region;
    // vm.category = $rootScope.search.category;

    vm.post = function () {
        $location.path('/post');
    };

    vm.search = function () {
        $rootScope.search.country = "United States";
        $rootScope.search.state = this.state;
        $rootScope.search.region = this.region;
        $rootScope.search.category = this.category;
        console.log("asdasdsa");
        $location.path('/search');
    };

        console.log("Inside Home Controller");

        vm.post = function () {
            vm.dataLoading = true;
            console.log("asdasdsa");
            $location.path('/post');
        };

        vm.search = function () {
            vm.dataLoading = true;
            console.log("asdasdsa");
            $location.path('/search');
        };

    //  $scope.initController = function () {

    //     $http.get("/data.json")
    //     .success(function (data) {
    //         $rootScope.masterList = data;
    //     })

    //     // vm.state = $rootScope.search.state;
    //     // vm.region = $rootScope.search.region;
    //     // vm.category = $rootScope.search.category;
    //     var path = $location.path();
    //     var arr = path.split("/");
    //     var id = arr[arr.length-1];
    //     $scope.id = id;
    //     $rootScope.loading = true;
    //     $scope.mainImage = "http://placehold.it/710X420";
    //     HttpService.GetAPost(id)
    //     .then(function(response){
    //         console.log(response);
    //         if (response.status == '200') {
    //             $rootScope.currentPost.data = response.data;

    //             $rootScope.regionList = $rootScope.masterList[response.data.state];
    //             $scope.regions = $rootScope.regionList;
    //             console.log("success");
    //             vm.state = response.data.state;
    //             vm.region = response.data.region;
    //             vm.category = response.data.category;
    //             $scope.id = $rootScope.currentPost.data["_id"];
    //             $scope.title = $rootScope.currentPost.data.title;
    //             $rootScope.pageTitle = $scope.title;
    //             $scope.message = $rootScope.currentPost.data.body;
    //             $scope.age = $rootScope.currentPost.data.age;
    //             $scope.location = $rootScope.currentPost.data.location;
    //             $scope.region = $rootScope.currentPost.data.region;
    //             $scope.sender1 = $rootScope.currentPost.data.email;
    //             $scope.state = $rootScope.currentPost.data.state;
    //             $scope.category = $rootScope.currentPost.data.category;
    //             $scope.created = $rootScope.currentPost.data.created;
    //             $scope.files = $rootScope.currentPost.data.files;
    //             $rootScope.loading = false;
    //             if($scope.files.length > 0){
    //                 $scope.mainImage = $scope.files[0].url;
    //             }
    //         }else{
    //             $rootScope.loading = false;
    //             vm.dataLoading = false;
    //             $location.path('/');
    //         };
            
    //     });
    // };

    // $scope.notify = function () {
    //     if (!$scope.captcha){
    //         alert("Please accept the terms and condition."); 
    //     }else if(!$scope.email){
    //         alert("Email address is missing");
    //     }else{
    //         $rootScope.loading = true;
    //         var data = {
    //             "htmlmessage": "<p>"+$scope.replymessage +"</p><p>"+ $location.absUrl().replace("reply","detail")+"</p><p><a href='mailto:"+$scope.email+"?subject="+"Re: "+$scope.title+"'>Reply to this message</a> </p> Regards, <br/>Healthyfling Team",
    //             "subject": "Re: "+( $scope.title || $scope.message),
    //             "sender1": $scope.sender1
    //         };
    //         console.log(data);
    //         HttpService.SendMail(data)
    //         .then(function(response){
    //             console.log(response);
    //             if (response.success == '200' || response.success == '250') {
    //                 console.log("success");
    //                 $rootScope.loading = false;
    //                 alert("Email has been sent to the poster!"); 
    //             }else{
    //                 // FlashService.Error(response.data.resultDescription);
    //                 vm.dataLoading = false;
    //                 $rootScope.loading = false;
    //                 alert("Email has been sent to the poster!"); 
    //                 $location.path('/');
    //             };
                
    //         });   
    //     } 
        
    // };

}]);