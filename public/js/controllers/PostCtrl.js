myApp.controller('postController', ['$scope', '$log', '$http', '$sce', '$routeParams', function($scope, $log, $http, $sce, $routeParams) {
    
    $http({
        method: 'GET',
        url: '/api/' + $routeParams.id,
    }).then(function successCallback(response) {
        $scope.html = $sce.trustAsHtml(response.data[0].htmlContent);
    }, function errorCallback(response) {
        $log.info(response.statusText);
    });
    
}]);