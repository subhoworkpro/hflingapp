app.controller('DeleteController', ['$rootScope','$scope', '$location', 'HttpService', '$http', function( $rootScope,$scope,$location,HttpService,$http ){
    var vm = this;

    $rootScope.pageTitle = "Healthy Fling";

    $scope.states = $rootScope.stateList;
    $scope.regions = $rootScope.regionList;
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

     $scope.initController = function () {

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
        HttpService.DeleteAPost(id)
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

    $scope.notify = function () {
        if (!$scope.captcha){
            alert("Please accept the terms and condition."); 
        }else if(!$scope.email){
            alert("Email address is missing");
        }else{
            $rootScope.loading = true;
            var data = {
                "htmlmessage": "<p>"+$scope.replymessage +"</p><p>"+ $location.absUrl().replace("reply","detail")+"</p><p><a href='mailto:"+$scope.email+"?subject="+"Re: "+$scope.title+"'>Reply to this message</a> </p> Regards, <br/>Healthyfling Team",
                "subject": "Re: "+( $scope.title || $scope.message),
                "sender1": $scope.sender1
            };
            console.log(data);
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

}]);


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
        $scope.mainImage = file.secure_url;
   }

    vm.state = $rootScope.search.state;
    vm.region = $rootScope.search.region;
    vm.category = $rootScope.search.category;



    var path = $location.path();
    var arr = path.split("/");
    var id = arr[arr.length-1];
    $scope.id = id;


    vm.logout = function () {
        $location.path('/login');
    };

    vm.login = function () {
        $location.path('/login');
    };

    vm.dashboard = function () {
      $location.path('/');
    };
    

    vm.search = function () {
        $rootScope.loading = true;
        console.log(this.state);
        $rootScope.search.status = "";
        $rootScope.search.state = this.state;
        $rootScope.search.region = this.region;
        $rootScope.search.category = this.category;
        vm.dataLoading = true;
        console.log("asdasdsa");
        $location.path('/search');
    };

    vm.flagged_search = function () {
        $rootScope.loading = true;
        console.log(this.state);
        $rootScope.search.status = "flagged";
        $rootScope.search.state = this.state;
        $rootScope.search.region = this.region;
        $rootScope.search.category = this.category;
        vm.dataLoading = true;
        console.log("asdasdsa");
        $location.path('/search');
    };

    $scope.initController = function () {

        $http.get("/data.json")
        .success(function (data) {
            $rootScope.masterList = data;
        })

        vm.state = $rootScope.search.state || 'State';
        vm.region = $rootScope.search.region || 'Region';
        vm.category = $rootScope.search.category || 'Category';
      var path = $location.path();
      var arr = path.split("/");
      var id = arr[arr.length-1];
      $scope.comments = [];
      $scope.id = id;
        if($rootScope.visitedSearchPage){
            $rootScope.loading = true;
        }
        $scope.mainImage = "https://placehold.it/710X420";
      HttpService.GetAPost(id)
        .then(function(response){
            console.log(response);
            if (response.status == '200' && response.data["_id"]) {
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
                $scope.status = $rootScope.currentPost.data.status;
                $scope.category = $rootScope.currentPost.data.category;
                $scope.created = $rootScope.currentPost.data.created;
                $scope.files = $rootScope.currentPost.data.files;
                $scope.flagreason = $rootScope.currentPost.data.flagreason;
                $scope.anonymouscomment = $rootScope.currentPost.data.anonymouscomment || "disabled";
                $rootScope.loading = false;
                if($scope.files.length > 0){
                    $scope.mainImage = $scope.files[0].secure_url;
                }
            }else{
                $rootScope.loading = false;
                vm.dataLoading = false;
                $location.path('/admin/#/search');
            };
            
        });
        $scope.loadComments(id);
    };

    $scope.loadComments = function(id){
        HttpService.GetComments(id)
        .then(function(response){
            console.log(response);
            if (response.status == '200') {
                $scope.comments = response.data;
            }else{
                console.log("something went wrong");
                // $rootScope.loading = false;
                // vm.dataLoading = false;
                // $location.path('/expired');
            };
            
        });
    }

    $scope.deleteComment = function(id){
        $rootScope.loading = true;
        HttpService.DeleteAComment(id)
        .then(function(response){
            console.log(response);
            if (response.status == '200') {
                $scope.loadComments($scope.id);
                FlashService.Success("The comment has been successfully deleted.");
                $rootScope.loading = false;
                $window.scrollTo(0, 0);
            }else{
                console.log("something went wrong");
                $rootScope.loading = false;
                // $rootScope.loading = false;
                // vm.dataLoading = false;
                // $location.path('/expired');
            };
            
        });
    }

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

    vm.searchFilter = function (state,region,category) {
        if(state == 'State' && region == 'Region'){
            console.log("Do nothing");
        }else{
            $rootScope.loading = true;
            $rootScope.search.state = state;
            $rootScope.search.region = region;
            $rootScope.search.category = category;
            console.log("asdasdsa");
            $location.path('/search');
        };
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
    //  console.log($rootScope.currentPost);
    //  vm.message = $rootScope.currentPost.data.body;
    //  vm.age = $rootScope.currentPost.data.age;
    //  vm.region = $rootScope.currentPost.data.region;

    // }else if(id){

    // }else{
    //  $location.path("/");
    // }

}]);