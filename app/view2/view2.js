'use strict';

angular.module('myApp.view2', ['ngRoute'])

.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/view2', {
        templateUrl: 'view2/view2.html',
        controller: 'View2Ctrl'
    });
}])

    // 一个公用模块，方便注入
.value('zhengjian', {
    name: '李思思',
    type: null,
    number: 13123123123,
    sex: '女',
    born: '1994-01-05',
    tel: '15000819123',
    email: 'igo903@hotmail.com',
    school: '武汉市第二中学'
})

    // 一定要用数组方式 注入， 不能简写
.controller('View2Ctrl', ['$scope', 'zhengjian', '$location', function ($scope, zhengjian, $location) {

    $scope.zhengjian = zhengjian;

    $scope.editZhengjian = function () {
        $location.path('/view2/zhengjian'); //到zhengjian view
    }

}]);