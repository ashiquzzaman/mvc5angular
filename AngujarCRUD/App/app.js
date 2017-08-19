var myApp = angular.module('myApp', ['ngResource', 'ngSanitize', 'ngTouch', 'ui.router', 'ui.bootstrap']);

myApp.constant('appSettings', { serverPath: "http://localhost:13124" });

myApp.config([
    "$stateProvider", "$urlRouterProvider", "$locationProvider",
    function ($stateProvider, $urlRouterProvider, $locationProvider) {

        $stateProvider
            .state('/', {
                url: "/",
                templateUrl: "/Home/index"
                // ,controller: 'HomeController'
            })
            .state('/About', {
                url: "/Home/About",
                templateUrl: "/Home/About"
            })
            .state('/Contact', {
                url: "/Home/Contact",
                templateUrl: "/Home/Contact"
            })
            .state('employe', {
                url: "/Employe",
                templateUrl: '/Employe/Index',
                controller: 'EmployeController'
            });

        $urlRouterProvider.otherwise("/");
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    }
]);
//my.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

//    $routeProvider.when('/', {
//        templateUrl: '/Home'
//    });
//    $routeProvider.when('/Employe', {
//        templateUrl: '/Home/Employe',
//        controller: 'EmployeController'
//    });

//    $locationProvider.html5Mode({
//        enabled: true,
//        requireBase: false
//    });        
//}]);