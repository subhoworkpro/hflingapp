app.controller('FavController', ['$rootScope','$scope', '$location', 'HttpService', '$http', 'FlashService','$window', function( $rootScope,$scope,$location,HttpService,$http,FlashService,$window ){
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

    $scope.favPost = function () {
        alert("Post has been added as your favourite post.");        
    };

    $scope.addNotify = function(){
        var path = $location.path();
        var arr = path.split("/");
        var id = arr[arr.length-1];
        $scope.id = id;

        $scope.showError = true;
        $scope.showRequiredEmailError = false;


        if (!$scope.notify_email ){
            $scope.showRequiredEmailError = true;
            // alert("Please Select, Region and Category."); 
        }

         if ($scope.showRequiredEmailError){
            console.log("Validation Failed");
            $window.scrollTo(0, 0);

        }else{
            $scope.showError = false;
            $scope.closeModal();

        // var post_id = "5cfaaf165392ab3080098a28";
            var postData = {
                "email": $scope.notify_email
            };
          HttpService.NotifyAPost(id, postData)
            .then(function(response){
                FlashService.Success("The post has been successfully added to your favourite list.");
                console.log(response);
                if (response.status == '1') {
                    FlashService.Success("The post has been successfully added to your favourite list.");
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

    $scope.closeModal = function(){
        console.log("closing modal");
        $rootScope.modalInstance.close();
    }

}]);