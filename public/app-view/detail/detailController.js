app.controller('DetailController', ['$rootScope','$scope','$location','HttpService','$http','$route','FlashService','$document','$modal','$window', function( $rootScope,$scope,$location,HttpService,$http,$route,FlashService,$document,$modal,$window){
    var vm = this;

    if($rootScope.visitedSearchPage){
        $rootScope.loading = true;
    }

    $scope.replyNotified = false;
    $scope.showShareButtons = false;
    $scope.replyNotifiedEmail = "";
    $scope.currentPath = $location.absUrl().replace("#/detail","api/render");
    $scope.embed = "";

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

   $rootScope.imageList = [];


   $scope.addComment = function(id){
        console.log("AddComment clicked");

        $scope.showError = true;

        if (($scope.mage == 'Age')){
            $scope.mage = "";
            // alert("Please Select, Region and Category."); 
        }

        if( $scope.commentmessage == undefined && $scope.commentmessage == '' || $scope.captcha == undefined){
            console.log("Validation Failed");
            FlashService.Error("Please select the Capcha!");
            $window.scrollTo(0, 0);
        }else{
            $scope.showImageError = false;
            $rootScope.loading = true;
            // console.log(vm.data.files);
            var postData = {
                "commentmessage": $scope.commentmessage, 
                "email": $scope.replyNotifiedEmail,
                "commentfiles": $rootScope.imageList,
                "commentembed": $scope.commentembed.replace("src=", "xxx=")
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
                        FlashService.Success("Your comment has been successfully added.");
                        $scope.loadComments($scope.id);
                        $scope.commentmessage = "";
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

    $scope.replyComment = function(id){
        console.log("ReplyComment clicked");

        // $scope.showError = true;

        // if (($scope.mage == 'Age')){
        //     $scope.mage = "";
        //     // alert("Please Select, Region and Category."); 
        // }

        // if( $scope.commentmessage == undefined && $scope.commentmessage == '' || $scope.captcha == undefined){
        //     console.log("Validation Failed");
        //     FlashService.Error("Please select the Capcha!");
        //     $window.scrollTo(0, 0);
        // }else{
        //     $scope.showImageError = false;
        //     $rootScope.loading = true;
        //     // console.log(vm.data.files);
        //     var postData = {
        //         "commentmessage": $scope.commentmessage, 
        //     };
        //     console.log(postData);
        //      HttpService.EditPost(id,postData)
        //     .then(function(response){
        //         if (response.status == '200') {
        //             console.log("success");
        //             console.log(response)
        //             // alert("Your ad has been created. A verification mail will be sent shortly!"); 
        //             if (response && response.data && response.data["_id"]) {
        //                 $location.path('/detail/'+response.data["_id"]);
        //                 FlashService.Success("Your comment has been successfully added.");
        //                 $scope.loadComments($scope.id);
        //                 $scope.commentmessage = "";
        //                 $window.scrollTo(0, 0);
        //             }
        //             $rootScope.loading = false;
        //         }else{
        //             $rootScope.loading = false;
        //             // FlashService.Error(response.data.resultDescription);
        //             vm.dataLoading = false;
        //             $location.path('/');
        //         };
                
        //     });
        // }
    }


   $scope.changeMainImage = function(file,embed=false){
        if(embed == false){
            $scope.mainImage = file.secure_url;
        }else{
            $scope.mainImage = file;
        }
   }

    vm.state = $rootScope.search.state;
    vm.region = $rootScope.search.region;
    vm.category = $rootScope.search.category;



    var path = $location.path();
    var arr = path.split("/");
    var id = arr[arr.length-1];
    $scope.id = id;

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

    $scope.deleteReply = function(id){
        $rootScope.loading = true;
        HttpService.DeleteAReply(id)
        .then(function(response){
            console.log(response);
            if (response.status == '200') {
                $scope.loadComments($scope.id);
                FlashService.Success("The reply has been successfully deleted.");
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

    $scope.flagComment = function(id){
        console.log("The comment has been flagged");
        $rootScope.loading = true;
        HttpService.FlagAComment(id)
        .then(function(response){
            console.log(response);
            if (response.status == '200') {
                $scope.loadComments($scope.id);
                FlashService.Success("The comment has been successfully flagged.");
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

    $scope.unflagComment = function(id){
        console.log("The comment has been flagged");
        $rootScope.loading = true;
        HttpService.UnflagAComment(id)
        .then(function(response){
            console.log(response);
            if (response.status == '200') {
                $scope.loadComments($scope.id);
                FlashService.Success("The comment has been successfully unflagged.");
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

    $scope.initController = function () {

        $http.get("/data.json")
        .success(function (data) {
            $rootScope.masterList = data;
        })

        $rootScope.is_flagged = false;

        vm.state = $rootScope.search.state;
        vm.region = $rootScope.search.region;
        vm.category = $rootScope.search.category;
        $scope.comments = [];
        var path = $location.path();
        var arr = path.split("/");
        var id = arr[arr.length-1];
        $scope.id = id;
        if($rootScope.visitedSearchPage){
            $rootScope.loading = true;
        }
        $scope.mainImage = "https://placehold.it/710X420";
        HttpService.GetAPost(id)
        .then(function(response){
            console.log(response);
            $scope.is_edit = false;
            if (response.status == '200' && response.data["_id"]) {
                $rootScope.currentPost.data = response.data;
                var params = $location.search();
                if(params && params.success == 'true'){
                    FlashService.Success("Your post is now Live.");
                }else if(params && params.edit == 'true'){
                    $scope.is_edit = true;
                }else if($location.url().indexOf("msg=true") > -1){
                    FlashService.Success("You have successfully replied to this post, you may or may not get a response from this poster.");
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
                $scope.message = $scope.message.replace(/[\r\n]/g, '<br/>');
                $scope.age = $rootScope.currentPost.data.age;
                $scope.region = $rootScope.currentPost.data.region;
                $scope.location = $rootScope.currentPost.data.location;
                $scope.sender1 = $rootScope.currentPost.data.email;
                $scope.state = $rootScope.currentPost.data.state;
                $scope.category = $rootScope.currentPost.data.category;
                $scope.created = $rootScope.currentPost.data.created;
                $scope.expires = new Date($rootScope.currentPost.data.created);
                $scope.expires.setDate($scope.expires.getDate() + 8);
                $scope.files = $rootScope.currentPost.data.files;

                $scope.haircolor = $rootScope.currentPost.data.haircolo;
                $scope.height = $rootScope.currentPost.data.height;
                $scope.ethnicity = $rootScope.currentPost.data.ethnicity;
                $scope.orientation = $rootScope.currentPost.data.orientation;
                $scope.bodytype = $rootScope.currentPost.data.bodytype;
                $scope.eyecolor = $rootScope.currentPost.data.eyecolor;
                $scope.mstatus = $rootScope.currentPost.data.mstatus;
                $scope.gender = $rootScope.currentPost.data.gender;
                $scope.bodyhair = $rootScope.currentPost.data.bodyhair;
                $scope.hivstatus = $rootScope.currentPost.data.hivstatus;
                $scope.weight = $rootScope.currentPost.data.weight;
                $scope.mage = $rootScope.currentPost.data.mage;
                $scope.anonymouscomment = $rootScope.currentPost.data.anonymouscomment || 'disabled';
                $scope.embed = $rootScope.currentPost.data.embed.replace("xxx=", "src=") || '';
                $scope.share = $rootScope.currentPost.data.share || 'disabled';

                $rootScope.loading = false;

                if($scope.files.length > 0){
                    $scope.mainImage = $scope.files[0].secure_url;
                }else if($scope.embed != "" && $scope.files.length == 0){
                    $scope.mainImage = $scope.embed;
                }


            }else{
                $rootScope.loading = false;
                vm.dataLoading = false;
                $location.path('/expired');
            };
            
        });

        $scope.loadComments(id);

    };

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

    $scope.toggleReplyNotify = function(){
        if($scope.replyNotified && $scope.replyNotified == true){
            $scope.replyNotified = false;
            $scope.replyNotifiedEmail = "";
        }else{
            $scope.replyNotified = true;
        }
    }

    $scope.toggleShareButton = function(){
        if($scope.showShareButtons && $scope.showShareButtons == true){
            $scope.showShareButtons = false;
        }else{
            $scope.showShareButtons = true;
        }
    }

    $scope.openModal = function (){
         $rootScope.modalInstance = $modal.open({
            templateUrl: 'app-view/reply/ReplyView.html'
        });
    }

     $scope.openModal_flag = function (){
         $rootScope.modalInstance = $modal.open({
            templateUrl: 'app-view/flag/FlagView.html'
        });
    }

    $scope.openCommentModal = function (comment){
        $rootScope.comment = comment;
         $rootScope.modalInstance = $modal.open({
            templateUrl: 'app-view/comment/CommentView.html'
        });
    }

    $scope.$on("reloadComments",function () {
        $scope.loadComments($scope.id);
    });

    $scope.deleteImage = function(index){
        console.log("Deleted");
        $rootScope.imageList.splice(index, 1);
        $scope.files = $rootScope.imageList;
        console.log($rootScope.imageList);
        console.log($scope.files);
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