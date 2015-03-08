angular.module('myApp.view2')


.config(['$routeProvider', function ($routeProvider) {

    $routeProvider.when('/view2/zhengjian', {
        templateUrl: 'view2/zhengjian.html',
        controller: 'zhengjianCtrl'
    });

}])


.controller('zhengjianCtrl', ['$scope', '$window', 'zhengjian', function ($scope, $window, zhengjian) {


    $scope.confirm = function () {
        $window.history.back();
    }

    $scope.zhengjian = zhengjian;

    $scope.typeList = ['身份证', '回乡证', '港澳台'];

    $scope.chooseZj = function (type) {
        $scope.zhengjian.type = type;
    };


}]);