'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'ngAnimate',
  'myApp.view1',
  'myApp.view2',
  'myApp.version'
]).
config(['$routeProvider', function ($routeProvider) {
    $routeProvider.otherwise({ redirectTo: '/view1' });
}])


.run(['$rootScope', '$location', function ($rootScope, $location) {

    // === 切换动画 js start ===
    $rootScope.actualLocation = null;

    $rootScope.$watch(function () { return $location.path(); }, function (newLocation, oldLocation) {

        //首次加载
        if (newLocation === oldLocation) {
            $rootScope.animateCss = '';
            return;
        }

        if (newLocation === '/view1' && oldLocation === '') {
            return;
        }

        if ($rootScope.actualLocation === newLocation) {
            $rootScope.animateCss = 'slide-from-left';
        } else {
            $rootScope.animateCss = 'slide-from-right';
        }
    });

    $rootScope.$on('$locationChangeSuccess', function () {
        $rootScope.actualLocation = $location.path();

        // 路由切换时 将主页面的title 元素赋值为当前页面的title
        var d = document.querySelector('#view-wrap .title');

        if (d) {
            document.querySelector('body > .title').innerHTML = d.innerHTML;
        }

    });
    // === 切换动画 js end ===

 
}]);
