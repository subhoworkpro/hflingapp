app.controller('LoginController',['$rootScope','$scope','$location' ,'HttpService', '$window', 'AuthenticationService', function($rootScope,$scope,$location ,HttpService, $window, AuthenticationService){
	var vm =this;
	vm.login = function () {
		AuthenticationService.Login(vm.username, vm.password, function (response) {
			console.log(response);
            if (response.loginSucceeded) {
                AuthenticationService.SetCredentials(vm.username, vm.password,response.sessionId);
                $location.path('/');
            } else {
                FlashService.Error("Username or password is incorrect");
                vm.dataLoading = false;
            }
        });
      // $location.path('/');
    };

    // vm.testing = "Asdasdasdasda";

    (function initController() {
            // reset login status
            AuthenticationService.ClearCredentials();
    })();

}]);

