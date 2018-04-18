angular.module('myApp.gallery', ['ngRoute','firebase'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/gallery', {
    templateUrl: 'view2/view2.html',
    controller: 'galleryCtrl'
  });
}])

.controller('galleryCtrl', ['$scope','$firebaseArray',function($scope,$firebaseArray) {
	var ref = firebase.database().ref("ImageInfo");
	var myRef = $firebaseArray(ref);
	$scope.urls = myRef;

}]);