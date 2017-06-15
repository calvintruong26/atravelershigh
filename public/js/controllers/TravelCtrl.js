myApp.controller('travelController', ['$scope', '$log', '$http', '$sce', function($scope, $log, $http, $sce) {
    
        $scope.posts = [];
        
        $http({
        method: 'GET',
        url: '/api/recent'
    }).then(function successCallback(response) {
            for (var i = 0; i < response.data.length; i++) {
                $scope.posts.push(response.data[i]);
            }     
    }, function errorCallback(response) {
        $log.info(response.statusText);
    });
}]);