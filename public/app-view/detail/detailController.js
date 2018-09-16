app.controller('DetailController', ['$rootScope','$scope','$location','HttpService','$http','$route','FlashService','$document','$modal', function( $rootScope,$scope,$location,HttpService,$http,$route,FlashService,$document,$modal){
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


    $scope.initController = function () {

        $http.get("/data.json")
        .success(function (data) {
            $rootScope.masterList = data;
        })

        vm.state = $rootScope.search.state;
        vm.region = $rootScope.search.region;
        vm.category = $rootScope.search.category;
	    var	path = $location.path();
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
                $scope.age = $rootScope.currentPost.data.age;
                $scope.region = $rootScope.currentPost.data.region;
                $scope.location = $rootScope.currentPost.data.location;
                $scope.sender1 = $rootScope.currentPost.data.email;
                $scope.state = $rootScope.currentPost.data.state;
                $scope.category = $rootScope.currentPost.data.category;
                $scope.created = $rootScope.currentPost.data.created;
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

                $rootScope.loading = false;
                if($scope.files.length > 0){
                    $scope.mainImage = $scope.files[0].secure_url;
                }
            }else{
                $rootScope.loading = false;
                vm.dataLoading = false;
                $location.path('/expired');
            };
            
        });
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

    $scope.openModal = function (){
         $rootScope.modalInstance = $modal.open({
            templateUrl: 'app-view/reply/ReplyView.html'
        });
    }


    // if ($rootScope.currentPost.data) {
    // 	console.log($rootScope.currentPost);
    // 	vm.message = $rootScope.currentPost.data.body;
    // 	vm.age = $rootScope.currentPost.data.age;
    // 	vm.region = $rootScope.currentPost.data.region;

    // }else if(id){

    // }else{
    // 	$location.path("/");
    // }

}]);