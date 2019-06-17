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

            var params = "";

            if($rootScope.search.country == "Country" || $rootScope.search.country == ""){
                $rootScope.search.country = "";
            }else if($rootScope.search.country == "United States"){
                console.log("do nothing"); //Hack for existing records
            }else{
                params = params + "country="+$rootScope.search.country;
            }
            if($rootScope.search.state == "State" || $rootScope.search.state == "" || $rootScope.search.state == "Provinces"){
                $rootScope.search.state = "";
            }else if($rootScope.search.country == "United States"){
                params = params + "state="+$rootScope.search.state;
            }else{
                params = params + "&state="+$rootScope.search.state;
            }
            if($rootScope.search.region == "Region" || $rootScope.search.region == ""){
                $rootScope.search.region = "";
            }else{
                params = params + "&region="+$rootScope.search.region;
            }
            if($rootScope.search.category == "Category" || $rootScope.search.category == ""){
                $rootScope.search.category = "";
            }else{
                params = params + "&category="+$rootScope.search.category;
            }
            var url = "/api/posts?"+params;
             return $http({
                        url: url,
                        method: "GET",
                        headers: {
                                    'Content-Type': 'application/json;'
                        }
                    }).then(handleSuccess, handleError('Error getting result'));
        };


        service.GetAllPosts = function () {

            var params = "";

            var url = "/api/posts?"+params;
             return $http({
                        url: url,
                        method: "GET",
                        headers: {
                                    'Content-Type': 'application/json;'
                        }
                    }).then(handleSuccess, handleError('Error getting result'));
        };


        service.GetComments = function (id) {

            var url = "/api/comments/"+id;
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

        service.EditPost = function (id,data) {
            console.log(data);
            var serializeData = JSON.stringify(data);
            var url = "/api/editpost/"+id;
            var config = {
                headers : {
                    'Content-Type': 'application/json; charset=utf-8',
                    'Authorization': undefined
                }
            };
             return $http.post(url, serializeData, config).then(handleSuccess, handleError('Error getting sales report'));
        };

        service.FlagPostReason = function (id,data) {
            console.log(data);
            var serializeData = JSON.stringify(data);
            var url = "/api/flagpostreason/"+id;
            var config = {
                headers : {
                    'Content-Type': 'application/json; charset=utf-8',
                    'Authorization': undefined
                }
            };
             return $http.post(url, serializeData, config).then(handleSuccess, handleError('Error getting sales report'));
        };

        service.DeleteAPost = function (id) {
            var url = "/api/posts/"+id;
             return $http({
                        url: url,
                        method: "DELETE",
                        headers: {
                                    'Content-Type': 'application/json;'
                        }
                    }).then(handleSuccess, handleError('Error getting result'));
        };

        service.DeleteAComment = function (id) {
            var url = "/api/comments/"+id;
             return $http({
                        url: url,
                        method: "DELETE",
                        headers: {
                                    'Content-Type': 'application/json;'
                        }
                    }).then(handleSuccess, handleError('Error getting result'));
        };

        service.DeleteAReply = function (id) {
            var url = "/api/deletereply/"+id;
             return $http({
                        url: url,
                        method: "DELETE",
                        headers: {
                                    'Content-Type': 'application/json;'
                        }
                    }).then(handleSuccess, handleError('Error getting result'));
        };

        service.FlagAReply = function (id,data) {
            console.log(data);
            var serializeData = JSON.stringify(data);
            var url = "/api/flagreply/"+id;
            var config = {
                headers : {
                    'Content-Type': 'application/json; charset=utf-8',
                    'Authorization': undefined
                }
            };
             return $http.post(url, serializeData, config).then(handleSuccess, handleError('Error getting sales report'));
        };

        service.NotifyAPost = function (id,data) {
            console.log(data);
            var serializeData = JSON.stringify(data);
            var url = "/api/addnotify/"+id;
            var config = {
                headers : {
                    'Content-Type': 'application/json; charset=utf-8',
                    'Authorization': undefined
                }
            };
             return $http.post(url, serializeData, config).then(handleSuccess, handleError('Error getting sales report'));
        };

        service.UnflagAReply = function (id) {
            var url = "/api/unflagreply/"+id;
             return $http({
                        url: url,
                        method: "GET",
                        headers: {
                                    'Content-Type': 'application/json;'
                        }
                    }).then(handleSuccess, handleError('Error getting result'));
        };

        service.FlagAComment = function (id) {
            var url = "/api/flagcomment/"+id;
             return $http({
                        url: url,
                        method: "GET",
                        headers: {
                                    'Content-Type': 'application/json;'
                        }
                    }).then(handleSuccess, handleError('Error getting result'));
        };

        service.FlagACommentReason = function (id,data) {
            console.log(data);
            var serializeData = JSON.stringify(data);
            var url = "/api/flagcommentreason/"+id;
            var config = {
                headers : {
                    'Content-Type': 'application/json; charset=utf-8',
                    'Authorization': undefined
                }
            };
             return $http.post(url, serializeData, config).then(handleSuccess, handleError('Error getting sales report'));
        };


        service.UnflagAComment = function (id) {
            var url = "/api/unflagcomment/"+id;
             return $http({
                        url: url,
                        method: "GET",
                        headers: {
                                    'Content-Type': 'application/json;'
                        }
                    }).then(handleSuccess, handleError('Error getting result'));
        };

        service.ReplyAComment = function (id, data) {

            console.log(data);
            var serializeData = JSON.stringify(data);
            var url = "/api/replycomment/"+id;
            var config = {
                headers : {
                    'Content-Type': 'application/json; charset=utf-8',
                    'Authorization': undefined
                }
            };
             return $http.post(url, serializeData, config).then(handleSuccess, handleError('Error getting result'));
        };

        service.FlagAPost = function (id) {
            var url = "/api/flagpost/"+id;
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

