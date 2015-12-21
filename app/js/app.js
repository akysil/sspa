
/* App Module */

var app = angular.module('app', ['ngResource', 'ngRoute', 'ngSanitize']);

/* App Config */

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'index.html',
        controller: 'indexCtrl'
      }).
      when('/:index', {
        templateUrl: 'item.html',
        controller: 'itemCtrl'
      }).
      otherwise({
        redirectTo: '/'
      });
}]);

/* App Services */

app.factory('Source', ['$http', function($http) {

    return {
        get: function(url) {
            return $http.get(url);
        }
    };

}]);

/* App Run */

app.run(['$rootScope', '$resource', 'Source', function($rootScope, $resource, Source) {
    
    $rootScope.sourceURL = 'https://www.googleapis.com/blogger/v3/blogs/2399953/posts?key=AIzaSyAOyBk_TekxDSj2EG6M-5s79oTibzCTkwM';
    $rootScope.news = [];

    Source.get($rootScope.sourceURL).then(function(response) {
        $rootScope.news = response.data.items;
    }, function(error) {
        console.log(error.status + ': ' + error.data);
    });

}]);

/* App Controllers */

app.controller('indexCtrl', ['$scope', function($scope) {
    $scope.index = 0;
    $scope.movies = 2;
}]);

app.controller('itemCtrl', ['$scope', '$routeParams', '$location', function($scope, $routeParams, $location) {

    $scope.index = $routeParams.index;

    $scope.goHome = function() {
        return $location.path('/');
    };
    
    $scope.delete = function(index) {
        $scope.goHome();
        $scope.$root.news.splice(index, 1);
    };
    
}]);

/* Directives */

app.directive('time', [function() {
    return {
        restrict: 'E',
        replace: false,
        templateUrl: 'date.html',
        link: function(scope) {
            scope.responsiveDate = 'longDate';
            if(480 < screen.width && screen.width < 1200)
                scope.responsiveDate = 'shortDate';
        }
    };
}]);

/* App Filters */

app.filter('htmlToPlaintext', function() {
    return function(text) {
        return  text ? String(text).replace(/<[^>]+>/gm, '') : '';
    };
});

app.filter('stripURLs', function() {
    return function(text) {
        return  text ? String(text).replace(/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi, '') : '';
    };
});