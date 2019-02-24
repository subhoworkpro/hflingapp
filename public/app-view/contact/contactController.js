app.controller('ContactController', ['$rootScope','$scope', '$location', 'HttpService','$window','FlashService', function( $rootScope,$scope,$location,HttpService,$window,FlashService ){
    var vm = this;

    $rootScope.pageTitle = "Contact us";

    $scope.countries = $rootScope.countryList;
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


    $scope.notify = function () {
        $scope.showError = true;
        $scope.showRequiredNameError = false;
        $scope.showRequiredEmailError = false;
        $scope.showRequiredSubjectError = false;
        $scope.showRequiredMessageError = false;
        $scope.showCaptchaError = false;

        if (!$scope.name ){
            $scope.showRequiredNameError = true;
            // alert("Please Select, Region and Category."); 
        }

        if (!$scope.email){
            $scope.showRequiredEmailError = true;
            // alert("Please Select, Region and Category."); 
        }

        if (!$scope.subject){
            $scope.showRequiredSubjectError = true;
            // alert("Please Select, Region and Category."); 
        }

        if (!$scope.message){
            $scope.showRequiredMessageError = true;
            // alert("Please Select, Region and Category."); 
        }

        if (!$scope.captcha){
            $scope.showCaptchaError = true;
            // alert("Please accept the terms and condition."); 
        }

        if( $scope.showCaptchaError || $scope.showRequiredNameError || $scope.showRequiredEmailError || $scope.showRequiredSubjectError || $scope.showRequiredMessageError ){
            console.log("Validation Failed");
            $window.scrollTo(0, 0);
        }else{

            $rootScope.loading = true;

            var data = {
             "message": "Equiry Log: \n\n Name: "+$scope.name+"\nEnquiry: "+$scope.message+"\nEmail: "+$scope.email+"\n\n Regards, \n\n"+$scope.name,
                "subject": "Received Request: "+$scope.subject,
                "sender1": "info@healthyfling.com",
                "from": $scope.email
            };

            $scope.showError = false;
            HttpService.SendMail(data)
            .then(function(response){
                console.log(response);
                if (response.status == '200' || response.status == '250') {
                    console.log("success");
                    $rootScope.loading = false;
                    // alert("Your request has been received!"); 
                    FlashService.Success("Your Contact submission went through, you will receive a response between 24 and 48 hours.");
                    $scope.name = "";
                    $scope.message = "";
                    $scope.email = "";
                    $scope.subject = "";
                    $scope.captcha = "";
                }else{
                    // FlashService.Error(response.data.resultDescription);
                    vm.dataLoading = false;
                    $rootScope.loading = false;
                    FlashService.Error("There was an error while submitting your request. Please try again.");
                    // $location.path('/');
                };
                
            }); 
        }   
        
    };

}]);