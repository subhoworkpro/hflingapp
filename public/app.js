var app = angular.module('app', ['ngRoute', 'ngCookies', 'ui.bootstrap', 'angularMoment', 'vcRecaptcha' ]);


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

        .when('/reply', {
            controller: 'ReplyController',
            templateUrl: 'app-view/reply/ReplyView.html',
            controllerAs: 'vm'
        })

        .when('/reply/:id', {
            controller: 'ReplyController',
            templateUrl: 'app-view/reply/ReplyView.html',
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



app.run(['$rootScope', '$location', '$cookieStore', '$http','$route', function($rootScope, $location, $cookieStore, $http,$route ){

       // keep user logged in after page refresh
        // $rootScope.globals = $cookieStore.get('globals') || {};
        // if ($rootScope.globals.currentUser) {
        //     $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
        // }


        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in and trying to access a restricted page
            // var restrictedPage = $.inArray($location.path(), ['/login']) === -1;
            // var loggedIn = $rootScope.globals.currentUser;
            // if (restrictedPage && !loggedIn) {
            //     $location.path('/login');
            // }
            console.log($location.path());
            if($location.path().indexOf("/detail") !== -1){
                $http.get("/data.json")
                .success(function (data) {
                    $rootScope.masterList = data;
                    $route.reload();
                    console.log("reload");
                });
            }
        });

        $rootScope.loading = false;
        $rootScope.loadingImage = false;
        $rootScope.adposts = {};
        $rootScope.search = {};
        $rootScope.search.state = "State";
        $rootScope.search.region = "Region";
        $rootScope.search.category = "Category";

        $rootScope.currentPost = {};

        $http.get("/data.json")
        .success(function (data) {
            $rootScope.masterList = data;
        })
        .error(function (data) {
            console.log("there was an error");
        });

       $rootScope.stateList = ['State',"Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "District of Columbia", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming", "Territories"];
       $rootScope.regionList = ['Region'];
       $rootScope.categoryList = ['Category','Men Seeking Woman','Women Seeking Men', 'Men Seeking Men', 'Woman Seeking Woman'];
       $rootScope.locationList = ['Location','Location1','Location2'];

        console.log("asdsadsa");
       $rootScope.changeList = function(data){
            $rootScope.regionList = $rootScope.masterList[data];
            console.log("list updated:"+data);
       };
}]); 


app.directive('ngFileModel', ['$parse','$http','$rootScope', function ($parse,$http,$rootScope) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var model = $parse(attrs.ngFileModel);
            var isMultiple = attrs.multiple;
            var modelSetter = model.assign;
            element.bind('change', function () {
                $rootScope.loadingImage = true;
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
                        $http.post("/api/uploadimages",JSON.stringify(value), {'Content-Type': 'application/json; charset=utf-8','Authorization': undefined })
                        .success(function (data) {
                            console.log(data);
                            values.push(data);
                            $rootScope.imageList.push(data);
                            console.log($rootScope.loadingImage);
                        })
                        .error(function (data) {
                            console.log("there was an error");
                        });

                        // values.push(value);
                    };
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


app.filter('range', function() {
  return function(input, total) {
    total = parseInt(total);
    for (var i=0; i<total; i++)
      input.push(i);
    return input;
  };
});
