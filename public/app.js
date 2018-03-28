var app = angular.module('app', ['ngRoute', 'ngCookies', 'ui.bootstrap' ]);


app.config(['$routeProvider', '$locationProvider',function($routeProvider, $locationProvider){
    $routeProvider
        .when('/', {
            controller: 'HomeController',
            templateUrl: 'app-view/home/HomeView.html',
            controllerAs: 'vm'
        })

        .when('/post', {
            controller: 'PostController',
            templateUrl: 'app-view/post/PostView.html',
            controllerAs: 'vm'
        })

        .when('/search', {
            controller: 'SearchController',
            templateUrl: 'app-view/search/SearchView.html',
            controllerAs: 'vm'
        })

        .when('/contact', {
            controller: 'ContactController',
            templateUrl: 'app-view/contact/ContactView.html',
            controllerAs: 'vm'
        })

        .when('/detail', {
            controller: 'DetailController',
            templateUrl: 'app-view/detail/DetailView.html',
            controllerAs: 'vm'
        })

        .when('/detail/:id', {
            controller: 'DetailController',
            templateUrl: 'app-view/detail/DetailView.html',
            controllerAs: 'vm'
        })


        .otherwise({ redirectTo: '404.html' });

}]);



app.run(['$rootScope', '$location', '$cookieStore', '$http',function($rootScope, $location, $cookieStore, $http){

       // keep user logged in after page refresh
        // $rootScope.globals = $cookieStore.get('globals') || {};
        // if ($rootScope.globals.currentUser) {
        //     $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
        // }

        // $rootScope.$on('$locationChangeStart', function (event, next, current) {
        //     // redirect to login page if not logged in and trying to access a restricted page
        //     var restrictedPage = $.inArray($location.path(), ['/login']) === -1;
        //     var loggedIn = $rootScope.globals.currentUser;
        //     if (restrictedPage && !loggedIn) {
        //         $location.path('/login');
        //     }
        // });

        $rootScope.loading = false;
        $rootScope.adposts = {};
        $rootScope.search = {};
        $rootScope.search.state = "California";
        $rootScope.search.region = "Los Angelas";
        $rootScope.search.category = "Men Seeking Woman";

        $rootScope.currentPost = {};

       $rootScope.stateList = ['State','California','State2'];
       $rootScope.regionList = ['Region','Los Angelas','Reion2'];
       $rootScope.categoryList = ['Category','Men Seeking Woman','Category2'];
       $rootScope.locationList = ['Location','Location1','Location2'];

        console.log("asdsadsa");
}]); 


app.directive('ngFileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var model = $parse(attrs.ngFileModel);
            var isMultiple = attrs.multiple;
            var modelSetter = model.assign;
            element.bind('change', function () {
                var values = [];
                angular.forEach(element[0].files, function (item) {
                    var fileReader = new FileReader();
                    value ={};
                    fileReader.onload = function (event) {
                        var uri = event.target.result;    
                        value = {
                           // File Name 
                            // name: item.name,
                            //File Size 
                            // size: item.size,
                            //File URL to view 
                            url: uri
                            // File Input Value 
                            // _file: item
                        };
                        console.log(value);
                    };
                    values.push(value);
                    fileReader.readAsDataURL(item);
                    
                });
                scope.$apply(function () {
                    if (isMultiple) {
                        modelSetter(scope, values);
                    } else {
                        modelSetter(scope, values[0]);
                    }
                });
            });
        }
    };
}]);

