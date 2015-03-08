angular.module('myApp.view2')


.config(['$routeProvider', function ($routeProvider) {

    $routeProvider.when('/view2/zhengjian', {
        templateUrl: 'view2/zhengjian.html',
        controller: 'zhengjianCtrl'
    });

}])


.controller('zhengjianCtrl', ['$scope','$window', function ($scope, $window) {


    $scope.confirm = function () {
        $window.history.back();
    }


}]);