angular.module('myApp', [
  'ngRoute',
  'myApp.upload',
  'myApp.gallery',
  'myApp.manage'
]).
config(['$routeProvider','$locationProvider',  function( $routeProvider,$locationProvider) {
 //$locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/upload'});
}]);
