angular.module('myApp.manage', ['ngRoute','firebase'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/manage', {
    templateUrl: 'view3/view3.html',
    controller: 'manageCtrl'
  });
}])

.controller('manageCtrl', ['$scope','$firebaseArray','$firebaseStorage',function($scope,$firebaseArray,$firebaseStorage) {
	var ref = firebase.database().ref("ImageInfo");
	var myRef = $firebaseArray(ref);
	$scope.urls = myRef;
    $scope.deletePhoto = function(url){
    	var storageRef = firebase.storage().ref('Photos/'+url.imageName);
    	var storage = $firebaseStorage(storageRef);
    	storage.$delete()
    	     .then(function(){
                $scope.urls.$remove(url);
                console.log("Deleted...");
    	     })
    	     .catch(function(error){
    	     	console.log(error.message);
    	     });
    };
}])