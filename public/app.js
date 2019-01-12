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

        .when('/confirm/:id', {
            controller: 'ConfirmController',
            templateUrl: 'app-view/confirm/ConfirmView.html',
            controllerAs: 'vm'
        })

        .when('/response', {
            controller: 'ResponseController',
            templateUrl: 'app-view/response/ResponseView.html',
            controllerAs: 'vm'
        })

        .when('/expired', {
            controller: 'ExpiredController',
            templateUrl: 'app-view/expired/ExpiredView.html',
            controllerAs: 'vm'
        })

        .when('/error', {
            controller: 'ErrorController',
            templateUrl: 'app-view/error/ErrorView.html',
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

        .when('/flag', {
            controller: 'FlagController',
            templateUrl: 'app-view/flag/FlagView.html',
            controllerAs: 'vm'
        })

        .when('/flag/:id', {
            controller: 'FlagController',
            templateUrl: 'app-view/flag/FlagView.html',
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

        .when('/edit', {
            controller: 'EditController',
            templateUrl: 'app-view/edit/EditView.html',
            controllerAs: 'vm'
        })

        .when('/edit/:id', {
            controller: 'EditController',
            templateUrl: 'app-view/edit/EditView.html',
            controllerAs: 'vm'
        })

        .when('/delete', {
            controller: 'DeleteController',
            templateUrl: 'app-view/delete/DeleteView.html',
            controllerAs: 'vm'
        })

        .when('/delete/:id', {
            controller: 'DeleteController',
            templateUrl: 'app-view/delete/DeleteView.html',
            controllerAs: 'vm'
        })


        .otherwise({ redirectTo: '404.html' });

}]);



app.run(['$rootScope', '$location', '$cookieStore', '$http','$route', '$templateCache', function($rootScope, $location, $cookieStore, $http,$route,$templateCache ){

       // keep user logged in after page refresh
        // $rootScope.globals = $cookieStore.get('globals') || {};
        // if ($rootScope.globals.currentUser) {
        //     $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
        // }

        var url;
        for (var i in $route.routes) {
            if ($route.routes[i].preload) {
                if (url = $route.routes[i].templateUrl) {
                    $http.get(url, { cache: $templateCache });
                }
            }
        }


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

        $rootScope.visitedSearchPage = false;

        $rootScope.loading = false;
        $rootScope.loadingImage = false;
        $rootScope.adposts = {};
        $rootScope.search = {};
        $rootScope.search.state = "State";
        $rootScope.search.region = "Region";
        $rootScope.search.category = "Category";
        $rootScope.is_flagged = false;

        $rootScope.currentPost = {};

        $rootScope.pageTitle = "Healthy Fling";

        $http.get("/data.json")
        .success(function (data) {
            $rootScope.masterList = data;
        })
        .error(function (data) {
            console.log("there was an error");
        });

       $rootScope.stateList = ['State',"Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "District of Columbia", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming", "Territories"];
       $rootScope.regionList = ['Region'];
       $rootScope.categoryList = ['Category','Men Seeking Woman','Women Seeking Men', 'Men Seeking Men', 'Woman Seeking Woman','t4m', 'm4t', 't4w', 'w4t', 't4t', 'mw4mw', 'mw4w', 'mw4m', 'w4mw', 'm4mw', 'w4ww', 'm4mm', 'mm4m', 'ww4w', 'ww4m', 'mm4w', 'm4ww', 'w4mm', 't4mw', 'mw4t'];
       $rootScope.locationList = ['Location','Location1','Location2'];
       
       $rootScope.haircolorList = ['Hair Color','Black','Blonde','Brunette','White','Red','Brown','Bald'];
       $rootScope.heightList = ["Height","4'0","4'1","4'2","4'3","4'4","4'5","4'6","4'7","4'8","4'9","4'10","4'11","5'0","5'1","5'2","5'3","5'4","5'5","5'6","5'7","5'8","5'9","5'10","5'11","6'0","6'1","6'2","6'3","6'4","6'5","6'6","6'7","6'8","6'9","6'10","6'11","7'0","7'1","7'2","7'3","7'4","7'5","7'6","7'7","7'8","7'9","7'10","7'11","8'0","8'1","8'2","8'3","8'4","8'5","8'6","8'7","8'8","8'9","8'10","8'11"];
       $rootScope.ethnicityList = ["Ethnicity","White","Black","Hispanic/Latino","Asian","Native American","Pacific Islanders","Native Hawaiians","Middle Eastern","South Asian","European","Multi-Racial"];
       $rootScope.orientationList = ["Orientation","Straight","Gay","Bi","Lesbian"];
       $rootScope.bodytypeList = ["Body Type","Athletic","Lean","Muscualr","Bear","Jock","Daddy","Otter","Military","Hourglass","Pear","Bananna (Rectangular)","Petite","Apple","Slim","Average","Chubby","husky","Obese","Twink"];
       $rootScope.eyecolorList = ["Eye Color","Black","Brown","Green","Blue","Hazel"];
       $rootScope.statusList = ["Status","Single","Married","Open Relationship","complicated"];
       $rootScope.genderList = ["Gender","Male","Female","Trans"];
       $rootScope.bodyHairList = ["Body Hair","Hairy","Some hair","Light hair","Smooth"];
       $rootScope.hivstatusList = ["HIV Status","Negative","Positive (Detectable)","Positive (Undetectable)"];
       
       $rootScope.flagOptionList = ["Child pornograpy and or endangerment","Prostitution","Promoted terrorism","Spam or misleading", "Others"];

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
                    var myFormData = new FormData();
                    fileReader.onload = function (event) {
                        console.log(item);
                        myFormData.append('imgUploader', item);
                        $http.post("/api/uploadimagestolocal",myFormData, {transformRequest: angular.identity, headers: {'Content-Type': undefined}})
                        .success(function (data) {
                            console.log(data);
                            values.push(data);
                            $rootScope.imageList.push(data);
                            console.log($rootScope.loadingImage);
                        })
                        .error(function (data) {
                            console.log("there was an error");
                        });
                    };
                    fileReader.readAsDataURL(item);
                    // var fileReader = new FileReader();
                    // value ={};
                    // fileReader.onload = function (event) {
                    //     var uri = event.target.result;    
                    //     value = {
                    //        // File Name 
                    //         // name: item.name,
                    //         //File Size 
                    //         // size: item.size,
                    //         //File URL to view 
                    //         url: uri
                    //         // File Input Value 
                    //         // _file: item
                    //     };
                    //     console.log(value);
                    //     $http.post("/api/uploadimagestolocal",JSON.stringify(value), {'Content-Type': 'application/json; charset=utf-8','Authorization': undefined })
                    //     .success(function (data) {
                    //         console.log(data);
                    //         values.push(data);
                    //         $rootScope.imageList.push(data);
                    //         console.log($rootScope.loadingImage);
                    //     })
                    //     .error(function (data) {
                    //         console.log("there was an error");
                    //     });

                    //     // values.push(value);
                    // };
                    // fileReader.readAsDataURL(item);
                    
                });
                scope.$apply(function () {
                    if (isMultiple) {
                        modelSetter(scope, values);
                    } else {
                        modelSetter(scope, values[0]);
                    }
                });
                angular.element("input[type='file']").val(null);
            });
        }
    };
}]);


app.directive('ngTempFileModel', ['$parse','$http','$rootScope', function ($parse,$http,$rootScope) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var model = $parse(attrs.ngTempFileModel);
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
                        $http.post("/api/uploadtempimages",JSON.stringify(value), {'Content-Type': 'application/json; charset=utf-8','Authorization': undefined })
                        .success(function (data) {
                            console.log(data);
                            values.push(data);
                            $rootScope.tempImageList.push(data);
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
                angular.element("input[type='file']").val(null);
            });
        }
    };
}]);

app.directive('windowSize', function ($window) {
  return function (scope, element) {
    var w = angular.element($window);
    scope.getWindowDimensions = function () {
        return {
            'h': w.height(),
            'w': w.width()
        };
    };
    scope.$watch(scope.getWindowDimensions, function (newValue, oldValue) {
      scope.windowHeight = newValue.h;
      scope.windowWidth = newValue.w;
      scope.style = function () {
          return {
              'height': (newValue.h - 100) + 'px',
              'width': (newValue.w - 100) + 'px'
          };
      };
    }, true);

    w.bind('resize', function () {
        scope.$apply();
    });
  }
});


app.filter('range', function() {
  return function(input, total) {
    total = parseInt(total);
    for (var i=0; i<total; i++)
      input.push(i);
    return input;
  };
});

app.filter('unsafe', function($sce) {
    return function(val) {
        return $sce.trustAsHtml(val);
    };
});