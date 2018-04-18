angular.module('myApp.upload', ['ngRoute','firebase','ngFileUpload'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider
  .when('/upload', {
    templateUrl: 'view1/view1.html',
    controller: 'uploadCtrl'
  });
}])

.controller('uploadCtrl', ['$scope','$firebaseStorage','$firebaseArray',function($scope,$firebaseStorage,$firebaseArray) {

    var uploadbar = document.getElementById('uploadbar');
    $scope.tags={};
    $scope.msg = "No file is selected. Please select file/file."
    $scope.showMsg = true;
    $scope.selectFile = function(file){
        $scope.fileList = file;
        $scope.showMsg = false;
    };

    $scope.uploadFile = function(file){
        var file = file ; 
        var tags = $scope.tags.name;
        if(tags==undefined){
            tags = null;
        }
        var storageRef = firebase.storage().ref('Photos/'+file.name);
        var storage = $firebaseStorage(storageRef);
        var uploadTask = storage.$put(file);

        uploadTask.$progress(function(snapshot){
            var percentageUpload = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            $scope.percentage = percentageUpload.toFixed(0);
            uploadbar.style.width = $scope.percentage +'%'
        });

        uploadTask.$complete(function(snapshot){
            $scope.removeFile(file);
            $scope.msg = "Photo uploaded successfully..."
            var imageUrl = snapshot.downloadURL;
            var imageName = snapshot.metadata.name;
            var ref = firebase.database().ref("ImageInfo");
            var myRef = $firebaseArray(ref);
            myRef.$add({imageUrl:imageUrl,imageName:imageName,tags:tags})
                 .then(function(ref){
                    var id = ref.key;
                    console.log("image is saved "+id);
                    myRef.$indexFor(id);
                 });
            uploadTask.$error(function(error){
                console.log(error);
            });
        });
    };
    $scope.removeFile = function(file){
        var index = $scope.fileList.indexOf(file);
        $scope.fileList.splice(index,1);
        if($scope.fileList.legth < 1){
           $scope.displayMsg = true;
        };
        console.log("file removed");
    };
}]);