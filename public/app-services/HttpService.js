app.factory('HttpService', ['$http', '$rootScope',function($http,$rootScope){
    var service = {};

        service.AddPost = function (data) {
            console.log(data);
            var serializeData = JSON.stringify(data);
            var url = "/api/posts";
            var config = {
                headers : {
                    'Content-Type': 'application/json; charset=utf-8',
                    'Authorization': undefined
                }
            };
             return $http.post(url, serializeData, config).then(handleSuccess, handleError('Error getting sales report'));
        };


        service.SendMail = function (data) {
            console.log(data);
            var serializeData = JSON.stringify(data);
            var url = "/api/sendMail";
            var config = {
                headers : {
                    'Content-Type': 'application/json; charset=utf-8',
                    'Authorization': undefined
                }
            };
             return $http.post(url, serializeData, config).then(handleSuccess, handleError('Error getting sales report'));
        };

        service.GetPosts = function () {

            if($rootScope.search.state == "State"){
                $rootScope.search.state = "California";
            }
            if($rootScope.search.region == "Region"){
                $rootScope.search.region = "Los Angelas";
            }
            if($rootScope.search.category == "Category"){
                $rootScope.search.category = "Men Seeking Woman";
            }
            var url = "/api/posts?state="+$rootScope.search.state+"&region="+$rootScope.search.region+"&category="+$rootScope.search.category;
             return $http({
                        url: url,
                        method: "GET",
                        headers: {
                                    'Content-Type': 'application/json;'
                        }
                    }).then(handleSuccess, handleError('Error getting result'));
        };

        service.GetAPost = function (id) {
            var url = "/api/posts/"+id;
             return $http({
                        url: url,
                        method: "GET",
                        headers: {
                                    'Content-Type': 'application/json;'
                        }
                    }).then(handleSuccess, handleError('Error getting result'));
        };

        
        service.GetSalesPerMan = function (sessionId) {
            var url = "http://localhost:8080/salesmandata?sessionid="+sessionId;
             return $http({
                        url: url,
                        method: "POST",
                        headers: {
                                    'Content-Type': 'application/json; charset=utf-8',
                                    'Authorization': undefined
                        }
                    }).then(handleSuccess, handleError('Error getting sales report'));
        };
        service.GetSalesPerMonth = function (sessionId) {
            var url = "http://localhost:8080/lastyeardata?sessionid="+sessionId;
             return $http({
                        url: url,
                        method: "POST",
                        headers: {
                                    'Content-Type': 'application/json; charset=utf-8',
                                    'Authorization': undefined
                        }
                    }).then(handleSuccess, handleError('Error getting sales report'));
        };
        service.GetTopSalesOrder = function (sessionId) {
            var url = "http://localhost:8080/topsalesorders?sessionid="+sessionId;
             return $http({
                        url: url,
                        method: "POST",
                        headers: {
                                    'Content-Type': 'application/json; charset=utf-8',
                                    'Authorization': undefined
                        }
                    }).then(handleSuccess, handleError('Error getting sales report'));
        };
        service.GetTopSalesMan = function (sessionId) {
            var url = "http://localhost:8080/topsalesmen?sessionid="+sessionId;
             return $http({
                        url: url,
                        method: "POST",
                        headers: {
                                    'Content-Type': 'application/json; charset=utf-8',
                                    'Authorization': undefined
                        }
                    }).then(handleSuccess, handleError('Error getting sales report'));
        };
        
        return service;

        // private functions

        function handleSuccess(data) {
            return data;
        }

        function handleError(error) {
            return function () {
                return { success: false, message: error };
            };
        }

}]);

