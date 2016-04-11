'use strict';

// Declare app level module which depends on views, and components
angular.module('rpsApp', [
    'ngRoute'
]).config(['$routeProvider', function ($routeProvider) {

    $routeProvider.when('/board', {
            templateUrl: 'game/board.html',
            controller: 'BoardController',
            controllerAs: 'boardController'
        })
        .otherwise({redirectTo: '/board'});
}]);
