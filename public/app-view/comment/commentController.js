app.controller('CommentController', ['$rootScope','$scope', '$location', 'HttpService', '$http','$window','FlashService','$modal', function( $rootScope,$scope,$location,HttpService,$http,$window,FlashService,$modal){
    var vm = this;

    $scope.replyNotified = false;
    $scope.showEmbedButtons = false;
    $scope.replyNotifiedEmail = "";
    $scope.replyembed = "";

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

    $rootScope.imageList = [];

    $scope.replyfiles = [];

   $scope.stopLoader = function(){
        $rootScope.loadingImage = false;
   };

   $scope.deleteImage = function(index){
        console.log("Deleted");
        $rootScope.imageList.splice(index, 1);
        $scope.replyfiles = $rootScope.imageList;
        console.log($rootScope.imageList);
        console.log($scope.replyfiles);
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

        console.log("comment passed: ");
        console.log($rootScope.comment);

        $scope.commentMessage = $rootScope.comment.body;
        $scope.commentId = $rootScope.comment["_id"];
        $scope.commentLabel = $rootScope.comment["replyLabel"];
        $scope.commentEmail = $rootScope.comment["replyEmail"];
        $scope.commentOwner = $rootScope.comment["owner"];
        $scope.ownerEmail = $rootScope.comment["ownerEmail"];

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
        // $rootScope.loading = true;
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

    $scope.notify = function () {

        $scope.imageLength = 0;

        $scope.showError = true;
        $scope.showRequiredReplyMessageError = false;

        $scope.showCaptchaError = false;

        if (!$scope.replymessage){
            $scope.showRequiredReplyMessageError = true;
            // alert("Please Select, Region and Category."); 
        }

        if (!$scope.captcha){
            $scope.showCaptchaError = true;
            // alert("Please accept the terms and condition."); 
        }

        if ($scope.showCaptchaError || $scope.showRequiredReplyMessageError){
            console.log("Validation Failed");
            $window.scrollTo(0, 0);

        }else{
            // $rootScope.loading = true;
            $scope.closeModal();
            FlashService.Success("You have successfully replied to this comment!");

            $rootScope.loading = true;

            var postData = {
                "commentmessage": $scope.replymessage,
                "commentfiles": $rootScope.imageList,
                "commentembed": $scope.replyembed.replace("src=", "xxx=").replace("href=", "yyyy="),
                "commentemail": $scope.replyNotifiedEmail,
                "label":  $scope.commentLabel,
                "owner":  $scope.commentOwner,
                "replyEmail" : $scope.commentEmail
            };

            HttpService.ReplyAComment($scope.commentId, postData)
            .then(function(response){
                console.log(response);
                if (response.status == '200') {
                    // $scope.loadComments($scope.id);
                    FlashService.Success("You have successfully replied to this comment!");
                    $rootScope.loading = false;
                    $window.scrollTo(0, 0);
                    $rootScope.imageList = [];
                    $rootScope.comment = {};
                    $rootScope.$broadcast("reloadComments");

                    // if ($scope.commentEmail != "") {
                    //     var postLink = $location.absUrl();
                    //     if ($scope.commentEmail == $scope.ownerEmail) {
                    //         postLink = postLink + "?edit=true";
                    //     }
                    //     var data = {
                    //         "htmlmessage": "<p>A new comment has been added to the post [<b>"+$rootScope.pageTitle+"</b>]</p><p>To view the post <a href='"+postLink+"'>click here.<a></p><br><p style='font-size:12px;font-weight:bold;'>Please dont reply to this email!</p>",
                    //         "subject": "You have a new comment ["+$rootScope.pageTitle+"]",
                    //         "sender1": $scope.commentEmail
                    //     };

                    //     HttpService.SendMail(data)
                    //     .then(function(response){
                    //         console.log(response);
                    //         if (response.status == '200' || response.status == '250') {
                    //             console.log("reply email sent successfully");
                    //         }else{
                    //             FlashService.Error("There was an error while submitting your request. Please try again.");
                    //             // $location.path('/');
                    //         };
                            
                    //     });
                    // }


                }else{
                    console.log("something went wrong");
                    $rootScope.loading = false;
                    // $rootScope.loading = false;
                    // vm.dataLoading = false;
                    // $location.path('/expired');
                    $rootScope.comment = {};
                };
                
            });
            // var options = { timeZone: "America/New_York"}
            // var estTime = new Date();
            // var data = {
            //     "htmlmessage": "<p>"+$scope.replymessage +"</p><p>Original Post:</p><p>"+ $location.absUrl().replace("reply","detail")+"</p> Regards, <br/>Healthyfling Team",
            //     "subject": "[HealthyFling] RE: "+( $scope.title || $scope.message)+" - "+estTime.toLocaleString("en-US", options)+" ET",
            //     "sender1": $scope.sender1,
            //     "attachments": $rootScope.imageList,
            //     "x-from": $scope.email,
            //     "x-post-id": $scope.id
            // };
            // console.log(data);
            // $scope.showError = false;
            // HttpService.SendMail(data)
            // .then(function(response){
            //     console.log(response);
            //     if (response.status == '200' || response.status == '250') {
            //         console.log("success");
            //         $rootScope.loading = false;
            //         // $location.path('/response');
            //         // var redirect = "/detail/"+$scope.id+"?msg=true";
            //         // $location.path(unescape(redirect));
            //         $rootScope.loading = false;
            //         // alert("Email has been sent to the poster!"); 
            //     }else{
            //         // FlashService.Error(response.data.resultDescription);
            //         vm.dataLoading = false;
            //         $rootScope.loading = false;
            //         // alert("Email has been sent to the poster!"); 
            //         FlashService.Error("There was an error while submitting your request. Please try again.");
            //         // $location.path('/');
            //     };
                
            // });   
        } 
        
    };

    $scope.toggleReplyNotify = function(){
        if($scope.replyNotified && $scope.replyNotified == true){
            $scope.replyNotified = false;
            $scope.replyNotifiedEmail = "";
        }else{
            $scope.replyNotified = true;
        }
    }

    $scope.toggleEmbedButton = function(){
        if($scope.showEmbedButtons && $scope.showEmbedButtons == true){
            $scope.showEmbedButtons = false;
        }else{
            $scope.showEmbedButtons = true;
        }
    }

    $scope.closeModal = function(){
        console.log("closing modal");
        $rootScope.comment = {};
        $rootScope.modalInstance.close();
    }

}]);