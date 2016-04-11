angular.module('rpsApp').service('ComputerMover', [function() {
    this.getMove = function() {
        return Math.floor((Math.random() * 3));
    };
}]);
