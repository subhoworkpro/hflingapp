app.controller('OptionsController', ['$rootScope','$scope', '$location', 'HttpService', '$http', 'FlashService','$window','$route', function( $rootScope,$scope,$location,HttpService,$http,FlashService,$window,$route ){
    var vm = this;

    $rootScope.pageTitle = "Healthy Fling";

    $scope.states = $rootScope.stateList;
    $scope.regions = $rootScope.regionList;
    if ($scope.regions && $scope.regions.indexOf("Region") == -1){
        $scope.regions.unshift("Region");
    }
    $scope.categories = $rootScope.categoryList;

    $scope.selection = [];

    $scope.toggleSelection = function (selectionName, listSelection) {
        var idx = listSelection.indexOf(selectionName);

        // is currently selected
        if (idx > -1) {
          listSelection.splice(idx, 1);
        }

        // is newly selected
        else {
          listSelection.push(selectionName);
        }
    };

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
    };

    $scope.flagComment = function(){
        $scope.showError = true;
        $scope.showReasonError = false;

        if ($scope.selection.length < 1){
            $scope.showReasonError = true;
            // alert("Please Select, Region and Category."); 
        }

        console.log("The comment has been flagged");
        var comment_id = $rootScope.comment_to_flag["_id"];
        console.log($rootScope.comment_to_flag["_id"]);
        $rootScope.loading = true;

        if ($scope.showReasonError) {
            console.log("Validation Failed");
            $window.scrollTo(0, 0);

        }else{
            $scope.showError = false;
            $scope.closeModal();

            var postData = {
                "flagreason": $scope.selection
            };

            HttpService.FlagACommentReason(comment_id, postData)
            .then(function(response){
                console.log(response);
                if (response.status == '200') {
                    FlashService.Success("The comment has been successfully flagged.");
                    $rootScope.loading = false;
                    $rootScope.comment_to_flag = {};
                    $window.scrollTo(0, 0);
                    $route.reload();
                }else{
                    console.log("something went wrong");
                    $rootScope.loading = false;
                    // $rootScope.loading = false;
                    // vm.dataLoading = false;
                    // $location.path('/expired');
                };
                
            });
        }
    }


    $scope.flagReply = function(){
        $scope.showError = true;
        $scope.showReasonError = false;

        if ($scope.selection.length < 1){
            $scope.showReasonError = true;
            // alert("Please Select, Region and Category."); 
        }

        console.log("The comment has been flagged");
        var comment_id = $rootScope.reply_to_flag["_id"];
        console.log($rootScope.reply_to_flag["_id"]);
        $rootScope.loading = true;

        if ($scope.showReasonError) {
            console.log("Validation Failed");
            $window.scrollTo(0, 0);

        }else{
            $scope.showError = false;
            $scope.closeModal();

            var postData = {
                "flagreason": $scope.selection
            };

            HttpService.FlagAReply(comment_id, postData)
            .then(function(response){
                console.log(response);
                if (response.status == '200') {
                    FlashService.Success("The comment has been successfully flagged.");
                    $rootScope.loading = false;
                    $rootScope.reply_to_flag = {};
                    $window.scrollTo(0, 0);
                    $route.reload();
                }else{
                    console.log("something went wrong");
                    $rootScope.loading = false;
                    // $rootScope.loading = false;
                    // vm.dataLoading = false;
                    // $location.path('/expired');
                };
                
            });
        }
    }

    $scope.flagPost = function(){

        $scope.showError = true;
        $scope.showReasonError = false;

        if ($scope.selection.length < 1){
            $scope.showReasonError = true;
            // alert("Please Select, Region and Category."); 
        }

        var path = $location.path();
        var arr = path.split("/");
        var id = arr[arr.length-1];
        $scope.id = id;
        $rootScope.loading = true;
        $scope.mainImage = "https://placehold.it/710X420";

        if ($scope.showReasonError) {
            console.log("Validation Failed");
            $window.scrollTo(0, 0);

        }else{
            $scope.showError = false;
            $scope.closeModal();
            // HttpService.FlagAPost(id)
            // .then(function(response){
            //     console.log(response);
            //     if (response.status == '200') {
            //         $rootScope.currentPost.data = response.data;

            //         $rootScope.regionList = $rootScope.masterList[response.data.state];
            //         $scope.regions = $rootScope.regionList;
            //         console.log("success");
            //         vm.state = response.data.state;
            //         vm.region = response.data.region;
            //         vm.category = response.data.category;
            //         $scope.id = $rootScope.currentPost.data["_id"];
            //         $scope.title = $rootScope.currentPost.data.title;
            //         $rootScope.pageTitle = $scope.title;
            //         $scope.message = $rootScope.currentPost.data.body;
            //         $scope.age = $rootScope.currentPost.data.age;
            //         $scope.location = $rootScope.currentPost.data.location;
            //         $scope.region = $rootScope.currentPost.data.region;
            //         $scope.sender1 = $rootScope.currentPost.data.email;
            //         $scope.state = $rootScope.currentPost.data.state;
            //         $scope.category = $rootScope.currentPost.data.category;
            //         $scope.created = $rootScope.currentPost.data.created;
            //         $scope.files = $rootScope.currentPost.data.files;
            //         $rootScope.loading = false;
            //         if($scope.files.length > 0){
            //             $scope.mainImage = $scope.files[0].url;
            //         }
            //         FlashService.Success("An email has been sent to the poster saying that the post is flagged and will be removed from healthyflings listing.");
            //         $rootScope.is_flagged = true;
            //     }else{
            //         $rootScope.loading = false;
            //         vm.dataLoading = false;
            //         FlashService.Error("There was an error while submitting your request. Please try again.");
            //     };
                
            // });

            var postData = {
                "flagreason": $scope.selection
            };

            HttpService.FlagPostReason(id,postData)
            .then(function(response){
                if (response.status == '200') {
                    console.log("success");
                    console.log(response)
                    // alert("Your ad has been created. A verification mail will be sent shortly!"); 
                    if (response && response.data && response.data["_id"]) {
                        FlashService.Success("An email has been sent to the poster saying that the post is flagged and will be removed from healthyflings listing.");
                        $rootScope.is_flagged = true;
                    }
                    $rootScope.loading = false;
                }else{
                    $rootScope.loading = false;
                    FlashService.Error("There was an error while submitting your request. Please try again.");  
                    vm.dataLoading = false;
                    // $location.path('/');
                };
                
            });
        }
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

    $scope.closeModal = function(){
        console.log("closing modal");
        $rootScope.modalInstance.close();
    }

}]);